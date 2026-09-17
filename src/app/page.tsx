import { Hero } from "@/components/hero";
import {
  FaqSection,
  FeaturesGrid,
  HowItWorks,
  LandingFooter,
} from "@/components/landing-sections";

export default function HomePage() {
  return (
    <div className="relative">
      <Hero />
      <FeaturesGrid />
      <HowItWorks />
      <FaqSection />
      <LandingFooter />
    </div>
  );
}