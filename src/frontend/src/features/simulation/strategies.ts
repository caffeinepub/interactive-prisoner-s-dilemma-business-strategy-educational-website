/**
 * Available strategies for the Prisoner's Dilemma simulation.
 * Each strategy represents a different approach to decision-making.
 */

export interface Strategy {
  id: string;
  label: string;
  description: string;
}

export const STRATEGIES: Strategy[] = [
  {
    id: 'Cooperate',
    label: 'Always Cooperate',
    description: 'Always maintain high prices (trusting approach)',
  },
  {
    id: 'Defect',
    label: 'Always Defect',
    description: 'Always undercut prices (aggressive approach)',
  },
  {
    id: 'TitForTat',
    label: 'Tit-for-Tat',
    description: 'Start cooperating, then mirror opponent\'s last move (reciprocal)',
  },
  {
    id: 'Random',
    label: 'Random',
    description: 'Randomly choose between cooperate and defect (unpredictable)',
  },
  {
    id: 'GrimTrigger',
    label: 'Grim Trigger',
    description: 'Cooperate until opponent defects, then defect forever (unforgiving)',
  },
];
