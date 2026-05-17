import { HeroV2 } from '@/components/hero/HeroV2';
import { Nav } from '@/components/sections/Nav';
import { BentoFeatures } from '@/components/sections/BentoFeatures';
import { StorySection } from '@/components/sections/StorySection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { PricingSection } from '@/components/sections/PricingSection';
import { Footer } from '@/components/sections/Footer';

export default function HomePage() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <HeroV2 />
        <BentoFeatures />
        <div id="story">
          <StorySection />
        </div>
        <TestimonialsSection />
        <PricingSection />
      </main>
      <Footer />
    </>
  );
}
