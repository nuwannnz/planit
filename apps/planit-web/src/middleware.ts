import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export default async function middleware(req: NextRequest) {
  console.log('Middleware running for /me route');
  // 3. Decrypt the session from the cookie
  const cookie = (await cookies()).get('session')?.value;

  // 4. Redirect to /login if the user is not authenticated
  if (!cookie) {
    return NextResponse.redirect(new URL('/auth/login', req.nextUrl));
  }

  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ['/me', '/me/:path*'],
};
