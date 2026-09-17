import { BentoDashboard } from "@/components/bento-dashboard";
import { Hero } from "@/components/hero";

export default function HomePage() {
  return (
    <div className="relative">
      <Hero />
      <BentoDashboard />
    </div>
  );
}
