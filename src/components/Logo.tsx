
import React from 'react';

const Logo: React.FC = () => {
  return (
    <div className="flex items-center gap-2">
      <div className="h-10 w-10 rounded-full bg-gradient-to-r from-skip-primary to-skip-secondary flex items-center justify-center">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="text-white"
        >
          <path d="M20 6 9 17l-5-5"/>
        </svg>
      </div>
      <span className="font-bold text-xl">Select Skip</span>
    </div>
  );
};

export default Logo;
