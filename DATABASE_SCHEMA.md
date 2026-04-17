# Esquema de Base de Datos - AmazonPaul

## Descripción General

La base de datos de AmazonPaul está diseñada para gestionar completamente el ciclo de vida del comercio de Nuez de Brasil, incluyendo:
- Gestión de capital e inversión
- Registro de transacciones (compra/venta)
- Control de inventario
- Gestión de préstamos
- Información de contactos

## Estructura de Tablas

### 1. Capital

Almacena la información del capital disponible en el negocio.

```sql
CREATE TABLE capital (
    id INT PRIMARY KEY AUTO_INCREMENT,
    monto_inicial DECIMAL(15,2) NOT NULL DEFAULT 0.00,
    monto_actual DECIMAL(15,2) NOT NULL DEFAULT 0.00,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    descripcion VARCHAR(255),
    activo BOOLEAN DEFAULT TRUE
);
```

**Campos**:
- `id`: Identificador único del capital
- `monto_inicial`: Capital inicial invertido
- `monto_actual`: Saldo actual disponible
- `fecha_creacion`: Fecha de creación del registro
- `fecha_actualizacion`: Última actualización automática
- `descripcion`: Notas sobre el capital
- `activo`: Estado del registro

---

### 2. Tipo de Movimiento de Capital

Define los tipos de movimientos financieros posibles.

```sql
CREATE TABLE tipo_movimiento_capital (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(50) NOT NULL,
    descripcion VARCHAR(255),
    afecta_capital BOOLEAN DEFAULT TRUE,
    tipo ENUM('INGRESO', 'EGRESO', 'AJUSTE') NOT NULL
);
```

**Tipos Predefinidos**:
- CAPITAL_INICIAL: Capital inicial del negocio
- AGREGAR_CAPITAL: Aporte adicional de capital
- RETIRO_CAPITAL: Retiro de capital
- PRESTAMO: Préstamo realizado a terceros
- DEVOLUCION_PRESTAMO: Devolución de préstamo
- COMPRA: Compra de producto
- VENTA: Venta de producto
- GASTO_OPERATIVO: Gastos de operación

---

### 3. Movimiento de Capital

Registra todos los movimientos financieros del capital.

```sql
CREATE TABLE movimiento_capital (
    id INT PRIMARY KEY AUTO_INCREMENT,
    capital_id INT NOT NULL,
    tipo_movimiento_id INT NOT NULL,
    monto DECIMAL(15,2) NOT NULL,
    saldo_anterior DECIMAL(15,2) NOT NULL,
    saldo_posterior DECIMAL(15,2) NOT NULL,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    descripcion TEXT,
    referencia VARCHAR(100),
    usuario_id INT,
    FOREIGN KEY (capital_id) REFERENCES capital(id),
    FOREIGN KEY (tipo_movimiento_id) REFERENCES tipo_movimiento_capital(id)
);
```

**Propósito**: Auditoría completa de todos los cambios en el capital.

---

### 4. Préstamo

Gestiona los préstamos otorgados a personas.

```sql
CREATE TABLE prestamo (
    id INT PRIMARY KEY AUTO_INCREMENT,
    capital_id INT NOT NULL,
    persona_id INT NOT NULL,
    monto_prestado DECIMAL(15,2) NOT NULL,
    monto_devuelto DECIMAL(15,2) DEFAULT 0.00,
    fecha_prestamo DATE NOT NULL,
    fecha_vencimiento DATE,
    fecha_devolucion DATE,
    estado ENUM('PENDIENTE', 'DEVUELTO_PARCIAL', 'DEVUELTO_TOTAL', 'VENCIDO') DEFAULT 'PENDIENTE',
    tasa_interes DECIMAL(5,2) DEFAULT 0.00,
    descripcion TEXT,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (capital_id) REFERENCES capital(id)
);
```

