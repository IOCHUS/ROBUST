import React from 'react';
import { Routes, Route } from 'react-router-dom';

// === PROTECTED ROUTE ===
import ProtectedRoute from './components/ProtectedRoute';

// === PORTAL LAYOUT ===
import PortalLayout from './components/portal/PortalLayout';

// === PUBLIC PAGES ===
import Home from './pages/Home';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Refund from './pages/Refund';
import Login from './pages/Login';

// === PORTAL PAGES ===
import Dashboard from './pages/portal/Dashboard';
import Tracker from './pages/portal/Tracker';
import Learning from './pages/portal/Learning';
import DeFi from './pages/portal/DeFi';
import Portfolio from './pages/portal/Portfolio';
import Dream from './pages/portal/Dream';
import Network from './pages/portal/Network';

// === SHARED COMPONENTS ===
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import ScrollProgress from './components/ScrollProgress';
import StickyCTA from './components/StickyCTA';

export default function App() {
  return (
    <Routes>
      {/* PUBLIC ROUTES */}
      <Route
        path="/*"
        element={
          <div className="relative w-full">
            <ScrollProgress />
            <Navigation />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/refund" element={<Refund />} />
              <Route path="/login" element={<Login />} />
            </Routes>
            <StickyCTA />
            <Footer />
          </div>
        }
      />

      {/* PROTECTED PORTAL */}
      <Route
        path="/portal/*"
        element={
          <ProtectedRoute>
            <PortalLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="tracker" element={<Tracker />} />
        <Route path="learning" element={<Learning />} />
        <Route path="defi" element={<DeFi />} />
        <Route path="portfolio" element={<Portfolio />} />
        <Route path="dream" element={<Dream />} />
        <Route path="network" element={<Network />} />
        <Route index element={<Dashboard />} />
      </Route>
    </Routes>
  );
}