# AmazonPaul - Sistema de Gestión de Nuez de Brasil

## 📋 Descripción

AmazonPaul es una aplicación empresarial moderna y limpia para la gestión integral de comercio de Nuez de Brasil. Diseñada específicamente para el contexto amazónico, proporciona herramientas completas para la administración de:

- **Compra y Venta** de productos
- **Gestión de Inventario** de stock
- **Administración de Capital** y movimientos financieros
- **Control de Préstamos** y créditos
- **Gestión de Contactos** (clientes y proveedores)

## 🎯 Características Principales

### Dashboard
- Resumen visual del capital disponible
- Estado del inventario en tiempo real
- Gráficos de ingresos vs egresos
- Tendencias de ventas
- Tabla de transacciones recientes

### Módulo de Transacciones
- Registro de compras y ventas
- Filtrado por tipo de transacción
- Cálculo automático de totales
- Historial completo con estados

### Gestión de Inventario
- Seguimiento de stock en latas y barricas
- Gráficas de tendencia de stock
- Movimientos de entrada y salida
- Historial de cambios

### Administración de Capital
- Monitor del capital disponible
- Gráficos de flujo de capital
- Registro de todos los movimientos
- Seguimiento de ingresos vs egresos

### Gestión de Préstamos
- Registro de préstamos otorgados
- Seguimiento de devoluciones parciales
- Alertas de préstamos vencidos
- Visualización del estado de cobranza

### Gestión de Contactos
- Base de datos de clientes y proveedores
- Búsqueda y filtrado avanzado
- Información de contacto completa
- Historial de transacciones por contacto

## 🎨 Diseño Visual

### Paleta de Colores
- **Color Primario**: Verde Bosque (Amazonía) - `#589b4c`
- **Color Acentos**: Oro Castaña - `#ca9953`
- **Colores Neutrales**: Combinación de blanco, grises y negro
- **Colores de Estado**: Verde (éxito), Amarillo (alerta), Rojo (error)

### Componentes Visuales
- Sidebar de navegación responsiva
- Tarjetas métricas con indicadores de tendencia
- Gráficos interactivos con Recharts
- Tablas de datos con scroll responsivo
- Modales y diálogos intuitivos

## 🏗️ Estructura del Proyecto

```
├── app/
│   ├── layout.tsx              # Layout principal
│   ├── globals.css             # Estilos globales y tokens de diseño
│   ├── page.tsx                # Dashboard principal
│   ├── transacciones/
│   ├── inventario/
│   ├── capital/
│   ├── prestamos/
│   └── contactos/
├── components/
│   ├── sidebar.tsx             # Navegación lateral
│   └── metric-card.tsx         # Componente de métrica
└── public/
    └── nuez-brasil.jpg         # Imagen de producto
```

## 🛠️ Stack Tecnológico

- **Framework**: Next.js 16 con App Router
- **UI Components**: shadcn/ui
- **Styling**: Tailwind CSS v4
- **Gráficos**: Recharts
- **Icons**: Lucide React
- **Lenguaje**: TypeScript

## 📱 Responsividad

La aplicación está diseñada con enfoque mobile-first:
- Sidebar colapsable en dispositivos móviles
- Tablas con scroll horizontal en pantallas pequeñas
- Grillas adaptables (1 columna en móvil, múltiples en desktop)
- Menú hamburguesa en dispositivos móviles

## 🎯 Páginas Disponibles

### `/` - Dashboard
Resumen ejecutivo con métricas clave y gráficos de tendencias.

### `/transacciones` - Gestión de Transacciones
Registro y seguimiento de compras y ventas con filtrado avanzado.

### `/inventario` - Gestión de Inventario
Control de stock con visualización de tendencias de disponibilidad.

### `/capital` - Administración de Capital
Monitor de movimientos financieros e ingresos/egresos.

### `/prestamos` - Gestión de Préstamos
Control de créditos otorgados con alertas de vencimiento.

### `/contactos` - Gestión de Contactos
Base de datos de clientes y proveedores con búsqueda avanzada.

## 🚀 Cómo Usar

1. **Explorar el Dashboard**: Visualiza un resumen de tu negocio
2. **Registrar Transacciones**: Crea nuevas compras y ventas
3. **Monitorear Inventario**: Mantén control del stock disponible
4. **Gestionar Capital**: Revisa todos tus movimientos financieros
5. **Administrar Préstamos**: Controla los créditos otorgados
6. **Mantener Contactos**: Organiza tu base de datos de clientes

## 📊 Datos de Ejemplo

La aplicación incluye datos de ejemplo para cada módulo, permitiendo una visualización inmediata de cómo funcionaría con información real.

## 🎨 Personalización

Los colores y temas pueden personalizarse editando:
- `/app/globals.css` - Variables de diseño (CSS custom properties)
- Colores específicos por sección en cada página

## 📝 Notas de Desarrollo

- Todos los componentes están optimizados para renderizado en el cliente
- Las tablas son completamente interactivas
- Los gráficos se actualizan de forma responsiva
- El diseño sigue las mejores prácticas de UX/UI

## 🔐 Seguridad y Escalabilidad

La aplicación está diseñada para ser fácilmente integrable con:
- Base de datos PostgreSQL/MySQL
- Sistemas de autenticación seguros
- APIs REST para operaciones CRUD
- Row Level Security (RLS) para datos sensibles

## 📄 Licencia

Proyecto de demostración - Uso interno

---

**AmazonPaul** - Gestión Inteligente de Nuez de Brasil
