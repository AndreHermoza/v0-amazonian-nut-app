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
  Filter,
  Download,
  MoreHorizontal,
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

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        p =>
          p.name.toLowerCase().includes(query) ||
          p.code.toLowerCase().includes(query) ||
          p.brand.toLowerCase().includes(query)
      );
    }

    if (selectedCategory !== 'Todos') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

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

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getStatusIcon = (status: StockStatus) => {
    switch (status) {
      case 'Óptimo':
        return <CheckCircle className="w-3.5 h-3.5" />;
      case 'Bajo':
        return <AlertCircle className="w-3.5 h-3.5" />;
      case 'Agotado':
        return <XCircle className="w-3.5 h-3.5" />;
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
      <header className="sticky top-0 z-20 backdrop-blur-xl bg-background/80 border-b border-border">
        <div className="px-8 py-5">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Inventario</h1>
              <p className="text-sm text-muted-foreground mt-0.5">
                Control y seguimiento del stock de productos agrícolas
              </p>
            </div>
            <div className="flex items-center gap-3">
              <motion.button 
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-card text-sm font-medium text-foreground hover:bg-muted/50 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Download className="w-4 h-4" />
                Exportar
              </motion.button>
            </div>
          </div>
        </div>
      </header>

      <div className="p-8">
        {/* Stats Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="card-premium p-5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Stock Óptimo</p>
                <p className="text-3xl font-bold text-foreground">{stats.optimal}</p>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-1 text-xs text-green-600">
              <div className="w-full bg-green-100 rounded-full h-1.5">
                <div 
                  className="bg-green-500 h-1.5 rounded-full" 
                  style={{ width: `${(stats.optimal / products.length) * 100}%` }}
                />
              </div>
              <span className="ml-2 font-medium">{Math.round((stats.optimal / products.length) * 100)}%</span>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="card-premium p-5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Stock Bajo</p>
                <p className="text-3xl font-bold text-foreground">{stats.low}</p>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-1 text-xs text-amber-600">
              <div className="w-full bg-amber-100 rounded-full h-1.5">
                <div 
                  className="bg-amber-500 h-1.5 rounded-full" 
                  style={{ width: `${(stats.low / products.length) * 100}%` }}
                />
              </div>
              <span className="ml-2 font-medium">{Math.round((stats.low / products.length) * 100)}%</span>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="card-premium p-5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center">
                <XCircle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Agotado</p>
                <p className="text-3xl font-bold text-foreground">{stats.empty}</p>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-1 text-xs text-red-600">
              <div className="w-full bg-red-100 rounded-full h-1.5">
                <div 
                  className="bg-red-500 h-1.5 rounded-full" 
                  style={{ width: `${(stats.empty / products.length) * 100}%` }}
                />
              </div>
              <span className="ml-2 font-medium">{Math.round((stats.empty / products.length) * 100)}%</span>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="card-premium p-5 bg-gradient-to-br from-primary/5 to-primary/10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                <span className="text-primary font-bold text-lg">S/.</span>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Valor Total</p>
                <p className="text-2xl font-bold text-foreground">{formatCurrency(stats.totalValue)}</p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Search and Filters */}
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
                placeholder="Buscar por nombre, código o marca..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="input-premium pl-12"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-muted/50">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Filtros:</span>
              </div>
              
              {/* Category Chips */}
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => {
                    setSelectedCategory('Todos');
                    setCurrentPage(1);
                  }}
                  className={`chip ${
                    selectedCategory === 'Todos' ? 'chip-active' : 'chip-inactive'
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
                    className={`chip ${
                      selectedCategory === cat ? 'chip-active' : 'chip-inactive'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Sort Dropdown */}
              <div className="flex items-center gap-2 ml-auto">
                <ArrowUpDown className="w-4 h-4 text-muted-foreground" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="select-premium py-2"
                >
                  <option value="name">Nombre</option>
                  <option value="stock-asc">Stock (Menor a Mayor)</option>
                  <option value="stock-desc">Stock (Mayor a Menor)</option>
                  <option value="value">Valor</option>
                </select>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Inventory Table */}
        <motion.div
          className="card-premium overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="overflow-x-auto scrollbar-thin">
            <table className="table-premium">
              <thead>
                <tr className="bg-muted/30">
                  <th>Código</th>
                  <th>Producto</th>
                  <th>Categoría</th>
                  <th>Stock Actual</th>
                  <th>Stock Mínimo</th>
                  <th>Estado</th>
                  <th className="text-right">Valor Unit.</th>
                  <th className="text-right">Valor Total</th>
                  <th className="text-center">Acciones</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence mode="popLayout">
                  {paginatedProducts.map((product) => {
                    const statusInfo = getStatusInfo(product.status);
                    const totalValue = product.stock * product.unitPrice;
                    const stockPercent = Math.min((product.stock / (product.minStock * 2)) * 100, 100);

                    return (
                      <motion.tr
                        key={product.id}
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className={`${getRowClass(product.status)}`}
                      >
                        <td>
                          <span className="font-mono text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                            {product.code}
                          </span>
                        </td>
                        <td>
                          <div>
                            <p className="font-semibold text-foreground">{product.name}</p>
                            <p className="text-xs text-muted-foreground">{product.brand}</p>
                          </div>
                        </td>
                        <td>
                          <span
                            className="inline-flex px-2.5 py-1 rounded-lg text-xs font-semibold"
                            style={{
                              backgroundColor: `${getCategoryColor(product.category)}15`,
                              color: getCategoryColor(product.category),
                            }}
                          >
                            {product.category}
                          </span>
                        </td>
                        <td>
                          <div className="flex flex-col gap-1.5">
                            <div className="flex items-baseline gap-1">
                              <span className="font-bold text-foreground tabular-nums">{product.stock}</span>
                              <span className="text-xs text-muted-foreground">{product.unit}</span>
                            </div>
                            <div className="w-20 h-1.5 bg-muted rounded-full overflow-hidden">
                              <div 
                                className={`h-full rounded-full transition-all duration-500 ${
                                  product.status === 'Óptimo' ? 'bg-green-500' :
                                  product.status === 'Bajo' ? 'bg-amber-500' : 'bg-red-500'
                                }`}
                                style={{ width: `${stockPercent}%` }}
                              />
                            </div>
                          </div>
                        </td>
                        <td className="text-muted-foreground">
                          {product.minStock} {product.unit}
                        </td>
                        <td>
                          <span
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold border ${statusInfo.bgColor} ${statusInfo.color} ${statusInfo.borderColor}`}
                          >
                            {getStatusIcon(product.status)}
                            {product.status}
                          </span>
                        </td>
                        <td className="text-right font-medium text-foreground tabular-nums">
                          {formatCurrency(product.unitPrice)}
                        </td>
                        <td className="text-right font-bold text-foreground tabular-nums">
                          {formatCurrency(totalValue)}
                        </td>
                        <td>
                          <div className="flex items-center justify-center gap-1">
                            <motion.button 
                              className="p-2 hover:bg-muted rounded-lg transition-colors group"
                              title="Ver detalle"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <Eye className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
                            </motion.button>
                            <motion.button 
                              className="p-2 hover:bg-muted rounded-lg transition-colors group"
                              title="Editar"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <Edit className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
                            </motion.button>
                            <motion.button 
                              className="p-2 hover:bg-muted rounded-lg transition-colors group"
                              title="Más opciones"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <MoreHorizontal className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
                            </motion.button>
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
          <div className="flex items-center justify-between px-6 py-4 border-t border-border bg-muted/20">
            <p className="text-sm text-muted-foreground">
              Mostrando <span className="font-semibold text-foreground">{((currentPage - 1) * itemsPerPage) + 1}</span> a{' '}
              <span className="font-semibold text-foreground">{Math.min(currentPage * itemsPerPage, filteredProducts.length)}</span> de{' '}
              <span className="font-semibold text-foreground">{filteredProducts.length}</span> productos
            </p>
            <div className="flex items-center gap-2">
              <motion.button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2 hover:bg-muted rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronLeft className="w-5 h-5" />
              </motion.button>
              
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages || 1 }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${
                      currentPage === page
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-muted text-muted-foreground'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
              
              <motion.button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages || totalPages === 0}
                className="p-2 hover:bg-muted rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
