'use client';

import { Plus, Search, Phone, Mail, MapPin, Edit, Trash2, User } from 'lucide-react';
import { useState } from 'react';

const contactosData = [
  {
    id: 1,
    nombre: 'José María López',
    tipo: 'PROVEEDOR',
    email: 'jose.lopez@amazonproductor.com',
    telefono: '+55 92 99887-7766',
    direccion: 'Manaus, Amazonas, Brasil',
    documento: 'BR123456789',
    transacciones: 12,
    estado: 'activo',
    fecha_registro: '2024-02-15',
  },
  {
    id: 2,
    nombre: 'Empresa Exportadora XYZ S.A.',
    tipo: 'CLIENTE',
    email: 'ventas@exportadoraxyz.com',
    telefono: '+55 92 98765-4321',
    direccion: 'São Paulo, SP, Brasil',
    documento: 'BR987654321',
    transacciones: 28,
    estado: 'activo',
    fecha_registro: '2024-01-10',
  },
  {
    id: 3,
    nombre: 'María García Sánchez',
    tipo: 'AMBOS',
    email: 'maria.garcia@castana.com',
    telefono: '+55 92 91234-5678',
    direccion: 'Itacoatiara, Amazonas, Brasil',
    documento: 'BR456789123',
    transacciones: 45,
    estado: 'activo',
    fecha_registro: '2023-11-22',
  },
  {
    id: 4,
    nombre: 'Distribuidor del Sur',
    tipo: 'CLIENTE',
    email: 'contacto@distribuidordelsur.com',
    telefono: '+55 31 99876-5432',
    direccion: 'Belo Horizonte, MG, Brasil',
    documento: 'BR321654987',
    transacciones: 18,
    estado: 'activo',
    fecha_registro: '2024-03-05',
  },
  {
    id: 5,
    nombre: 'Cooperativa Amazónica',
    tipo: 'PROVEEDOR',
    email: 'info@cooperativaamazon.org',
    telefono: '+55 92 98765-1234',
    direccion: 'Manaus, Amazonas, Brasil',
    documento: 'BR789321456',
    transacciones: 8,
    estado: 'inactivo',
    fecha_registro: '2024-04-12',
  },
  {
    id: 6,
    nombre: 'Roberto Fernández',
    tipo: 'PROVEEDOR',
    email: 'roberto@castanafinasbrasil.com',
    telefono: '+55 92 99654-3210',
    direccion: 'Manaus, Amazonas, Brasil',
    documento: 'BR654987321',
    transacciones: 35,
    estado: 'activo',
    fecha_registro: '2023-12-08',
  },
];

