'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Trash2, AlertTriangle } from 'lucide-react';

// Dialog para crear/editar productos
export function ProductoDialog({
  open,
  onOpenChange,
  onSubmit,
  initialData,
  isEditing = false,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: any) => void;
  initialData?: any;
  isEditing?: boolean;
}) {
  const [formData, setFormData] = useState(
    initialData || {
      codigo_interno: '',
      nombre_comercial: '',
      nombre_generico: '',
      marca: '',
      tipo_producto: 'Semillas',
      categoria_cultivo: 'Maíz',
      precio_unitario_venta: '',
      stock_actual: '',
    }
  );

  const handleSubmit = () => {
    onSubmit(formData);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl">
            {isEditing ? 'Editar Producto' : 'Nuevo Producto'}
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            {isEditing
              ? 'Actualiza los detalles del producto'
              : 'Completa la información para crear un nuevo producto'}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="codigo">Código</Label>
              <Input
                id="codigo"
                value={formData.codigo_interno}
                onChange={(e) =>
                  setFormData({ ...formData, codigo_interno: e.target.value })
                }
                placeholder="P-001"
                className="text-sm"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="marca">Marca</Label>
              <Input
                id="marca"
                value={formData.marca}
                onChange={(e) =>
                  setFormData({ ...formData, marca: e.target.value })
                }
                placeholder="Marca del producto"
                className="text-sm"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="nombre">Nombre Comercial</Label>
            <Input
              id="nombre"
              value={formData.nombre_comercial}
              onChange={(e) =>
                setFormData({ ...formData, nombre_comercial: e.target.value })
              }
              placeholder="Nombre comercial"
              className="text-sm"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="generico">Nombre Genérico</Label>
            <Input
              id="generico"
              value={formData.nombre_generico}
              onChange={(e) =>
                setFormData({ ...formData, nombre_generico: e.target.value })
              }
              placeholder="Descripción técnica"
              className="text-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="tipo">Tipo</Label>
              <Select value={formData.tipo_producto} onValueChange={(val) => setFormData({ ...formData, tipo_producto: val })}>
                <SelectTrigger className="text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Semillas">Semillas</SelectItem>
                  <SelectItem value="Fertilizantes">Fertilizantes</SelectItem>
                  <SelectItem value="Pesticidas">Pesticidas</SelectItem>
                  <SelectItem value="Herramientas">Herramientas</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="categoria">Categoría</Label>
              <Select value={formData.categoria_cultivo} onValueChange={(val) => setFormData({ ...formData, categoria_cultivo: val })}>
                <SelectTrigger className="text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Maíz">Maíz</SelectItem>
                  <SelectItem value="Soja">Soja</SelectItem>
                  <SelectItem value="Trigo">Trigo</SelectItem>
                  <SelectItem value="Nuez de Brasil">Nuez de Brasil</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="precio">Precio Venta</Label>
              <Input
                id="precio"
                type="number"
                value={formData.precio_unitario_venta}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    precio_unitario_venta: parseFloat(e.target.value) || '',
                  })
                }
                placeholder="0.00"
                className="text-sm"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="stock">Stock</Label>
              <Input
                id="stock"
                type="number"
                value={formData.stock_actual}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    stock_actual: parseInt(e.target.value) || '',
                  })
                }
                placeholder="0"
                className="text-sm"
              />
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="text-sm"
          >
            Cancelar
          </Button>
          <Button
            type="button"
            onClick={handleSubmit}
            className="bg-emerald-600 hover:bg-emerald-700 text-sm"
          >
            {isEditing ? 'Guardar Cambios' : 'Crear Producto'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// Dialog para crear/editar transacciones
export function TransaccionDialog({
  open,
  onOpenChange,
  onSubmit,
  initialData,
  isEditing = false,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: any) => void;
  initialData?: any;
  isEditing?: boolean;
}) {
  const [formData, setFormData] = useState(
    initialData || {
      tipo: 'VENTA',
      cliente: '',
      producto: '',
      cantidad: '',
      precio_unitario: '',
      estado: 'pendiente',
    }
  );

  const handleSubmit = () => {
    onSubmit(formData);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl">
            {isEditing ? 'Editar Transacción' : 'Nueva Transacción'}
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            {isEditing
              ? 'Actualiza los detalles de la transacción'
              : 'Registra una nueva compra o venta'}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="tipo">Tipo de Transacción</Label>
            <Select value={formData.tipo} onValueChange={(val) => setFormData({ ...formData, tipo: val })}>
              <SelectTrigger className="text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="VENTA">Venta</SelectItem>
                <SelectItem value="COMPRA">Compra</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="cliente">
              {formData.tipo === 'VENTA' ? 'Cliente' : 'Proveedor'}
            </Label>
            <Input
              id="cliente"
              value={formData.cliente}
              onChange={(e) =>
                setFormData({ ...formData, cliente: e.target.value })
              }
              placeholder="Nombre de cliente o proveedor"
              className="text-sm"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="producto">Producto</Label>
            <Input
              id="producto"
              value={formData.producto}
              onChange={(e) =>
                setFormData({ ...formData, producto: e.target.value })
              }
              placeholder="Nombre del producto"
              className="text-sm"
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="cantidad">Cantidad</Label>
              <Input
                id="cantidad"
                type="number"
                value={formData.cantidad}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    cantidad: parseInt(e.target.value) || '',
                  })
                }
                placeholder="0"
                className="text-sm"
              />
            </div>
            <div className="col-span-2 space-y-2">
              <Label htmlFor="precio">Precio Unitario</Label>
              <Input
                id="precio"
                type="number"
                value={formData.precio_unitario}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    precio_unitario: parseFloat(e.target.value) || '',
                  })
                }
                placeholder="0.00"
                className="text-sm"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="estado">Estado</Label>
            <Select value={formData.estado} onValueChange={(val) => setFormData({ ...formData, estado: val })}>
              <SelectTrigger className="text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="completada">Completada</SelectItem>
                <SelectItem value="pendiente">Pendiente</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="text-sm"
          >
            Cancelar
          </Button>
          <Button
            type="button"
            onClick={handleSubmit}
            className="bg-emerald-600 hover:bg-emerald-700 text-sm"
          >
            {isEditing ? 'Guardar Cambios' : 'Registrar Transacción'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// Dialog de confirmación de eliminación
export function DeleteConfirmDialog({
  open,
  onOpenChange,
  onConfirm,
  itemName,
  itemType = 'elemento',
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  itemName: string;
  itemType?: string;
}) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
            <AlertDialogTitle className="text-lg">Eliminar {itemType}</AlertDialogTitle>
          </div>
          <AlertDialogDescription className="text-gray-600 mt-2">
            ¿Estás seguro de que deseas eliminar <span className="font-semibold text-gray-900">"{itemName}"</span>? Esta acción no se puede deshacer.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="gap-2">
          <AlertDialogCancel className="text-sm">Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="bg-red-600 hover:bg-red-700 text-white text-sm"
          >
            Eliminar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

// Dialog para ver detalles
export function DetailsDialog({
  open,
  onOpenChange,
  data,
  title,
  fields,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: any;
  title: string;
  fields: Array<{ label: string; key: string }>;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl">{title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {fields.map((field) => (
            <div key={field.key} className="flex items-start justify-between">
              <span className="text-sm font-medium text-gray-600">{field.label}</span>
              <span className="text-sm text-gray-900 font-semibold">
                {data[field.key]}
              </span>
            </div>
          ))}
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="text-sm"
          >
            Cerrar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
