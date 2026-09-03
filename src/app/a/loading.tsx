import Logo from '@/components/Logo';

// Red de seguridad solo para las variantes de anuncio /a/[slug] (dinámicas):
// en el primer render de un slug el visitante ve la marca en vez de una
// pantalla en blanco. La home es estática y no lo necesita — tenerlo global
// le impedía pintar el hero progresivamente.
export default function Loading() {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center">
      <div className="animate-pulse">
        <Logo />
      </div>
    </main>
  );
}