**Estados**:
- PENDIENTE: No se ha iniciado devolución
- DEVUELTO_PARCIAL: Se ha devuelto parte del monto
- DEVUELTO_TOTAL: Se ha devuelto el total
- VENCIDO: Ha pasado la fecha de vencimiento

---

### 5. Compra con Préstamo

Vincula compras con préstamos otorgados.

```sql
CREATE TABLE compra_con_prestamo (
    id INT PRIMARY KEY AUTO_INCREMENT,
    prestamo_id INT NOT NULL,
    cantidad_producto DECIMAL(10,2) NOT NULL,
    precio_unitario DECIMAL(15,2) NOT NULL,
    total DECIMAL(15,2) NOT NULL,
    fecha_compra DATE NOT NULL,
    descripcion TEXT,
    FOREIGN KEY (prestamo_id) REFERENCES prestamo(id)
);
```

---

### 6. Persona

Base de datos de clientes y proveedores.

```sql
CREATE TABLE persona (
    id INT PRIMARY KEY AUTO_INCREMENT,
    tipo ENUM('CLIENTE', 'PROVEEDOR', 'AMBOS') NOT NULL,
    documento_identidad VARCHAR(20) UNIQUE,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100),
    telefono VARCHAR(20),
    email VARCHAR(100),
    direccion TEXT,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    activo BOOLEAN DEFAULT TRUE
);
```

**Tipos**:
- CLIENTE: Solo comprador
- PROVEEDOR: Solo vendedor
- AMBOS: Actúa en ambos roles

---

### 7. Producto

Catálogo de productos disponibles.

```sql
CREATE TABLE producto (
    id INT PRIMARY KEY AUTO_INCREMENT,
    codigo VARCHAR(50) UNIQUE,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    unidad_base VARCHAR(20) DEFAULT 'KILOGRAMO',
    activo BOOLEAN DEFAULT TRUE
);
```

**Nota**: Por defecto se incluye "Nuez de Brasil".

---

### 8. Medida de Producto

Define las unidades de medida para los productos.

```sql
CREATE TABLE medida_producto (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(50) NOT NULL,
    abreviatura VARCHAR(10),
    equivalente_barricas DECIMAL(10,3) NOT NULL,
    equivalente_latas DECIMAL(10,3) NOT NULL,
    descripcion VARCHAR(255)
);
```

**Medidas Predefinidas**:
- Barrica (B): 1 barrica = 6 latas
- Lata (L): 1/6 de barrica
- Terataño (T): 1.5 barricas = 9 latas
- Medio Terataño (MT): 0.75 barricas = 4.5 latas

---

### 9. Precio de Producto

Historial de precios por producto y medida.

```sql
CREATE TABLE precio_producto (
    id INT PRIMARY KEY AUTO_INCREMENT,
    producto_id INT NOT NULL,
    medida_id INT NOT NULL,
    precio DECIMAL(15,2) NOT NULL,
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE,
    es_precio_actual BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (producto_id) REFERENCES producto(id),
    FOREIGN KEY (medida_id) REFERENCES medida_producto(id)
);
```

---

### 10. Transacción

Registro de todas las compras y ventas.

```sql
CREATE TABLE transaccion (
    id INT PRIMARY KEY AUTO_INCREMENT,
    tipo ENUM('COMPRA', 'VENTA') NOT NULL,
    persona_id INT NOT NULL,
    fecha DATE NOT NULL,
    hora TIME DEFAULT CURRENT_TIME,
    total DECIMAL(15,2) NOT NULL,
    subtotal DECIMAL(15,2) NOT NULL,
    impuestos DECIMAL(15,2) DEFAULT 0.00,
    descuentos DECIMAL(15,2) DEFAULT 0.00,
    estado ENUM('PENDIENTE', 'COMPLETADA', 'CANCELADA') DEFAULT 'COMPLETADA',
    observaciones TEXT,
    usuario_id INT,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (persona_id) REFERENCES persona(id)
);
```

---

### 11. Detalle de Transacción

