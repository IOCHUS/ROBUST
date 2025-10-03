import React, { useEffect } from 'react';
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import CorePillars from './components/CorePillars';
import ModulesSection from './components/ModulesSection';
import TransformationSection from './components/TransformationSection';
import GuaranteeSection from './components/GuaranteeSection';
import Footer from './components/Footer';
import BackgroundEffects from './components/BackgroundEffects';
import GeometricShapes from './components/GeometricShapes';

function App() {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <div className="min-h-screen relative">
      <BackgroundEffects />
      <GeometricShapes />
      <div className="relative z-10">
        <Navigation />
        <HeroSection />
        <CorePillars />
        <ModulesSection />
        <TransformationSection />
        <GuaranteeSection />
        <Footer />
      </div>
    </div>
  );
}

export default App;