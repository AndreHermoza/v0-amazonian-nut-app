'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { Command } from 'cmdk';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Package,
  Boxes,
  ArrowLeftRight,
  AlertTriangle,
  FileBarChart,
  Settings,
  Search,
  Plus,
  FileText,
  Download,
} from 'lucide-react';

const pages = [
  { icon: LayoutDashboard, name: 'Dashboard', href: '/', keywords: ['inicio', 'home', 'resumen'] },
  { icon: Package, name: 'Inventario', href: '/inventario', keywords: ['stock', 'almacen'] },
  { icon: Boxes, name: 'Productos', href: '/productos', keywords: ['items', 'catalogo'] },
  { icon: ArrowLeftRight, name: 'Movimientos', href: '/movimientos', keywords: ['entradas', 'salidas', 'transacciones'] },
  { icon: AlertTriangle, name: 'Alertas', href: '/alertas', keywords: ['notificaciones', 'avisos'] },
  { icon: FileBarChart, name: 'Reportes', href: '/reportes', keywords: ['informes', 'estadisticas'] },
  { icon: Settings, name: 'Configuración', href: '/configuracion', keywords: ['ajustes', 'opciones'] },
];

const actions = [
  { icon: Plus, name: 'Nuevo Producto', action: 'new-product', keywords: ['agregar', 'crear'] },
  { icon: ArrowLeftRight, name: 'Registrar Movimiento', action: 'new-movement', keywords: ['entrada', 'salida'] },
  { icon: FileText, name: 'Generar Reporte', action: 'generate-report', keywords: ['exportar', 'pdf'] },
  { icon: Download, name: 'Exportar Datos', action: 'export-data', keywords: ['descargar', 'excel'] },
];

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const router = useRouter();
  const [search, setSearch] = React.useState('');

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange(!open);
      }
      if (e.key === 'Escape') {
        onOpenChange(false);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [open, onOpenChange]);

  const handleSelect = (value: string) => {
    onOpenChange(false);
    setSearch('');
    
    // Check if it's a page navigation
    const page = pages.find(p => p.href === value);
    if (page) {
      router.push(page.href);
      return;
    }
    
    // Handle actions
    switch (value) {
      case 'new-product':
        router.push('/productos?action=new');
        break;
      case 'new-movement':
        router.push('/movimientos?action=new');
        break;
      case 'generate-report':
        router.push('/reportes');
        break;
      case 'export-data':
        router.push('/reportes?export=true');
        break;
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={() => onOpenChange(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: 'spring', duration: 0.3 }}
            className="fixed left-1/2 top-[20%] -translate-x-1/2 w-full max-w-xl z-50"
          >
            <Command
              className="bg-card rounded-2xl border border-border shadow-premium-lg overflow-hidden"
              loop
            >
              <div className="flex items-center gap-3 px-4 border-b border-border">
                <Search className="w-5 h-5 text-muted-foreground" />
                <Command.Input
                  value={search}
                  onValueChange={setSearch}
                  placeholder="Buscar páginas, acciones..."
                  className="flex-1 py-4 bg-transparent text-foreground placeholder:text-muted-foreground/60 focus:outline-none"
                />
                <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-1 rounded bg-muted text-muted-foreground text-xs font-mono">
                  ESC
                </kbd>
              </div>
              <Command.List className="max-h-80 overflow-y-auto p-2 scrollbar-thin">
                <Command.Empty className="py-6 text-center text-sm text-muted-foreground">
                  No se encontraron resultados
                </Command.Empty>
                
                <Command.Group heading="Páginas" className="px-2 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  {pages.map((page) => {
                    const Icon = page.icon;
                    return (
                      <Command.Item
                        key={page.href}
                        value={`${page.name} ${page.keywords.join(' ')}`}
                        onSelect={() => handleSelect(page.href)}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer text-foreground data-[selected=true]:bg-accent transition-colors"
                      >
                        <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                          <Icon className="w-4 h-4 text-muted-foreground" />
                        </div>
                        <span className="font-medium">{page.name}</span>
                      </Command.Item>
                    );
                  })}
                </Command.Group>
                
                <Command.Group heading="Acciones Rápidas" className="px-2 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider mt-2">
                  {actions.map((action) => {
                    const Icon = action.icon;
                    return (
                      <Command.Item
                        key={action.action}
                        value={`${action.name} ${action.keywords.join(' ')}`}
                        onSelect={() => handleSelect(action.action)}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer text-foreground data-[selected=true]:bg-accent transition-colors"
                      >
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Icon className="w-4 h-4 text-primary" />
                        </div>
                        <span className="font-medium">{action.name}</span>
                      </Command.Item>
                    );
                  })}
                </Command.Group>
              </Command.List>
            </Command>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
