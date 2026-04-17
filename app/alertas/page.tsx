'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  AlertTriangle,
  XCircle,
  AlertCircle,
  Info,
  Clock,
  ShoppingCart,
  Eye,
  CheckCircle,
} from 'lucide-react';
import {
  alerts,
  products,
  getAlertCounts,
} from '@/lib/data';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
};

export default function AlertasPage() {
  const [resolvedAlerts, setResolvedAlerts] = useState<string[]>([]);
  const alertCounts = getAlertCounts();

  const criticalAlerts = alerts.filter(a => a.type === 'critical' && !resolvedAlerts.includes(a.id));
  const warningAlerts = alerts.filter(a => a.type === 'warning' && !resolvedAlerts.includes(a.id));
  const infoAlerts = alerts.filter(a => a.type === 'info' && !resolvedAlerts.includes(a.id));

  const lowStockProducts = products.filter(p => p.status === 'Bajo');
  const outOfStockProducts = products.filter(p => p.status === 'Agotado');

  const handleResolve = (alertId: string) => {
    setResolvedAlerts(prev => [...prev, alertId]);
  };

  const getAlertIcon = (type: 'critical' | 'warning' | 'info') => {
    switch (type) {
      case 'critical':
        return <XCircle className="w-5 h-5 text-red-600" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-amber-600" />;
      case 'info':
        return <Info className="w-5 h-5 text-blue-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card px-6 py-5">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Alertas</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Centro de notificaciones y alertas del inventario
            </p>
          </div>
        </div>
      </header>

      <div className="p-6">
        {/* KPI Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            variants={itemVariants}
            className="bg-card rounded-xl p-4 border border-red-200 shadow-card"
          >
            <div className="flex items-center gap-3">
              <div className="bg-red-100 p-2.5 rounded-lg">
                <XCircle className="w-5 h-5 text-red-700" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">
                  Críticas
                </p>
                <p className="text-2xl font-bold text-red-600">
                  {criticalAlerts.length}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="bg-card rounded-xl p-4 border border-amber-200 shadow-card"
          >
            <div className="flex items-center gap-3">
              <div className="bg-amber-100 p-2.5 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-amber-700" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">
                  Advertencias
                </p>
                <p className="text-2xl font-bold text-amber-600">
                  {warningAlerts.length}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="bg-card rounded-xl p-4 border border-blue-200 shadow-card"
          >
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-2.5 rounded-lg">
                <Info className="w-5 h-5 text-blue-700" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">
                  Informativas
                </p>
                <p className="text-2xl font-bold text-blue-600">
                  {infoAlerts.length}
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Alert Sections */}
        <div className="space-y-6">
          {/* Critical Section */}
          {(criticalAlerts.length > 0 || outOfStockProducts.length > 0) && (
            <motion.div
              className="bg-card rounded-xl border border-border shadow-card overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="px-5 py-4 border-b border-border bg-red-50/50 flex items-center gap-2">
                <XCircle className="w-5 h-5 text-red-600" />
                <h2 className="font-semibold text-foreground">Crítico</h2>
                <span className="ml-auto text-xs text-red-600 font-medium bg-red-100 px-2 py-0.5 rounded-full">
                  {criticalAlerts.length + outOfStockProducts.length} alertas
                </span>
              </div>
              <div className="p-4 space-y-3">
                {outOfStockProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    className="flex items-start gap-4 p-4 bg-red-50/30 rounded-lg border-l-4 border-red-500"
                    whileHover={{ x: 4 }}
                  >
                    <div className="bg-red-100 p-2 rounded-lg flex-shrink-0">
                      <AlertCircle className="w-5 h-5 text-red-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-foreground">Producto Agotado</h3>
                      <p className="text-sm text-muted-foreground mt-0.5">
                        {product.name} - {product.brand}
                      </p>
                      <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        <span>Sin stock desde hace 5 días</span>
                      </div>
                    </div>
                    <button className="flex items-center gap-1.5 px-3 py-1.5 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors">
                      <ShoppingCart className="w-4 h-4" />
                      Reabastecer
                    </button>
                  </motion.div>
                ))}
                {criticalAlerts.map((alert) => (
                  <motion.div
                    key={alert.id}
                    className="flex items-start gap-4 p-4 bg-red-50/30 rounded-lg border-l-4 border-red-500"
                    whileHover={{ x: 4 }}
                  >
                    <div className="bg-red-100 p-2 rounded-lg flex-shrink-0">
                      {getAlertIcon(alert.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-foreground">{alert.title}</h3>
                      <p className="text-sm text-muted-foreground mt-0.5">
                        {alert.description}
                      </p>
                      <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        <span>{alert.timestamp}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleResolve(alert.id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 border border-border rounded-lg text-sm font-medium hover:bg-muted transition-colors"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Resolver
                    </button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Warning Section */}
          {(warningAlerts.length > 0 || lowStockProducts.length > 0) && (
            <motion.div
              className="bg-card rounded-xl border border-border shadow-card overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="px-5 py-4 border-b border-border bg-amber-50/50 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
                <h2 className="font-semibold text-foreground">Advertencia</h2>
                <span className="ml-auto text-xs text-amber-600 font-medium bg-amber-100 px-2 py-0.5 rounded-full">
                  {warningAlerts.length + lowStockProducts.length} alertas
                </span>
              </div>
              <div className="p-4 space-y-3">
                {lowStockProducts.map((product) => {
                  const deficit = product.minStock - product.stock;
                  const percentage = (product.stock / product.minStock) * 100;

                  return (
                    <motion.div
                      key={product.id}
                      className="flex items-start gap-4 p-4 bg-amber-50/30 rounded-lg border-l-4 border-amber-500"
                      whileHover={{ x: 4 }}
                    >
                      <div className="bg-amber-100 p-2 rounded-lg flex-shrink-0">
                        <AlertTriangle className="w-5 h-5 text-amber-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-foreground">Stock Bajo</h3>
                        <p className="text-sm text-muted-foreground mt-0.5">
                          {product.name}
                        </p>
                        <div className="mt-3">
                          <div className="flex items-center justify-between text-xs mb-1">
                            <span className="text-muted-foreground">
                              {product.stock} / {product.minStock} {product.unit}
                            </span>
                            <span className="text-amber-600 font-medium">
                              Déficit: {deficit > 0 ? deficit : 0} {product.unit}
                            </span>
                          </div>
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full bg-amber-500 rounded-full"
                              style={{ width: `${Math.min(percentage, 100)}%` }}
                            />
                          </div>
                        </div>
                      </div>
                      <button className="flex items-center gap-1.5 px-3 py-1.5 border border-amber-300 text-amber-700 rounded-lg text-sm font-medium hover:bg-amber-50 transition-colors">
                        <Eye className="w-4 h-4" />
                        Ver detalle
                      </button>
                    </motion.div>
                  );
                })}
                {warningAlerts.map((alert) => (
                  <motion.div
                    key={alert.id}
                    className="flex items-start gap-4 p-4 bg-amber-50/30 rounded-lg border-l-4 border-amber-500"
                    whileHover={{ x: 4 }}
                  >
                    <div className="bg-amber-100 p-2 rounded-lg flex-shrink-0">
                      {getAlertIcon(alert.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-foreground">{alert.title}</h3>
                      <p className="text-sm text-muted-foreground mt-0.5">
                        {alert.description}
                      </p>
                      <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        <span>{alert.timestamp}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleResolve(alert.id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 border border-border rounded-lg text-sm font-medium hover:bg-muted transition-colors"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Resolver
                    </button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Info Section */}
          {infoAlerts.length > 0 && (
            <motion.div
              className="bg-card rounded-xl border border-border shadow-card overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="px-5 py-4 border-b border-border bg-blue-50/50 flex items-center gap-2">
                <Info className="w-5 h-5 text-blue-600" />
                <h2 className="font-semibold text-foreground">Informativo</h2>
                <span className="ml-auto text-xs text-blue-600 font-medium bg-blue-100 px-2 py-0.5 rounded-full">
                  {infoAlerts.length} alertas
                </span>
              </div>
              <div className="p-4 space-y-3">
                {infoAlerts.map((alert) => (
                  <motion.div
                    key={alert.id}
                    className="flex items-start gap-4 p-4 bg-blue-50/30 rounded-lg border-l-4 border-blue-500"
                    whileHover={{ x: 4 }}
                  >
                    <div className="bg-blue-100 p-2 rounded-lg flex-shrink-0">
                      {getAlertIcon(alert.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-foreground">{alert.title}</h3>
                      <p className="text-sm text-muted-foreground mt-0.5">
                        {alert.description}
                      </p>
                      <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        <span>{alert.timestamp}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleResolve(alert.id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 border border-border rounded-lg text-sm font-medium hover:bg-muted transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                      Ver detalle
                    </button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Empty State */}
          {criticalAlerts.length === 0 &&
            warningAlerts.length === 0 &&
            infoAlerts.length === 0 &&
            outOfStockProducts.length === 0 &&
            lowStockProducts.length === 0 && (
              <motion.div
                className="bg-card rounded-xl border border-border shadow-card p-12 text-center"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-semibold text-foreground text-lg">
                  Sin alertas pendientes
                </h3>
                <p className="text-sm text-muted-foreground mt-2">
                  Todos los productos tienen niveles de stock adecuados
                </p>
              </motion.div>
            )}
        </div>
      </div>
    </div>
  );
}
