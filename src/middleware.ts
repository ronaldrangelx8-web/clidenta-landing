import { NextRequest, NextResponse } from 'next/server';

/**
 * Los anuncios llegan a "/" con ?ad=<slug> (o ?v= / ?utm_content=). Reescribimos
 * internamente a /a/<slug> (la URL visible no cambia) para que "/" pueda ser
 * 100% estática y la variante del anuncio use ISR. Slugs inválidos siguen a la
 * home estática con el copy por defecto — mismo comportamiento que antes.
 */
const SLUG_RE = /^[a-z0-9-]{1,60}$/;

export function middleware(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const slug = (
    searchParams.get('ad') ||
    searchParams.get('v') ||
    searchParams.get('utm_content') ||
    ''
  )
    .toLowerCase()
    .trim();

  if (slug && SLUG_RE.test(slug)) {
    const url = req.nextUrl.clone();
    url.pathname = `/a/${slug}`;
    return NextResponse.rewrite(url);
  }
  return NextResponse.next();
}

export const config = { matcher: '/' };
