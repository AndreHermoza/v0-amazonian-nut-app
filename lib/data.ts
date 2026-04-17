// AgroStock - Agricultural Inventory Data

export type ProductCategory = 'Semillas' | 'Fertilizantes' | 'Agroquímicos' | 'Herramientas';
export type StockStatus = 'Óptimo' | 'Bajo' | 'Agotado';
export type MovementType = 'ENTRADA' | 'SALIDA';
export type MovementReason = 'Uso en campo' | 'Venta' | 'Merma' | 'Compra proveedor' | 'Devolución' | 'Otro';

export interface Product {
  id: string;
  code: string;
  name: string;
  brand: string;
  category: ProductCategory;
  stock: number;
  minStock: number;
  unit: string;
  unitPrice: number;
  status: StockStatus;
  senasaRegistration?: string;
  notes?: string;
}

export interface Movement {
  id: string;
  type: MovementType;
  productId: string;
  productName: string;
  category: ProductCategory;
  quantity: number;
  unit: string;
  reason: MovementReason;
  parcel?: string;
  responsible: string;
  date: string;
  reference?: string;
  status: 'Completado' | 'Pendiente';
}

export interface Alert {
  id: string;
  type: 'critical' | 'warning' | 'info';
  title: string;
  description: string;
  productId?: string;
  timestamp: string;
  resolved: boolean;
}

// Sample Products
export const products: Product[] = [
  {
    id: '1',
    code: 'SEMI-001',
    name: 'Semilla Maíz Hybrid H-2024',
    brand: 'Syngenta',
    category: 'Semillas',
    stock: 450,
    minStock: 100,
    unit: 'kg',
    unitPrice: 8.50,
    status: 'Óptimo',
    senasaRegistration: 'SENASA-2024-001',
  },
  {
    id: '2',
    code: 'SEMI-002',
    name: 'Semilla Papa Canchán',
    brand: 'Agropucallpa',
    category: 'Semillas',
    stock: 120,
    minStock: 30,
    unit: 'sacos',
    unitPrice: 45.00,
    status: 'Óptimo',
  },
  {
    id: '3',
    code: 'FERT-001',
    name: 'Fertilizante NPK 15-15-15',
    brand: 'Yara',
    category: 'Fertilizantes',
    stock: 85,
    minStock: 50,
    unit: 'sacos',
    unitPrice: 95.00,
    status: 'Bajo',
    notes: 'Reabastecer antes de temporada de siembra',
  },
  {
    id: '4',
    code: 'FERT-002',
    name: 'Sulfato de Potasio 25kg',
    brand: 'Agroquim',
    category: 'Fertilizantes',
    stock: 0,
    minStock: 20,
    unit: 'sacos',
    unitPrice: 68.00,
    status: 'Agotado',
  },
  {
    id: '5',
    code: 'AGRO-001',
    name: 'Insecticida Orgánico 5L',
    brand: 'BioPest',
    category: 'Agroquímicos',
    stock: 38,
    minStock: 10,
    unit: 'litros',
    unitPrice: 22.50,
    status: 'Óptimo',
    senasaRegistration: 'SENASA-2023-089',
  },
  {
    id: '6',
    code: 'AGRO-002',
    name: 'Fungicida Cobre 1kg',
    brand: 'Cuprogarb',
    category: 'Agroquímicos',
    stock: 12,
    minStock: 15,
    unit: 'kg',
    unitPrice: 28.00,
    status: 'Bajo',
  },
  {
    id: '7',
    code: 'HERM-001',
    name: 'Pala Agrícola Acero Reforzado',
    brand: 'Labrador',
    category: 'Herramientas',
    stock: 15,
    minStock: 5,
    unit: 'unidades',
    unitPrice: 45.00,
    status: 'Óptimo',
  },
  {
    id: '8',
    code: 'HERM-002',
    name: 'Mochila Fumigadora 20L',
    brand: 'Jacto',
    category: 'Herramientas',
    stock: 6,
    minStock: 3,
    unit: 'unidades',
    unitPrice: 180.00,
    status: 'Óptimo',
  },
];

// Sample Movements
export const movements: Movement[] = [
  {
    id: 'TRX-001',
    type: 'ENTRADA',
    productId: '1',
    productName: 'Semilla Maíz Hybrid H-2024',
    category: 'Semillas',
    quantity: 200,
    unit: 'kg',
    reason: 'Compra proveedor',
    responsible: 'Carlos Mendoza',
    date: '15 Abr 2026',
    reference: 'FAC-2026-0145',
    status: 'Completado',
  },
  {
    id: 'TRX-002',
    type: 'SALIDA',
    productId: '3',
    productName: 'Fertilizante NPK 15-15-15',
    category: 'Fertilizantes',
    quantity: 25,
    unit: 'sacos',
    reason: 'Uso en campo',
    parcel: 'Parcela Norte A',
    responsible: 'María García',
    date: '14 Abr 2026',
    status: 'Completado',
  },
  {
    id: 'TRX-003',
    type: 'SALIDA',
    productId: '5',
    productName: 'Insecticida Orgánico 5L',
    category: 'Agroquímicos',
    quantity: 10,
    unit: 'litros',
    reason: 'Uso en campo',
    parcel: 'Parcela Sur B',
    responsible: 'Pedro Huamán',
    date: '13 Abr 2026',
    status: 'Completado',
  },
  {
    id: 'TRX-004',
    type: 'ENTRADA',
    productId: '7',
    productName: 'Pala Agrícola Acero Reforzado',
    category: 'Herramientas',
    quantity: 5,
    unit: 'unidades',
    reason: 'Compra proveedor',
    responsible: 'Carlos Mendoza',
    date: '12 Abr 2026',
    reference: 'FAC-2026-0142',
    status: 'Completado',
  },
  {
    id: 'TRX-005',
    type: 'SALIDA',
    productId: '4',
    productName: 'Sulfato de Potasio 25kg',
    category: 'Fertilizantes',
    quantity: 20,
    unit: 'sacos',
    reason: 'Uso en campo',
    parcel: 'Parcela Este C',
    responsible: 'María García',
    date: '10 Abr 2026',
    status: 'Completado',
  },
  {
    id: 'TRX-006',
    type: 'ENTRADA',
    productId: '2',
    productName: 'Semilla Papa Canchán',
    category: 'Semillas',
    quantity: 50,
    unit: 'sacos',
    reason: 'Compra proveedor',
    responsible: 'Carlos Mendoza',
    date: '08 Abr 2026',
    reference: 'FAC-2026-0138',
    status: 'Completado',
  },
  {
    id: 'TRX-007',
    type: 'SALIDA',
    productId: '6',
    productName: 'Fungicida Cobre 1kg',
    category: 'Agroquímicos',
    quantity: 8,
    unit: 'kg',
    reason: 'Uso en campo',
    parcel: 'Parcela Norte A',
    responsible: 'Pedro Huamán',
    date: '05 Abr 2026',
    status: 'Completado',
  },
  {
    id: 'TRX-008',
    type: 'SALIDA',
    productId: '1',
    productName: 'Semilla Maíz Hybrid H-2024',
    category: 'Semillas',
    quantity: 100,
    unit: 'kg',
    reason: 'Uso en campo',
    parcel: 'Parcela Oeste D',
    responsible: 'María García',
    date: '03 Abr 2026',
    status: 'Completado',
  },
];

