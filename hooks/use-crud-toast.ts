import { useToast } from '@/components/ui/use-toast';

export function useCrudToast() {
  const { toast } = useToast();

  const showSuccess = (action: 'created' | 'updated' | 'deleted', item: string) => {
    const messages = {
      created: `${item} creado exitosamente`,
      updated: `${item} actualizado exitosamente`,
      deleted: `${item} eliminado exitosamente`,
    };

    toast({
      title: 'Éxito',
      description: messages[action],
      variant: 'default',
    });
  };

  const showError = (message: string) => {
    toast({
      title: 'Error',
      description: message,
      variant: 'destructive',
    });
  };

  return { showSuccess, showError };
}
