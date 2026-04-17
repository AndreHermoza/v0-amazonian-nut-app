'use client';

import { motion } from 'framer-motion';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
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
      staggerChildren: 0.1,
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
    },
  },
};

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
      subtitle: 'en catálogo',
      icon: Package,
      trend: '+2',
      trendUp: true,
      iconBg: 'bg-green-100',
      iconColor: 'text-green-700',
    },
    {
      title: 'Stock Total',
      value: totalStock.toLocaleString(),
      subtitle: 'unidades',
      icon: Archive,
      trend: '+150',
      trendUp: true,
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-700',
    },
    {
      title: 'Alertas Activas',
      value: totalAlerts.toString(),
      subtitle: `${alertCounts.critical} críticas`,
      icon: AlertTriangle,
      trend: alertCounts.critical > 0 ? 'Atención' : 'OK',
      trendUp: false,
      iconBg: totalAlerts > 0 ? 'bg-red-100' : 'bg-green-100',
      iconColor: totalAlerts > 0 ? 'text-red-700' : 'text-green-700',
      highlight: totalAlerts > 0,
    },
    {
      title: 'Valor Inventario',
      value: formatCurrency(inventoryValue),
      subtitle: 'total',
      icon: DollarSign,
      trend: '+8.5%',
      trendUp: true,
      iconBg: 'bg-emerald-100',
      iconColor: 'text-emerald-700',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card px-6 py-5">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Resumen general del inventario agrícola
            </p>
          </div>
          <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
            Generar Reporte
          </button>
        </div>
      </header>

      {/* Content */}
      <motion.div
        className="p-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {kpiCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                variants={itemVariants}
                className={`bg-card rounded-xl p-5 border border-border shadow-card hover:shadow-soft transition-all duration-300 ${
                  card.highlight ? 'ring-2 ring-red-200' : ''
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                      {card.title}
                    </p>
                    <p className="text-2xl font-bold text-foreground mt-2">
                      {card.value}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {card.subtitle}
                    </p>
                  </div>
                  <div className={`${card.iconBg} p-3 rounded-lg`}>
                    <Icon className={`w-5 h-5 ${card.iconColor}`} />
                  </div>
                </div>
                <div className="flex items-center gap-1 mt-3">
                  {card.trendUp ? (
                    <TrendingUp className="w-3 h-3 text-green-600" />
                  ) : (
                    <TrendingDown className="w-3 h-3 text-red-600" />
                  )}
                  <span
                    className={`text-xs font-medium ${
                      card.trendUp ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {card.trend}
                  </span>
                  <span className="text-xs text-muted-foreground ml-1">
                    este mes
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
          {/* Bar Chart - Monthly Consumption */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-2 bg-card rounded-xl p-5 border border-border shadow-card"
          >
            <h2 className="text-sm font-semibold text-foreground mb-4">
              Consumo Mensual por Categoría
            </h2>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart
                data={monthlyConsumption}
                margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#E4E8E2" />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 12, fill: '#6B7280' }}
                  axisLine={{ stroke: '#E4E8E2' }}
                />
                <YAxis
                  tick={{ fontSize: 12, fill: '#6B7280' }}
                  axisLine={{ stroke: '#E4E8E2' }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #E4E8E2',
                    borderRadius: '8px',
                    fontSize: '12px',
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Bar
                  dataKey="Semillas"
                  fill="#1A5C3A"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="Fertilizantes"
                  fill="#2D8653"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="Agroquímicos"
                  fill="#F59E0B"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="Herramientas"
                  fill="#3B82F6"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Donut Chart - Stock Distribution */}
          <motion.div
            variants={itemVariants}
            className="bg-card rounded-xl p-5 border border-border shadow-card"
          >
            <h2 className="text-sm font-semibold text-foreground mb-4">
              Distribución de Stock
            </h2>
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie
                  data={stockDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  dataKey="value"
                  paddingAngle={3}
                >
                  {stockDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => `${value} unidades`}
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #E4E8E2',
                    borderRadius: '8px',
                    fontSize: '12px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {stockDistribution.map((item) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between text-sm"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.fill }}
                    />
                    <span className="text-muted-foreground">{item.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-foreground">
                      {item.value}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      ({item.percentage}%)
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Recent Movements Table */}
        <motion.div
          variants={itemVariants}
          className="bg-card rounded-xl p-5 border border-border shadow-card"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-foreground">
              Movimientos Recientes
            </h2>
            <a
              href="/movimientos"
              className="text-primary hover:text-primary/80 text-sm font-medium transition-colors"
            >
              Ver todos
            </a>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-3 font-semibold text-muted-foreground text-xs uppercase tracking-wide">
                    Tipo
                  </th>
                  <th className="text-left py-3 px-3 font-semibold text-muted-foreground text-xs uppercase tracking-wide">
                    Producto
                  </th>
                  <th className="text-left py-3 px-3 font-semibold text-muted-foreground text-xs uppercase tracking-wide">
                    Categoría
                  </th>
                  <th className="text-left py-3 px-3 font-semibold text-muted-foreground text-xs uppercase tracking-wide">
                    Cantidad
                  </th>
                  <th className="text-left py-3 px-3 font-semibold text-muted-foreground text-xs uppercase tracking-wide">
                    Usuario
                  </th>
                  <th className="text-left py-3 px-3 font-semibold text-muted-foreground text-xs uppercase tracking-wide">
                    Fecha
                  </th>
                  <th className="text-left py-3 px-3 font-semibold text-muted-foreground text-xs uppercase tracking-wide">
                    Estado
                  </th>
                </tr>
              </thead>
              <tbody>
                {movements.slice(0, 8).map((movement) => (
                  <tr
                    key={movement.id}
                    className="border-b border-border/50 hover:bg-green-50/30 transition-colors"
                  >
                    <td className="py-3 px-3">
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
                    <td className="py-3 px-3 text-foreground font-medium">
                      {movement.productName}
                    </td>
                    <td className="py-3 px-3">
                      <span
                        className="inline-flex px-2 py-0.5 rounded-full text-xs font-medium"
                        style={{
                          backgroundColor: `${getCategoryColor(movement.category)}15`,
                          color: getCategoryColor(movement.category),
                        }}
                      >
                        {movement.category}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-foreground">
                      {movement.quantity} {movement.unit}
                    </td>
                    <td className="py-3 px-3 text-muted-foreground">
                      {movement.responsible}
                    </td>
                    <td className="py-3 px-3 text-muted-foreground text-xs">
                      {movement.date}
                    </td>
                    <td className="py-3 px-3">
                      <span
                        className={`text-xs font-medium px-2 py-1 rounded ${
                          movement.status === 'Completado'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-amber-100 text-amber-700'
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
      </motion.div>
    </div>
  );
}
