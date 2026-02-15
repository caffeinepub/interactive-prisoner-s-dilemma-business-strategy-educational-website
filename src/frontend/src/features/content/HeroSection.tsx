import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';

export default function HeroSection() {
  const scrollToSimulation = () => {
    const element = document.getElementById('simulation');
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative py-20 md:py-32 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center section-reveal">
          <h1 className="font-display text-4xl md:text-6xl font-bold mb-6 text-foreground">
            Prisoner's Dilemma: Strategic Decision-Making in Business
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8">
            Why rational firms sometimes make suboptimal decisions
          </p>
          
          <div className="prose prose-lg mx-auto text-left mb-12 bg-card p-6 rounded-lg shadow-soft">
            <p className="text-foreground">
              <strong>Game Theory</strong> provides a framework for understanding strategic interactions 
              between rational decision-makers. The Prisoner's Dilemma illustrates a fundamental tension 
              in business: individual rationality can lead to collectively worse outcomes.
            </p>
            
            <div className="grid md:grid-cols-2 gap-4 mt-6 not-prose">
              <div className="bg-secondary/50 p-4 rounded">
                <h3 className="font-semibold text-foreground mb-2">Price Wars</h3>
                <p className="text-sm text-muted-foreground">
                  Competing firms undercut each other, eroding industry profits
                </p>
              </div>
              <div className="bg-secondary/50 p-4 rounded">
                <h3 className="font-semibold text-foreground mb-2">Advertising Competition</h3>
                <p className="text-sm text-muted-foreground">
                  Excessive ad spending with minimal market share gains
                </p>
              </div>
              <div className="bg-secondary/50 p-4 rounded">
                <h3 className="font-semibold text-foreground mb-2">Oligopoly Markets</h3>
                <p className="text-sm text-muted-foreground">
                  Few firms struggle to maintain profitable cooperation
                </p>
              </div>
              <div className="bg-secondary/50 p-4 rounded">
                <h3 className="font-semibold text-foreground mb-2">Trade Agreements</h3>
                <p className="text-sm text-muted-foreground">
                  Nations face incentives to defect from cooperative deals
                </p>
              </div>
            </div>
          </div>

          <Button size="lg" onClick={scrollToSimulation} className="gap-2">
            Start Simulation
            <ArrowDown className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
