import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

/**
 * Fonts loaded via next/font — optimized at build time, self-hosted,
 * no runtime requests to Google Fonts, and no layout shift (CLS).
 */
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DevHive Users",
  description:
    "User management dashboard built with Next.js, React, and TypeScript",
};

/**
 * Root layout — Server Component that wraps every page.
 * Sets up HTML structure, fonts, and global styles.
 * Persists across navigations (not re-rendered on route change).
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
