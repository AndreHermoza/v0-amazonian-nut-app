'use client';

import { useState } from 'react';
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
  AreaChart,
  Area,
} from 'recharts';
import {
  FileDown,
  FileSpreadsheet,
  Calendar,
  TrendingUp,
  TrendingDown,
  Minus,
} from 'lucide-react';
import {
  products,
  monthlyConsumption,
  stockDistribution,
  formatCurrency,
  getCategoryColor,
} from '@/lib/data';

// Movement history data for area chart
const movementHistory = [
  { date: '01 Abr', entradas: 180, salidas: 95 },
  { date: '05 Abr', entradas: 120, salidas: 140 },
  { date: '08 Abr', entradas: 200, salidas: 85 },
  { date: '10 Abr', entradas: 90, salidas: 120 },
  { date: '12 Abr', entradas: 150, salidas: 100 },
  { date: '14 Abr', entradas: 80, salidas: 135 },
  { date: '17 Abr', entradas: 220, salidas: 75 },
];

// Top consumed products
const topConsumed = [
  { name: 'Semilla Maíz Hybrid', consumed: 320, unit: 'kg' },
  { name: 'Fertilizante NPK 15-15-15', consumed: 245, unit: 'sacos' },
  { name: 'Insecticida Orgánico', consumed: 180, unit: 'litros' },
  { name: 'Semilla Papa Canchán', consumed: 150, unit: 'sacos' },
  { name: 'Fungicida Cobre', consumed: 95, unit: 'kg' },
  { name: 'Sulfato de Potasio', consumed: 80, unit: 'sacos' },
  { name: 'Pala Agrícola', consumed: 12, unit: 'unidades' },
  { name: 'Mochila Fumigadora', consumed: 4, unit: 'unidades' },
];

// Rotation data
const rotationData = products.map(p => ({
  name: p.name.substring(0, 25) + (p.name.length > 25 ? '...' : ''),
  fullName: p.name,
  entries: Math.floor(Math.random() * 200) + 50,
  exits: Math.floor(Math.random() * 150) + 30,
  rotation: (Math.random() * 3 + 0.5).toFixed(2),
  performance: Math.random() > 0.3 ? 'Bueno' : Math.random() > 0.5 ? 'Regular' : 'Bajo',
}));

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

type DateRange = '7d' | '30d' | '90d' | 'custom';

