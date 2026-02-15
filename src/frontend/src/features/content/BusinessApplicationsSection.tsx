import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, Megaphone, Plane, Smartphone } from 'lucide-react';

export default function BusinessApplicationsSection() {
  return (
    <section id="business-applications" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 text-center">
            Real-World Business Applications
          </h2>
          <p className="text-lg text-muted-foreground text-center mb-12">
            How the Prisoner's Dilemma manifests in competitive markets
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-primary" />
                  Oligopoly Pricing Wars
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-muted-foreground">
                  In markets with few competitors (oligopolies), firms face constant temptation to 
                  undercut rivals' prices. While maintaining high prices benefits all firms, each has 
                  an incentive to defect and capture market share.
                </p>
                <p className="text-sm text-muted-foreground">
                  <strong>Example:</strong> Gas stations on the same street often engage in price wars, 
                  reducing profits for all participants despite no real change in market demand.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Megaphone className="h-5 w-5 text-primary" />
                  Advertising Competition
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-muted-foreground">
                  Firms in competitive markets often engage in advertising arms races. If both firms 
                  advertise heavily, they cancel each other out while incurring high costs. Yet neither 
                  can afford to stop advertising unilaterally.
                </p>
                <p className="text-sm text-muted-foreground">
                  <strong>Example:</strong> Coca-Cola and Pepsi spend billions on advertising, largely 
                  neutralizing each other's efforts while maintaining high marketing budgets.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plane className="h-5 w-5 text-primary" />
                  Airline Price Competition
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-muted-foreground">
                  Airlines on the same routes face intense pressure to match competitors' fares. 
                  Cooperation (maintaining higher fares) would benefit all carriers, but the temptation 
                  to undercut and fill seats leads to industry-wide profit erosion.
                </p>
                <p className="text-sm text-muted-foreground">
                  <strong>Example:</strong> Budget airlines frequently trigger fare wars, forcing 
                  traditional carriers to match prices and reduce profitability across the sector.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Smartphone className="h-5 w-5 text-primary" />
                  Telecom Price Undercutting
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-muted-foreground">
                  Telecommunications companies compete aggressively on pricing for mobile plans and 
                  internet services. While industry-wide cooperation on pricing would maximize profits, 
                  competitive pressure drives continuous price reductions.
                </p>
                <p className="text-sm text-muted-foreground">
                  <strong>Example:</strong> Mobile carriers regularly launch promotional pricing to 
                  attract customers, forcing competitors to respond with similar offers.
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="text-primary">Key Insights for Business Strategy</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Why Firms Fail to Cooperate</h4>
                <p className="text-sm text-muted-foreground">
                  Even when cooperation is mutually beneficial, firms face strong incentives to defect. 
                  The fear that competitors will defect first, combined with the potential gains from 
                  unilateral defection, makes cooperation unstable.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">The Role of Trust</h4>
                <p className="text-sm text-muted-foreground">
                  Trust is essential for cooperation. In one-shot interactions, rational firms defect. 
                  However, when firms expect to interact repeatedly, trust can develop through 
                  reciprocal behavior, making cooperation more sustainable.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Impact of Repeated Interactions</h4>
                <p className="text-sm text-muted-foreground">
                  Repeated games change the strategic calculus. Firms can punish defection and reward 
                  cooperation over time. Strategies like Tit-for-Tat demonstrate how cooperation can 
                  emerge even among self-interested actors when interactions are ongoing.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Importance of Long-Term Strategy</h4>
                <p className="text-sm text-muted-foreground">
                  Short-term thinking leads to defection and suboptimal outcomes. Firms that adopt 
                  long-term perspectives and signal commitment to cooperation can achieve better results. 
                  Industry associations, price leadership, and tacit collusion (where legal) are 
                  mechanisms that facilitate cooperation.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
