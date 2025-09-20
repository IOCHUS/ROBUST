import React from 'react';
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import CorePillars from './components/CorePillars';
import ModulesSection from './components/ModulesSection';
import TransformationSection from './components/TransformationSection';
import GuaranteeSection from './components/GuaranteeSection';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <CorePillars />
      <ModulesSection />
      <TransformationSection />
      <GuaranteeSection />
      <Footer />
    </div>
  );
}

export default App;