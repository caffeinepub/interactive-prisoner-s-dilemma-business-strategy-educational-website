import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { usePayoffMatrix } from './usePayoffMatrix';
import { analyzePayoffMatrix } from './payoffAnalysis';
import { Loader2 } from 'lucide-react';

export default function PayoffMatrixSection() {
  const { matrix, isLoading, updateMatrix } = usePayoffMatrix();

  if (isLoading || !matrix) {
    return (
      <section id="payoff-matrix" className="py-16 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        </div>
      </section>
    );
  }

  const analysis = analyzePayoffMatrix(matrix);

  const handlePayoffChange = (field: keyof typeof matrix, value: string) => {
    const numValue = parseInt(value) || 0;
    updateMatrix({ ...matrix, [field]: BigInt(numValue) });
  };

  const getCellClass = (rowAction: 'cooperate' | 'defect', colAction: 'cooperate' | 'defect') => {
    const isNash = analysis.nashEquilibria.some(
      eq => eq.firmA === rowAction && eq.firmB === colAction
    );
    return isNash ? 'ring-2 ring-accent ring-offset-2' : '';
  };

  return (
    <section id="payoff-matrix" className="py-16 bg-secondary/20">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 text-center">
            Interactive Payoff Matrix
          </h2>
          <p className="text-lg text-muted-foreground text-center mb-12">
            Adjust payoffs to explore different strategic scenarios
          </p>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Matrix Display */}
            <Card>
              <CardHeader>
                <CardTitle>Payoff Matrix</CardTitle>
                <CardDescription>
                  Format: (Firm A profit, Firm B profit)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr>
                        <th className="border p-2 bg-muted"></th>
                        <th className="border p-3 bg-muted font-semibold">
                          Firm B<br />Cooperates
                        </th>
                        <th className="border p-3 bg-muted font-semibold">
                          Firm B<br />Defects
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border p-3 bg-muted font-semibold">
                          Firm A<br />Cooperates
                        </td>
                        <td className={`border p-4 text-center bg-card ${getCellClass('cooperate', 'cooperate')}`}>
                          <div className="text-lg font-bold text-primary">
                            ({Number(matrix.cooperateCooperateA)}, {Number(matrix.cooperateCooperateB)})
                          </div>
                        </td>
                        <td className={`border p-4 text-center bg-card ${getCellClass('cooperate', 'defect')}`}>
                          <div className="text-lg font-bold text-destructive">
                            ({Number(matrix.cooperateDefectA)}, {Number(matrix.cooperateDefectB)})
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className="border p-3 bg-muted font-semibold">
                          Firm A<br />Defects
                        </td>
                        <td className={`border p-4 text-center bg-card ${getCellClass('defect', 'cooperate')}`}>
                          <div className="text-lg font-bold text-destructive">
                            ({Number(matrix.defectCooperateA)}, {Number(matrix.defectCooperateB)})
                          </div>
                        </td>
                        <td className={`border p-4 text-center bg-card ${getCellClass('defect', 'defect')}`}>
                          <div className="text-lg font-bold">
                            ({Number(matrix.defectDefectA)}, {Number(matrix.defectDefectB)})
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {analysis.nashEquilibria.length > 0 && (
                  <div className="mt-4 p-3 bg-accent/10 rounded-lg border border-accent/20">
                    <p className="text-sm font-semibold text-accent mb-1">Nash Equilibrium:</p>
                    <p className="text-sm text-muted-foreground">
                      Cells with accent ring indicate Nash equilibrium outcomes
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Payoff Controls */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Adjust Payoffs</CardTitle>
                  <CardDescription>
                    Modify profit values to explore different scenarios
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="cc-a" className="text-xs">Both Cooperate - Firm A</Label>
                      <Input
                        id="cc-a"
                        type="number"
                        value={Number(matrix.cooperateCooperateA)}
                        onChange={(e) => handlePayoffChange('cooperateCooperateA', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="cc-b" className="text-xs">Both Cooperate - Firm B</Label>
                      <Input
                        id="cc-b"
                        type="number"
                        value={Number(matrix.cooperateCooperateB)}
                        onChange={(e) => handlePayoffChange('cooperateCooperateB', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="cd-a" className="text-xs">A Cooperates, B Defects - Firm A</Label>
                      <Input
                        id="cd-a"
                        type="number"
                        value={Number(matrix.cooperateDefectA)}
                        onChange={(e) => handlePayoffChange('cooperateDefectA', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="cd-b" className="text-xs">A Cooperates, B Defects - Firm B</Label>
                      <Input
                        id="cd-b"
                        type="number"
                        value={Number(matrix.cooperateDefectB)}
                        onChange={(e) => handlePayoffChange('cooperateDefectB', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="dc-a" className="text-xs">A Defects, B Cooperates - Firm A</Label>
                      <Input
                        id="dc-a"
                        type="number"
                        value={Number(matrix.defectCooperateA)}
                        onChange={(e) => handlePayoffChange('defectCooperateA', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="dc-b" className="text-xs">A Defects, B Cooperates - Firm B</Label>
                      <Input
                        id="dc-b"
                        type="number"
                        value={Number(matrix.defectCooperateB)}
                        onChange={(e) => handlePayoffChange('defectCooperateB', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="dd-a" className="text-xs">Both Defect - Firm A</Label>
                      <Input
                        id="dd-a"
                        type="number"
                        value={Number(matrix.defectDefectA)}
                        onChange={(e) => handlePayoffChange('defectDefectA', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="dd-b" className="text-xs">Both Defect - Firm B</Label>
                      <Input
                        id="dd-b"
                        type="number"
                        value={Number(matrix.defectDefectB)}
                        onChange={(e) => handlePayoffChange('defectDefectB', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Analysis */}
              <Card className="bg-primary/5 border-primary/20">
                <CardHeader>
                  <CardTitle className="text-primary">Strategic Analysis</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="font-semibold text-sm mb-1">Firm A's Dominant Strategy:</p>
                    <Badge variant={analysis.dominantStrategyA ? "default" : "secondary"}>
                      {analysis.dominantStrategyA || 'None'}
                    </Badge>
                    {analysis.dominantStrategyA && (
                      <p className="text-xs text-muted-foreground mt-1">
                        {analysis.dominantStrategyA === 'Defect' 
                          ? 'Defecting yields higher profits regardless of Firm B\'s choice'
                          : 'Cooperating yields higher profits regardless of Firm B\'s choice'}
                      </p>
                    )}
                  </div>

                  <div>
                    <p className="font-semibold text-sm mb-1">Firm B's Dominant Strategy:</p>
                    <Badge variant={analysis.dominantStrategyB ? "default" : "secondary"}>
                      {analysis.dominantStrategyB || 'None'}
                    </Badge>
                    {analysis.dominantStrategyB && (
                      <p className="text-xs text-muted-foreground mt-1">
                        {analysis.dominantStrategyB === 'Defect'
                          ? 'Defecting yields higher profits regardless of Firm A\'s choice'
                          : 'Cooperating yields higher profits regardless of Firm A\'s choice'}
                      </p>
                    )}
                  </div>

                  <div>
                    <p className="font-semibold text-sm mb-1">Nash Equilibrium:</p>
                    {analysis.nashEquilibria.length > 0 ? (
                      analysis.nashEquilibria.map((eq, idx) => (
                        <Badge key={idx} variant="outline" className="mr-2">
                          ({eq.firmA}, {eq.firmB})
                        </Badge>
                      ))
                    ) : (
                      <Badge variant="secondary">None detected</Badge>
                    )}
                  </div>

                  <div className="pt-2 border-t">
                    <p className="text-sm text-muted-foreground">
                      {analysis.explanation}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
