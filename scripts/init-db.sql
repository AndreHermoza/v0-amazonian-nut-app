-- ============================================
-- COMERCIO DE NUEZ DE BRASIL - SCHEMA
-- ============================================

-- Tabla para almacenar el capital
CREATE TABLE IF NOT EXISTS capital (
    id SERIAL PRIMARY KEY,
    monto_inicial DECIMAL(15,2) NOT NULL DEFAULT 0.00,
    monto_actual DECIMAL(15,2) NOT NULL DEFAULT 0.00,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    descripcion VARCHAR(255),
    activo BOOLEAN DEFAULT TRUE
);

-- Tabla para tipos de movimiento de capital
CREATE TABLE IF NOT EXISTS tipo_movimiento_capital (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE,
    descripcion VARCHAR(255),
    afecta_capital BOOLEAN DEFAULT TRUE,
    tipo VARCHAR(20) NOT NULL CHECK (tipo IN ('INGRESO', 'EGRESO', 'AJUSTE'))
);

-- Tabla para movimientos de capital
CREATE TABLE IF NOT EXISTS movimiento_capital (
    id SERIAL PRIMARY KEY,
    capital_id INT NOT NULL REFERENCES capital(id),
    tipo_movimiento_id INT NOT NULL REFERENCES tipo_movimiento_capital(id),
    monto DECIMAL(15,2) NOT NULL,
    saldo_anterior DECIMAL(15,2) NOT NULL,
    saldo_posterior DECIMAL(15,2) NOT NULL,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    descripcion TEXT,
    referencia VARCHAR(100),
    usuario_id INT,
    CONSTRAINT movimiento_capital_check CHECK (monto > 0)
);

-- Tabla para personas (clientes/proveedores)
CREATE TABLE IF NOT EXISTS persona (
    id SERIAL PRIMARY KEY,
    tipo VARCHAR(20) NOT NULL CHECK (tipo IN ('CLIENTE', 'PROVEEDOR', 'AMBOS')),
    documento_identidad VARCHAR(20) UNIQUE,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100),
    telefono VARCHAR(20),
    email VARCHAR(100),
    direccion TEXT,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    activo BOOLEAN DEFAULT TRUE
);

-- Tabla para usuarios del sistema
CREATE TABLE IF NOT EXISTS usuario (
    id SERIAL PRIMARY KEY,
    persona_id INT REFERENCES persona(id),
    nombre_usuario VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    contrasena_hash VARCHAR(255) NOT NULL,
    rol VARCHAR(20) NOT NULL DEFAULT 'VENDEDOR' CHECK (rol IN ('ADMIN', 'GERENTE', 'VENDEDOR', 'CONTADOR')),
    activo BOOLEAN DEFAULT TRUE,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ultimo_acceso TIMESTAMP NULL
);

-- Tabla para préstamos
CREATE TABLE IF NOT EXISTS prestamo (
    id SERIAL PRIMARY KEY,
    capital_id INT NOT NULL REFERENCES capital(id),
    persona_id INT NOT NULL REFERENCES persona(id),
    monto_prestado DECIMAL(15,2) NOT NULL,
    monto_devuelto DECIMAL(15,2) DEFAULT 0.00,
    fecha_prestamo DATE NOT NULL,
    fecha_vencimiento DATE,
    fecha_devolucion DATE,
    estado VARCHAR(30) NOT NULL DEFAULT 'PENDIENTE' CHECK (estado IN ('PENDIENTE', 'DEVUELTO_PARCIAL', 'DEVUELTO_TOTAL', 'VENCIDO')),
    tasa_interes DECIMAL(5,2) DEFAULT 0.00,
    descripcion TEXT,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT prestamo_check CHECK (monto_prestado > 0 AND monto_devuelto >= 0)
);

-- Tabla para productos
CREATE TABLE IF NOT EXISTS producto (
    id SERIAL PRIMARY KEY,
    codigo VARCHAR(50) UNIQUE,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    unidad_base VARCHAR(20) DEFAULT 'KILOGRAMO',
    activo BOOLEAN DEFAULT TRUE
);

