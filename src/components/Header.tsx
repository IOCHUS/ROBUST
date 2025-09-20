import React from 'react';
import { Globe } from 'lucide-react';

const Header = () => {
  return (
    <header className="fixed top-0 right-0 z-50 p-6">
      <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2">
        <img 
          src="https://flagcdn.com/w20/gb.png" 
          alt="English" 
          className="w-5 h-3"
        />
        <span className="text-white text-sm font-medium">EN</span>
      </div>
    </header>
  );
};

export default Header;