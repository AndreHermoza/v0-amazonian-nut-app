'use client';

import React from 'react';

interface TableColumn {
  key: string;
  label: string;
  align?: 'left' | 'center' | 'right';
  render?: (value: any, row: any) => React.ReactNode;
  className?: string;
}

interface DataTableProps {
  columns: TableColumn[];
  data: any[];
  actions?: (row: any) => React.ReactNode;
  emptyMessage?: string;
}

export function DataTable({ columns, data, actions, emptyMessage = 'No hay datos disponibles' }: DataTableProps) {
  const getAlignClass = (align?: string) => {
    switch (align) {
      case 'center':
        return 'text-center';
      case 'right':
        return 'text-right';
      default:
        return 'text-left';
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`px-6 py-4 font-semibold text-gray-900 text-xs uppercase tracking-tight ${getAlignClass(col.align)}`}
                >
                  {col.label}
                </th>
              ))}
              {actions && <th className="px-6 py-4 font-semibold text-gray-900 text-xs uppercase tracking-tight text-center">Acciones</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data.length > 0 ? (
              data.map((row, idx) => (
                <tr key={idx} className="hover:bg-gray-50 transition-colors duration-150">
                  {columns.map((col) => (
                    <td key={col.key} className={`px-6 py-4 text-sm ${getAlignClass(col.align)} ${col.className || ''}`}>
                      {col.render ? col.render(row[col.key], row) : row[col.key]}
                    </td>
                  ))}
                  {actions && <td className="px-6 py-4 text-center">{actions(row)}</td>}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length + (actions ? 1 : 0)} className="px-6 py-8 text-center text-gray-500">
                  <p className="text-sm font-medium">{emptyMessage}</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
