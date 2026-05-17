import Hero3D from '@/components/hero/Hero3D';
import { Nav } from '@/components/sections/Nav';
import { StorySection } from '@/components/sections/StorySection';
import { PricingSection } from '@/components/sections/PricingSection';
import { Footer } from '@/components/sections/Footer';
import { SmoothScroll } from '@/components/SmoothScroll';

export default function HomePage() {
  return (
    <>
      <SmoothScroll />
      <Nav />
      <main className="flex-1">
        <Hero3D />
        <div id="story">
          <StorySection />
        </div>
        <PricingSection />
      </main>
      <Footer />
    </>
  );
}
