'use client';

import { Plus, AlertCircle, CheckCircle, Clock } from 'lucide-react';
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
} from 'recharts';

const prestamosData = [
  {
    id: 'PREST-001',
    persona: 'José María López',
    monto_prestado: '$10,000',
    monto_devuelto: '$8,500',
    saldo_pendiente: '$1,500',
    fecha_prestamo: '2024-04-15',
    fecha_vencimiento: '2024-08-15',
    tasa_interes: '5%',
    estado: 'devuelto_parcial',
    dias_vencido: -51,
  },
  {
    id: 'PREST-002',
    persona: 'María García Sánchez',
    monto_prestado: '$15,000',
    monto_devuelto: '$0',
    saldo_pendiente: '$15,000',
    fecha_prestamo: '2024-05-20',
    fecha_vencimiento: '2024-08-20',
    tasa_interes: '6%',
    estado: 'pendiente',
    dias_vencido: -86,
  },
  {
    id: 'PREST-003',
    persona: 'Roberto Fernández',
    monto_prestado: '$8,500',
    monto_devuelto: '$8,500',
    saldo_pendiente: '$0',
    fecha_prestamo: '2024-03-10',
    fecha_vencimiento: '2024-06-10',
    tasa_interes: '4%',
    estado: 'devuelto_total',
    dias_vencido: 5,
  },
  {
    id: 'PREST-004',
    persona: 'Cooperativa Amazónica',
    monto_prestado: '$25,000',
    monto_devuelto: '$5,000',
    saldo_pendiente: '$20,000',
    fecha_prestamo: '2024-06-01',
    fecha_vencimiento: '2024-09-01',
    tasa_interes: '3%',
    estado: 'vencido',
    dias_vencido: 14,
  },
];

const estadosPie = [
  { name: 'Devuelto Total', value: 8500, fill: '#10b981' },
  { name: 'Devuelto Parcial', value: 1500, fill: '#f59e0b' },
  { name: 'Pendiente', value: 35000, fill: '#ef4444' },
];

