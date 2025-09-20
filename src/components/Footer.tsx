import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="text-3xl font-bold mb-4">
              ROBUST<span className="text-amber-400">.</span>
            </div>
            <p className="text-gray-400 leading-relaxed max-w-md">
              Transform your reality with the most comprehensive wealth and life optimization masterclass. 
              Your journey to financial freedom starts here.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#about" className="text-gray-400 hover:text-white transition-colors">About</a></li>
              <li><a href="#modules" className="text-gray-400 hover:text-white transition-colors">Modules</a></li>
              <li><a href="#results" className="text-gray-400 hover:text-white transition-colors">Results</a></li>
              <li><a href="#guarantee" className="text-gray-400 hover:text-white transition-colors">Guarantee</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-center text-gray-400">
                <Mail size={16} className="mr-2" />
                <span className="text-sm">hello@robust.com</span>
              </div>
              <div className="flex items-center text-gray-400">
                <Phone size={16} className="mr-2" />
                <span className="text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center text-gray-400">
                <MapPin size={16} className="mr-2" />
                <span className="text-sm">Global Online</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 ROBUST MasterClass. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;