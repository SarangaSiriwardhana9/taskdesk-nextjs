'use client';

import { useIsAuthenticated } from '@/lib/stores/auth-store';
import { HeroSection } from '@/components/features/home/hero-section';
import { FeaturesSection } from '@/components/features/home/features-section';
import { BenefitsSection } from '@/components/features/home/benefits-section';
import { CTASection } from '@/components/features/home/cta-section';

export default function Home() {
  const isAuthenticated = useIsAuthenticated();

  return (
    <main className="min-h-screen bg-background pt-16 overflow-hidden">
      <HeroSection />
      <FeaturesSection />
      <BenefitsSection />
      {!isAuthenticated && <CTASection />}
    </main>
  );
}