export default function Contactos() {
  const [filtro, setFiltro] = useState('TODOS');
  const [busqueda, setBusqueda] = useState('');
  const [filtroTipo, setFiltroTipo] = useState('TODOS');

  const clientesCount = contactosData.filter((c) => c.tipo === 'CLIENTE').length;
  const proveedoresCount = contactosData.filter((c) => c.tipo === 'PROVEEDOR').length;

  const getTipoBadge = (tipo) => {
    switch (tipo) {
      case 'CLIENTE':
        return (
          <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-blue-100/50 text-blue-700">
            Cliente
          </span>
        );
      case 'PROVEEDOR':
        return (
          <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-purple-100/50 text-purple-700">
            Proveedor
          </span>
        );
      case 'AMBOS':
        return (
          <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-green-100/50 text-green-700">
            Ambos
          </span>
        );
      default:
        return null;
    }
  };

  const contactosFiltrados = contactosData.filter((c) => {
    const matchesBusqueda =
      c.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      c.email.toLowerCase().includes(busqueda.toLowerCase()) ||
      c.telefono.toLowerCase().includes(busqueda.toLowerCase());

    const matchesFiltroTipo = filtroTipo === 'TODOS' || c.tipo === filtroTipo;

    return matchesBusqueda && matchesFiltroTipo;
  });

  return (
    <div className="w-full bg-background min-h-screen">
      <main className="w-full">
        {/* Header */}
        <div className="bg-card border-b border-border">
          <div className="px-5 md:px-6 py-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-1">Contactos</h1>
                <p className="text-sm text-foreground/60">Gestiona clientes y proveedores</p>
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
          {/* Estadísticas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-card border border-border rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 p-6">
              <p className="text-foreground/60 text-sm mb-2">Total de Contactos</p>
              <p className="text-3xl font-bold text-foreground">{contactosData.length}</p>
              <p className="text-xs text-foreground/50 mt-2">Activos e inactivos</p>
            </div>

            <div className="bg-card border border-border rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 p-6">
              <p className="text-foreground/60 text-sm mb-2">Clientes</p>
              <p className="text-3xl font-bold text-blue-600">{clientesCount}</p>
              <p className="text-xs text-blue-600/70 mt-2">
                {((clientesCount / contactosData.length) * 100).toFixed(0)}% del total
              </p>
            </div>

            <div className="bg-card border border-border rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 p-6">
              <p className="text-foreground/60 text-sm mb-2">Proveedores</p>
              <p className="text-3xl font-bold text-purple-600">{proveedoresCount}</p>
              <p className="text-xs text-purple-600/70 mt-2">
                {((proveedoresCount / contactosData.length) * 100).toFixed(0)}% del total
              </p>
            </div>
          </div>

          {/* Búsqueda y Filtros */}
          <div className="bg-card border border-border rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Búsqueda */}
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-foreground/40" />
                <input
                  type="text"
                  placeholder="Buscar por nombre, email o teléfono..."
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                  className="w-full pl-12 pr-4 py-2 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 border border-border bg-input text-foreground placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* Filtro de Tipo */}
              <div className="flex gap-2">
                {['TODOS', 'CLIENTE', 'PROVEEDOR', 'AMBOS'].map((tipo) => (
                  <button
                    key={tipo}
                    onClick={() => setFiltroTipo(tipo)}
                    className={`px-4 py-2 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 font-medium transition-colors text-sm ${
                      filtroTipo === tipo
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-foreground hover:bg-muted/80'
                    }`}
                  >
                    {tipo}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Listado de Contactos */}
          <div className="grid grid-cols-1 gap-4">
            {contactosFiltrados.map((contacto) => (
              <div
                key={contacto.id}
                className="bg-card border border-border rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 p-6 hover:border-primary/50 transition-colors"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Info Principal */}
                  <div className="md:col-span-2">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold">
                        {contacto.nombre.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold text-foreground">{contacto.nombre}</h3>
                          {getTipoBadge(contacto.tipo)}
                          <span
                            className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                              contacto.estado === 'activo'
                                ? 'bg-green-100/50 text-green-700'
                                : 'bg-gray-100/50 text-gray-700'
                            }`}
                          >
                            {contacto.estado === 'activo' ? 'Activo' : 'Inactivo'}
                          </span>
                        </div>

                        {/* Detalles de Contacto */}
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2 text-foreground/70">
                            <Mail className="w-4 h-4" />
                            <a href={`mailto:${contacto.email}`} className="hover:text-primary">
                              {contacto.email}
                            </a>
                          </div>
                          <div className="flex items-center gap-2 text-foreground/70">
                            <Phone className="w-4 h-4" />
                            <a href={`tel:${contacto.telefono}`} className="hover:text-primary">
                              {contacto.telefono}
                            </a>
                          </div>
                          <div className="flex items-center gap-2 text-foreground/70">
                            <MapPin className="w-4 h-4" />
                            <span>{contacto.direccion}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Info Secundaria */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-muted/50 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 p-4">
                      <p className="text-xs text-foreground/60 mb-1">Documento</p>
                      <p className="font-mono text-sm text-foreground">{contacto.documento}</p>
                    </div>
                    <div className="bg-muted/50 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 p-4">
                      <p className="text-xs text-foreground/60 mb-1">Transacciones</p>
                      <p className="text-2xl font-bold text-foreground">{contacto.transacciones}</p>
                    </div>
                    <div className="bg-muted/50 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 p-4 col-span-2">
                      <p className="text-xs text-foreground/60 mb-1">Registrado</p>
                      <p className="text-sm text-foreground">{contacto.fecha_registro}</p>
                    </div>
                  </div>
                </div>

                {/* Acciones */}
                <div className="flex gap-2 mt-6 pt-6 border-t border-border">
                  <button className="flex-1 bg-primary/10 text-primary hover:bg-primary/20 font-medium py-2 px-4 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 transition-colors flex items-center justify-center gap-2">
                    <Edit className="w-4 h-4" />
                    Editar
                  </button>
                  <button className="flex-1 bg-destructive/10 text-destructive hover:bg-destructive/20 font-medium py-2 px-4 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 transition-colors flex items-center justify-center gap-2">
                    <Trash2 className="w-4 h-4" />
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>

          {contactosFiltrados.length === 0 && (
            <div className="bg-card border border-border rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 p-12 text-center">
              <p className="text-foreground/60 mb-2">No se encontraron contactos</p>
              <p className="text-sm text-foreground/50">Intenta ajustar tu búsqueda o filtros</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
