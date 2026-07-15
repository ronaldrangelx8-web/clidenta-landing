import React from 'react';
import Image from 'next/image';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = '' }) => {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <Image
        src="/logo/logo_black.png"
        alt="Logo"
        className="h-10 w-auto object-contain"
        width={160}
        height={40}
        priority
      />
    </div>
  );
};

export default Logo;
