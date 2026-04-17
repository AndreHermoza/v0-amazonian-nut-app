'use client';

import { Plus, ArrowUpRight, ArrowDownLeft, TrendingUp } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';

const capitalData = [
  { mes: 'Ene', saldo: 10000 },
  { mes: 'Feb', saldo: 12500 },
  { mes: 'Mar', saldo: 15200 },
  { mes: 'Abr', saldo: 18300 },
  { mes: 'May', saldo: 22500 },
  { mes: 'Jun', saldo: 26800 },
];

const flujoCapital = [
  { mes: 'Ene', ingresos: 5000, egresos: 2500 },
  { mes: 'Feb', ingresos: 6500, egresos: 3200 },
  { mes: 'Mar', ingresos: 7200, egresos: 4000 },
  { mes: 'Abr', ingresos: 8500, egresos: 5100 },
  { mes: 'May', ingresos: 9800, egresos: 6200 },
  { mes: 'Jun', ingresos: 10500, egresos: 7100 },
];

const movimientos = [
  {
    id: 1,
    tipo: 'INGRESO',
    concepto: 'Venta - TRX-001',
    monto: '$12,500',
    saldo: '$45,230',
    fecha: '2024-06-15',
    hora: '10:30 AM',
    usuario: 'Admin',
  },
  {
    id: 2,
    tipo: 'EGRESO',
    concepto: 'Compra - TRX-002',
    monto: '$8,200',
    saldo: '$32,730',
    fecha: '2024-06-14',
    hora: '02:15 PM',
    usuario: 'Gerente',
  },
  {
    id: 3,
    tipo: 'INGRESO',
    concepto: 'Venta - TRX-003',
    monto: '$6,750',
    saldo: '$40,930',
    fecha: '2024-06-13',
    hora: '11:45 AM',
    usuario: 'Admin',
  },
  {
    id: 4,
    tipo: 'EGRESO',
    concepto: 'Devolución Préstamo - PREST-004',
    monto: '$5,000',
    saldo: '$34,180',
    fecha: '2024-06-12',
    hora: '03:20 PM',
    usuario: 'Contador',
  },
  {
    id: 5,
    tipo: 'INGRESO',
    concepto: 'Venta - TRX-005',
    monto: '$2,050',
    saldo: '$39,180',
    fecha: '2024-06-11',
    hora: '09:10 AM',
    usuario: 'Vendedor',
  },
];

const capitalInicial = 10000;
const capitalActual = 26800;
const totalIngresos = 38750;
const totalEgresos = 24300;
const totalMovimientos = movimientos.length;