Detalles de cada producto en una transacción.

```sql
CREATE TABLE detalle_transaccion (
    id INT PRIMARY KEY AUTO_INCREMENT,
    transaccion_id INT NOT NULL,
    producto_id INT NOT NULL,
    medida_id INT NOT NULL,
    cantidad_barricas DECIMAL(10,3) NOT NULL,
    cantidad_latas DECIMAL(10,3) NOT NULL,
    cantidad_total_latas DECIMAL(10,3) GENERATED ALWAYS AS 
        (cantidad_barricas * 6 + cantidad_latas) STORED,
    precio_unitario DECIMAL(15,2) NOT NULL,
    subtotal DECIMAL(15,2) GENERATED ALWAYS AS 
        (cantidad_total_latas * precio_unitario / 6) STORED,
    FOREIGN KEY (transaccion_id) REFERENCES transaccion(id) ON DELETE CASCADE,
    FOREIGN KEY (producto_id) REFERENCES producto(id),
    FOREIGN KEY (medida_id) REFERENCES medida_producto(id)
);
```

**Columnas Calculadas**:
- `cantidad_total_latas`: Conversión automática a latas
- `subtotal`: Cálculo automático del monto

---

### 12. Inventario

Control de stock actual por producto.

```sql
CREATE TABLE inventario (
    id INT PRIMARY KEY AUTO_INCREMENT,
    producto_id INT NOT NULL,
    cantidad_latas DECIMAL(10,3) NOT NULL DEFAULT 0,
    cantidad_barricas DECIMAL(10,3) GENERATED ALWAYS AS 
        (cantidad_latas / 6) STORED,
    ultima_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (producto_id) REFERENCES producto(id) ON DELETE CASCADE
);
```

---

### 13. Movimiento de Inventario

Auditoría de todos los cambios en el inventario.

```sql
CREATE TABLE movimiento_inventario (
    id INT PRIMARY KEY AUTO_INCREMENT,
    inventario_id INT NOT NULL,
    transaccion_id INT,
    tipo ENUM('ENTRADA', 'SALIDA', 'AJUSTE') NOT NULL,
    cantidad_latas DECIMAL(10,3) NOT NULL,
    saldo_anterior DECIMAL(10,3) NOT NULL,
    saldo_posterior DECIMAL(10,3) NOT NULL,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    motivo VARCHAR(255),
    usuario_id INT,
    FOREIGN KEY (inventario_id) REFERENCES inventario(id),
    FOREIGN KEY (transaccion_id) REFERENCES transaccion(id)
);
```

---

### 14. Usuario

Usuarios del sistema.

```sql
CREATE TABLE usuario (
    id INT PRIMARY KEY AUTO_INCREMENT,
    persona_id INT,
    nombre_usuario VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    contrasena_hash VARCHAR(255) NOT NULL,
    rol ENUM('ADMIN', 'GERENTE', 'VENDEDOR', 'CONTADOR') DEFAULT 'VENDEDOR',
    activo BOOLEAN DEFAULT TRUE,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ultimo_acceso TIMESTAMP NULL,
    FOREIGN KEY (persona_id) REFERENCES persona(id)
);
```

**Roles**:
- ADMIN: Acceso total al sistema
- GERENTE: Gestión general
- VENDEDOR: Solo transacciones
- CONTADOR: Reportes y finanzas

---

## Vistas SQL

### vista_resumen_capital

Resumen de capital con estadísticas de movimientos.

```sql
CREATE VIEW vista_resumen_capital AS
SELECT 
    c.id,
    c.monto_inicial,
    c.monto_actual,
    c.fecha_actualizacion,
    (SELECT COUNT(*) FROM movimiento_capital mc WHERE mc.capital_id = c.id) 
        as total_movimientos,
    (SELECT SUM(monto) FROM movimiento_capital mc 
        WHERE mc.capital_id = c.id AND mc.tipo_movimiento_id IN 
        (SELECT id FROM tipo_movimiento_capital WHERE tipo = 'INGRESO')) 
        as total_ingresos,
    (SELECT SUM(monto) FROM movimiento_capital mc 
        WHERE mc.capital_id = c.id AND mc.tipo_movimiento_id IN 
        (SELECT id FROM tipo_movimiento_capital WHERE tipo = 'EGRESO')) 
        as total_egresos
FROM capital c
WHERE c.activo = TRUE;
```

