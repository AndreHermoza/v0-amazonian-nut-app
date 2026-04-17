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
  Sprout,
  User,
  Search,
  ChevronRight,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/', badge: null },
  { icon: Package, label: 'Inventario', href: '/inventario', badge: null },
  { icon: Boxes, label: 'Productos', href: '/productos', badge: '8' },
  { icon: ArrowLeftRight, label: 'Movimientos', href: '/movimientos', badge: null },
  { icon: AlertTriangle, label: 'Alertas', href: '/alertas', badge: '3' },
  { icon: FileBarChart, label: 'Reportes', href: '/reportes', badge: null },
];

interface SidebarProps {
  onOpenCommandPalette?: () => void;
}

export function Sidebar({ onOpenCommandPalette }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-sidebar text-sidebar-foreground flex flex-col z-30">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] to-transparent pointer-events-none" />
      
      {/* Logo */}
      <div className="relative px-5 py-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-sidebar-primary to-emerald-400 flex items-center justify-center shadow-lg shadow-sidebar-primary/20">
            <Sprout className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight">AgroStock</h1>
            <p className="text-xs text-white/50 font-medium">Gestión Agrícola</p>
          </div>
        </div>
      </div>

      {/* Search Button */}
      <div className="relative px-4 py-4">
        <button
          onClick={onOpenCommandPalette}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-200 group"
        >
          <Search className="w-4 h-4 text-white/50 group-hover:text-white/70" />
          <span className="text-sm text-white/50 group-hover:text-white/70 flex-1 text-left">Buscar...</span>
          <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-white/10 text-white/40 text-[10px] font-mono">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* Navigation */}
      <nav className="relative flex-1 overflow-y-auto px-3 py-2 scrollbar-thin">
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
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${
                    isActive
                      ? 'bg-sidebar-primary/20 text-white'
                      : 'text-white/60 hover:bg-white/5 hover:text-white'
                  }`}
                  whileHover={{ x: 2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-7 bg-sidebar-primary rounded-r-full"
                        layoutId="activeIndicator"
                        initial={{ opacity: 0, scaleY: 0 }}
                        animate={{ opacity: 1, scaleY: 1 }}
                        exit={{ opacity: 0, scaleY: 0 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                  </AnimatePresence>
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                    isActive ? 'bg-sidebar-primary/30' : 'bg-white/5'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-medium flex-1">{item.label}</span>
                  {item.badge && (
                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                      item.label === 'Alertas' 
                        ? 'bg-red-500/20 text-red-300' 
                        : 'bg-white/10 text-white/70'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                  {isActive && (
                    <ChevronRight className="w-4 h-4 text-sidebar-primary" />
                  )}
                </motion.div>
              </Link>
            );
          })}
        </div>
        
        {/* Settings - separated */}
        <div className="mt-4 pt-4 border-t border-sidebar-border">
          <Link href="/configuracion" className="relative block">
            <motion.div
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${
                pathname === '/configuracion'
                  ? 'bg-sidebar-primary/20 text-white'
                  : 'text-white/60 hover:bg-white/5 hover:text-white'
              }`}
              whileHover={{ x: 2 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                pathname === '/configuracion' ? 'bg-sidebar-primary/30' : 'bg-white/5'
              }`}>
                <Settings className="w-4 h-4" />
              </div>
              <span className="text-sm font-medium">Configuración</span>
            </motion.div>
          </Link>
        </div>
      </nav>

      {/* User Section */}
      <div className="relative px-4 py-4 border-t border-sidebar-border">
        <div className="flex items-center gap-3 px-2 py-2 mb-2">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sidebar-primary to-emerald-400 flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-400 rounded-full border-2 border-sidebar" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-white truncate">Carlos Mendoza</p>
            <p className="text-xs text-white/40">Administrador</p>
          </div>
        </div>
        <motion.button 
          className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-white/5 text-sm w-full text-white/50 hover:text-white/80 transition-all duration-200"
          whileHover={{ x: 2 }}
          whileTap={{ scale: 0.98 }}
        >
          <LogOut className="w-4 h-4" />
          <span>Cerrar sesión</span>
        </motion.button>
      </div>
    </aside>
  );
}
