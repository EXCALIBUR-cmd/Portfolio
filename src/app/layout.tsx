
'use client'; // Add this line at the very top

// Removed Metadata import as it's not used in client component
import { Geist, Geist_Mono } from 'next/font/google';
import useLocomotiveScroll from '@/hooks/use-locomotive-scroll';
import useCustomCursor from '@/hooks/use-custom-cursor'; 
import { useRef } from 'react'; 
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

// Metadata moved or handled differently for client components if needed globally
// export const metadata: Metadata = {
//   title: 'Portfolio | Creative Portfolio', // Updated title here
//   description: 'A modern portfolio showcasing creative projects with stunning animations.',
// };


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const scrollRef = useRef(null); 

  useLocomotiveScroll(scrollRef); 
  useCustomCursor(); 


  return (
    <html lang="en" className="dark">
      <head>
        {/* You can place metadata tags directly here if needed for client component layout */}
        <title>Portfolio | Creative Portfolio</title>
        <meta name="description" content="A modern portfolio showcasing creative projects with stunning animations." />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen bg-background text-foreground`}>
        <Navbar />
        <div id="main-container" data-scroll-container ref={scrollRef}> 
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
