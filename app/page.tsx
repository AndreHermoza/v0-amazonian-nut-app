'use client';

import { motion } from 'framer-motion';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from 'recharts';
import {
  Package,
  Archive,
  AlertTriangle,
  DollarSign,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownLeft,
  Calendar,
  ChevronRight,
  Activity,
  Zap,
} from 'lucide-react';
import {
  products,
  movements,
  monthlyConsumption,
  stockDistribution,
  formatCurrency,
  calculateTotalInventoryValue,
  getTotalStock,
  getAlertCounts,
  getCategoryColor,
} from '@/lib/data';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
    },
  },
};

// Custom tooltip component
function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ name: string; value: number; color: string }>; label?: string }) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border rounded-xl p-3 shadow-premium-lg">
        <p className="text-sm font-semibold text-foreground mb-2">{label}</p>
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center gap-2 text-sm">
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: entry.color }} />
            <span className="text-muted-foreground">{entry.name}:</span>
            <span className="font-semibold text-foreground">{entry.value}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
}

export default function Dashboard() {
  const totalProducts = products.length;
  const totalStock = getTotalStock();
  const alertCounts = getAlertCounts();
  const totalAlerts = alertCounts.critical + alertCounts.warning;
  const inventoryValue = calculateTotalInventoryValue();

  const kpiCards = [
    {
      title: 'Total Productos',
      value: totalProducts.toString(),
      subtitle: 'productos registrados',
      icon: Package,
      trend: '+2',
      trendUp: true,
      gradient: 'from-emerald-500 to-green-600',
      iconBg: 'bg-emerald-500/10',
      iconColor: 'text-emerald-600',
    },
    {
      title: 'Stock Total',
      value: totalStock.toLocaleString(),
      subtitle: 'unidades en almacén',
      icon: Archive,
      trend: '+150',
      trendUp: true,
      gradient: 'from-blue-500 to-cyan-600',
      iconBg: 'bg-blue-500/10',
      iconColor: 'text-blue-600',
    },
    {
      title: 'Alertas Activas',
      value: totalAlerts.toString(),
      subtitle: `${alertCounts.critical} críticas`,
      icon: AlertTriangle,
      trend: alertCounts.critical > 0 ? 'Requiere atención' : 'Todo OK',
      trendUp: alertCounts.critical === 0,
      gradient: totalAlerts > 0 ? 'from-amber-500 to-orange-600' : 'from-emerald-500 to-green-600',
      iconBg: totalAlerts > 0 ? 'bg-amber-500/10' : 'bg-emerald-500/10',
      iconColor: totalAlerts > 0 ? 'text-amber-600' : 'text-emerald-600',
      highlight: totalAlerts > 0,
    },
    {
      title: 'Valor Inventario',
      value: formatCurrency(inventoryValue),
      subtitle: 'valor total estimado',
      icon: DollarSign,
      trend: '+8.5%',
      trendUp: true,
      gradient: 'from-violet-500 to-purple-600',
      iconBg: 'bg-violet-500/10',
      iconColor: 'text-violet-600',
    },
  ];

  // Weekly trend data for mini sparklines
  const weeklyTrend = [
    { day: 'L', value: 120 },
    { day: 'M', value: 180 },
    { day: 'X', value: 150 },
    { day: 'J', value: 220 },
    { day: 'V', value: 190 },
    { day: 'S', value: 140 },
    { day: 'D', value: 160 },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-20 backdrop-blur-xl bg-background/80 border-b border-border">
        <div className="px-8 py-5">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs font-medium text-muted-foreground">Sistema activo</span>
              </div>
              <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
              <p className="text-sm text-muted-foreground mt-0.5">
                Resumen general del inventario agrícola
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-muted text-sm text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span>Abril 2026</span>
              </div>
              <motion.button 
                className="px-5 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-semibold shadow-lg shadow-primary/25 btn-premium"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Generar Reporte
              </motion.button>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <motion.div
        className="p-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {kpiCards.map((card) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                variants={itemVariants}
                className={`card-premium p-6 relative overflow-hidden group ${
                  card.highlight ? 'ring-2 ring-amber-200' : ''
                }`}
              >
                {/* Gradient accent */}
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${card.gradient} opacity-5 rounded-full blur-2xl transform translate-x-10 -translate-y-10 group-hover:opacity-10 transition-opacity`} />
                
                <div className="relative">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`${card.iconBg} p-3 rounded-xl`}>
                      <Icon className={`w-5 h-5 ${card.iconColor}`} />
                    </div>
                    <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${
                      card.trendUp 
                        ? 'bg-green-50 text-green-700' 
                        : 'bg-amber-50 text-amber-700'
                    }`}>
                      {card.trendUp ? (
                        <TrendingUp className="w-3 h-3" />
                      ) : (
                        <TrendingDown className="w-3 h-3" />
                      )}
                      {card.trend}
                    </div>
                  </div>
                  
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
                    {card.title}
                  </p>
                  <p className="text-3xl font-bold text-foreground tracking-tight mb-1">
                    {card.value}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {card.subtitle}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-8">
          {/* Bar Chart - Monthly Consumption */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-2 card-premium p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-semibold text-foreground">Consumo Mensual</h2>
                <p className="text-sm text-muted-foreground">Por categoría de producto</p>
              </div>
              <div className="flex items-center gap-2">
                {['Semillas', 'Fertilizantes', 'Agroquímicos', 'Herramientas'].map((cat, idx) => (
                  <div key={cat} className="flex items-center gap-1.5 text-xs">
                    <div 
                      className="w-2.5 h-2.5 rounded-full" 
                      style={{ backgroundColor: ['#16A34A', '#0EA5E9', '#F59E0B', '#8B5CF6'][idx] }} 
                    />
                    <span className="text-muted-foreground hidden xl:inline">{cat}</span>
                  </div>
                ))}
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={monthlyConsumption}
                margin={{ top: 20, right: 10, left: -10, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8E4" vertical={false} />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 12, fill: '#5C6B63' }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 12, fill: '#5C6B63' }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="Semillas" fill="#16A34A" radius={[6, 6, 0, 0]} />
                <Bar dataKey="Fertilizantes" fill="#0EA5E9" radius={[6, 6, 0, 0]} />
                <Bar dataKey="Agroquímicos" fill="#F59E0B" radius={[6, 6, 0, 0]} />
                <Bar dataKey="Herramientas" fill="#8B5CF6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Donut Chart - Stock Distribution */}
          <motion.div
            variants={itemVariants}
            className="card-premium p-6"
          >
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-foreground">Distribución de Stock</h2>
              <p className="text-sm text-muted-foreground">Por categoría</p>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={stockDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  dataKey="value"
                  paddingAngle={4}
                  stroke="none"
                >
                  {stockDistribution.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={['#16A34A', '#0EA5E9', '#F59E0B', '#8B5CF6'][index]} 
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-3 mt-4">
              {stockDistribution.map((item, idx) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between group"
                >
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: ['#16A34A', '#0EA5E9', '#F59E0B', '#8B5CF6'][idx] }}
                    />
                    <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                      {item.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold text-foreground tabular-nums">
                      {item.value}
                    </span>
                    <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                      {item.percentage}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Activity & Movements Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Weekly Activity */}
          <motion.div
            variants={itemVariants}
            className="card-premium p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-semibold text-foreground">Actividad Semanal</h2>
                <p className="text-sm text-muted-foreground">Movimientos por día</p>
              </div>
              <div className="flex items-center gap-1 text-green-600 bg-green-50 px-2 py-1 rounded-full">
                <Activity className="w-3.5 h-3.5" />
                <span className="text-xs font-semibold">+12%</span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={120}>
              <AreaChart data={weeklyTrend} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                <defs>
                  <linearGradient id="colorActivity" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#16A34A" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#16A34A" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#16A34A" 
                  strokeWidth={2}
                  fill="url(#colorActivity)" 
                />
              </AreaChart>
            </ResponsiveContainer>
            <div className="flex justify-between mt-2 px-1">
              {weeklyTrend.map((d) => (
                <span key={d.day} className="text-xs text-muted-foreground">{d.day}</span>
              ))}
            </div>
          </motion.div>

          {/* Recent Movements Table */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-2 card-premium p-6"
          >
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-lg font-semibold text-foreground">Movimientos Recientes</h2>
                <p className="text-sm text-muted-foreground">Últimas transacciones del inventario</p>
              </div>
              <a
                href="/movimientos"
                className="flex items-center gap-1 text-primary hover:text-primary/80 text-sm font-semibold transition-colors group"
              >
                Ver todos
                <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>
            <div className="overflow-x-auto scrollbar-thin">
              <table className="table-premium">
                <thead>
                  <tr>
                    <th>Tipo</th>
                    <th>Producto</th>
                    <th>Cantidad</th>
                    <th>Fecha</th>
                    <th>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {movements.slice(0, 5).map((movement) => (
                    <tr key={movement.id}>
                      <td>
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold ${
                            movement.type === 'ENTRADA'
                              ? 'badge-entrada'
                              : 'badge-salida'
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
                      <td>
                        <div>
                          <p className="font-medium text-foreground">{movement.productName}</p>
                          <p className="text-xs text-muted-foreground">{movement.category}</p>
                        </div>
                      </td>
                      <td className="font-semibold text-foreground tabular-nums">
                        {movement.quantity} {movement.unit}
                      </td>
                      <td className="text-muted-foreground text-sm">
                        {movement.date}
                      </td>
                      <td>
                        <span
                          className={`text-xs font-medium px-2.5 py-1 rounded-lg ${
                            movement.status === 'Completado'
                              ? 'bg-green-50 text-green-700'
                              : 'bg-amber-50 text-amber-700'
                          }`}
                        >
                          {movement.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          variants={itemVariants}
          className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-primary/5 via-primary/10 to-secondary/5 border border-primary/10"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Acciones Rápidas</h3>
                <p className="text-sm text-muted-foreground">
                  Presiona <kbd className="px-1.5 py-0.5 rounded bg-muted text-xs font-mono mx-1">⌘K</kbd> para abrir la paleta de comandos
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <motion.a
                href="/productos?action=new"
                className="px-4 py-2 rounded-xl bg-card border border-border text-sm font-medium text-foreground hover:border-primary/30 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Nuevo Producto
              </motion.a>
              <motion.a
                href="/movimientos?action=new"
                className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-medium shadow-lg shadow-primary/25"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Registrar Movimiento
              </motion.a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
