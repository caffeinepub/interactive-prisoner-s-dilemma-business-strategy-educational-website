import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Play, Loader2 } from 'lucide-react';
import { useGameStore } from '@/features/state/useGameStore';
import { useSimulation } from './useSimulation';
import { STRATEGIES } from './strategies';

export default function SimulationSection() {
  const { 
    gameMode, 
    setGameMode, 
    strategyA, 
    setStrategyA, 
    strategyB, 
    setStrategyB,
    rounds,
    setRounds,
  } = useGameStore();

  const { runSimulation, isRunning } = useSimulation();

  const handleRunSimulation = () => {
    runSimulation();
  };

  return (
    <section id="simulation" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 text-center">
            Run Simulation
          </h2>
          <p className="text-lg text-muted-foreground text-center mb-12">
            Configure and execute strategic scenarios
          </p>

          <Card>
            <CardHeader>
              <CardTitle>Simulation Controls</CardTitle>
              <CardDescription>
                Select game mode, strategies, and run the simulation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={gameMode} onValueChange={(v) => setGameMode(v as 'one-shot' | 'repeated')}>
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="one-shot">One-Shot Game</TabsTrigger>
                  <TabsTrigger value="repeated">Repeated Game</TabsTrigger>
                </TabsList>

                <TabsContent value="one-shot" className="space-y-6">
                  <p className="text-sm text-muted-foreground">
                    A single interaction where both firms make one decision simultaneously.
                  </p>
                </TabsContent>

                <TabsContent value="repeated" className="space-y-6">
                  <div>
                    <Label htmlFor="rounds">Number of Rounds (1-100)</Label>
                    <Input
                      id="rounds"
                      type="number"
                      min="1"
                      max="100"
                      value={rounds}
                      onChange={(e) => setRounds(Math.min(100, Math.max(1, parseInt(e.target.value) || 1)))}
                      className="mt-2"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Repeated interactions allow for strategic adaptation and cooperation to emerge.
                    </p>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <div>
                  <Label htmlFor="strategy-a">Firm A Strategy</Label>
                  <Select value={strategyA} onValueChange={setStrategyA}>
                    <SelectTrigger id="strategy-a" className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {STRATEGIES.map((strategy) => (
                        <SelectItem key={strategy.id} value={strategy.id}>
                          {strategy.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground mt-1">
                    {STRATEGIES.find(s => s.id === strategyA)?.description}
                  </p>
                </div>

                <div>
                  <Label htmlFor="strategy-b">Firm B Strategy</Label>
                  <Select value={strategyB} onValueChange={setStrategyB}>
                    <SelectTrigger id="strategy-b" className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {STRATEGIES.map((strategy) => (
                        <SelectItem key={strategy.id} value={strategy.id}>
                          {strategy.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground mt-1">
                    {STRATEGIES.find(s => s.id === strategyB)?.description}
                  </p>
                </div>
              </div>

              <Button 
                onClick={handleRunSimulation} 
                disabled={isRunning}
                className="w-full mt-6"
                size="lg"
              >
                {isRunning ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Running Simulation...
                  </>
                ) : (
                  <>
                    <Play className="mr-2 h-4 w-4" />
                    Run Simulation
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
