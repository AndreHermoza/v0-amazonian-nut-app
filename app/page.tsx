'use client';

import {
  BarChart,
  Bar,
  LineChart,
  Line,
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
  DollarSign,
  Package,
  TrendingUp,
  AlertCircle,
  Calendar,
  ArrowUpRight,
  ArrowDownLeft,
} from 'lucide-react';
import Link from 'next/link';

const incomeExpenseData = [
  { month: 'Enero', ingresos: 45000, egresos: 28000 },
  { month: 'Febrero', ingresos: 52000, egresos: 31000 },
  { month: 'Marzo', ingresos: 48000, egresos: 29500 },
  { month: 'Abril', ingresos: 61000, egresos: 35000 },
  { month: 'Mayo', ingresos: 55000, egresos: 32000 },
  { month: 'Junio', ingresos: 67000, egresos: 38000 },
];

const inventarioData = [
  { name: 'En Stock', value: 650, fill: '#2D7F6E' },
  { name: 'Stock Bajo', value: 150, fill: '#F5A623' },
  { name: 'Agotado', value: 50, fill: '#DC2626' },
];

const recentTransactions = [
  { id: 1, type: 'COMPRA', origin: 'Comunidad Achual', amount: 8500, date: '27 Jun 2025', status: 'Completado', latas: 850 },
  { id: 2, type: 'VENTA', origin: 'Exportadora Lima', amount: 12300, date: '25 Jun 2025', status: 'Completado', latas: 1230 },
  { id: 3, type: 'COMPRA', origin: 'Aldea Aguaruna', amount: 6200, date: '23 Jun 2025', status: 'Pendiente', latas: 620 },
  { id: 4, type: 'VENTA', origin: 'Distribuidora Iquitos', amount: 15800, date: '20 Jun 2025', status: 'Completado', latas: 1580 },
];

