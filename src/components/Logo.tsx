import React from 'react';
import Image from 'next/image';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = '' }) => {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <Image
        src="/logo/clidenta-logo.svg"
        alt="Clidenta"
        className="h-10 w-auto object-contain"
        width={208}
        height={40}
        priority
      />
    </div>
  );
};

export default Logo;
