import type { SimulationResult } from '@/backend';
import type { PayoffAnalysis } from '@/features/payoff/payoffAnalysis';

/**
 * Generates a business-focused strategic interpretation of simulation results.
 * Connects game theory concepts to practical business insights.
 */
export function generateInterpretation(
  result: SimulationResult,
  analysis: PayoffAnalysis
): string {
  const isOneShot = result.rounds.length === 1;
  const cooperationRate = result.rounds.filter(r => r.decision.firmA && r.decision.firmB).length / result.rounds.length;
  const totalProfit = Number(result.totalA) + Number(result.totalB);

  if (isOneShot) {
    if (result.sustainedCooperation) {
      return 'In this one-shot game, both firms chose to cooperate, achieving the mutually beneficial outcome. This suggests that when firms can communicate or have aligned incentives, cooperation is possible even without repeated interaction. However, this outcome is unstable—either firm could have improved their individual profit by defecting.';
    } else {
      const bothDefected = !result.rounds[0].decision.firmA && !result.rounds[0].decision.firmB;
      if (bothDefected) {
        return 'In a one-shot game, rational firms choose to defect, leading to the Nash equilibrium where both earn lower profits than if they had cooperated. This demonstrates the core paradox of the Prisoner\'s Dilemma: individual rationality leads to collectively suboptimal outcomes. Without the possibility of future interaction, there is no mechanism to enforce cooperation.';
      } else {
        return 'In this one-shot game, one firm cooperated while the other defected. The defecting firm captured the highest possible profit, while the cooperating firm earned the worst outcome. This asymmetric result highlights the risk of cooperation when trust is absent and demonstrates why rational firms tend toward mutual defection in single interactions.';
      }
    }
  } else {
    // Repeated game
    if (cooperationRate >= 0.8) {
      return `In this repeated game, cooperation emerged and was sustained in ${(cooperationRate * 100).toFixed(0)}% of rounds. Repeated interaction fundamentally changes the strategic calculus—firms can punish defection and reward cooperation over time. This demonstrates how long-term relationships and reciprocal strategies can overcome the one-shot dilemma, leading to higher collective profits of ${totalProfit}. Trust and reputation become valuable assets in repeated interactions.`;
    } else if (cooperationRate >= 0.4) {
      return `This repeated game showed mixed cooperation (${(cooperationRate * 100).toFixed(0)}% of rounds). The firms alternated between cooperation and defection, suggesting strategic adaptation and testing. While some cooperation emerged, it was not fully sustained. This pattern is common when firms use conditional strategies like Tit-for-Tat, where cooperation depends on the opponent's recent behavior. The total profit of ${totalProfit} falls between the fully cooperative and fully defective outcomes.`;
    } else {
      return `Despite repeated interaction, cooperation largely failed to emerge in this simulation (only ${(cooperationRate * 100).toFixed(0)}% cooperation rate). When firms adopt aggressive or unforgiving strategies, the benefits of repeated interaction are lost. The total profit of ${totalProfit} is closer to the mutual defection outcome. This demonstrates that repeated games alone do not guarantee cooperation—the choice of strategy matters. Strategies like Grim Trigger can lock firms into permanent defection after a single betrayal.`;
    }
  }
}
