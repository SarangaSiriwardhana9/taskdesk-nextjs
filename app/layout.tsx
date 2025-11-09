import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/providers/providers';
import { getServerUser } from '@/lib/auth/server-utils';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'TaskDesk - Organize Your Life',
  description: 'Modern task management application built with Next.js and Supabase',
  icons: {
    icon: [
      {
        url: '/task.png',
        sizes: 'any',
        type: 'image/png',
      },
    ],
    shortcut: '/task.png',
    apple: '/task.png',
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const initialUser = await getServerUser();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/png" href="/task.png" />
        <link rel="shortcut icon" type="image/png" href="/task.png" />
        <link rel="apple-touch-icon" href="/task.png" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers initialUser={initialUser}>
          {children}
        </Providers>
      </body>
    </html>
  );
}