export default function ReportesPage() {
  const [dateRange, setDateRange] = useState<DateRange>('30d');

  const getPerformanceBadge = (performance: string) => {
    switch (performance) {
      case 'Bueno':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
            <TrendingUp className="w-3 h-3" />
            Bueno
          </span>
        );
      case 'Regular':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-700">
            <Minus className="w-3 h-3" />
            Regular
          </span>
        );
      case 'Bajo':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700">
            <TrendingDown className="w-3 h-3" />
            Bajo
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card px-6 py-5">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Reportes</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Análisis y métricas del inventario agrícola
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg text-sm font-medium text-foreground hover:bg-muted transition-colors">
              <FileDown className="w-4 h-4" />
              Exportar PDF
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg text-sm font-medium text-foreground hover:bg-muted transition-colors">
              <FileSpreadsheet className="w-4 h-4" />
              Exportar Excel
            </button>
          </div>
        </div>
      </header>

      <div className="p-6">
        {/* Date Range Selector */}
        <motion.div
          className="bg-card rounded-xl p-4 border border-border shadow-card mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">Período:</span>
            </div>
            <div className="flex gap-2">
              {(['7d', '30d', '90d', 'custom'] as DateRange[]).map((range) => (
                <button
                  key={range}
                  onClick={() => setDateRange(range)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    dateRange === range
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  {range === '7d' && 'Últimos 7 días'}
                  {range === '30d' && 'Últimos 30 días'}
                  {range === '90d' && 'Últimos 90 días'}
                  {range === 'custom' && 'Personalizado'}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Charts Grid */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Top Consumed Products - Horizontal Bar */}
          <motion.div
            variants={itemVariants}
            className="bg-card rounded-xl p-5 border border-border shadow-card"
          >
            <h2 className="text-sm font-semibold text-foreground mb-4">
              Consumo por Producto (Top 10)
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={topConsumed}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#E4E8E2" />
                <XAxis type="number" tick={{ fontSize: 12, fill: '#6B7280' }} />
                <YAxis
                  type="category"
                  dataKey="name"
                  tick={{ fontSize: 11, fill: '#6B7280' }}
                  width={150}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #E4E8E2',
                    borderRadius: '8px',
                    fontSize: '12px',
                  }}
                  formatter={(value, name, props) => [
                    `${value} ${props.payload.unit}`,
                    'Consumido',
                  ]}
                />
                <Bar dataKey="consumed" fill="#1A5C3A" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Category Distribution - Pie */}
          <motion.div
            variants={itemVariants}
            className="bg-card rounded-xl p-5 border border-border shadow-card"
          >
            <h2 className="text-sm font-semibold text-foreground mb-4">
              Consumo por Categoría
            </h2>
            <div className="flex items-center gap-6">
              <ResponsiveContainer width="50%" height={220}>
                <PieChart>
                  <Pie
                    data={stockDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={85}
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
              <div className="flex-1 space-y-3">
                {stockDistribution.map((item) => (
                  <div key={item.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: item.fill }}
                      />
                      <span className="text-sm text-foreground">{item.name}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-semibold text-foreground">
                        {item.value}
                      </span>
                      <span className="text-xs text-muted-foreground ml-1">
                        ({item.percentage}%)
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Movement History - Area Chart */}
          <motion.div
            variants={itemVariants}
            className="bg-card rounded-xl p-5 border border-border shadow-card"
          >
            <h2 className="text-sm font-semibold text-foreground mb-4">
              Historial de Movimientos
            </h2>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart
                data={movementHistory}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorEntradas" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22C55E" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#22C55E" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorSalidas" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#EF4444" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E4E8E2" />
                <XAxis dataKey="date" tick={{ fontSize: 12, fill: '#6B7280' }} />
                <YAxis tick={{ fontSize: 12, fill: '#6B7280' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #E4E8E2',
                    borderRadius: '8px',
                    fontSize: '12px',
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Area
                  type="monotone"
                  dataKey="entradas"
                  name="Entradas"
                  stroke="#22C55E"
                  fillOpacity={1}
                  fill="url(#colorEntradas)"
                />
                <Area
                  type="monotone"
                  dataKey="salidas"
                  name="Salidas"
                  stroke="#EF4444"
                  fillOpacity={1}
                  fill="url(#colorSalidas)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Rotation Table */}
          <motion.div
            variants={itemVariants}
            className="bg-card rounded-xl p-5 border border-border shadow-card"
          >
            <h2 className="text-sm font-semibold text-foreground mb-4">
              Rotación de Inventario
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 px-3 font-semibold text-muted-foreground text-xs uppercase tracking-wide">
                      Producto
                    </th>
                    <th className="text-right py-2 px-3 font-semibold text-muted-foreground text-xs uppercase tracking-wide">
                      Entradas
                    </th>
                    <th className="text-right py-2 px-3 font-semibold text-muted-foreground text-xs uppercase tracking-wide">
                      Salidas
                    </th>
                    <th className="text-right py-2 px-3 font-semibold text-muted-foreground text-xs uppercase tracking-wide">
                      Rotación
                    </th>
                    <th className="text-center py-2 px-3 font-semibold text-muted-foreground text-xs uppercase tracking-wide">
                      Rendimiento
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {rotationData.slice(0, 6).map((item, index) => (
                    <tr
                      key={index}
                      className="border-b border-border/50 hover:bg-green-50/30 transition-colors"
                    >
                      <td className="py-2.5 px-3 text-foreground" title={item.fullName}>
                        {item.name}
                      </td>
                      <td className="py-2.5 px-3 text-right text-green-600 font-medium">
                        +{item.entries}
                      </td>
                      <td className="py-2.5 px-3 text-right text-red-600 font-medium">
                        -{item.exits}
                      </td>
                      <td className="py-2.5 px-3 text-right font-semibold text-foreground">
                        {item.rotation}x
                      </td>
                      <td className="py-2.5 px-3 text-center">
                        {getPerformanceBadge(item.performance)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
