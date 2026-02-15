import type { PayoffMatrix } from '@/backend';

/**
 * Calculates expected value for each strategy given opponent's cooperation probability.
 * Expected value helps firms make decisions under uncertainty.
 */
export function calculateExpectedValue(
  matrix: PayoffMatrix,
  probACooperates: number,
  probBCooperates: number
) {
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

  // Firm A's expected values
  const evA_cooperate = probBCooperates * m.cc_a + (1 - probBCooperates) * m.cd_a;
  const evA_defect = probBCooperates * m.dc_a + (1 - probBCooperates) * m.dd_a;

  // Firm B's expected values
  const evB_cooperate = probACooperates * m.cc_b + (1 - probACooperates) * m.dc_b;
  const evB_defect = probACooperates * m.cd_b + (1 - probACooperates) * m.dd_b;

  return {
    firmA: {
      cooperate: evA_cooperate,
      defect: evA_defect,
    },
    firmB: {
      cooperate: evB_cooperate,
      defect: evB_defect,
    },
  };
}

/**
 * Calculates risk metrics: best case, worst case, and range for each strategy.
 * Range indicates volatility/risk of each strategic choice.
 */
export function calculateRiskMetrics(matrix: PayoffMatrix) {
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

  return {
    firmA: {
      cooperate: {
        best: Math.max(m.cc_a, m.cd_a),
        worst: Math.min(m.cc_a, m.cd_a),
        range: Math.abs(m.cc_a - m.cd_a),
      },
      defect: {
        best: Math.max(m.dc_a, m.dd_a),
        worst: Math.min(m.dc_a, m.dd_a),
        range: Math.abs(m.dc_a - m.dd_a),
      },
    },
    firmB: {
      cooperate: {
        best: Math.max(m.cc_b, m.dc_b),
        worst: Math.min(m.cc_b, m.dc_b),
        range: Math.abs(m.cc_b - m.dc_b),
      },
      defect: {
        best: Math.max(m.cd_b, m.dd_b),
        worst: Math.min(m.cd_b, m.dd_b),
        range: Math.abs(m.cd_b - m.dd_b),
      },
    },
  };
}
