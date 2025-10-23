import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import ScrollProgress from './components/ScrollProgress';
import StickyCTA from './components/StickyCTA';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Refund from './pages/Refund';
import Login from './pages/Login';
import PortalLayout from './components/portal/PortalLayout';
import Dashboard from './pages/portal/Dashboard';
import FEUTracker from './pages/portal/FEUTracker';
import Learning from './pages/portal/Learning';
import DeFi from './pages/portal/DeFi';
import Retirement from './pages/portal/Retirement';
import Dream from './pages/portal/Dream';
import Locker from './pages/portal/Locker';
import Network from './pages/portal/Network';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/portal" element={
          <ProtectedRoute>
            <PortalLayout />
          </ProtectedRoute>
        }>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="feu-tracker" element={<FEUTracker />} />
          <Route path="learning" element={<Learning />} />
          <Route path="defi" element={<DeFi />} />
          <Route path="retirement" element={<Retirement />} />
          <Route path="dream" element={<Dream />} />
          <Route path="locker" element={<Locker />} />
          <Route path="network" element={<Network />} />
        </Route>

        <Route path="*" element={
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
            </Routes>
            <StickyCTA />
            <Footer />
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;