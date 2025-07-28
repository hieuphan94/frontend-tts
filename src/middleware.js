import { NextResponse } from 'next/server';

export function middleware(request) {
  const path = request.nextUrl.pathname;

  // Skip static files và public assets
  if (
    path === '/favicon.ico' ||
    path.startsWith('/_next/') ||
    path.startsWith('/public/') ||
    path.startsWith('/images/') ||
    path === '/health' ||
    path === '/api/health'
  ) {
    return NextResponse.next();
  }

  // Redirect root path to /personal
  if (path === '/') {
    return NextResponse.redirect(new URL('/personal', request.url));
  }

  // Allow all other requests to pass through
  return NextResponse.next();
}

// Cập nhật matcher config
export const config = {
  matcher: [
    // Exclude files
    '/((?!_next/static|_next/image|favicon.ico|images|public|health|api/health).*)',
    // Include API routes
    '/api/:path*',
  ],
};
