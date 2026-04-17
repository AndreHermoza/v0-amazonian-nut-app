'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  BarChart3, 
  ShoppingCart, 
  Package, 
  DollarSign, 
  Handshake, 
  Users,
  LogOut,
  Menu,
  X,
  Boxes
} from 'lucide-react';
import { useState } from 'react';
import { LogoSVG } from './logo';

const menuItems = [
  { icon: BarChart3, label: 'Dashboard', href: '/', description: 'Resumen general' },
  { icon: ShoppingCart, label: 'Transacciones', href: '/transacciones', description: 'Compra y venta' },
  { icon: Boxes, label: 'Productos', href: '/productos', description: 'Catálogo de productos' },
  { icon: Package, label: 'Inventario', href: '/inventario', description: 'Stock de nuez' },
  { icon: DollarSign, label: 'Capital', href: '/capital', description: 'Movimientos' },
  { icon: Handshake, label: 'Préstamos', href: '/prestamos', description: 'Gestión de créditos' },
  { icon: Users, label: 'Contactos', href: '/contactos', description: 'Clientes y proveedores' },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-40 md:hidden p-2 hover:bg-sidebar-accent rounded-lg"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-screen w-64 bg-sidebar text-sidebar-foreground border-r border-sidebar-border shadow-lg z-30 flex flex-col">
        {/* Logo */}
        <div className="px-6 py-5 border-b border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 flex-shrink-0">
              <LogoSVG />
            </div>
            <div>
              <p className="text-xs font-bold text-sidebar-foreground tracking-wider leading-tight">CASTAÑA</p>
              <p className="text-xs text-sidebar-foreground/70">Gestión de Nuez</p>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 overflow-y-auto flex flex-col gap-1 px-3 py-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-lg transition-all duration-200 group text-sm ${
                  isActive
                    ? 'bg-white/25 text-white font-semibold'
                    : 'text-sidebar-foreground/90 hover:bg-white/15'
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <div className="block">
                  <p className="text-sm font-semibold leading-tight">{item.label}</p>
                  <p className="text-xs opacity-70">{item.description}</p>
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="px-3 py-4 border-t border-sidebar-border">
          <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10 text-sm w-full text-sidebar-foreground/80 hover:text-sidebar-foreground transition-colors">
            <LogOut className="w-4 h-4 flex-shrink-0" />
            <span className="hidden md:inline text-xs">Cerrar sesión</span>
          </button>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
