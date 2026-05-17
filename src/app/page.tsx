import { HeroV2 } from '@/components/hero/HeroV2';
import { Nav } from '@/components/sections/Nav';
import { StorySection } from '@/components/sections/StorySection';
import { PricingSection } from '@/components/sections/PricingSection';
import { Footer } from '@/components/sections/Footer';

export default function HomePage() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <HeroV2 />
        <div id="story">
          <StorySection />
        </div>
        <PricingSection />
      </main>
      <Footer />
    </>
  );
}
