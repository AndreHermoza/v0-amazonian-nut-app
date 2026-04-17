'use client';

import { useState } from 'react';
import { Plus, Eye, Edit2, Trash2, TrendingUp, AlertCircle, Package } from 'lucide-react';
import { SearchInput, FilterButton, FilterGroup, FilterBar } from '@/components/filters';
import { DataTable } from '@/components/data-table';
import { DeleteConfirmModal, SuccessModal, DetailsModal } from '@/components/crud-modal';

const productosData = [
  {
    id: 1,
    codigo_interno: 'CASTAÑA-001',
    nombre_comercial: 'Nuez de Brasil Premium 1kg',
    nombre_generico: 'Castanha do Brasil',
    tipo_producto: 'Semillas',
    categoria_cultivo: 'GENERAL',
    registro_senasa: 'SENASA-2024-001',
    notas_permanentes: 'Producto de máxima calidad, certificado orgánico',
    marca: 'CASTAÑA PREMIUM',
    unidad_medida: 'KG',
    stock_actual: 450,
    stock_minimo: 100,
    stock_maximo: 1000,
    precio_unitario_compra: 8.50,
    precio_unitario_venta: 15.00,
    margen_ganancia: 76,
    activo: true,
  },
  {
    id: 2,
    codigo_interno: 'CASTAÑA-002',
    nombre_comercial: 'Nuez de Brasil Barrica 250kg',
    nombre_generico: 'Castanha do Brasil',
    tipo_producto: 'Semillas',
    categoria_cultivo: 'GENERAL',
    registro_senasa: 'SENASA-2024-002',
    notas_permanentes: 'Presentación bulk para distribuidores',
    marca: 'CASTAÑA EXPORT',
    unidad_medida: 'KG',
    stock_actual: 85,
    stock_minimo: 200,
    stock_maximo: 500,
    precio_unitario_compra: 6.75,
    precio_unitario_venta: 12.50,
    margen_ganancia: 85,
    activo: true,
  },
  {
    id: 3,
    codigo_interno: 'FERT-001',
    nombre_comercial: 'Fertilizante NPK 15-15-15',
    nombre_generico: 'Fertilizante compuesto',
    tipo_producto: 'Fertilizantes',
    categoria_cultivo: 'GENERAL',
    registro_senasa: 'SENASA-2024-003',
    notas_permanentes: 'Balanceado con micronutrientes',
    marca: 'AGROQUIM',
    unidad_medida: 'KG',
    stock_actual: 320,
    stock_minimo: 100,
    stock_maximo: 600,
    precio_unitario_compra: 2.20,
    precio_unitario_venta: 4.50,
    margen_ganancia: 104,
    activo: true,
  },
  {
    id: 4,
    codigo_interno: 'AGRO-001',
    nombre_comercial: 'Insecticida Orgánico 5L',
    nombre_generico: 'Piretrinas naturales',
    tipo_producto: 'Agroquímicos',
    categoria_cultivo: 'GENERAL',
    registro_senasa: 'SENASA-2024-004',
    notas_permanentes: 'Seguro para cultivos, aplicación cada 7 días',
    marca: 'BIOPEST',
    unidad_medida: 'LITRO',
    stock_actual: 45,
    stock_minimo: 50,
    stock_maximo: 200,
    precio_unitario_compra: 12.00,
    precio_unitario_venta: 22.50,
    margen_ganancia: 87,
    activo: true,
  },
  {
    id: 5,
    codigo_interno: 'HERM-001',
    nombre_comercial: 'Pala Agrícola Acero Reforzado',
    nombre_generico: 'Herramienta agrícola',
    tipo_producto: 'Herramientas',
    categoria_cultivo: 'GENERAL',
    registro_senasa: null,
    notas_permanentes: 'Garantía 2 años contra defectos de fabricación',
    marca: 'LABRADOOR',
    unidad_medida: 'UNIDAD',
    stock_actual: 12,
    stock_minimo: 5,
    stock_maximo: 30,
    precio_unitario_compra: 8.75,
    precio_unitario_venta: 18.00,
    margen_ganancia: 105,
    activo: true,
  },
  {
    id: 6,
    codigo_interno: 'SEMI-001',
    nombre_comercial: 'Semilla Maíz Hybrid H-2024',
    nombre_generico: 'Maíz híbrido',
    tipo_producto: 'Semillas',
    categoria_cultivo: 'MAIZ',
    registro_senasa: 'SENASA-2024-006',
    notas_permanentes: 'Alto rendimiento, resistente a sequía',
    marca: 'SYNGENTA',
    unidad_medida: 'KG',
    stock_actual: 250,
    stock_minimo: 100,
    stock_maximo: 500,
    precio_unitario_compra: 45.00,
    precio_unitario_venta: 85.00,
    margen_ganancia: 88,
    activo: true,
  },
  {
    id: 7,
    codigo_interno: 'AGRO-002',
    nombre_comercial: 'Fungicida Cobre 1kg',
    nombre_generico: 'Fungicida cúprico',
    tipo_producto: 'Agroquímicos',
    categoria_cultivo: 'GENERAL',
    registro_senasa: 'SENASA-2024-007',
    notas_permanentes: 'Efectivo contra oídio y mildiú',
    marca: 'CUPROGARD',
    unidad_medida: 'KG',
    stock_actual: 78,
    stock_minimo: 30,
    stock_maximo: 150,
    precio_unitario_compra: 15.50,
    precio_unitario_venta: 28.00,
    margen_ganancia: 80,
    activo: true,
  },
  {
    id: 8,
    codigo_interno: 'FERT-002',
    nombre_comercial: 'Sulfato de Potasio 25kg',
    nombre_generico: 'Nutriente potásico',
    tipo_producto: 'Fertilizantes',
    categoria_cultivo: 'PAPA',
    registro_senasa: 'SENASA-2024-008',
    notas_permanentes: 'Pureza 99%, aplicar en floración',
    marca: 'AGROQUIM',
    unidad_medida: 'KG',
    stock_actual: 180,
    stock_minimo: 75,
    stock_maximo: 350,
    precio_unitario_compra: 18.00,
    precio_unitario_venta: 32.50,
    margen_ganancia: 80,
    activo: true,
  },
];

