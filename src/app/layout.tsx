
'use client'; // Add this line at the very top

import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import useLocomotiveScroll from '@/hooks/use-locomotive-scroll';
import useCustomCursor from '@/hooks/use-custom-cursor'; // Import the custom cursor hook
import { useRef, useEffect } from 'react'; // Keep these imports
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Toaster } from "@/components/ui/toaster";


const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

// You might not need metadata here if it's a client component
// export const metadata: Metadata = {
//   title: 'MotionPort | Creative Portfolio',
//   description: 'A modern portfolio showcasing creative projects with stunning animations.',
// };


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const scrollRef = useRef(null); // Keep this ref

  useLocomotiveScroll(scrollRef); // Keep this hook call
  useCustomCursor(); // Call the custom cursor hook


  return (
    <html lang="en" className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen bg-background text-foreground`}>
        <Navbar />
        <div id="main-container" data-scroll-container ref={scrollRef}> {/* Apply the ref here */}
          <main className="flex-grow" data-scroll-section>
            {children}
          </main>
          <Footer data-scroll-section />
          <Toaster data-scroll-section />
        </div>
      </body>
    </html>
  );
}
