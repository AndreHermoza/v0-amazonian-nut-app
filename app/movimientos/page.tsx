'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  ArrowUpRight,
  ArrowDownLeft,
  Search,
  Calendar,
  Filter,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  movements,
  products,
  getCategoryColor,
  type MovementType,
} from '@/lib/data';

const reasons = ['Uso en campo', 'Venta', 'Merma', 'Compra proveedor', 'Devolución', 'Otro'];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

export default function MovimientosPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterType, setFilterType] = useState<MovementType | 'Todos'>('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [formData, setFormData] = useState({
    type: 'ENTRADA' as MovementType,
    productId: '',
    quantity: '',
    reason: 'Uso en campo',
    parcel: '',
    responsible: '',
    date: new Date().toISOString().split('T')[0],
    notes: '',
  });

  const filteredMovements = useMemo(() => {
    let filtered = [...movements];

    if (filterType !== 'Todos') {
      filtered = filtered.filter(m => m.type === filterType);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        m =>
          m.productName.toLowerCase().includes(query) ||
          m.id.toLowerCase().includes(query) ||
          m.responsible.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [filterType, searchQuery]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsModalOpen(false);
    setFormData({
      type: 'ENTRADA',
      productId: '',
      quantity: '',
      reason: 'Uso en campo',
      parcel: '',
      responsible: '',
      date: new Date().toISOString().split('T')[0],
      notes: '',
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card px-6 py-5">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Movimientos</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Registro de entradas y salidas de inventario
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Nuevo Movimiento
          </button>
        </div>
      </header>

      <div className="p-6">
        {/* Filters */}
        <motion.div
          className="bg-card rounded-xl p-4 border border-border shadow-card mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex flex-wrap items-center gap-4">
            {/* Search */}
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Buscar por producto, ID o responsable..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm"
              />
            </div>

            {/* Type Filter */}
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <div className="flex gap-1">
                <button
                  onClick={() => setFilterType('Todos')}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    filterType === 'Todos'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  Todos
                </button>
                <button
                  onClick={() => setFilterType('ENTRADA')}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    filterType === 'ENTRADA'
                      ? 'bg-green-600 text-white'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  Entradas
                </button>
                <button
                  onClick={() => setFilterType('SALIDA')}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    filterType === 'SALIDA'
                      ? 'bg-red-600 text-white'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  Salidas
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Movements Table */}
        <motion.div
          className="bg-card rounded-xl border border-border shadow-card overflow-hidden"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="text-left py-3 px-4 font-semibold text-muted-foreground text-xs uppercase tracking-wide">
                    ID
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-muted-foreground text-xs uppercase tracking-wide">
                    Tipo
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-muted-foreground text-xs uppercase tracking-wide">
                    Producto
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-muted-foreground text-xs uppercase tracking-wide">
                    Cantidad
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-muted-foreground text-xs uppercase tracking-wide">
                    Motivo
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-muted-foreground text-xs uppercase tracking-wide">
                    Parcela
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-muted-foreground text-xs uppercase tracking-wide">
                    Fecha
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-muted-foreground text-xs uppercase tracking-wide">
                    Responsable
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-muted-foreground text-xs uppercase tracking-wide">
                    Referencia
                  </th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence mode="popLayout">
                  {filteredMovements.map((movement) => (
                    <motion.tr
                      key={movement.id}
                      variants={itemVariants}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="border-b border-border/50 hover:bg-green-50/30 transition-colors"
                    >
                      <td className="py-3 px-4">
                        <span className="font-mono text-xs text-muted-foreground">
                          {movement.id}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${
                            movement.type === 'ENTRADA'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-red-100 text-red-700'
                          }`}
                        >
                          {movement.type === 'ENTRADA' ? (
                            <ArrowDownLeft className="w-3 h-3" />
                          ) : (
                            <ArrowUpRight className="w-3 h-3" />
                          )}
                          {movement.type}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div>
                          <p className="font-medium text-foreground">{movement.productName}</p>
                          <span
                            className="inline-flex px-1.5 py-0.5 rounded text-xs"
                            style={{
                              backgroundColor: `${getCategoryColor(movement.category)}15`,
                              color: getCategoryColor(movement.category),
                            }}
                          >
                            {movement.category}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-foreground">
                        <span className="font-semibold">{movement.quantity}</span>{' '}
                        <span className="text-muted-foreground">{movement.unit}</span>
                      </td>
                      <td className="py-3 px-4 text-muted-foreground">
                        {movement.reason}
                      </td>
                      <td className="py-3 px-4 text-muted-foreground">
                        {movement.parcel || '-'}
                      </td>
                      <td className="py-3 px-4 text-muted-foreground text-xs">
                        {movement.date}
                      </td>
                      <td className="py-3 px-4 text-foreground">
                        {movement.responsible}
                      </td>
                      <td className="py-3 px-4">
                        {movement.reference ? (
                          <span className="font-mono text-xs text-primary">
                            {movement.reference}
                          </span>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>

          {filteredMovements.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No se encontraron movimientos</p>
            </div>
          )}
        </motion.div>
      </div>

      {/* New Movement Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Nuevo Movimiento</DialogTitle>
            <DialogDescription>
              Registra una entrada o salida de inventario
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-5 mt-4">
            {/* Movement Type Toggle */}
            <div>
              <label className="block text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
                Tipo de Movimiento
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, type: 'ENTRADA' }))}
                  className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all ${
                    formData.type === 'ENTRADA'
                      ? 'bg-green-600 text-white shadow-md'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  <ArrowDownLeft className="w-5 h-5" />
                  ENTRADA
                </button>
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, type: 'SALIDA' }))}
                  className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all ${
                    formData.type === 'SALIDA'
                      ? 'bg-red-600 text-white shadow-md'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  <ArrowUpRight className="w-5 h-5" />
                  SALIDA
                </button>
              </div>
            </div>

            {/* Product Select */}
            <div>
              <label className="block text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1.5">
                Producto
              </label>
              <select
                name="productId"
                value={formData.productId}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-border rounded-lg bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                required
              >
                <option value="">Seleccionar producto...</option>
                {products.map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.code} - {product.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Quantity & Date */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1.5">
                  Cantidad
                </label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  placeholder="0"
                  min="1"
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1.5">
                  Fecha
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="w-full pl-9 pr-3 py-2 border border-border rounded-lg bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Reason (for SALIDA) */}
            {formData.type === 'SALIDA' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <label className="block text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1.5">
                  Motivo
                </label>
                <select
                  name="reason"
                  value={formData.reason}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                >
                  {reasons.map((reason) => (
                    <option key={reason} value={reason}>
                      {reason}
                    </option>
                  ))}
                </select>
              </motion.div>
            )}

            {/* Parcel & Responsible */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1.5">
                  Parcela / Área (opcional)
                </label>
                <input
                  type="text"
                  name="parcel"
                  value={formData.parcel}
                  onChange={handleInputChange}
                  placeholder="Ej: Parcela Norte A"
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1.5">
                  Responsable
                </label>
                <input
                  type="text"
                  name="responsible"
                  value={formData.responsible}
                  onChange={handleInputChange}
                  placeholder="Nombre del responsable"
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  required
                />
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1.5">
                Notas (opcional)
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                placeholder="Observaciones adicionales..."
                rows={2}
                className="w-full px-3 py-2 border border-border rounded-lg bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
              />
            </div>

            {/* Form Actions */}
            <div className="flex gap-3 pt-4 border-t border-border">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="flex-1 px-4 py-2.5 border border-border rounded-lg text-sm font-medium text-foreground hover:bg-muted transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className={`flex-1 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  formData.type === 'ENTRADA'
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : 'bg-red-600 text-white hover:bg-red-700'
                }`}
              >
                Registrar {formData.type === 'ENTRADA' ? 'Entrada' : 'Salida'}
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