export default function Prestamos() {
  const totalPrestado = 58500;
  const totalDevuelto = 14000;
  const totalPendiente = 44500;
  const prestamosActivos = prestamosData.filter(
    (p) => p.estado !== 'devuelto_total'
  ).length;

  const getEstadoBadge = (estado: string) => {
    switch (estado) {
      case 'devuelto_total':
        return (
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-green-100/50 text-green-700">
            <CheckCircle className="w-4 h-4" />
            Devuelto
          </span>
        );
      case 'devuelto_parcial':
        return (
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100/50 text-yellow-700">
            <Clock className="w-4 h-4" />
            Parcial
          </span>
        );
      case 'pendiente':
        return (
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100/50 text-blue-700">
            <Clock className="w-4 h-4" />
            Pendiente
          </span>
        );
      case 'vencido':
        return (
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-red-100/50 text-red-700">
            <AlertCircle className="w-4 h-4" />
            Vencido
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full bg-background min-h-screen">
      <main className="w-full">

      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="px-5 md:px-6 py-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-1">Préstamos</h1>
              <p className="text-sm text-foreground/60">Gestiona los préstamos del capital</p>
            </div>
            <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-semibold hover:opacity-90 shadow-md hover:shadow-lg transition-all flex items-center gap-2 whitespace-nowrap">
              <Plus className="w-4 h-4" />
              Nuevo
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-5 md:px-6 py-5">
        {/* Resumen */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
          <div className="bg-card border border-border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 p-4">
            <p className="text-foreground/60 text-xs font-medium">Total Prestado</p>
            <p className="text-2xl font-bold text-foreground mt-1">${totalPrestado.toLocaleString()}</p>
            <p className="text-xs text-foreground/50 mt-0.5">{prestamosData.length} préstamos</p>
          </div>

          <div className="bg-card border border-border rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 p-6">
            <p className="text-foreground/60 text-sm mb-2">Total Devuelto</p>
            <p className="text-3xl font-bold text-green-600">${totalDevuelto.toLocaleString()}</p>
            <p className="text-xs text-green-600/70 mt-2">
              {((totalDevuelto / totalPrestado) * 100).toFixed(1)}% recuperado
            </p>
          </div>

          <div className="bg-card border border-border rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 p-6">
            <p className="text-foreground/60 text-sm mb-2">Pendiente de Cobro</p>
            <p className="text-3xl font-bold text-red-600">${totalPendiente.toLocaleString()}</p>
            <p className="text-xs text-red-600/70 mt-2">
              {((totalPendiente / totalPrestado) * 100).toFixed(1)}% pendiente
            </p>
          </div>

          <div className="bg-card border border-border rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 p-6">
            <p className="text-foreground/60 text-sm mb-2">Préstamos Activos</p>
            <p className="text-3xl font-bold text-foreground">{prestamosActivos}</p>
            <p className="text-xs text-foreground/50 mt-2">Sin completar devolución</p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Estado de Devoluciones */}
          <div className="bg-card border border-border rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 p-6">
            <h2 className="text-xl font-bold text-foreground mb-4">Estado de Devoluciones</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={estadosPie}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: $${value.toLocaleString()}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {estadosPie.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--card)',
                    border: '1px solid var(--border)',
                    borderRadius: '8px',
                  }}
                  formatter={(value) => `$${(value as number).toLocaleString()}`}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Información de Alerta */}
          <div className="bg-card border border-border rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 p-6">
            <h2 className="text-xl font-bold text-foreground mb-4">Alertas</h2>
            <div className="space-y-4">
              <div className="bg-red-100/50 border border-red-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-red-700">1 Préstamo Vencido</p>
                    <p className="text-sm text-red-600/70">
                      Cooperativa Amazónica - 14 días vencido
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-100/50 border border-yellow-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-yellow-700">2 Préstamos por Vencer</p>
                    <p className="text-sm text-yellow-600/70">
                      Vencimiento en los próximos 30 días
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-green-100/50 border border-green-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 p-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-green-700">1 Préstamo Completado</p>
                    <p className="text-sm text-green-600/70">
                      Devuelto en la fecha pactada
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Listado de Préstamos */}
        <div className="bg-card border border-border rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 p-6">
          <h2 className="text-xl font-bold text-foreground mb-6">Listado de Préstamos</h2>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 border-b border-border">
                <tr>
                  <th className="text-left py-4 px-6 font-semibold text-foreground">ID</th>
                  <th className="text-left py-4 px-6 font-semibold text-foreground">Persona</th>
                  <th className="text-right py-4 px-6 font-semibold text-foreground">Monto</th>
                  <th className="text-right py-4 px-6 font-semibold text-foreground">Devuelto</th>
                  <th className="text-right py-4 px-6 font-semibold text-foreground">Pendiente</th>
                  <th className="text-left py-4 px-6 font-semibold text-foreground">Vencimiento</th>
                  <th className="text-left py-4 px-6 font-semibold text-foreground">Estado</th>
                </tr>
              </thead>
              <tbody>
                {prestamosData.map((prestamo) => (
                  <tr
                    key={prestamo.id}
                    className="border-b border-border/50 hover:bg-muted/30 transition-colors"
                  >
                    <td className="py-4 px-6 font-mono text-foreground/70">{prestamo.id}</td>
                    <td className="py-4 px-6 text-foreground">{prestamo.persona}</td>
                    <td className="py-4 px-6 text-right font-semibold text-foreground">
                      {prestamo.monto_prestado}
                    </td>
                    <td className="py-4 px-6 text-right text-green-600 font-semibold">
                      {prestamo.monto_devuelto}
                    </td>
                    <td className="py-4 px-6 text-right text-red-600 font-semibold">
                      {prestamo.saldo_pendiente}
                    </td>
                    <td className="py-4 px-6 text-foreground/70">{prestamo.fecha_vencimiento}</td>
                    <td className="py-4 px-6">{getEstadoBadge(prestamo.estado)}</td>
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
