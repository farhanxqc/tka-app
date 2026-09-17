import { Hero } from "@/components/hero";
import {
  FaqSection,
  FeaturesGrid,
  HowItWorks,
  LandingFooter,
  StatsSection,
  TestimonialSection,
  TrustBar,
} from "@/components/landing-sections";

export default function HomePage() {
  return (
    <div className="relative">
      <Hero />
      <TrustBar />
      <FeaturesGrid />
      <HowItWorks />
      <StatsSection />
      <TestimonialSection />
      <FaqSection />
      <LandingFooter />
    </div>
  );
}