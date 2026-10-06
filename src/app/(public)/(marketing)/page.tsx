import CapabilityStrip from '@/components/modules/home/CapabilityStrip';
import CTA from '@/components/modules/home/CTA';
import Hero from '@/components/modules/home/Hero';
import HowItWorks from '@/components/modules/home/HowItWorks';
import Operations from '@/components/modules/home/Operations';
import Services from '@/components/modules/home/Services';
import TrackingPreview from '@/components/modules/home/TrackingPreview';

export default function HomePage() {
  return (
    <div>
      <Hero />
      <CapabilityStrip />
      <Services />
      <HowItWorks></HowItWorks>
      <TrackingPreview />
      <Operations></Operations>
      <CTA></CTA>
    </div>
  );
}