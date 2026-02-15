import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useGameStore } from '@/features/state/useGameStore';
import { usePayoffMatrix } from '@/features/payoff/usePayoffMatrix';
import { analyzePayoffMatrix } from '@/features/payoff/payoffAnalysis';
import { generateInterpretation } from './interpretation';
import { TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';

export default function InsightsSection() {
  const { simulationResult } = useGameStore();
  const { matrix } = usePayoffMatrix();

  if (!simulationResult || !matrix) {
    return (
      <section id="insights" className="py-16 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 text-center">
              Insights & Analysis
            </h2>
            <p className="text-lg text-muted-foreground text-center mb-12">
              Strategic interpretation of simulation results
            </p>
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Run a simulation to see detailed insights and strategic analysis.
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </section>
    );
  }

  const analysis = analyzePayoffMatrix(matrix);
  const interpretation = generateInterpretation(simulationResult, analysis);

  return (
    <section id="insights" className="py-16 bg-secondary/20">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 text-center">
            Insights & Analysis
          </h2>
          <p className="text-lg text-muted-foreground text-center mb-12">
            Strategic interpretation of simulation results
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  Nash Equilibrium
                </CardTitle>
              </CardHeader>
              <CardContent>
                {analysis.nashEquilibria.length > 0 ? (
                  <div className="space-y-2">
                    {analysis.nashEquilibria.map((eq, idx) => (
                      <Badge key={idx} variant="outline" className="text-base px-3 py-1">
                        ({eq.firmA}, {eq.firmB})
                      </Badge>
                    ))}
                    <p className="text-sm text-muted-foreground mt-3">
                      Neither firm can improve their outcome by unilaterally changing strategy.
                    </p>
                  </div>
                ) : (
                  <p className="text-muted-foreground">No pure strategy Nash equilibrium detected.</p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  Total Profits Comparison
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Firm A:</span>
                    <span className="text-2xl font-bold text-chart-1">
                      {Number(simulationResult.totalA)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Firm B:</span>
                    <span className="text-2xl font-bold text-chart-2">
                      {Number(simulationResult.totalB)}
                    </span>
                  </div>
                  <div className="pt-2 border-t">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Combined:</span>
                      <span className="text-xl font-bold">
                        {Number(simulationResult.totalA) + Number(simulationResult.totalB)}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {simulationResult.sustainedCooperation ? (
                  <>
                    <TrendingUp className="h-5 w-5 text-primary" />
                    Cooperation Sustained
                  </>
                ) : (
                  <>
                    <TrendingDown className="h-5 w-5 text-destructive" />
                    Cooperation Not Sustained
                  </>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                {simulationResult.sustainedCooperation
                  ? 'Both firms maintained cooperation throughout the simulation, achieving mutually beneficial outcomes.'
                  : 'At least one firm defected during the simulation, breaking cooperation and reducing collective profits.'}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="text-primary">Strategic Interpretation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground leading-relaxed">
                {interpretation}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
