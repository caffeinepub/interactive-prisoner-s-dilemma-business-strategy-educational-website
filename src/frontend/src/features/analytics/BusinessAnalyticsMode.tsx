import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useGameStore } from '@/features/state/useGameStore';
import { usePayoffMatrix } from '@/features/payoff/usePayoffMatrix';
import { calculateExpectedValue, calculateRiskMetrics } from './analyticsMath';
import { Badge } from '@/components/ui/badge';

export default function BusinessAnalyticsMode() {
  const { analyticsMode, setAnalyticsMode, simulationResult } = useGameStore();
  const { matrix } = usePayoffMatrix();

  if (!matrix) return null;

  const expectedValues = calculateExpectedValue(matrix, 0.5, 0.5);
  const riskMetrics = calculateRiskMetrics(matrix);

  return (
    <section id="analytics" className="py-16 bg-background border-t">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-2">
                Business Analytics Mode
              </h2>
              <p className="text-lg text-muted-foreground">
                Advanced quantitative analysis and risk assessment
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Label htmlFor="analytics-toggle" className="text-sm font-medium">
                Enable Analytics
              </Label>
              <Switch
                id="analytics-toggle"
                checked={analyticsMode}
                onCheckedChange={setAnalyticsMode}
              />
            </div>
          </div>

          {analyticsMode && (
            <div className="space-y-6">
              {/* Payoff Heatmap */}
              <Card>
                <CardHeader>
                  <CardTitle>Payoff Heatmap</CardTitle>
                  <CardDescription>
                    Visual representation of profit outcomes (darker = higher profit)
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-semibold mb-3">Firm A Payoffs</h4>
                      <div className="grid grid-cols-2 gap-2">
                        <div
                          className="p-4 rounded text-center font-bold"
                          style={{
                            backgroundColor: `oklch(0.7 0.1 165 / ${Number(matrix.cooperateCooperateA) / 10})`,
                          }}
                        >
                          {Number(matrix.cooperateCooperateA)}
                          <div className="text-xs font-normal mt-1">CC</div>
                        </div>
                        <div
                          className="p-4 rounded text-center font-bold"
                          style={{
                            backgroundColor: `oklch(0.7 0.1 165 / ${Number(matrix.cooperateDefectA) / 10})`,
                          }}
                        >
                          {Number(matrix.cooperateDefectA)}
                          <div className="text-xs font-normal mt-1">CD</div>
                        </div>
                        <div
                          className="p-4 rounded text-center font-bold"
                          style={{
                            backgroundColor: `oklch(0.7 0.1 165 / ${Number(matrix.defectCooperateA) / 10})`,
                          }}
                        >
                          {Number(matrix.defectCooperateA)}
                          <div className="text-xs font-normal mt-1">DC</div>
                        </div>
                        <div
                          className="p-4 rounded text-center font-bold"
                          style={{
                            backgroundColor: `oklch(0.7 0.1 165 / ${Number(matrix.defectDefectA) / 10})`,
                          }}
                        >
                          {Number(matrix.defectDefectA)}
                          <div className="text-xs font-normal mt-1">DD</div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold mb-3">Firm B Payoffs</h4>
                      <div className="grid grid-cols-2 gap-2">
                        <div
                          className="p-4 rounded text-center font-bold"
                          style={{
                            backgroundColor: `oklch(0.7 0.1 85 / ${Number(matrix.cooperateCooperateB) / 10})`,
                          }}
                        >
                          {Number(matrix.cooperateCooperateB)}
                          <div className="text-xs font-normal mt-1">CC</div>
                        </div>
                        <div
                          className="p-4 rounded text-center font-bold"
                          style={{
                            backgroundColor: `oklch(0.7 0.1 85 / ${Number(matrix.cooperateDefectB) / 10})`,
                          }}
                        >
                          {Number(matrix.cooperateDefectB)}
                          <div className="text-xs font-normal mt-1">CD</div>
                        </div>
                        <div
                          className="p-4 rounded text-center font-bold"
                          style={{
                            backgroundColor: `oklch(0.7 0.1 85 / ${Number(matrix.defectCooperateB) / 10})`,
                          }}
                        >
                          {Number(matrix.defectCooperateB)}
                          <div className="text-xs font-normal mt-1">DC</div>
                        </div>
                        <div
                          className="p-4 rounded text-center font-bold"
                          style={{
                            backgroundColor: `oklch(0.7 0.1 85 / ${Number(matrix.defectDefectB) / 10})`,
                          }}
                        >
                          {Number(matrix.defectDefectB)}
                          <div className="text-xs font-normal mt-1">DD</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Expected Value */}
              <Card>
                <CardHeader>
                  <CardTitle>Expected Value Analysis</CardTitle>
                  <CardDescription>
                    Assuming 50% probability of opponent cooperation (adjust assumptions as needed)
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3">Firm A Expected Values</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center p-2 bg-secondary/30 rounded">
                          <span className="text-sm">If A Cooperates:</span>
                          <Badge variant="outline">{expectedValues.firmA.cooperate.toFixed(2)}</Badge>
                        </div>
                        <div className="flex justify-between items-center p-2 bg-secondary/30 rounded">
                          <span className="text-sm">If A Defects:</span>
                          <Badge variant="outline">{expectedValues.firmA.defect.toFixed(2)}</Badge>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3">Firm B Expected Values</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center p-2 bg-secondary/30 rounded">
                          <span className="text-sm">If B Cooperates:</span>
                          <Badge variant="outline">{expectedValues.firmB.cooperate.toFixed(2)}</Badge>
                        </div>
                        <div className="flex justify-between items-center p-2 bg-secondary/30 rounded">
                          <span className="text-sm">If B Defects:</span>
                          <Badge variant="outline">{expectedValues.firmB.defect.toFixed(2)}</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-4">
                    Expected value = (Probability of opponent cooperating × Payoff if they cooperate) + 
                    (Probability of opponent defecting × Payoff if they defect)
                  </p>
                </CardContent>
              </Card>

              {/* Risk Analysis */}
              <Card>
                <CardHeader>
                  <CardTitle>Risk Analysis</CardTitle>
                  <CardDescription>
                    Best-case, worst-case, and range of outcomes
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3">Firm A Risk Profile</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Best Case (Cooperate):</span>
                          <span className="font-semibold">{riskMetrics.firmA.cooperate.best}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Worst Case (Cooperate):</span>
                          <span className="font-semibold">{riskMetrics.firmA.cooperate.worst}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Range (Cooperate):</span>
                          <span className="font-semibold">{riskMetrics.firmA.cooperate.range}</span>
                        </div>
                        <div className="h-px bg-border my-2" />
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Best Case (Defect):</span>
                          <span className="font-semibold">{riskMetrics.firmA.defect.best}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Worst Case (Defect):</span>
                          <span className="font-semibold">{riskMetrics.firmA.defect.worst}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Range (Defect):</span>
                          <span className="font-semibold">{riskMetrics.firmA.defect.range}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3">Firm B Risk Profile</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Best Case (Cooperate):</span>
                          <span className="font-semibold">{riskMetrics.firmB.cooperate.best}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Worst Case (Cooperate):</span>
                          <span className="font-semibold">{riskMetrics.firmB.cooperate.worst}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Range (Cooperate):</span>
                          <span className="font-semibold">{riskMetrics.firmB.cooperate.range}</span>
                        </div>
                        <div className="h-px bg-border my-2" />
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Best Case (Defect):</span>
                          <span className="font-semibold">{riskMetrics.firmB.defect.best}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Worst Case (Defect):</span>
                          <span className="font-semibold">{riskMetrics.firmB.defect.worst}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Range (Defect):</span>
                          <span className="font-semibold">{riskMetrics.firmB.defect.range}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-4">
                    A larger range indicates higher risk/volatility. Defection often has a wider range 
                    (higher upside but also lower downside) compared to cooperation.
                  </p>
                </CardContent>
              </Card>

              {/* Comparison */}
              {simulationResult && (
                <Card>
                  <CardHeader>
                    <CardTitle>One-Shot vs Repeated Comparison</CardTitle>
                    <CardDescription>
                      How repeated interaction changes outcomes
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">Current Simulation</h4>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div className="p-3 bg-secondary/30 rounded">
                            <div className="text-muted-foreground mb-1">Type</div>
                            <div className="font-semibold">
                              {simulationResult.rounds.length === 1 ? 'One-Shot' : `Repeated (${simulationResult.rounds.length} rounds)`}
                            </div>
                          </div>
                          <div className="p-3 bg-secondary/30 rounded">
                            <div className="text-muted-foreground mb-1">Total Profit</div>
                            <div className="font-semibold">
                              {Number(simulationResult.totalA) + Number(simulationResult.totalB)}
                            </div>
                          </div>
                          <div className="p-3 bg-secondary/30 rounded">
                            <div className="text-muted-foreground mb-1">Cooperation</div>
                            <div className="font-semibold">
                              {simulationResult.sustainedCooperation ? 'Yes' : 'No'}
                            </div>
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {simulationResult.rounds.length === 1
                          ? 'One-shot games typically result in mutual defection due to lack of future consequences. Run a repeated game to see how cooperation can emerge.'
                          : 'Repeated games allow for strategic adaptation and can sustain cooperation through reciprocal strategies, leading to higher collective profits over time.'}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