const tipoProductoColors: Record<string, { bg: string; text: string; border: string }> = {
  'Semillas': { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' },
  'Fertilizantes': { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
  'Agroquímicos': { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' },
  'Herramientas': { bg: 'bg-slate-50', text: 'text-slate-700', border: 'border-slate-200' },
};

function getStockStatus(actual: number, minimo: number, maximo: number) {
  if (actual <= minimo) return { label: 'Bajo stock', color: 'text-red-600', dot: 'bg-red-600' };
  if (actual >= maximo * 0.8) return { label: 'Óptimo', color: 'text-emerald-600', dot: 'bg-emerald-600' };
  return { label: 'Normal', color: 'text-slate-600', dot: 'bg-slate-400' };
}

export default function Productos() {
  const [productos, setProductos] = useState(productosData);
  const [searchQuery, setSearchQuery] = useState('');
  const [tipoFiltro, setTipoFiltro] = useState<string | null>(null);
  const [categoriaFiltro, setCategoriaFiltro] = useState<string | null>(null);

  // Modal States
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<any>(null);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState({ title: '', message: '' });
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [selectedProducto, setSelectedProducto] = useState<any>(null);



  const productosFiltrados = productos.filter((p) => {
    const matchesSearch = p.nombre_comercial.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.codigo_interno.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.marca.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTipo = !tipoFiltro || p.tipo_producto === tipoFiltro;
    const matchesCategoria = !categoriaFiltro || p.categoria_cultivo === categoriaFiltro;
    return matchesSearch && matchesTipo && matchesCategoria;
  });

  const activos = productos.filter(p => p.activo).length;
  const stockTotal = productos.reduce((sum, p) => sum + p.stock_actual, 0);
  const bajoStock = productos.filter(p => p.stock_actual <= p.stock_minimo).length;
  const utilidadPotencial = productos.reduce((sum, p) => sum + ((p.precio_unitario_venta - p.precio_unitario_compra) * p.stock_actual), 0);

  const tiposUnicos = [...new Set(productos.map(p => p.tipo_producto))];
  const categoriasUnicas = [...new Set(productos.map(p => p.categoria_cultivo))];

  const handleDeleteProducto = () => {
    if (deleteTarget) {
      setProductos(productos.filter(p => p.id !== deleteTarget.id));
      setDeleteModalOpen(false);
      setSuccessMessage({
        title: 'Producto Eliminado',
        message: `${deleteTarget.nombre_comercial} ha sido eliminado exitosamente`,
      });
      setSuccessModalOpen(true);
      setDeleteTarget(null);
    }
  };

  const handleViewDetails = (producto: any) => {
    setSelectedProducto(producto);
    setDetailsModalOpen(true);
  };

  const handleOpenDeleteModal = (producto: any) => {
    setDeleteTarget(producto);
    setDeleteModalOpen(true);
  };


  
  const renderActions = (producto: any) => (
    <div className="flex items-center justify-center gap-2">
      <button
        title="Ver detalles"
        onClick={() => handleViewDetails(producto)}
        className="p-2 hover:bg-blue-100 rounded-lg transition-colors text-blue-600"
      >
        <Eye className="w-4 h-4" strokeWidth={2} />
      </button>
      <button title="Editar" className="p-2 hover:bg-amber-100 rounded-lg transition-colors text-amber-600">
        <Edit2 className="w-4 h-4" strokeWidth={2} />
      </button>
      <button
        title="Eliminar"
        onClick={() => handleOpenDeleteModal(producto)}
        className="p-2 hover:bg-red-100 rounded-lg transition-colors text-red-600"
      >
        <Trash2 className="w-4 h-4" strokeWidth={2} />
      </button>
    </div>
  );

  const columns = [
    { key: 'codigo_interno', label: 'Código', render: (val: any) => <span className="font-mono text-sm text-gray-600">{val}</span> },
    {
      key: 'nombre_comercial',
      label: 'Producto',
      render: (val: any, row: any) => (
        <div>
          <p className="font-medium text-gray-900 text-sm">{val}</p>
          <p className="text-xs text-gray-500">{row.marca}</p>
        </div>
      ),
    },
    {
      key: 'tipo_producto',
      label: 'Tipo',
      render: (val: any) => {
        const colors = tipoProductoColors[val] || tipoProductoColors['Herramientas'];
        return <span className={`inline-block px-2 py-1 rounded-md text-xs font-medium border ${colors.bg} ${colors.text} ${colors.border}`}>{val}</span>;
      },
    },
    {
      key: 'stock_actual',
      label: 'Stock',
      align: 'right' as const,
      render: (val: any, row: any) => {
        const status = getStockStatus(val, row.stock_minimo, row.stock_maximo);
        return (
          <div className="flex items-center justify-end gap-2">
            <span className={`w-2 h-2 rounded-full ${status.dot}`}></span>
            <span className="font-medium text-gray-900">{val}</span>
          </div>
        );
      },
    },
    { key: 'precio_unitario_venta', label: 'Precio Venta', align: 'right' as const, render: (val: any) => <span className="font-mono font-medium text-emerald-600 text-sm">${val.toFixed(2)}</span> },
    {
      key: 'registro_senasa',
      label: 'Registro SENASA',
      render: (val: any) => (
        <span className={`inline-block text-xs font-medium ${val ? 'text-emerald-600' : 'text-gray-400'}`}>
          {val ? '✓' : '—'}
        </span>
      ),
    },
  ];

  return (
    <div className="w-full min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white sticky top-0 z-10">
        <div className="px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-semibold text-gray-900">Productos</h1>
              <p className="text-gray-600 text-sm mt-1">Gestiona tu catálogo de productos agrícolas</p>
            </div>
            <button className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-semibold transition-all shadow-sm hover:shadow-md">
              <Plus className="w-5 h-5" strokeWidth={2} />
              Nuevo Producto
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-8 py-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* Productos Activos */}
          <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-500 text-xs font-semibold uppercase tracking-wide">Productos</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">{activos}</p>
                <p className="text-gray-500 text-xs mt-1">activos</p>
              </div>
              <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center flex-shrink-0">
                <Package className="w-5 h-5 text-emerald-600" strokeWidth={1.5} />
              </div>
            </div>
          </div>

          {/* Stock Total */}
          <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-500 text-xs font-semibold uppercase tracking-wide">Stock Total</p>
                <p className="text-2xl font-bold text-gray-900 mt-2 font-mono">{stockTotal.toLocaleString()}</p>
                <p className="text-gray-500 text-xs mt-1">unidades</p>
              </div>
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                <Package className="w-5 h-5 text-blue-600" strokeWidth={1.5} />
              </div>
            </div>
          </div>

          {/* Bajo Stock Alert */}
          <div className="bg-white border border-red-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-500 text-xs font-semibold uppercase tracking-wide">Bajo Stock</p>
                <p className="text-2xl font-bold text-red-600 mt-2">{bajoStock}</p>
                <p className="text-gray-500 text-xs mt-1">por reponer</p>
              </div>
              <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center flex-shrink-0">
                <AlertCircle className="w-5 h-5 text-red-600" strokeWidth={1.5} />
              </div>
            </div>
          </div>

          {/* Utilidad Potencial */}
          <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-500 text-xs font-semibold uppercase tracking-wide">Utilidad</p>
                <p className="text-2xl font-bold text-gray-900 mt-2 font-mono">${Math.round(utilidadPotencial).toLocaleString()}</p>
                <p className="text-gray-500 text-xs mt-1">potencial</p>
              </div>
              <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-5 h-5 text-amber-600" strokeWidth={1.5} />
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <FilterBar>
          <SearchInput
            placeholder="Buscar por código, nombre o marca..."
            value={searchQuery}
            onChange={setSearchQuery}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FilterGroup label="Por tipo">
              <>
                {tiposUnicos.map((tipo) => (
                  <FilterButton
                    key={tipo}
                    label={tipo}
                    active={tipoFiltro === tipo}
                    onClick={() => setTipoFiltro(tipoFiltro === tipo ? null : tipo)}
                  />
                ))}
              </>
            </FilterGroup>

            <FilterGroup label="Por categoría">
              <>
                {categoriasUnicas.map((cat) => (
                  <FilterButton
                    key={cat}
                    label={cat}
                    active={categoriaFiltro === cat}
                    onClick={() => setCategoriaFiltro(categoriaFiltro === cat ? null : cat)}
                  />
                ))}
              </>
            </FilterGroup>
          </div>
        </FilterBar>

        {/* Table */}
        <DataTable
          columns={columns}
          data={productosFiltrados}
          actions={renderActions}
          emptyMessage="No hay productos que coincidan con los criterios de búsqueda"
        />

        {/* Footer Stats */}
        <div className="mt-4 text-xs text-gray-500">
          Mostrando <span className="font-semibold text-gray-700">{productosFiltrados.length}</span> de <span className="font-semibold text-gray-700">{productos.length}</span> productos
        </div>
      </div>

      {/* Modals */}
      <DeleteConfirmModal
        open={deleteModalOpen}
        onOpenChange={setDeleteModalOpen}
        onConfirm={handleDeleteProducto}
        itemName={deleteTarget?.nombre_comercial || ''}
        itemType="Producto"
      />

      <SuccessModal
        open={successModalOpen}
        onOpenChange={setSuccessModalOpen}
        title={successMessage.title}
        message={successMessage.message}
      />

      <DetailsModal
        open={detailsModalOpen}
        onOpenChange={setDetailsModalOpen}
        title="Detalles del Producto"
        data={selectedProducto}
        fields={[
          { label: 'Código', key: 'codigo_interno' },
          { label: 'Nombre Comercial', key: 'nombre_comercial' },
          { label: 'Marca', key: 'marca' },
          { label: 'Tipo', key: 'tipo_producto' },
          { label: 'Stock Actual', key: 'stock_actual' },
          { label: 'Stock Mínimo', key: 'stock_minimo' },
          { label: 'Stock Máximo', key: 'stock_maximo' },
          { label: 'Precio Venta', key: 'precio_unitario_venta' },
          { label: 'Registro SENASA', key: 'registro_senasa' },
        ]}
      />
    </div>
  );
}
