import { NextRequest, NextResponse } from 'next/server';

export function proxy(request: NextRequest) {
  // Generate a unique nonce for this request using Web Crypto API (Edge compatible)
  const array = new Uint8Array(16);
  globalThis.crypto.getRandomValues(array);
  const nonce = Array.from(array, b => b.toString(16).padStart(2, '0')).join('');
  const response = NextResponse.next();
  // Replace <nonce> in CSP header if present
  const csp = response.headers.get('content-security-policy');
  if (csp) {
    response.headers.set('content-security-policy', csp.replace(/<nonce>/g, nonce));
  }
  // Pass the nonce as a response header for use in _app/layout
  response.headers.set('x-nonce', nonce);
  return response;
}

// Optionally, restrict middleware to only relevant routes
// export const config = { matcher: ['/((?!_next|favicon.ico).*)'] };