---

### vista_transacciones_detalladas

Transacciones con información del cliente y totales.

```sql
CREATE VIEW vista_transacciones_detalladas AS
SELECT 
    t.id,
    t.tipo,
    t.fecha,
    CONCAT(p.nombre, ' ', COALESCE(p.apellido, '')) as persona,
    t.total,
    t.estado,
    t.observaciones,
    COUNT(dt.id) as items,
    SUM(dt.cantidad_total_latas) as total_latas
FROM transaccion t
JOIN persona p ON t.persona_id = p.id
LEFT JOIN detalle_transaccion dt ON t.id = dt.transaccion_id
GROUP BY t.id, t.tipo, t.fecha, p.nombre, p.apellido, t.total, t.estado, t.observaciones;
```

---

### vista_inventario_actual

Estado actual del inventario.

```sql
CREATE VIEW vista_inventario_actual AS
SELECT 
    p.codigo,
    p.nombre as producto,
    i.cantidad_latas,
    i.cantidad_barricas,
    ROUND(i.cantidad_latas / 6, 2) as barricas_equivalentes,
    i.ultima_actualizacion
FROM inventario i
JOIN producto p ON i.producto_id = p.id;
```

---

### vista_prestamos_pendientes

Préstamos que requieren seguimiento.

```sql
CREATE VIEW vista_prestamos_pendientes AS
SELECT 
    pr.id,
    pr.fecha_prestamo,
    CONCAT(pe.nombre, ' ', COALESCE(pe.apellido, '')) as persona,
    pr.monto_prestado,
    pr.monto_devuelto,
    (pr.monto_prestado - pr.monto_devuelto) as saldo_pendiente,
    pr.estado,
    pr.fecha_vencimiento,
    DATEDIFF(CURDATE(), pr.fecha_vencimiento) as dias_vencido
FROM prestamo pr
JOIN persona pe ON pr.persona_id = pe.id
WHERE pr.estado IN ('PENDIENTE', 'DEVUELTO_PARCIAL', 'VENCIDO');
```

---

## Relaciones de Clave Foránea

```
usuario → persona
transaccion → persona
detalle_transaccion → transaccion, producto, medida_producto
inventario → producto
movimiento_inventario → inventario, transaccion, usuario
movimiento_capital → capital, tipo_movimiento_capital, usuario
prestamo → capital, persona
compra_con_prestamo → prestamo
precio_producto → producto, medida_producto
```

---

## Procedimientos Almacenados Disponibles

1. **sp_agregar_capital** - Agregar capital al negocio
2. **sp_registrar_prestamo** - Registrar un nuevo préstamo
3. **sp_registrar_transaccion** - Registrar compra/venta
4. **sp_actualizar_inventario** - Actualizar stock automáticamente

---

## Datos Iniciales

El sistema viene precargado con:
- 1 registro de capital inicial ($10,000)
- 1 producto: Nuez de Brasil
- 4 medidas: Barrica, Lata, Terataño, Medio Terataño
- 8 tipos de movimiento de capital
- 1 usuario admin (contraseña: Admin123)

---

## Consideraciones de Escalabilidad

- Las columnas calculadas reducen errores de datos
- Las vistas simplificar reportes
- Los índices en Foreign Keys optimizar joins
- Los procedures manejan lógica transaccional
- Las timestamps para auditoría automática

---

**Versión del Schema**: 1.0.0
**Tipo de Base de Datos**: MySQL 5.7+
**Última Actualización**: Junio 2024
