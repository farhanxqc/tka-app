import { BentoDashboard } from "@/components/bento-dashboard";
import { Hero } from "@/components/hero";
import {
  CtaBanner,
  ComparisonTable,
  FaqSection,
  FeaturesGrid,
  HowItWorks,
  LandingFooter,
  PainPoints,
} from "@/components/landing-sections";

export default function HomePage() {
  return (
    <div className="relative">
      <Hero />
      <PainPoints />
      <FeaturesGrid />
      <HowItWorks />
      <BentoDashboard />
      <ComparisonTable />
      <FaqSection />
      <CtaBanner />
      <LandingFooter />
    </div>
  );
}