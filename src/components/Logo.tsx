import Image from 'next/image';

interface LogoProps {
  className?: string;
}

export default function Logo({ className = '' }: LogoProps) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <Image
        src="/logo/clidenta-logo.svg"
        alt="Clidenta"
        className="h-10 w-auto object-contain"
        width={208}
        height={40}
        loading="eager"
      />
    </div>
  );
}
