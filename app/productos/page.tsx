'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  Eye,
  Edit,
  Package,
  X,
} from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import {
  products,
  formatCurrency,
  getCategoryColor,
  getStatusInfo,
  type ProductCategory,
} from '@/lib/data';

const categories: ProductCategory[] = ['Semillas', 'Fertilizantes', 'Agroquímicos', 'Herramientas'];
const units = ['kg', 'litros', 'unidades', 'sacos'];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function ProductosPage() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    brand: '',
    category: 'Semillas' as ProductCategory,
    unit: 'kg',
    initialStock: '',
    minStock: '',
    unitPrice: '',
    senasaRegistration: '',
    hasSenasa: false,
    notes: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const getCategoryPrefix = (category: ProductCategory) => {
    const prefixes: Record<ProductCategory, string> = {
      'Semillas': 'SEMI',
      'Fertilizantes': 'FERT',
      'Agroquímicos': 'AGRO',
      'Herramientas': 'HERM',
    };
    return prefixes[category];
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    setIsSheetOpen(false);
    setFormData({
      code: '',
      name: '',
      brand: '',
      category: 'Semillas',
      unit: 'kg',
      initialStock: '',
      minStock: '',
      unitPrice: '',
      senasaRegistration: '',
      hasSenasa: false,
      notes: '',
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card px-6 py-5">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Productos</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Catálogo de insumos y herramientas agrícolas
            </p>
          </div>
          <button
            onClick={() => setIsSheetOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Nuevo Producto
          </button>
        </div>
      </header>

      <div className="p-6">
        {/* Product Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {products.map((product) => {
            const statusInfo = getStatusInfo(product.status);
            const stockPercentage = Math.min((product.stock / (product.minStock * 3)) * 100, 100);

            return (
              <motion.div
                key={product.id}
                variants={cardVariants}
                className="bg-card rounded-xl border border-border shadow-card overflow-hidden hover:shadow-soft transition-shadow"
              >
                {/* Category color stripe */}
                <div
                  className="h-1.5"
                  style={{ backgroundColor: getCategoryColor(product.category) }}
                />

                <div className="p-5">
                  {/* Category Badge */}
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className="inline-flex px-2.5 py-1 rounded-full text-xs font-medium"
                      style={{
                        backgroundColor: `${getCategoryColor(product.category)}15`,
                        color: getCategoryColor(product.category),
                      }}
                    >
                      {product.category}
                    </span>
                    <span className="font-mono text-xs text-muted-foreground">
                      {product.code}
                    </span>
                  </div>

                  {/* Product Info */}
                  <h3 className="font-semibold text-foreground text-base mb-1 line-clamp-2">
                    {product.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">{product.brand}</p>

                  {/* Stock Progress */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-sm mb-1.5">
                      <span className="text-muted-foreground">Stock</span>
                      <span className="font-semibold text-foreground">
                        {product.stock} {product.unit}
                      </span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{
                          backgroundColor:
                            product.status === 'Agotado'
                              ? '#EF4444'
                              : product.status === 'Bajo'
                              ? '#F59E0B'
                              : '#22C55E',
                        }}
                        initial={{ width: 0 }}
                        animate={{ width: `${stockPercentage}%` }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Mínimo: {product.minStock} {product.unit}
                    </p>
                  </div>

                  {/* Status and Price */}
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${statusInfo.bgColor} ${statusInfo.color} ${statusInfo.borderColor}`}
                    >
                      {product.status}
                    </span>
                    <span className="font-semibold text-foreground">
                      {formatCurrency(product.unitPrice)}
                      <span className="text-xs text-muted-foreground font-normal">/{product.unit}</span>
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 pt-3 border-t border-border">
                    <button className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors">
                      <Eye className="w-4 h-4" />
                      Ver
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors">
                      <Edit className="w-4 h-4" />
                      Editar
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* New Product Sheet */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent side="right" className="w-full sm:max-w-lg overflow-y-auto">
          <SheetHeader className="border-b border-border pb-4">
            <SheetTitle className="flex items-center gap-2 text-lg">
              <Package className="w-5 h-5 text-primary" />
              Nuevo Producto
            </SheetTitle>
            <SheetDescription>
              Agrega un nuevo producto al catálogo de inventario
            </SheetDescription>
          </SheetHeader>

          <form onSubmit={handleSubmit} className="p-4 space-y-5">
            {/* Category & Auto Code */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1.5">
                  Categoría
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1.5">
                  Código
                </label>
                <div className="flex items-center gap-1 px-3 py-2 border border-border rounded-lg bg-muted/50 text-sm">
                  <span className="font-mono text-muted-foreground">
                    {getCategoryPrefix(formData.category)}-
                  </span>
                  <input
                    type="text"
                    name="code"
                    value={formData.code}
                    onChange={handleInputChange}
                    placeholder="001"
                    className="flex-1 bg-transparent focus:outline-none font-mono"
                  />
                </div>
              </div>
            </div>

            {/* Product Name */}
            <div>
              <label className="block text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1.5">
                Nombre del Producto
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Ej: Semilla Maíz Hybrid H-2024"
                className="w-full px-3 py-2 border border-border rounded-lg bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                required
              />
            </div>

            {/* Brand */}
            <div>
              <label className="block text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1.5">
                Marca / Proveedor
              </label>
              <input
                type="text"
                name="brand"
                value={formData.brand}
                onChange={handleInputChange}
                placeholder="Ej: Syngenta"
                className="w-full px-3 py-2 border border-border rounded-lg bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>

            {/* Unit & Price */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1.5">
                  Unidad de Medida
                </label>
                <select
                  name="unit"
                  value={formData.unit}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                >
                  {units.map((unit) => (
                    <option key={unit} value={unit}>
                      {unit}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1.5">
                  Precio Unitario (S/.)
                </label>
                <input
                  type="number"
                  name="unitPrice"
                  value={formData.unitPrice}
                  onChange={handleInputChange}
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  required
                />
              </div>
            </div>

            {/* Stock */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1.5">
                  Stock Inicial
                </label>
                <input
                  type="number"
                  name="initialStock"
                  value={formData.initialStock}
                  onChange={handleInputChange}
                  placeholder="0"
                  min="0"
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1.5">
                  Stock Mínimo (Alerta)
                </label>
                <input
                  type="number"
                  name="minStock"
                  value={formData.minStock}
                  onChange={handleInputChange}
                  placeholder="0"
                  min="0"
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  required
                />
              </div>
            </div>

            {/* SENASA Registration */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="hasSenasa"
                  id="hasSenasa"
                  checked={formData.hasSenasa}
                  onChange={handleInputChange}
                  className="w-4 h-4 rounded border-border text-primary focus:ring-primary/20"
                />
                <label htmlFor="hasSenasa" className="text-sm text-foreground">
                  Tiene registro SENASA
                </label>
              </div>
              {formData.hasSenasa && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <input
                    type="text"
                    name="senasaRegistration"
                    value={formData.senasaRegistration}
                    onChange={handleInputChange}
                    placeholder="Ej: SENASA-2024-001"
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </motion.div>
              )}
            </div>

            {/* Notes */}
            <div>
              <label className="block text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1.5">
                Notas
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                placeholder="Observaciones adicionales..."
                rows={3}
                className="w-full px-3 py-2 border border-border rounded-lg bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
              />
            </div>

            {/* Form Actions */}
            <div className="flex gap-3 pt-4 border-t border-border">
              <button
                type="button"
                onClick={() => setIsSheetOpen(false)}
                className="flex-1 px-4 py-2.5 border border-border rounded-lg text-sm font-medium text-foreground hover:bg-muted transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                Guardar Producto
              </button>
            </div>
          </form>
        </SheetContent>
      </Sheet>
    </div>
  );
}