// Sample Alerts
export const alerts: Alert[] = [
  {
    id: 'ALT-001',
    type: 'critical',
    title: 'Producto Agotado',
    description: 'Sulfato de Potasio 25kg - Sin stock desde hace 5 días',
    productId: '4',
    timestamp: '15 Abr 2026, 08:30',
    resolved: false,
  },
  {
    id: 'ALT-002',
    type: 'warning',
    title: 'Stock Bajo',
    description: 'Fertilizante NPK 15-15-15 - 85 sacos (mín: 50)',
    productId: '3',
    timestamp: '14 Abr 2026, 14:20',
    resolved: false,
  },
  {
    id: 'ALT-003',
    type: 'warning',
    title: 'Stock Bajo',
    description: 'Fungicida Cobre 1kg - 12 kg (mín: 15)',
    productId: '6',
    timestamp: '13 Abr 2026, 10:15',
    resolved: false,
  },
  {
    id: 'ALT-004',
    type: 'info',
    title: 'Movimiento Inusual',
    description: 'Alto consumo de Semilla Maíz en los últimos 7 días',
    productId: '1',
    timestamp: '12 Abr 2026, 16:45',
    resolved: false,
  },
];

// Monthly consumption data for charts
export const monthlyConsumption = [
  { month: 'Nov', Semillas: 320, Fertilizantes: 180, Agroquímicos: 95, Herramientas: 12 },
  { month: 'Dic', Semillas: 280, Fertilizantes: 220, Agroquímicos: 110, Herramientas: 8 },
  { month: 'Ene', Semillas: 450, Fertilizantes: 350, Agroquímicos: 145, Herramientas: 15 },
  { month: 'Feb', Semillas: 380, Fertilizantes: 290, Agroquímicos: 120, Herramientas: 10 },
  { month: 'Mar', Semillas: 520, Fertilizantes: 410, Agroquímicos: 165, Herramientas: 18 },
  { month: 'Abr', Semillas: 420, Fertilizantes: 380, Agroquímicos: 140, Herramientas: 14 },
];

// Stock distribution by category
export const stockDistribution = [
  { name: 'Semillas', value: 570, percentage: 45, fill: '#1A5C3A' },
  { name: 'Fertilizantes', value: 85, percentage: 7, fill: '#2D8653' },
  { name: 'Agroquímicos', value: 50, percentage: 4, fill: '#F59E0B' },
  { name: 'Herramientas', value: 21, percentage: 2, fill: '#3B82F6' },
];

// Helper functions
export function formatCurrency(amount: number): string {
  return `S/. ${amount.toLocaleString('es-PE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export function getCategoryColor(category: ProductCategory): string {
  const colors: Record<ProductCategory, string> = {
    'Semillas': '#1A5C3A',
    'Fertilizantes': '#2D8653',
    'Agroquímicos': '#F59E0B',
    'Herramientas': '#3B82F6',
  };
  return colors[category];
}

export function getStatusInfo(status: StockStatus): { color: string; bgColor: string; borderColor: string } {
  const statusMap: Record<StockStatus, { color: string; bgColor: string; borderColor: string }> = {
    'Óptimo': { color: 'text-green-700', bgColor: 'bg-green-50', borderColor: 'border-green-200' },
    'Bajo': { color: 'text-amber-700', bgColor: 'bg-amber-50', borderColor: 'border-amber-200' },
    'Agotado': { color: 'text-red-700', bgColor: 'bg-red-50', borderColor: 'border-red-200' },
  };
  return statusMap[status];
}

export function calculateTotalInventoryValue(): number {
  return products.reduce((total, product) => total + (product.stock * product.unitPrice), 0);
}

export function getTotalStock(): number {
  return products.reduce((total, product) => total + product.stock, 0);
}

export function getAlertCounts(): { critical: number; warning: number; info: number } {
  return {
    critical: alerts.filter(a => a.type === 'critical' && !a.resolved).length,
    warning: alerts.filter(a => a.type === 'warning' && !a.resolved).length,
    info: alerts.filter(a => a.type === 'info' && !a.resolved).length,
  };
}
