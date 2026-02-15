import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from '@/hooks/useActor';
import { useGameStore } from '@/features/state/useGameStore';
import { toast } from 'sonner';

export function useSimulation() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  const { gameMode, strategyA, strategyB, rounds, setSimulationResult } = useGameStore();

  const mutation = useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error('Actor not initialized');

      if (gameMode === 'one-shot') {
        return actor.runOneShot(strategyA, strategyB);
      } else {
        return actor.runRepeatedGame(strategyA, strategyB, BigInt(rounds));
      }
    },
    onSuccess: (result) => {
      setSimulationResult(result);
      queryClient.invalidateQueries({ queryKey: ['simulationHistory'] });
      toast.success('Simulation completed successfully');
    },
    onError: (error) => {
      toast.error('Simulation failed: ' + error.message);
    },
  });

  return {
    runSimulation: mutation.mutate,
    isRunning: mutation.isPending,
  };
}
