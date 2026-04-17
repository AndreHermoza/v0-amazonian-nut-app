'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Package, 
  Boxes, 
  ArrowLeftRight, 
  AlertTriangle, 
  FileBarChart,
  Settings,
  LogOut,
  Leaf,
  User,
} from 'lucide-react';
import { motion } from 'framer-motion';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/' },
  { icon: Package, label: 'Inventario', href: '/inventario' },
  { icon: Boxes, label: 'Productos', href: '/productos' },
  { icon: ArrowLeftRight, label: 'Movimientos', href: '/movimientos' },
  { icon: AlertTriangle, label: 'Alertas', href: '/alertas' },
  { icon: FileBarChart, label: 'Reportes', href: '/reportes' },
  { icon: Settings, label: 'Configuración', href: '/configuracion' },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-screen w-60 bg-sidebar text-sidebar-foreground flex flex-col z-30">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-sidebar-primary/20 flex items-center justify-center">
            <Leaf className="w-6 h-6 text-sidebar-primary" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white tracking-tight">AgroStock</h1>
            <p className="text-xs text-white/60">Gestión Agrícola</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <div className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className="relative block"
              >
                <motion.div
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-sidebar-primary/30 text-white'
                      : 'text-white/70 hover:bg-white/10 hover:text-white'
                  }`}
                  whileHover={{ x: 2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isActive && (
                    <motion.div
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 bg-sidebar-primary rounded-r-full"
                      layoutId="activeIndicator"
                      initial={false}
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <span className="text-sm font-medium">{item.label}</span>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* User Section */}
      <div className="px-3 py-4 border-t border-sidebar-border">
        <div className="flex items-center gap-3 px-3 py-2 mb-2">
          <div className="w-9 h-9 rounded-full bg-sidebar-primary/30 flex items-center justify-center">
            <User className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">Carlos Mendoza</p>
            <p className="text-xs text-white/50">Administrador</p>
          </div>
        </div>
        <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10 text-sm w-full text-white/60 hover:text-white transition-colors">
          <LogOut className="w-4 h-4" />
          <span>Cerrar sesión</span>
        </button>
      </div>
    </aside>
  );
}