export default function Capital() {
  return (
    <div className="w-full bg-background min-h-screen">
      <main className="w-full">

      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="px-5 md:px-6 py-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-1">Capital</h1>
              <p className="text-sm text-foreground/60">Monitorea movimientos y saldo</p>
            </div>
            <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-semibold hover:opacity-90 shadow-md hover:shadow-lg transition-all flex items-center gap-2 whitespace-nowrap">
              <Plus className="w-4 h-4" />
              Movimiento
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-8 py-6">
        {/* Resumen Capital */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 p-4">
            <p className="text-foreground/60 text-xs font-semibold uppercase tracking-wide mb-2">Capital Inicial</p>
            <p className="text-2xl font-bold text-foreground">${capitalInicial.toLocaleString()}</p>
            <p className="text-xs text-foreground/50 mt-1">Inversión inicial</p>
          </div>

          <div className="bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/20 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 p-4">
            <p className="text-foreground/60 text-xs font-semibold uppercase tracking-wide mb-2">Capital Actual</p>
            <p className="text-2xl font-bold text-foreground">${capitalActual.toLocaleString()}</p>
            <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              +{((capitalActual - capitalInicial) / capitalInicial * 100).toFixed(1)}%
            </p>
          </div>

          <div className="bg-gradient-to-br from-green-100/50 to-green-100/30 border border-green-200/50 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 p-4">
            <p className="text-foreground/60 text-xs font-semibold uppercase tracking-wide mb-2">Total Ingresos</p>
            <p className="text-2xl font-bold text-green-600">${totalIngresos.toLocaleString()}</p>
            <p className="text-xs text-green-600/70 mt-1">En {totalMovimientos} movimientos</p>
          </div>

          <div className="bg-gradient-to-br from-red-100/50 to-red-100/30 border border-red-200/50 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 p-4">
            <p className="text-foreground/60 text-xs font-semibold uppercase tracking-wide mb-2">Total Egresos</p>
            <p className="text-2xl font-bold text-red-600">${totalEgresos.toLocaleString()}</p>
            <p className="text-xs text-red-600/70 mt-1">En {totalMovimientos} movimientos</p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Tendencia de Capital */}
          <div className="bg-card border border-border rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 p-6">
            <h2 className="text-xl font-bold text-foreground mb-4">Tendencia de Capital</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={capitalData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="mes" stroke="var(--foreground)" />
                <YAxis stroke="var(--foreground)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--card)',
                    border: '1px solid var(--border)',
                    borderRadius: '8px',
                  }}
                  formatter={(value) => `$${value.toLocaleString()}`}
                />
                <Line
                  type="monotone"
                  dataKey="saldo"
                  stroke="var(--primary)"
                  strokeWidth={3}
                  dot={{ fill: 'var(--primary)', r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Flujo de Capital */}
          <div className="bg-card border border-border rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 p-6">
            <h2 className="text-xl font-bold text-foreground mb-4">Flujo de Capital</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={flujoCapital}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="mes" stroke="var(--foreground)" />
                <YAxis stroke="var(--foreground)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--card)',
                    border: '1px solid var(--border)',
                    borderRadius: '8px',
                  }}
                  formatter={(value) => `$${value.toLocaleString()}`}
                />
                <Bar dataKey="ingresos" fill="var(--chart-1)" radius={[8, 8, 0, 0]} />
                <Bar dataKey="egresos" fill="var(--chart-2)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Movimientos */}
        <div className="bg-card border border-border rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 p-6">
          <h2 className="text-xl font-bold text-foreground mb-6">Movimientos Recientes</h2>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 border-b border-border">
                <tr>
                  <th className="text-left py-4 px-6 font-semibold text-foreground">Tipo</th>
                  <th className="text-left py-4 px-6 font-semibold text-foreground">Concepto</th>
                  <th className="text-right py-4 px-6 font-semibold text-foreground">Monto</th>
                  <th className="text-right py-4 px-6 font-semibold text-foreground">Saldo</th>
                  <th className="text-left py-4 px-6 font-semibold text-foreground">Fecha</th>
                  <th className="text-left py-4 px-6 font-semibold text-foreground">Usuario</th>
                </tr>
              </thead>
              <tbody>
                {movimientos.map((movimiento) => (
                  <tr
                    key={movimiento.id}
                    className="border-b border-border/50 hover:bg-muted/30 transition-colors"
                  >
                    <td className="py-4 px-6">
                      <span
                        className={`inline-flex items-center gap-2 font-semibold text-xs px-3 py-1 rounded-full ${
                          movimiento.tipo === 'INGRESO'
                            ? 'bg-green-100/50 text-green-700'
                            : 'bg-red-100/50 text-red-700'
                        }`}
                      >
                        {movimiento.tipo === 'INGRESO' ? (
                          <ArrowUpRight className="w-4 h-4" />
                        ) : (
                          <ArrowDownLeft className="w-4 h-4" />
                        )}
                        {movimiento.tipo}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-foreground">{movimiento.concepto}</td>
                    <td
                      className={`py-4 px-6 text-right font-bold ${
                        movimiento.tipo === 'INGRESO' ? 'text-green-600' : 'text-red-600'
                      }`}
                    >
                      {movimiento.tipo === 'INGRESO' ? '+' : '-'}{movimiento.monto}
                    </td>
                    <td className="py-4 px-6 text-right font-semibold text-foreground">
                      {movimiento.saldo}
                    </td>
                    <td className="py-4 px-6 text-foreground/70">
                      <div className="flex flex-col">
                        <span>{movimiento.fecha}</span>
                        <span className="text-xs text-foreground/50">{movimiento.hora}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-foreground">{movimiento.usuario}</td>
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