export default function Dashboard() {
  const totalCapital = 45230;
  const inventoryTotal = 850;
  const transactionCount = 12;
  const pendingLoans = 24500;

  return (
    <div className="w-full bg-background">
      <main className="w-full">
        {/* Header */}
        <header className="border-b border-border bg-card">
          <div className="px-6 py-6 md:px-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground">Sistema de Gestión de Nuez de Brasil</h1>
                <p className="text-foreground/60 mt-2 leading-relaxed">Bienvenido al panel de control. Monitorea tus operaciones y finanzas en tiempo real.</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm text-foreground/60 whitespace-nowrap">
                  <Calendar className="w-5 h-5" />
                  <span>{new Date().toLocaleDateString('es-PE', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}</span>
                </div>
                <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
                  <span className="text-sm font-bold text-primary">P</span>
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-semibold text-foreground">Paul</p>
                  <p className="text-xs text-foreground/60">Administrador</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-5 md:p-6 bg-background">
          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
            {/* Capital Disponible */}
            <div className="bg-card rounded-xl p-5 border border-border shadow-soft hover:shadow-md transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-foreground/60 font-semibold uppercase tracking-wide">Capital</p>
                  <p className="text-3xl font-black text-primary mt-2">S/. {totalCapital.toLocaleString()}</p>
                </div>
                <div className="bg-emerald-100 p-3 rounded-lg flex-shrink-0">
                  <DollarSign className="w-6 h-6 text-emerald-700" />
                </div>
              </div>
              <div className="flex items-center gap-1 text-xs text-emerald-600 font-semibold mt-3">
                <TrendingUp className="w-3 h-3" />
                <span>+12.5%</span>
              </div>
            </div>

            {/* Inventario Total */}
            <div className="bg-card rounded-xl p-5 border border-border shadow-soft hover:shadow-md transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-foreground/60 font-semibold uppercase tracking-wide">Inventario</p>
                  <p className="text-3xl font-black text-primary mt-2">{inventoryTotal}</p>
                  <p className="text-xs text-foreground/50 mt-1">latas</p>
                </div>
                <div className="bg-blue-100 p-3 rounded-lg flex-shrink-0">
                  <Package className="w-6 h-6 text-blue-700" />
                </div>
              </div>
            </div>

            {/* Transacciones */}
            <div className="bg-card rounded-xl p-5 border border-border shadow-soft hover:shadow-md transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-foreground/60 font-semibold uppercase tracking-wide">Transacciones</p>
                  <p className="text-3xl font-black text-secondary mt-2">{transactionCount}</p>
                </div>
                <div className="bg-amber-100 p-3 rounded-lg flex-shrink-0">
                  <TrendingUp className="w-6 h-6 text-amber-700" />
                </div>
              </div>
            </div>

            {/* Préstamos Pendientes */}
            <div className="bg-card rounded-xl p-5 border border-border shadow-soft hover:shadow-md transition-all duration-300" style={{ borderLeft: '4px solid #DC2626' }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-foreground/60 font-semibold uppercase tracking-wide">Préstamos</p>
                  <p className="text-3xl font-black text-foreground mt-2">S/. {(pendingLoans/1000).toFixed(0)}K</p>
                </div>
                <div className="bg-red-100 p-3 rounded-lg flex-shrink-0">
                  <AlertCircle className="w-6 h-6 text-red-700" />
                </div>
              </div>
            </div>
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 mb-6">
            {/* Income vs Expense Chart */}
            <div className="lg:col-span-2 bg-card rounded-xl p-5 border border-border shadow-soft">
              <h2 className="text-sm font-bold text-foreground mb-4">Ingresos vs Egresos (6 Meses)</h2>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={incomeExpenseData} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="month" stroke="var(--foreground)" style={{ fontSize: '12px' }} />
                  <YAxis stroke="var(--foreground)" style={{ fontSize: '12px' }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'var(--card)',
                      border: '1px solid var(--border)',
                      borderRadius: '12px'
                    }}
                    formatter={(value) => `S/. ${value.toLocaleString()}`}
                  />
                  <Legend wrapperStyle={{ fontSize: '12px' }} />
                  <Bar dataKey="ingresos" fill="#2D7F6E" name="Ingresos" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="egresos" fill="#D97363" name="Egresos" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Inventory Status */}
            <div className="bg-card rounded-xl p-5 border border-border shadow-soft flex flex-col">
              <h2 className="text-sm font-bold text-foreground mb-4">Estado de Inventario</h2>
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie
                    data={inventarioData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    dataKey="value"
                    paddingAngle={2}
                  >
                    {inventarioData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value} latas`} />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-3 space-y-1">
                {inventarioData.map((item, i) => (
                  <div key={i} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.fill }} />
                      <span className="text-foreground/70">{item.name}</span>
                    </div>
                    <span className="font-semibold text-foreground">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        {/* Recent Transactions */}
        <div className="bg-card rounded-xl p-5 border border-border shadow-soft">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-foreground">Transacciones Recientes</h2>
              <Link href="/transacciones" className="text-primary hover:text-primary/70 text-sm font-medium transition-colors">Ver todas →</Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-semibold text-foreground/70">Tipo</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground/70">Origen/Destino</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground/70">Cantidad</th>
                    <th className="text-right py-3 px-4 font-semibold text-foreground/70">Monto</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground/70">Fecha</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground/70">Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {recentTransactions.map((tx) => (
                    <tr key={tx.id} className="border-b border-border/50 hover:bg-accent/5 transition-colors">
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                          tx.type === 'COMPRA' 
                            ? 'bg-blue-50 text-blue-700' 
                            : 'bg-green-50 text-green-700'
                        }`}>
                          {tx.type === 'COMPRA' ? 'COMPRA' : 'VENTA'}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-foreground">{tx.origin}</td>
                      <td className="py-3 px-4 text-foreground">{tx.latas} latas</td>
                      <td className="py-3 px-4 text-right font-semibold text-foreground">S/. {tx.amount.toLocaleString()}</td>
                      <td className="py-3 px-4 text-foreground/60 text-xs">{tx.date}</td>
                      <td className="py-3 px-4">
                        <span className={`text-xs font-medium px-2 py-1 rounded ${
                          tx.status === 'Completado'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {tx.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
