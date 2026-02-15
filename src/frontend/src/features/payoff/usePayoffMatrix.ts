import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from '@/hooks/useActor';
import type { PayoffMatrix } from '@/backend';

export function usePayoffMatrix() {
  const { actor, isFetching } = useActor();
  const queryClient = useQueryClient();

  const query = useQuery<PayoffMatrix>({
    queryKey: ['payoffMatrix'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.getPayoffMatrix();
    },
    enabled: !!actor && !isFetching,
  });

  const mutation = useMutation({
    mutationFn: async (matrix: PayoffMatrix) => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.updatePayoffMatrix(matrix);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payoffMatrix'] });
      queryClient.invalidateQueries({ queryKey: ['analysis'] });
    },
  });

  return {
    matrix: query.data,
    isLoading: query.isLoading,
    updateMatrix: mutation.mutate,
    isUpdating: mutation.isPending,
  };
}
