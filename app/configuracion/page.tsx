'use client';

import { motion } from 'framer-motion';
import {
  Settings,
  User,
  Bell,
  Shield,
  Database,
  Palette,
} from 'lucide-react';

const settingsSections = [
  {
    icon: User,
    title: 'Perfil de Usuario',
    description: 'Gestiona tu información personal y preferencias de cuenta',
  },
  {
    icon: Bell,
    title: 'Notificaciones',
    description: 'Configura alertas de stock bajo, vencimientos y movimientos',
  },
  {
    icon: Shield,
    title: 'Seguridad',
    description: 'Contraseña, autenticación y permisos de acceso',
  },
  {
    icon: Database,
    title: 'Datos',
    description: 'Respaldo, exportación e importación de datos',
  },
  {
    icon: Palette,
    title: 'Apariencia',
    description: 'Personaliza el tema y la visualización de la interfaz',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function ConfiguracionPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card px-6 py-5">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Configuración</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Ajustes y preferencias del sistema
            </p>
          </div>
        </div>
      </header>

      <div className="p-6">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {settingsSections.map((section) => {
            const Icon = section.icon;
            return (
              <motion.div
                key={section.title}
                variants={itemVariants}
                className="bg-card rounded-xl p-6 border border-border shadow-card hover:shadow-soft transition-all cursor-pointer group"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {section.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {section.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* App Info */}
        <motion.div
          className="mt-8 bg-card rounded-xl p-6 border border-border shadow-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <Settings className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-foreground">Información del Sistema</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Versión</p>
              <p className="font-medium text-foreground">1.0.0</p>
            </div>
            <div>
              <p className="text-muted-foreground">Última actualización</p>
              <p className="font-medium text-foreground">17 Abr 2026</p>
            </div>
            <div>
              <p className="text-muted-foreground">Licencia</p>
              <p className="font-medium text-foreground">Empresarial</p>
            </div>
            <div>
              <p className="text-muted-foreground">Soporte</p>
              <p className="font-medium text-primary">soporte@agrostock.pe</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
