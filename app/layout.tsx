import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { RootProvider } from "@/components/providers/root-provider";
import { getServerUser } from "@/lib/auth/server-utils";
import { AppLayout } from "@/components/layout/app-layout";

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Task Manager - Organize Your Life',
  description: 'A modern task management application built with Next.js and Supabase',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const initialUser = await getServerUser();

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <RootProvider initialUser={initialUser}>
          <AppLayout>{children}</AppLayout>
        </RootProvider>
      </body>
    </html>
  );
}