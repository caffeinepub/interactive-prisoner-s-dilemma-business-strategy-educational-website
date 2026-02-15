import { useState } from 'react';
import TopNav from '@/components/layout/TopNav';
import HeroSection from '@/features/content/HeroSection';
import ConceptsSection from '@/features/content/ConceptsSection';
import PayoffMatrixSection from '@/features/payoff/PayoffMatrixSection';
import SimulationSection from '@/features/simulation/SimulationSection';
import DashboardSection from '@/features/dashboard/DashboardSection';
import BusinessApplicationsSection from '@/features/content/BusinessApplicationsSection';
import InsightsSection from '@/features/insights/InsightsSection';
import BusinessAnalyticsMode from '@/features/analytics/BusinessAnalyticsMode';
import Footer from '@/components/layout/Footer';
import { useGameStore } from '@/features/state/useGameStore';

export default function PrisonersDilemmaPage() {
  const { analyticsMode } = useGameStore();

  return (
    <div className="min-h-screen bg-background">
      <TopNav />
      
      <main className="pt-16">
        <HeroSection />
        <ConceptsSection />
        <PayoffMatrixSection />
        <SimulationSection />
        <DashboardSection />
        <BusinessApplicationsSection />
        <InsightsSection />
        {analyticsMode && <BusinessAnalyticsMode />}
      </main>

      <Footer />
    </div>
  );
}
