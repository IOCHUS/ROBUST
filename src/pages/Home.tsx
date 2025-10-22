import React, { useEffect } from 'react';
import HeroSection from '../components/HeroSection';
import CorePillars from '../components/CorePillars';
import WhoIsThisFor from '../components/WhoIsThisFor';
import ModulesSection from '../components/ModulesSection';
import TimelineSection from '../components/TimelineSection';
import TransformationSection from '../components/TransformationSection';
import ComparisonSection from '../components/ComparisonSection';
import BonusesSection from '../components/BonusesSection';
import PricingSection from '../components/PricingSection';
import GuaranteeSection from '../components/GuaranteeSection';
import FAQSection from '../components/FAQSection';
import FounderSection from '../components/FounderSection';
import BackgroundEffects from '../components/BackgroundEffects';
import GeometricShapes from '../components/GeometricShapes';

const Home: React.FC = () => {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <div className="relative w-full">
      <BackgroundEffects />
      <div className="relative">
        <GeometricShapes />
        <div className="relative z-20">
          <HeroSection />
          <CorePillars />
          <WhoIsThisFor />
          <ModulesSection />
          <TimelineSection />
          <TransformationSection />
          <ComparisonSection />
          <BonusesSection />
          <PricingSection />
          <GuaranteeSection />
          <FAQSection />
          <FounderSection />
        </div>
      </div>
    </div>
  );
};

export default Home;
