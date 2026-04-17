'use client';

import { ArrowUpRight, ArrowDownLeft, Plus, Scale, Eye, Edit2, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { SearchInput, FilterButton, FilterGroup, FilterBar } from '@/components/filters';
import { DataTable } from '@/components/data-table';
import { DeleteConfirmModal, SuccessModal, DetailsModal } from '@/components/crud-modal';

const transaccionesData = [
  {
    id: 'TRX-001',
    tipo: 'VENTA',
    cliente: 'Empresa Exportadora XYZ S.A.',
    producto: 'Nuez de Brasil - Barrica',
    cantidad: 50,
    total: 12500,
    fecha: '2024-06-15',
    hora: '10:30 AM',
    estado: 'completada',
  },
  {
    id: 'TRX-002',
    tipo: 'COMPRA',
    cliente: 'Proveedor Amazonas S.A.',
    producto: 'Nuez de Brasil - Lata',
    cantidad: 200,
    total: 8200,
    fecha: '2024-06-14',
    hora: '02:15 PM',
    estado: 'completada',
  },
  {
    id: 'TRX-003',
    tipo: 'VENTA',
    cliente: 'Distribuidora del Sur',
    producto: 'Nuez de Brasil - Barrica',
    cantidad: 27,
    total: 6750,
    fecha: '2024-06-13',
    hora: '11:45 AM',
    estado: 'completada',
  },
  {
    id: 'TRX-004',
    tipo: 'COMPRA',
    cliente: 'Productor Local José Martínez',
    producto: 'Nuez de Brasil - Lata',
    cantidad: 110,
    total: 4510,
    fecha: '2024-06-12',
    hora: '03:20 PM',
    estado: 'pendiente',
  },
  {
    id: 'TRX-005',
    tipo: 'VENTA',
    cliente: 'Comerciante Independiente',
    producto: 'Nuez de Brasil - Lata',
    cantidad: 50,
    total: 2050,
    fecha: '2024-06-11',
    hora: '09:10 AM',
    estado: 'completada',
  },
];

export default function Transacciones() {
  const [transacciones, setTransacciones] = useState(transaccionesData);
  const [filtro, setFiltro] = useState('TODAS');
  const [busqueda, setBusqueda] = useState('');

  // Modal States
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<any>(null);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState({ title: '', message: '' });
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [selectedTransaccion, setSelectedTransaccion] = useState<any>(null);

  const transaccionesFiltradas = transacciones
    .filter((t) => (filtro === 'TODAS' ? true : t.tipo === filtro))
    .filter((t) => 
      t.cliente.toLowerCase().includes(busqueda.toLowerCase()) ||
      t.id.toLowerCase().includes(busqueda.toLowerCase())
    );

  const totalVentas = transacciones
    .filter((t) => t.tipo === 'VENTA')
    .reduce((sum, t) => sum + t.total, 0);

  const totalCompras = transacciones
    .filter((t) => t.tipo === 'COMPRA')
    .reduce((sum, t) => sum + t.total, 0);

  const balance = totalVentas - totalCompras;
  const ventasCount = transacciones.filter((t) => t.tipo === 'VENTA').length;
  const comprasCount = transacciones.filter((t) => t.tipo === 'COMPRA').length;

  const handleDeleteTransaccion = () => {
    if (deleteTarget) {
      setTransacciones(transacciones.filter(t => t.id !== deleteTarget.id));
      setDeleteModalOpen(false);
      setSuccessMessage({
        title: 'Transacción Eliminada',
        message: `La transacción ${deleteTarget.id} ha sido eliminada exitosamente`,
      });
      setSuccessModalOpen(true);
      setDeleteTarget(null);
    }
  };

  const handleViewDetails = (transaccion: any) => {
    setSelectedTransaccion(transaccion);
    setDetailsModalOpen(true);
  };

  const handleOpenDeleteModal = (transaccion: any) => {
    setDeleteTarget(transaccion);
    setDeleteModalOpen(true);
  };

  const renderActions = (transaccion: any) => (
    <div className="flex items-center justify-center gap-2">
      <button
        title="Ver detalles"
        onClick={() => handleViewDetails(transaccion)}
        className="p-2 hover:bg-blue-100 rounded-lg transition-colors text-blue-600"
      >
        <Eye className="w-4 h-4" strokeWidth={2} />
      </button>
      <button title="Editar" className="p-2 hover:bg-amber-100 rounded-lg transition-colors text-amber-600">
        <Edit2 className="w-4 h-4" strokeWidth={2} />
      </button>
      <button
        title="Eliminar"
        onClick={() => handleOpenDeleteModal(transaccion)}
        className="p-2 hover:bg-red-100 rounded-lg transition-colors text-red-600"
      >
        <Trash2 className="w-4 h-4" strokeWidth={2} />
      </button>
    </div>
  );

  const columns = [
    { key: 'id', label: 'ID', render: (val: any) => <span className="font-mono text-sm text-gray-600">{val}</span> },
    {
      key: 'tipo',
      label: 'Tipo',
      render: (val: any) => (
        <div className="inline-flex items-center gap-2">
          {val === 'VENTA' ? <ArrowUpRight className="w-4 h-4 text-emerald-600" /> : <ArrowDownLeft className="w-4 h-4 text-blue-600" />}
          <span className={`text-sm font-medium ${val === 'VENTA' ? 'text-emerald-700' : 'text-blue-700'}`}>{val}</span>
        </div>
      ),
    },
    { key: 'cliente', label: 'Cliente/Proveedor' },
    { key: 'producto', label: 'Producto' },
    { key: 'cantidad', label: 'Cantidad', align: 'right' as const, render: (val: any) => <span className="font-mono">{val}</span> },
    { key: 'total', label: 'Total', align: 'right' as const, render: (val: any) => <span className="font-mono font-medium text-gray-900">${val.toLocaleString()}</span> },
    {
      key: 'estado',
      label: 'Estado',
      render: (val: any) => (
        <span className={`inline-block px-2.5 py-1 rounded-md text-xs font-semibold ${val === 'completada' ? 'bg-emerald-100 text-emerald-700' : 'bg-yellow-100 text-yellow-700'}`}>
          {val === 'completada' ? 'Completada' : 'Pendiente'}
        </span>
      ),
    },
    {
      key: 'fecha',
      label: 'Fecha',
      render: (val: any, row: any) => (
        <div className="text-sm">
          <div className="font-medium text-gray-900">{val}</div>
          <div className="text-gray-500 text-xs">{row.hora}</div>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full min-h-screen bg-white">
      <div className="border-b border-gray-200 bg-white sticky top-0 z-10">
        <div className="px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-semibold text-gray-900">Transacciones</h1>
              <p className="text-gray-600 text-sm mt-1">Registro de compras y ventas de productos</p>
            </div>
            <button className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-semibold transition-all shadow-sm hover:shadow-md">
              <Plus className="w-5 h-5" strokeWidth={2} />
              Nueva Transacción
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-8 py-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Total Ventas */}
          <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-500 text-xs font-semibold uppercase tracking-wide">Total Ventas</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">${totalVentas.toLocaleString()}</p>
                <p className="text-gray-500 text-xs mt-1">{ventasCount} operaciones</p>
              </div>
              <div className="bg-emerald-50 p-2.5 rounded-lg flex-shrink-0">
                <ArrowUpRight className="w-4 h-4 text-emerald-600" strokeWidth={2} />
              </div>
            </div>
          </div>

          {/* Total Compras */}
          <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-500 text-xs font-semibold uppercase tracking-wide">Total Compras</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">${totalCompras.toLocaleString()}</p>
                <p className="text-gray-500 text-xs mt-1">{comprasCount} operaciones</p>
              </div>
              <div className="bg-blue-50 p-2.5 rounded-lg flex-shrink-0">
                <ArrowDownLeft className="w-4 h-4 text-blue-600" strokeWidth={2} />
              </div>
            </div>
          </div>

          {/* Balance Neto */}
          <div className={`rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow ${balance >= 0 ? 'bg-white border border-gray-200' : 'bg-red-50 border border-red-200'}`}>
            <div className="flex items-start justify-between">
              <div>
                <p className={`text-xs font-semibold uppercase tracking-wide ${balance >= 0 ? 'text-gray-500' : 'text-red-600'}`}>Balance Neto</p>
                <p className={`text-2xl font-bold mt-2 ${balance >= 0 ? 'text-gray-900' : 'text-red-600'}`}>
                  {balance >= 0 ? '+' : ''} ${balance.toLocaleString()}
                </p>
                <p className={`text-xs mt-1 ${balance >= 0 ? 'text-gray-500' : 'text-red-600'}`}>{ventasCount + comprasCount} operaciones</p>
              </div>
              <div className={`p-2.5 rounded-lg flex-shrink-0 ${balance >= 0 ? 'bg-emerald-50' : 'bg-red-100'}`}>
                <Scale className={`w-4 h-4 ${balance >= 0 ? 'text-emerald-600' : 'text-red-600'}`} strokeWidth={2} />
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <FilterBar>
          <SearchInput
            placeholder="Buscar por cliente, ID o producto..."
            value={busqueda}
            onChange={setBusqueda}
          />

          <FilterGroup label="Por tipo">
            <>
              {['TODAS', 'VENTA', 'COMPRA'].map((tipo) => (
                <FilterButton
                  key={tipo}
                  label={tipo === 'TODAS' ? 'Todas' : tipo === 'VENTA' ? 'Ventas' : 'Compras'}
                  active={filtro === tipo}
                  onClick={() => setFiltro(tipo)}
                  icon={
                    tipo === 'VENTA' ? <ArrowUpRight className="w-4 h-4" /> :
                    tipo === 'COMPRA' ? <ArrowDownLeft className="w-4 h-4" /> :
                    undefined
                  }
                />
              ))}
            </>
          </FilterGroup>
        </FilterBar>

        {/* Table */}
        <DataTable
          columns={columns}
          data={transaccionesFiltradas}
          actions={renderActions}
          emptyMessage="No hay transacciones que coincidan con los criterios de búsqueda"
        />

        {/* Footer Stats */}
        <div className="mt-4 text-xs text-gray-500">
          Mostrando <span className="font-semibold text-gray-700">{transaccionesFiltradas.length}</span> de <span className="font-semibold text-gray-700">{transacciones.length}</span> transacciones
        </div>
      </div>

      {/* Modals */}
      <DeleteConfirmModal
        open={deleteModalOpen}
        onOpenChange={setDeleteModalOpen}
        onConfirm={handleDeleteTransaccion}
        itemName={deleteTarget?.id || ''}
        itemType="Transacción"
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
        title="Detalles de la Transacción"
        data={selectedTransaccion}
        fields={[
          { label: 'ID', key: 'id' },
          { label: 'Tipo', key: 'tipo' },
          { label: 'Cliente/Proveedor', key: 'cliente' },
          { label: 'Producto', key: 'producto' },
          { label: 'Cantidad', key: 'cantidad' },
          { label: 'Total', key: 'total' },
          { label: 'Fecha', key: 'fecha' },
          { label: 'Hora', key: 'hora' },
          { label: 'Estado', key: 'estado' },
        ]}
      />
    </div>
  );
}
