import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useGameStore } from '@/features/state/useGameStore';
import CumulativeProfitChart from './CumulativeProfitChart';
import RoundsHistoryTable from './RoundsHistoryTable';
import { TrendingUp, Percent } from 'lucide-react';

export default function DashboardSection() {
  const { simulationResult } = useGameStore();

  if (!simulationResult) {
    return (
      <section id="dashboard" className="py-16 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 text-center">
              Visualization Dashboard
            </h2>
            <p className="text-lg text-muted-foreground text-center mb-12">
              Run a simulation to see results
            </p>
            <Card>
              <CardContent className="py-12 text-center text-muted-foreground">
                No simulation data available. Configure and run a simulation above.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    );
  }

  const cooperationCount = simulationResult.rounds.filter(
    r => r.decision.firmA && r.decision.firmB
  ).length;
  const cooperationRate = (cooperationCount / simulationResult.rounds.length) * 100;

  const firmACoopRate = (simulationResult.rounds.filter(r => r.decision.firmA).length / simulationResult.rounds.length) * 100;
  const firmBCoopRate = (simulationResult.rounds.filter(r => r.decision.firmB).length / simulationResult.rounds.length) * 100;

  return (
    <section id="dashboard" className="py-16 bg-secondary/20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 text-center">
            Visualization Dashboard
          </h2>
          <p className="text-lg text-muted-foreground text-center mb-12">
            Real-time analysis of simulation results
          </p>

          {/* Summary Cards */}
          <div className="grid md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Rounds
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{simulationResult.rounds.length}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <Percent className="h-4 w-4" />
                  Mutual Cooperation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">{cooperationRate.toFixed(1)}%</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Firm A Cooperation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-chart-1">{firmACoopRate.toFixed(1)}%</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Firm B Cooperation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-chart-2">{firmBCoopRate.toFixed(1)}%</div>
              </CardContent>
            </Card>
          </div>

          {/* Cumulative Profit Chart */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Cumulative Profit Over Time
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CumulativeProfitChart rounds={simulationResult.rounds} />
            </CardContent>
          </Card>

          {/* Round History Table */}
          <Card>
            <CardHeader>
              <CardTitle>Round-by-Round History</CardTitle>
            </CardHeader>
            <CardContent>
              <RoundsHistoryTable rounds={simulationResult.rounds} />
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
