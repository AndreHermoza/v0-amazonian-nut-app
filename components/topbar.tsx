'use client';

import { Search, Command } from 'lucide-react';
import { usePathname } from 'next/navigation';

const breadcrumbMap: Record<string, string> = {
  '/': 'Dashboard',
  '/productos': 'Productos',
  '/transacciones': 'Transacciones',
  '/inventario': 'Inventario',
  '/capital': 'Capital',
  '/prestamos': 'Préstamos',
  '/contactos': 'Contactos',
};

export function Topbar() {
  const pathname = usePathname();
  const currentPage = breadcrumbMap[pathname] || 'Dashboard';

  return (
    <div className="h-16 border-b border-border bg-white/50 glass fixed top-0 right-0 left-0 z-40 lg:left-64">
      <div className="h-full px-8 flex items-center justify-between">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Castaña</span>
          <span className="text-muted-foreground">/</span>
          <span className="text-sm font-semibold text-foreground">{currentPage}</span>
        </div>

        {/* Command Palette */}
        <div className="flex items-center gap-4">
          <div className="relative hidden md:block w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 text-sm bg-muted rounded-md border border-border placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-1 pointer-events-none">
              <Command className="w-3 h-3 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">K</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
