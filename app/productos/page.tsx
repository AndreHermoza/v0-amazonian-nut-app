'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import {
  Plus,
  Eye,
  Edit,
  Package,
  Search,
  Grid3X3,
  List,
  MoreVertical,
  CheckCircle,
  AlertCircle,
  XCircle,
  Sparkles,
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
    transition: { staggerChildren: 0.06 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
    }
  },
};

export default function ProductosPage() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'Todos'>('Todos');
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

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.code.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Todos' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Óptimo':
        return <CheckCircle className="w-3.5 h-3.5" />;
      case 'Bajo':
        return <AlertCircle className="w-3.5 h-3.5" />;
      case 'Agotado':
        return <XCircle className="w-3.5 h-3.5" />;
      default:
        return null;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Producto creado exitosamente', {
      description: `${formData.name} ha sido agregado al catálogo`,
    });
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
      <header className="sticky top-0 z-20 backdrop-blur-xl bg-background/80 border-b border-border">
        <div className="px-8 py-5">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Productos</h1>
              <p className="text-sm text-muted-foreground mt-0.5">
                Catálogo de insumos y herramientas agrícolas
              </p>
            </div>
            <motion.button
              onClick={() => setIsSheetOpen(true)}
              className="flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-semibold shadow-lg shadow-primary/25 btn-premium"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Plus className="w-4 h-4" />
              Nuevo Producto
            </motion.button>
          </div>
        </div>
      </header>

      <div className="p-8">
        {/* Filters */}
        <motion.div
          className="card-premium p-5 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Buscar productos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-premium pl-12"
              />
            </div>

            {/* Category Chips */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setSelectedCategory('Todos')}
                className={`chip ${
                  selectedCategory === 'Todos' ? 'chip-active' : 'chip-inactive'
                }`}
              >
                Todos
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`chip ${
                    selectedCategory === cat ? 'chip-active' : 'chip-inactive'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* View Toggle */}
            <div className="flex items-center gap-1 p-1 bg-muted rounded-xl">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid' ? 'bg-card shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list' ? 'bg-card shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">{filteredProducts.length}</span> productos encontrados
          </p>
        </div>

        {/* Product Grid */}
        <motion.div
          className={viewMode === 'grid' 
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
            : "flex flex-col gap-3"
          }
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => {
              const statusInfo = getStatusInfo(product.status);
              const stockPercentage = Math.min((product.stock / (product.minStock * 3)) * 100, 100);
              const totalValue = product.stock * product.unitPrice;

              if (viewMode === 'list') {
                return (
                  <motion.div
                    key={product.id}
                    variants={cardVariants}
                    layout
                    className="card-premium p-4 flex items-center gap-4"
                  >
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${getCategoryColor(product.category)}15` }}
                    >
                      <Package className="w-6 h-6" style={{ color: getCategoryColor(product.category) }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <h3 className="font-semibold text-foreground truncate">{product.name}</h3>
                        <span className="font-mono text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">
                          {product.code}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{product.brand} • {product.category}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-foreground tabular-nums">{product.stock} {product.unit}</p>
                      <p className="text-sm text-muted-foreground">{formatCurrency(product.unitPrice)}</p>
                    </div>
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border ${statusInfo.bgColor} ${statusInfo.color} ${statusInfo.borderColor}`}
                    >
                      {getStatusIcon(product.status)}
                      {product.status}
                    </span>
                    <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                      <MoreVertical className="w-4 h-4 text-muted-foreground" />
                    </button>
                  </motion.div>
                );
              }

              return (
                <motion.div
                  key={product.id}
                  variants={cardVariants}
                  layout
                  className="card-premium overflow-hidden group"
                >
                  {/* Category color stripe */}
                  <div
                    className="h-1"
                    style={{ backgroundColor: getCategoryColor(product.category) }}
                  />

                  <div className="p-5">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <span
                          className="inline-flex px-2.5 py-1 rounded-lg text-xs font-semibold mb-2"
                          style={{
                            backgroundColor: `${getCategoryColor(product.category)}15`,
                            color: getCategoryColor(product.category),
                          }}
                        >
                          {product.category}
                        </span>
                        <h3 className="font-semibold text-foreground text-base line-clamp-2">
                          {product.name}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-0.5">{product.brand}</p>
                      </div>
                      <span className="font-mono text-[10px] text-muted-foreground bg-muted px-2 py-1 rounded">
                        {product.code}
                      </span>
                    </div>

                    {/* Stock Progress */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-muted-foreground">Stock actual</span>
                        <span className="font-bold text-foreground tabular-nums">
                          {product.stock} <span className="text-muted-foreground font-normal">{product.unit}</span>
                        </span>
                      </div>
                      <div className="progress-premium">
                        <motion.div
                          className="progress-premium-bar"
                          style={{
                            backgroundColor:
                              product.status === 'Agotado' ? '#EF4444' :
                              product.status === 'Bajo' ? '#F59E0B' : '#22C55E',
                          }}
                          initial={{ width: 0 }}
                          animate={{ width: `${stockPercentage}%` }}
                          transition={{ duration: 0.8, ease: 'easeOut' }}
                        />
                      </div>
                      <div className="flex justify-between mt-1.5">
                        <span className="text-xs text-muted-foreground">
                          Mín: {product.minStock}
                        </span>
                        <span
                          className={`inline-flex items-center gap-1 text-xs font-medium ${statusInfo.color}`}
                        >
                          {getStatusIcon(product.status)}
                          {product.status}
                        </span>
                      </div>
                    </div>

                    {/* Price & Value */}
                    <div className="flex items-center justify-between py-3 border-t border-b border-border mb-4">
                      <div>
                        <p className="text-xs text-muted-foreground">Precio Unit.</p>
                        <p className="font-semibold text-foreground tabular-nums">
                          {formatCurrency(product.unitPrice)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">Valor Total</p>
                        <p className="font-bold text-foreground tabular-nums">
                          {formatCurrency(totalValue)}
                        </p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      <motion.button 
                        className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-xl transition-colors"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Eye className="w-4 h-4" />
                        Ver
                      </motion.button>
                      <motion.button 
                        className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 text-sm font-medium text-primary hover:bg-primary/10 rounded-xl transition-colors"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Edit className="w-4 h-4" />
                        Editar
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* New Product Sheet */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent side="right" className="w-full sm:max-w-lg overflow-y-auto p-0">
          <SheetHeader className="sticky top-0 z-10 bg-card border-b border-border p-6">
            <SheetTitle className="flex items-center gap-3 text-xl">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary" />
              </div>
              Nuevo Producto
            </SheetTitle>
            <SheetDescription>
              Agrega un nuevo producto al catálogo de inventario
            </SheetDescription>
          </SheetHeader>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Category & Auto Code */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  Categoría
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="select-premium"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  Código
                </label>
                <div className="flex items-center gap-1 input-premium bg-muted/50">
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
              <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                Nombre del Producto
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Ej: Semilla Maíz Hybrid H-2024"
                className="input-premium"
                required
              />
            </div>

            {/* Brand */}
            <div>
              <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                Marca / Proveedor
              </label>
              <input
                type="text"
                name="brand"
                value={formData.brand}
                onChange={handleInputChange}
                placeholder="Ej: Syngenta"
                className="input-premium"
              />
            </div>

            {/* Unit & Price */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  Unidad de Medida
                </label>
                <select
                  name="unit"
                  value={formData.unit}
                  onChange={handleInputChange}
                  className="select-premium"
                >
                  {units.map((unit) => (
                    <option key={unit} value={unit}>
                      {unit}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
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
                  className="input-premium"
                  required
                />
              </div>
            </div>

            {/* Stock */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  Stock Inicial
                </label>
                <input
                  type="number"
                  name="initialStock"
                  value={formData.initialStock}
                  onChange={handleInputChange}
                  placeholder="0"
                  min="0"
                  className="input-premium"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  Stock Mínimo
                </label>
                <input
                  type="number"
                  name="minStock"
                  value={formData.minStock}
                  onChange={handleInputChange}
                  placeholder="0"
                  min="0"
                  className="input-premium"
                  required
                />
              </div>
            </div>

            {/* SENASA Registration */}
            <div className="p-4 rounded-xl bg-muted/50 border border-border">
              <div className="flex items-center gap-3 mb-3">
                <input
                  type="checkbox"
                  name="hasSenasa"
                  id="hasSenasa"
                  checked={formData.hasSenasa}
                  onChange={handleInputChange}
                  className="w-5 h-5 rounded border-border text-primary focus:ring-primary/20"
                />
                <label htmlFor="hasSenasa" className="text-sm font-medium text-foreground">
                  Tiene registro SENASA
                </label>
              </div>
              <AnimatePresence>
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
                      className="input-premium"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
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
                rows={3}
                className="input-premium resize-none"
              />
            </div>

            {/* Form Actions */}
            <div className="flex gap-3 pt-4 border-t border-border">
              <motion.button
                type="button"
                onClick={() => setIsSheetOpen(false)}
                className="flex-1 px-4 py-3 border border-border rounded-xl text-sm font-semibold text-foreground hover:bg-muted transition-colors"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                Cancelar
              </motion.button>
              <motion.button
                type="submit"
                className="flex-1 px-4 py-3 bg-primary text-primary-foreground rounded-xl text-sm font-semibold shadow-lg shadow-primary/25 btn-premium"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                Guardar Producto
              </motion.button>
            </div>
          </form>
        </SheetContent>
      </Sheet>
    </div>
  );
}
