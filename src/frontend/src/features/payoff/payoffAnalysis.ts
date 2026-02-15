import type { PayoffMatrix } from '@/backend';

export interface PayoffAnalysis {
  dominantStrategyA: 'Cooperate' | 'Defect' | null;
  dominantStrategyB: 'Cooperate' | 'Defect' | null;
  nashEquilibria: Array<{ firmA: string; firmB: string }>;
  explanation: string;
}

/**
 * Analyzes a payoff matrix to detect dominant strategies and Nash equilibria.
 * Uses best-response logic to determine strategic outcomes.
 */
export function analyzePayoffMatrix(matrix: PayoffMatrix): PayoffAnalysis {
  // Convert BigInt to Number for comparison
  const m = {
    cc_a: Number(matrix.cooperateCooperateA),
    cc_b: Number(matrix.cooperateCooperateB),
    cd_a: Number(matrix.cooperateDefectA),
    cd_b: Number(matrix.cooperateDefectB),
    dc_a: Number(matrix.defectCooperateA),
    dc_b: Number(matrix.defectCooperateB),
    dd_a: Number(matrix.defectDefectA),
    dd_b: Number(matrix.defectDefectB),
  };

  // Check Firm A's dominant strategy
  // Defect is dominant if: dc_a > cc_a AND dd_a > cd_a
  // Cooperate is dominant if: cc_a > dc_a AND cd_a > dd_a
  let dominantStrategyA: 'Cooperate' | 'Defect' | null = null;
  if (m.dc_a > m.cc_a && m.dd_a > m.cd_a) {
    dominantStrategyA = 'Defect';
  } else if (m.cc_a > m.dc_a && m.cd_a > m.dd_a) {
    dominantStrategyA = 'Cooperate';
  }

  // Check Firm B's dominant strategy
  // Defect is dominant if: cd_b > cc_b AND dd_b > dc_b
  // Cooperate is dominant if: cc_b > cd_b AND dc_b > dd_b
  let dominantStrategyB: 'Cooperate' | 'Defect' | null = null;
  if (m.cd_b > m.cc_b && m.dd_b > m.dc_b) {
    dominantStrategyB = 'Defect';
  } else if (m.cc_b > m.cd_b && m.dc_b > m.dd_b) {
    dominantStrategyB = 'Cooperate';
  }

  // Find Nash equilibria using best-response logic
  const nashEquilibria: Array<{ firmA: string; firmB: string }> = [];

  // Check (Cooperate, Cooperate)
  // A's best response to B cooperating: is cooperate better than defect?
  // B's best response to A cooperating: is cooperate better than defect?
  if (m.cc_a >= m.dc_a && m.cc_b >= m.cd_b) {
    nashEquilibria.push({ firmA: 'Cooperate', firmB: 'Cooperate' });
  }

  // Check (Cooperate, Defect)
  if (m.cd_a >= m.dd_a && m.cd_b >= m.cc_b) {
    nashEquilibria.push({ firmA: 'Cooperate', firmB: 'Defect' });
  }

  // Check (Defect, Cooperate)
  if (m.dc_a >= m.cc_a && m.dc_b >= m.dd_b) {
    nashEquilibria.push({ firmA: 'Defect', firmB: 'Cooperate' });
  }

  // Check (Defect, Defect)
  if (m.dd_a >= m.cd_a && m.dd_b >= m.dc_b) {
    nashEquilibria.push({ firmA: 'Defect', firmB: 'Defect' });
  }

  // Generate business-friendly explanation
  let explanation = '';
  if (dominantStrategyA === 'Defect' && dominantStrategyB === 'Defect') {
    explanation = 'Both firms have a dominant strategy to defect (undercut prices). This leads to a price war where both earn lower profits than if they had cooperated.';
  } else if (dominantStrategyA === 'Cooperate' && dominantStrategyB === 'Cooperate') {
    explanation = 'Both firms benefit from cooperation. Maintaining high prices is the rational choice for both, leading to mutually beneficial outcomes.';
  } else if (dominantStrategyA && dominantStrategyB) {
    explanation = `Firm A's best strategy is to ${dominantStrategyA.toLowerCase()}, while Firm B's best strategy is to ${dominantStrategyB.toLowerCase()}. This creates an asymmetric competitive dynamic.`;
  } else if (nashEquilibria.length > 0) {
    const eq = nashEquilibria[0];
    explanation = `The Nash equilibrium is (${eq.firmA}, ${eq.firmB}). Neither firm can improve their profit by unilaterally changing strategy.`;
  } else {
    explanation = 'No clear dominant strategies or pure Nash equilibrium detected. The strategic outcome depends on beliefs about the opponent\'s behavior.';
  }

  return {
    dominantStrategyA,
    dominantStrategyB,
    nashEquilibria,
    explanation,
  };
}
