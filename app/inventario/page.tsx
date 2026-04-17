'use client';

import { Plus, AlertTriangle, TrendingUp, Eye, Edit2, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { DeleteConfirmModal, SuccessModal, DetailsModal } from '@/components/crud-modal';
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

const inventarioData = [
  {
    id: 1,
    producto: 'Nuez de Brasil',
    cantidad_latas: 650,
    cantidad_barricas: 108.33,
    precio_unitario: '$41',
    valor_total: '$26,650',
    ultimo_movimiento: '2024-06-15',
    estado: 'optimo',
    movimientos: [
      { fecha: 'Jun 15', cantidad: 650 },
      { fecha: 'Jun 14', cantidad: 630 },
      { fecha: 'Jun 13', cantidad: 600 },
      { fecha: 'Jun 12', cantidad: 580 },
      { fecha: 'Jun 11', cantidad: 550 },
      { fecha: 'Jun 10', cantidad: 520 },
    ],
  },
];

const movimientosRecientes = [
  {
    id: 1,
    tipo: 'ENTRADA',
    producto: 'Nuez de Brasil',
    cantidad: 50,
    fecha: '2024-06-15',
    hora: '10:30 AM',
    referencia: 'TRX-006',
    usuario: 'Admin',
  },
  {
    id: 2,
    tipo: 'SALIDA',
    producto: 'Nuez de Brasil',
    cantidad: 30,
    fecha: '2024-06-15',
    hora: '09:15 AM',
    referencia: 'TRX-005',
    usuario: 'Admin',
  },
  {
    id: 3,
    tipo: 'ENTRADA',
    producto: 'Nuez de Brasil',
    cantidad: 200,
    fecha: '2024-06-14',
    hora: '02:15 PM',
    referencia: 'TRX-004',
    usuario: 'Gerente',
  },
  {
    id: 4,
    tipo: 'SALIDA',
    producto: 'Nuez de Brasil',
    cantidad: 100,
    fecha: '2024-06-13',
    hora: '11:45 AM',
    referencia: 'TRX-003',
    usuario: 'Vendedor',
  },
];

export default function Inventario() {
  return (
    <div className="w-full bg-background min-h-screen">
      <main className="w-full">

      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="px-5 md:px-6 py-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-1">Inventario</h1>
              <p className="text-sm text-foreground/60">Gestiona el stock de Nuez de Brasil</p>
            </div>
            <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-semibold hover:opacity-90 shadow-md hover:shadow-lg transition-all flex items-center gap-2 whitespace-nowrap">
              <Plus className="w-4 h-4" />
              Ajuste
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-8 py-6">
        {/* Resumen */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-card border border-border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 p-4">
            <p className="text-foreground/60 text-xs font-semibold uppercase tracking-wide mb-2">Stock Total</p>
            <p className="text-2xl font-bold text-foreground">850 latas</p>
            <p className="text-xs text-foreground/50 mt-1">142 barricas equivalentes</p>
          </div>
          <div className="bg-card border border-border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 p-4">
            <p className="text-foreground/60 text-xs font-semibold uppercase tracking-wide mb-2">Valor en Inventario</p>
            <p className="text-2xl font-bold text-foreground">$26,650</p>
            <p className="text-xs text-foreground/50 mt-1">A precio unitario actual</p>
          </div>
          <div className="bg-card border border-border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 p-4">
            <p className="text-foreground/60 text-xs font-semibold uppercase tracking-wide mb-2">Movimientos Hoy</p>
            <p className="text-2xl font-bold text-foreground">2</p>
            <p className="text-xs text-foreground/50 mt-1">Entradas y salidas</p>
          </div>
        </div>

        {/* Productos */}
        <div className="bg-card border border-border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 p-6 mb-6">
          <h2 className="text-xl font-bold text-foreground mb-6">Productos en Stock</h2>
          <div className="grid grid-cols-1 gap-6">
            {inventarioData.map((producto) => (
              <div key={producto.id} className="border border-border rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 p-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                  <div>
                    <p className="text-foreground/60 text-sm mb-2">Producto</p>
                    <p className="text-lg font-bold text-foreground">{producto.producto}</p>
                  </div>
                  <div>
                    <p className="text-foreground/60 text-sm mb-2">Cantidad en Latas</p>
                    <p className="text-lg font-bold text-foreground">{producto.cantidad_latas}</p>
                  </div>
                  <div>
                    <p className="text-foreground/60 text-sm mb-2">Cantidad en Barricas</p>
                    <p className="text-lg font-bold text-foreground">
                      {producto.cantidad_barricas.toFixed(2)}
                    </p>
                  </div>
                  <div>
                    <p className="text-foreground/60 text-sm mb-2">Valor Total</p>
                    <p className="text-lg font-bold text-green-600">{producto.valor_total}</p>
                  </div>
                </div>

                {/* Chart */}
                <div className="mb-6 pt-6 border-t border-border">
                  <p className="text-sm font-semibold text-foreground mb-4">Tendencia de Stock (Últimos 6 días)</p>
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={producto.movimientos}>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                      <XAxis dataKey="fecha" stroke="var(--foreground)" />
                      <YAxis stroke="var(--foreground)" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'var(--card)',
                          border: '1px solid var(--border)',
                          borderRadius: '8px',
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="cantidad"
                        stroke="var(--primary)"
                        strokeWidth={2}
                        dot={{ fill: 'var(--primary)', r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                {/* Meta datos */}
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-foreground/60">
                      Último movimiento: {producto.ultimo_movimiento}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                        producto.estado === 'optimo'
                          ? 'bg-green-100/50 text-green-700'
                          : 'bg-yellow-100/50 text-yellow-700'
                      }`}
                    >
                      {producto.estado === 'optimo' ? (
                        <TrendingUp className="w-3 h-3" />
                      ) : (
                        <AlertTriangle className="w-3 h-3" />
                      )}
                      Estado: {producto.estado}
                    </span>
                  </div>
                  <button className="text-primary hover:text-primary/80 font-semibold text-sm">
                    Ver historial →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Movimientos Recientes */}
        <div className="bg-card border border-border rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 p-6">
          <h2 className="text-xl font-bold text-foreground mb-6">Movimientos Recientes</h2>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 border-b border-border">
                <tr>
                  <th className="text-left py-4 px-6 font-semibold text-foreground">Tipo</th>
                  <th className="text-left py-4 px-6 font-semibold text-foreground">Producto</th>
                  <th className="text-right py-4 px-6 font-semibold text-foreground">Cantidad</th>
                  <th className="text-left py-4 px-6 font-semibold text-foreground">Fecha</th>
                  <th className="text-left py-4 px-6 font-semibold text-foreground">Referencia</th>
                  <th className="text-left py-4 px-6 font-semibold text-foreground">Usuario</th>
                </tr>
              </thead>
              <tbody>
                {movimientosRecientes.map((movimiento) => (
                  <tr
                    key={movimiento.id}
                    className="border-b border-border/50 hover:bg-muted/30 transition-colors"
                  >
                    <td className="py-4 px-6">
                      <span
                        className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                          movimiento.tipo === 'ENTRADA'
                            ? 'bg-green-100/50 text-green-700'
                            : 'bg-red-100/50 text-red-700'
                        }`}
                      >
                        {movimiento.tipo}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-foreground">{movimiento.producto}</td>
                    <td className="py-4 px-6 text-right font-semibold text-foreground">
                      {movimiento.cantidad} latas
                    </td>
                    <td className="py-4 px-6 text-foreground/70">
                      <div className="flex flex-col">
                        <span>{movimiento.fecha}</span>
                        <span className="text-xs text-foreground/50">{movimiento.hora}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 font-mono text-foreground/70">{movimiento.referencia}</td>
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
