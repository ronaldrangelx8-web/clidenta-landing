import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-teal-950 py-8 px-4 border-t border-white/10">
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-4 text-center">
        <Image
          src="/logo/clidenta-logo-light.png"
          alt="Clidenta"
          width={158}
          height={36}
          className="h-9 w-auto object-contain"
        />
        <p className="text-teal-100/70 text-sm font-sans">
          Rangel Group LLC · Todos los derechos reservados
        </p>
      </div>
    </footer>
  );
}
