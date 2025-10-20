import React, { useEffect } from 'react';
import HeroSection from '../components/HeroSection';
import CorePillars from '../components/CorePillars';
import ModulesSection from '../components/ModulesSection';
import TransformationSection from '../components/TransformationSection';
import GuaranteeSection from '../components/GuaranteeSection';
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
          <ModulesSection />
          <TransformationSection />
          <GuaranteeSection />
        </div>
      </div>
    </div>
  );
};

export default Home;
