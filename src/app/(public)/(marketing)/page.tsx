import CapabilityStrip from '@/components/modules/home/CapabilityStrip';
import Hero from '@/components/modules/home/Hero';
import HowItWorks from '@/components/modules/home/HowItWorks';
import Services from '@/components/modules/home/Services';

export default function HomePage() {
  return (
    <div>
      <Hero />
      <CapabilityStrip />
      <Services />
      <HowItWorks></HowItWorks>
    </div>
  );
}