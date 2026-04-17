'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Eye,
  Edit,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  XCircle,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
} from 'lucide-react';
import {
  products,
  formatCurrency,
  getCategoryColor,
  getStatusInfo,
  type ProductCategory,
  type StockStatus,
} from '@/lib/data';

const categories: ProductCategory[] = ['Semillas', 'Fertilizantes', 'Agroquímicos', 'Herramientas'];

type SortOption = 'name' | 'stock-asc' | 'stock-desc' | 'value';

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

export default function InventarioPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'Todos'>('Todos');
  const [sortBy, setSortBy] = useState<SortOption>('name');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Calculate stats
  const stats = useMemo(() => {
    const optimal = products.filter(p => p.status === 'Óptimo').length;
    const low = products.filter(p => p.status === 'Bajo').length;
    const empty = products.filter(p => p.status === 'Agotado').length;
    const totalValue = products.reduce((acc, p) => acc + (p.stock * p.unitPrice), 0);
    return { optimal, low, empty, totalValue };
  }, []);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Filter by search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        p =>
          p.name.toLowerCase().includes(query) ||
          p.code.toLowerCase().includes(query) ||
          p.brand.toLowerCase().includes(query)
      );
    }

    // Filter by category
    if (selectedCategory !== 'Todos') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    // Sort
    switch (sortBy) {
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'stock-asc':
        filtered.sort((a, b) => a.stock - b.stock);
        break;
      case 'stock-desc':
        filtered.sort((a, b) => b.stock - a.stock);
        break;
      case 'value':
        filtered.sort((a, b) => (b.stock * b.unitPrice) - (a.stock * a.unitPrice));
        break;
    }

    return filtered;
  }, [searchQuery, selectedCategory, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getStatusIcon = (status: StockStatus) => {
    switch (status) {
      case 'Óptimo':
        return <CheckCircle className="w-4 h-4" />;
      case 'Bajo':
        return <AlertCircle className="w-4 h-4" />;
      case 'Agotado':
        return <XCircle className="w-4 h-4" />;
    }
  };

  const getRowClass = (status: StockStatus) => {
    switch (status) {
      case 'Óptimo':
        return 'row-optimal';
      case 'Bajo':
        return 'row-low';
      case 'Agotado':
        return 'row-empty';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card px-6 py-5">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Inventario</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Control y seguimiento del stock de productos agrícolas
            </p>
          </div>
        </div>
      </header>

      <div className="p-6">
        {/* Stats Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="bg-card rounded-xl p-4 border border-border shadow-card">
            <div className="flex items-center gap-3">
              <div className="bg-green-100 p-2.5 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-700" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">Stock Óptimo</p>
                <p className="text-2xl font-bold text-foreground">{stats.optimal}</p>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-card rounded-xl p-4 border border-border shadow-card">
            <div className="flex items-center gap-3">
              <div className="bg-amber-100 p-2.5 rounded-lg">
                <AlertCircle className="w-5 h-5 text-amber-700" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">Stock Bajo</p>
                <p className="text-2xl font-bold text-foreground">{stats.low}</p>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-card rounded-xl p-4 border border-border shadow-card">
            <div className="flex items-center gap-3">
              <div className="bg-red-100 p-2.5 rounded-lg">
                <XCircle className="w-5 h-5 text-red-700" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">Agotado</p>
                <p className="text-2xl font-bold text-foreground">{stats.empty}</p>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-card rounded-xl p-4 border border-border shadow-card">
            <div className="flex items-center gap-3">
              <div className="bg-emerald-100 p-2.5 rounded-lg">
                <span className="text-emerald-700 font-bold text-sm">S/.</span>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">Valor Total</p>
                <p className="text-2xl font-bold text-foreground">{formatCurrency(stats.totalValue)}</p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          className="bg-card rounded-xl p-4 border border-border shadow-card mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar por nombre, código o marca..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-4 py-2.5 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm"
            />
          </div>

          {/* Filters Row */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Category Chips */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => {
                  setSelectedCategory('Todos');
                  setCurrentPage(1);
                }}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === 'Todos'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                Todos
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setCurrentPage(1);
                  }}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === cat
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <ArrowUpDown className="w-4 h-4 text-muted-foreground" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="px-3 py-1.5 border border-border rounded-lg bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                <option value="name">Nombre</option>
                <option value="stock-asc">Stock (Menor a Mayor)</option>
                <option value="stock-desc">Stock (Mayor a Menor)</option>
                <option value="value">Valor</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Inventory Table */}
        <motion.div
          className="bg-card rounded-xl border border-border shadow-card overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="text-left py-3 px-4 font-semibold text-muted-foreground text-xs uppercase tracking-wide">
                    Código
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-muted-foreground text-xs uppercase tracking-wide">
                    Producto
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-muted-foreground text-xs uppercase tracking-wide">
                    Categoría
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-muted-foreground text-xs uppercase tracking-wide">
                    Stock Actual
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-muted-foreground text-xs uppercase tracking-wide">
                    Stock Mínimo
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-muted-foreground text-xs uppercase tracking-wide">
                    Estado
                  </th>
                  <th className="text-right py-3 px-4 font-semibold text-muted-foreground text-xs uppercase tracking-wide">
                    Valor Unitario
                  </th>
                  <th className="text-right py-3 px-4 font-semibold text-muted-foreground text-xs uppercase tracking-wide">
                    Valor Total
                  </th>
                  <th className="text-center py-3 px-4 font-semibold text-muted-foreground text-xs uppercase tracking-wide">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence mode="popLayout">
                  {paginatedProducts.map((product) => {
                    const statusInfo = getStatusInfo(product.status);
                    const totalValue = product.stock * product.unitPrice;

                    return (
                      <motion.tr
                        key={product.id}
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className={`border-b border-border/50 hover:bg-green-50/30 transition-colors ${getRowClass(product.status)}`}
                      >
                        <td className="py-3 px-4">
                          <span className="font-mono text-xs text-muted-foreground">
                            {product.code}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div>
                            <p className="font-medium text-foreground">{product.name}</p>
                            <p className="text-xs text-muted-foreground">{product.brand}</p>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className="inline-flex px-2.5 py-1 rounded-full text-xs font-medium"
                            style={{
                              backgroundColor: `${getCategoryColor(product.category)}15`,
                              color: getCategoryColor(product.category),
                            }}
                          >
                            {product.category}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-foreground">
                          <span className="font-semibold">{product.stock}</span>{' '}
                          <span className="text-muted-foreground">{product.unit}</span>
                        </td>
                        <td className="py-3 px-4 text-muted-foreground">
                          {product.minStock} {product.unit}
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${statusInfo.bgColor} ${statusInfo.color} ${statusInfo.borderColor}`}
                          >
                            {getStatusIcon(product.status)}
                            {product.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right text-foreground">
                          {formatCurrency(product.unitPrice)}
                        </td>
                        <td className="py-3 px-4 text-right font-semibold text-foreground">
                          {formatCurrency(totalValue)}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center justify-center gap-1">
                            <button className="p-1.5 hover:bg-muted rounded-lg transition-colors" title="Ver detalle">
                              <Eye className="w-4 h-4 text-muted-foreground" />
                            </button>
                            <button className="p-1.5 hover:bg-muted rounded-lg transition-colors" title="Editar">
                              <Edit className="w-4 h-4 text-muted-foreground" />
                            </button>
                            <button className="p-1.5 hover:bg-muted rounded-lg transition-colors" title="Ajustar stock">
                              <RefreshCw className="w-4 h-4 text-muted-foreground" />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    );
                  })}
                </AnimatePresence>
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between px-4 py-3 border-t border-border bg-muted/20">
            <p className="text-sm text-muted-foreground">
              Mostrando {((currentPage - 1) * itemsPerPage) + 1} a{' '}
              {Math.min(currentPage * itemsPerPage, filteredProducts.length)} de{' '}
              {filteredProducts.length} productos
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-1.5 hover:bg-muted rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="text-sm text-muted-foreground">
                Página {currentPage} de {totalPages || 1}
              </span>
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages || totalPages === 0}
                className="p-1.5 hover:bg-muted rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
