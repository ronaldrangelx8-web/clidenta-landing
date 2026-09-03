import Logo from '@/components/Logo';

// Red de seguridad: si alguna ruta llega a suspender (p. ej. el primer render
// de una variante /a/[slug]), el visitante ve la marca en vez de una pantalla
// en blanco.
export default function Loading() {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center">
      <div className="animate-pulse">
        <Logo />
      </div>
    </main>
  );
}
