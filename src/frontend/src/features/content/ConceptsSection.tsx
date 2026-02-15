import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function ConceptsSection() {
  return (
    <section id="concepts" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 text-center">
            Understanding the Prisoner's Dilemma
          </h2>
          <p className="text-lg text-muted-foreground text-center mb-12">
            A fundamental concept in strategic decision-making
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Badge variant="outline">Players</Badge>
                  Two Firms
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  <strong>Firm A</strong> and <strong>Firm B</strong> are competing businesses 
                  in the same market, each making independent pricing decisions.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Badge variant="outline">Actions</Badge>
                  Two Choices
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li><strong className="text-primary">Cooperate:</strong> Maintain high prices (mutual benefit)</li>
                  <li><strong className="text-destructive">Defect:</strong> Undercut prices (competitive advantage)</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Badge variant="outline">Payoffs</Badge>
                Profit Outcomes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Payoffs represent the profit each firm earns based on their combined decisions. 
                Higher numbers indicate greater profits.
              </p>
              <div className="bg-secondary/30 p-4 rounded-lg">
                <ul className="space-y-2 text-sm">
                  <li><strong>Both Cooperate (3,3):</strong> Both firms earn moderate profits</li>
                  <li><strong>A Defects, B Cooperates (5,0):</strong> A captures market share, B loses</li>
                  <li><strong>A Cooperates, B Defects (0,5):</strong> B captures market share, A loses</li>
                  <li><strong>Both Defect (1,1):</strong> Price war reduces profits for both</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-primary/50">
              <CardHeader>
                <CardTitle className="text-primary">Dominant Strategy</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  A <strong>dominant strategy</strong> is the best choice regardless of what the 
                  opponent does. In the classic setup, <strong>Defect</strong> is dominant for both 
                  firms because it yields higher profits no matter what the other firm chooses.
                </p>
              </CardContent>
            </Card>

            <Card className="border-accent/50">
              <CardHeader>
                <CardTitle className="text-accent">Nash Equilibrium</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  A <strong>Nash Equilibrium</strong> occurs when no player can improve their outcome 
                  by unilaterally changing strategy. In the classic dilemma, <strong>(Defect, Defect)</strong> 
                  is the Nash Equilibrium, even though both firms would be better off cooperating.
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-6 bg-destructive/5 border-destructive/20">
            <CardHeader>
              <CardTitle className="text-destructive">The Paradox</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                When both firms act rationally in their own self-interest, they both choose to defect, 
                earning (1,1) instead of the mutually beneficial (3,3) from cooperation. This demonstrates 
                how <strong>individual rationality can lead to collectively suboptimal outcomes</strong>.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
