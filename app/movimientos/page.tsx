'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import {
  Plus,
  ArrowUpRight,
  ArrowDownLeft,
  Search,
  Calendar,
  Filter,
  TrendingUp,
  TrendingDown,
  Clock,
  FileText,
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

  // Stats
  const stats = useMemo(() => {
    const entradas = movements.filter(m => m.type === 'ENTRADA').length;
    const salidas = movements.filter(m => m.type === 'SALIDA').length;
    const today = movements.filter(m => m.date.includes('15 Abr')).length;
    return { entradas, salidas, today, total: movements.length };
  }, []);

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
    const selectedProduct = products.find(p => p.id === formData.productId);
    toast.success(`${formData.type === 'ENTRADA' ? 'Entrada' : 'Salida'} registrada`, {
      description: `${formData.quantity} unidades de ${selectedProduct?.name || 'producto'}`,
    });
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
      <header className="sticky top-0 z-20 backdrop-blur-xl bg-background/80 border-b border-border">
        <div className="px-8 py-5">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Movimientos</h1>
              <p className="text-sm text-muted-foreground mt-0.5">
                Registro de entradas y salidas de inventario
              </p>
            </div>
            <motion.button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-semibold shadow-lg shadow-primary/25 btn-premium"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Plus className="w-4 h-4" />
              Nuevo Movimiento
            </motion.button>
          </div>
        </div>
      </header>

      <div className="p-8">
        {/* Stats */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="card-premium p-5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Entradas</p>
                <p className="text-3xl font-bold text-foreground">{stats.entradas}</p>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="card-premium p-5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-rose-500/10 flex items-center justify-center">
                <TrendingDown className="w-6 h-6 text-rose-600" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Salidas</p>
                <p className="text-3xl font-bold text-foreground">{stats.salidas}</p>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="card-premium p-5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Hoy</p>
                <p className="text-3xl font-bold text-foreground">{stats.today}</p>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="card-premium p-5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-violet-500/10 flex items-center justify-center">
                <FileText className="w-6 h-6 text-violet-600" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Total</p>
                <p className="text-3xl font-bold text-foreground">{stats.total}</p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Filters */}
        <motion.div
          className="card-premium p-5 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Buscar por producto, ID o responsable..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-premium pl-12"
              />
            </div>

            {/* Type Filter */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-muted/50">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Tipo:</span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setFilterType('Todos')}
                  className={`chip ${
                    filterType === 'Todos' ? 'chip-active' : 'chip-inactive'
                  }`}
                >
                  Todos
                </button>
                <button
                  onClick={() => setFilterType('ENTRADA')}
                  className={`chip ${
                    filterType === 'ENTRADA'
                      ? 'bg-emerald-600 text-white'
                      : 'chip-inactive'
                  }`}
                >
                  <ArrowDownLeft className="w-3.5 h-3.5 mr-1" />
                  Entradas
                </button>
                <button
                  onClick={() => setFilterType('SALIDA')}
                  className={`chip ${
                    filterType === 'SALIDA'
                      ? 'bg-rose-600 text-white'
                      : 'chip-inactive'
                  }`}
                >
                  <ArrowUpRight className="w-3.5 h-3.5 mr-1" />
                  Salidas
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Movements Table */}
        <motion.div
          className="card-premium overflow-hidden"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.3 }}
        >
          <div className="overflow-x-auto scrollbar-thin">
            <table className="table-premium">
              <thead>
                <tr className="bg-muted/30">
                  <th>ID</th>
                  <th>Tipo</th>
                  <th>Producto</th>
                  <th>Cantidad</th>
                  <th>Motivo</th>
                  <th>Parcela</th>
                  <th>Fecha</th>
                  <th>Responsable</th>
                  <th>Referencia</th>
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
                    >
                      <td>
                        <span className="font-mono text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                          {movement.id}
                        </span>
                      </td>
                      <td>
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold ${
                            movement.type === 'ENTRADA'
                              ? 'badge-entrada'
                              : 'badge-salida'
                          }`}
                        >
                          {movement.type === 'ENTRADA' ? (
                            <ArrowDownLeft className="w-3.5 h-3.5" />
                          ) : (
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          )}
                          {movement.type}
                        </span>
                      </td>
                      <td>
                        <div>
                          <p className="font-semibold text-foreground">{movement.productName}</p>
                          <span
                            className="inline-flex px-2 py-0.5 rounded-lg text-[10px] font-medium mt-0.5"
                            style={{
                              backgroundColor: `${getCategoryColor(movement.category)}15`,
                              color: getCategoryColor(movement.category),
                            }}
                          >
                            {movement.category}
                          </span>
                        </div>
                      </td>
                      <td>
                        <span className="font-bold text-foreground tabular-nums">{movement.quantity}</span>
                        <span className="text-muted-foreground ml-1">{movement.unit}</span>
                      </td>
                      <td className="text-muted-foreground">
                        {movement.reason}
                      </td>
                      <td className="text-muted-foreground">
                        {movement.parcel || <span className="text-muted-foreground/50">-</span>}
                      </td>
                      <td>
                        <span className="text-sm text-muted-foreground">{movement.date}</span>
                      </td>
                      <td className="font-medium text-foreground">
                        {movement.responsible}
                      </td>
                      <td>
                        {movement.reference ? (
                          <span className="font-mono text-xs text-primary bg-primary/10 px-2 py-1 rounded">
                            {movement.reference}
                          </span>
                        ) : (
                          <span className="text-muted-foreground/50">-</span>
                        )}
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>

          {filteredMovements.length === 0 && (
            <div className="text-center py-16">
              <div className="w-16 h-16 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
                <FileText className="w-8 h-8 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground font-medium">No se encontraron movimientos</p>
              <p className="text-sm text-muted-foreground/70 mt-1">Intenta ajustar los filtros de búsqueda</p>
            </div>
          )}
        </motion.div>
      </div>

      {/* New Movement Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-lg p-0 overflow-hidden">
          <DialogHeader className="p-6 pb-4 border-b border-border">
            <DialogTitle className="flex items-center gap-3 text-xl">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                formData.type === 'ENTRADA' ? 'bg-emerald-500/10' : 'bg-rose-500/10'
              }`}>
                {formData.type === 'ENTRADA' ? (
                  <ArrowDownLeft className="w-5 h-5 text-emerald-600" />
                ) : (
                  <ArrowUpRight className="w-5 h-5 text-rose-600" />
                )}
              </div>
              Nuevo Movimiento
            </DialogTitle>
            <DialogDescription>
              Registra una entrada o salida de inventario
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {/* Movement Type Toggle */}
            <div>
              <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                Tipo de Movimiento
              </label>
              <div className="grid grid-cols-2 gap-3">
                <motion.button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, type: 'ENTRADA' }))}
                  className={`flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl font-semibold transition-all ${
                    formData.type === 'ENTRADA'
                      ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/25'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <ArrowDownLeft className="w-5 h-5" />
                  ENTRADA
                </motion.button>
                <motion.button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, type: 'SALIDA' }))}
                  className={`flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl font-semibold transition-all ${
                    formData.type === 'SALIDA'
                      ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/25'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <ArrowUpRight className="w-5 h-5" />
                  SALIDA
                </motion.button>
              </div>
            </div>

            {/* Product Select */}
            <div>
              <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                Producto
              </label>
              <select
                name="productId"
                value={formData.productId}
                onChange={handleInputChange}
                className="select-premium"
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
                <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  Cantidad
                </label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  placeholder="0"
                  min="1"
                  className="input-premium"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  Fecha
                </label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="input-premium pl-12"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Reason (for SALIDA) */}
            <AnimatePresence>
              {formData.type === 'SALIDA' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                    Motivo
                  </label>
                  <select
                    name="reason"
                    value={formData.reason}
                    onChange={handleInputChange}
                    className="select-premium"
                  >
                    {reasons.map((reason) => (
                      <option key={reason} value={reason}>
                        {reason}
                      </option>
                    ))}
                  </select>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Parcel & Responsible */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  Parcela / Área
                </label>
                <input
                  type="text"
                  name="parcel"
                  value={formData.parcel}
                  onChange={handleInputChange}
                  placeholder="Ej: Parcela Norte A"
                  className="input-premium"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  Responsable
                </label>
                <input
                  type="text"
                  name="responsible"
                  value={formData.responsible}
                  onChange={handleInputChange}
                  placeholder="Nombre"
                  className="input-premium"
                  required
                />
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                Notas
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                placeholder="Observaciones adicionales..."
                rows={2}
                className="input-premium resize-none"
              />
            </div>

            {/* Form Actions */}
            <div className="flex gap-3 pt-4 border-t border-border">
              <motion.button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="flex-1 px-4 py-3 border border-border rounded-xl text-sm font-semibold text-foreground hover:bg-muted transition-colors"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                Cancelar
              </motion.button>
              <motion.button
                type="submit"
                className={`flex-1 px-4 py-3 rounded-xl text-sm font-semibold text-white shadow-lg btn-premium ${
                  formData.type === 'ENTRADA'
                    ? 'bg-emerald-600 shadow-emerald-600/25'
                    : 'bg-rose-600 shadow-rose-600/25'
                }`}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                Registrar {formData.type === 'ENTRADA' ? 'Entrada' : 'Salida'}
              </motion.button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