-- Tabla para medidas de producto
CREATE TABLE IF NOT EXISTS medida_producto (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    abreviatura VARCHAR(10),
    equivalente_barricas DECIMAL(10,3) NOT NULL,
    equivalente_latas DECIMAL(10,3) NOT NULL,
    descripcion VARCHAR(255)
);

-- Tabla para precios de producto
CREATE TABLE IF NOT EXISTS precio_producto (
    id SERIAL PRIMARY KEY,
    producto_id INT NOT NULL REFERENCES producto(id),
    medida_id INT NOT NULL REFERENCES medida_producto(id),
    precio DECIMAL(15,2) NOT NULL,
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE,
    es_precio_actual BOOLEAN DEFAULT TRUE,
    CONSTRAINT precio_check CHECK (precio > 0)
);

-- Tabla para transacciones
CREATE TABLE IF NOT EXISTS transaccion (
    id SERIAL PRIMARY KEY,
    tipo VARCHAR(20) NOT NULL CHECK (tipo IN ('COMPRA', 'VENTA')),
    persona_id INT NOT NULL REFERENCES persona(id),
    fecha DATE NOT NULL,
    hora TIME DEFAULT CURRENT_TIME,
    total DECIMAL(15,2) NOT NULL,
    subtotal DECIMAL(15,2) NOT NULL,
    impuestos DECIMAL(15,2) DEFAULT 0.00,
    descuentos DECIMAL(15,2) DEFAULT 0.00,
    estado VARCHAR(20) NOT NULL DEFAULT 'COMPLETADA' CHECK (estado IN ('PENDIENTE', 'COMPLETADA', 'CANCELADA')),
    observaciones TEXT,
    usuario_id INT REFERENCES usuario(id),
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla para detalles de transacción
CREATE TABLE IF NOT EXISTS detalle_transaccion (
    id SERIAL PRIMARY KEY,
    transaccion_id INT NOT NULL REFERENCES transaccion(id) ON DELETE CASCADE,
    producto_id INT NOT NULL REFERENCES producto(id),
    medida_id INT NOT NULL REFERENCES medida_producto(id),
    cantidad_barricas DECIMAL(10,3) NOT NULL,
    cantidad_latas DECIMAL(10,3) NOT NULL,
    cantidad_total_latas DECIMAL(10,3) GENERATED ALWAYS AS (cantidad_barricas * 6 + cantidad_latas) STORED,
    precio_unitario DECIMAL(15,2) NOT NULL,
    subtotal DECIMAL(15,2) GENERATED ALWAYS AS (
        ROUND((cantidad_barricas * 6 + cantidad_latas) * precio_unitario / 6, 2)
    ) STORED,
    CONSTRAINT detalle_check CHECK (cantidad_barricas >= 0 AND cantidad_latas >= 0 AND precio_unitario > 0)
);

-- Tabla para inventario
CREATE TABLE IF NOT EXISTS inventario (
    id SERIAL PRIMARY KEY,
    producto_id INT NOT NULL UNIQUE REFERENCES producto(id) ON DELETE CASCADE,
    cantidad_latas DECIMAL(10,3) NOT NULL DEFAULT 0,
    cantidad_barricas DECIMAL(10,3) GENERATED ALWAYS AS (cantidad_latas / 6) STORED,
    ultima_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT inventario_check CHECK (cantidad_latas >= 0)
);

-- Tabla para movimientos de inventario
CREATE TABLE IF NOT EXISTS movimiento_inventario (
    id SERIAL PRIMARY KEY,
    inventario_id INT NOT NULL REFERENCES inventario(id),
    transaccion_id INT REFERENCES transaccion(id),
    tipo VARCHAR(20) NOT NULL CHECK (tipo IN ('ENTRADA', 'SALIDA', 'AJUSTE')),
    cantidad_latas DECIMAL(10,3) NOT NULL,
    saldo_anterior DECIMAL(10,3) NOT NULL,
    saldo_posterior DECIMAL(10,3) NOT NULL,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    motivo VARCHAR(255),
    usuario_id INT REFERENCES usuario(id)
);

-- Tabla para compra con préstamo
CREATE TABLE IF NOT EXISTS compra_con_prestamo (
    id SERIAL PRIMARY KEY,
    prestamo_id INT NOT NULL REFERENCES prestamo(id),
    cantidad_producto DECIMAL(10,2) NOT NULL,
    precio_unitario DECIMAL(15,2) NOT NULL,
    total DECIMAL(15,2) NOT NULL,
    fecha_compra DATE NOT NULL,
    descripcion TEXT
);

-- ============================================
-- DATOS INICIALES
-- ============================================

-- Insertar tipos de movimiento de capital
INSERT INTO tipo_movimiento_capital (nombre, descripcion, afecta_capital, tipo) 
VALUES
    ('CAPITAL_INICIAL', 'Capital inicial del negocio', TRUE, 'INGRESO'),
    ('AGREGAR_CAPITAL', 'Aporte adicional de capital', TRUE, 'INGRESO'),
    ('RETIRO_CAPITAL', 'Retiro de capital del negocio', TRUE, 'EGRESO'),
    ('PRESTAMO', 'Préstamo realizado a terceros', TRUE, 'EGRESO'),
    ('DEVOLUCION_PRESTAMO', 'Devolución de préstamo recibido', TRUE, 'INGRESO'),
    ('COMPRA', 'Compra de producto', TRUE, 'EGRESO'),
    ('VENTA', 'Venta de producto', TRUE, 'INGRESO'),
    ('GASTO_OPERATIVO', 'Gastos de operación del negocio', TRUE, 'EGRESO')
ON CONFLICT (nombre) DO NOTHING;

-- Insertar capital inicial
INSERT INTO capital (monto_inicial, monto_actual, descripcion) 
VALUES (10000.00, 10000.00, 'Capital inicial para operaciones de comercio de nuez de brasil')
ON CONFLICT DO NOTHING;

-- Insertar producto principal
INSERT INTO producto (codigo, nombre, descripcion, unidad_base) 
VALUES ('NUEZ-001', 'Nuez de Brasil', 'Nuez de Brasil en cáscara - Producto Premium Amazónico', 'KILOGRAMO')
ON CONFLICT (codigo) DO NOTHING;

-- Insertar medidas de producto
INSERT INTO medida_producto (nombre, abreviatura, equivalente_barricas, equivalente_latas, descripcion) 
VALUES
    ('Barrica', 'B', 1.0, 6.0, 'Medida estándar - 1 barrica'),
    ('Lata', 'L', 0.1667, 1.0, '1/6 de barrica'),
    ('Terataño', 'T', 1.5, 9.0, 'Barrica y media - 1.5 barricas'),
    ('Medio Terataño', 'MT', 0.75, 4.5, 'Tres cuartos de barrica')
ON CONFLICT DO NOTHING;

-- Insertar precios por defecto
INSERT INTO precio_producto (producto_id, medida_id, precio, fecha_inicio, es_precio_actual)
SELECT p.id, m.id,
    CASE 
        WHEN m.nombre = 'Barrica' THEN 250.00
        WHEN m.nombre = 'Lata' THEN 41.67
        WHEN m.nombre = 'Terataño' THEN 375.00
        WHEN m.nombre = 'Medio Terataño' THEN 187.50
        ELSE 250.00
    END,
    CURRENT_DATE,
    TRUE
FROM producto p, medida_producto m
WHERE p.codigo = 'NUEZ-001'
ON CONFLICT DO NOTHING;

-- Crear registro de inventario inicial
INSERT INTO inventario (producto_id, cantidad_latas)
SELECT id, 100 FROM producto WHERE codigo = 'NUEZ-001'
ON CONFLICT DO NOTHING;

-- ============================================
-- ÍNDICES PARA RENDIMIENTO
-- ============================================

CREATE INDEX IF NOT EXISTS idx_movimiento_capital_fecha ON movimiento_capital(fecha);
CREATE INDEX IF NOT EXISTS idx_transaccion_fecha ON transaccion(fecha);
CREATE INDEX IF NOT EXISTS idx_transaccion_persona ON transaccion(persona_id);
CREATE INDEX IF NOT EXISTS idx_transaccion_tipo ON transaccion(tipo);
CREATE INDEX IF NOT EXISTS idx_prestamo_persona ON prestamo(persona_id);
CREATE INDEX IF NOT EXISTS idx_prestamo_estado ON prestamo(estado);
CREATE INDEX IF NOT EXISTS idx_movimiento_inventario_fecha ON movimiento_inventario(fecha);
