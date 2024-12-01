'use client';

export function getClientCookie(name: string): string | undefined {
  const cookies = document.cookie.split(';');
  const cookie = cookies.find((row) => row.startsWith(`${name}`));
  return cookie ? decodeURIComponent(cookie.split('=')[1]) : undefined;
}
