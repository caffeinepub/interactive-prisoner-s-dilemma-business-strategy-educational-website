import { create } from 'zustand';
import type { SimulationResult } from '@/backend';

interface GameState {
  gameMode: 'one-shot' | 'repeated';
  strategyA: string;
  strategyB: string;
  rounds: number;
  simulationResult: SimulationResult | null;
  analyticsMode: boolean;
  
  setGameMode: (mode: 'one-shot' | 'repeated') => void;
  setStrategyA: (strategy: string) => void;
  setStrategyB: (strategy: string) => void;
  setRounds: (rounds: number) => void;
  setSimulationResult: (result: SimulationResult) => void;
  setAnalyticsMode: (enabled: boolean) => void;
}

export const useGameStore = create<GameState>((set) => ({
  gameMode: 'one-shot',
  strategyA: 'Cooperate',
  strategyB: 'Cooperate',
  rounds: 10,
  simulationResult: null,
  analyticsMode: false,
  
  setGameMode: (mode) => set({ gameMode: mode }),
  setStrategyA: (strategy) => set({ strategyA: strategy }),
  setStrategyB: (strategy) => set({ strategyB: strategy }),
  setRounds: (rounds) => set({ rounds }),
  setSimulationResult: (result) => set({ simulationResult: result }),
  setAnalyticsMode: (enabled) => set({ analyticsMode: enabled }),
}));
