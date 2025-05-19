
"use client";

import Link from 'next/link';
import { Code2, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import React, { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import gsap from 'gsap';

const navLinks = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
];

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeHash, setActiveHash] = useState('');
  const pathname = usePathname();
  const logoRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (logoRef.current) {
      gsap.fromTo(
        logoRef.current,
        { opacity: 0, y: -25, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'power3.out', delay: 0.2 }
      );
    }
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      setActiveHash(window.location.hash || '#home'); // Default to #home if no hash
    };
    
    // Set initial active hash based on current URL hash or default to #home
    if (typeof window !== 'undefined') {
      setActiveHash(window.location.hash || '#home');
      window.addEventListener('hashchange', handleHashChange);
    }
    
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('hashchange', handleHashChange);
      }
    };
  }, []);
  
  // Effect for scroll-based active link highlighting
  useEffect(() => {
    const sections = navLinks.map(link => document.getElementById(link.href.substring(1)));
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Prioritize hash from URL if it exists and matches the intersecting section
          if (window.location.hash === `#${entry.target.id}`) {
             setActiveHash(window.location.hash);
          } else if (!window.location.hash || window.location.hash === '#home') {
            // If no specific hash or it's home, use intersection
            setActiveHash(`#${entry.target.id}`);
          }
        }
      });
    }, { rootMargin: "-40% 0px -60% 0px" }); // Adjust rootMargin to make detection more centered

    sections.forEach(section => {
      if (section) observer.observe(section);
    });
    
    // Set initial active state based on what's visible, falling back to #home
    const initiallyVisibleSection = sections.find(section => {
        if (!section) return false;
        const rect = section.getBoundingClientRect();
        return rect.top <= window.innerHeight * 0.5 && rect.bottom >= window.innerHeight * 0.5;
    });

    if (initiallyVisibleSection) {
        setActiveHash(`#${initiallyVisibleSection.id}`);
    } else if (!window.location.hash) {
        setActiveHash('#home');
    }


    return () => {
      sections.forEach(section => {
        if (section) observer.unobserve(section);
      });
    };
  }, [pathname]);


  const NavLinkItem = ({ href, label, onClick }: { href: string; label: string, onClick?: () => void }) => (
    <Link
      href={href}
      onClick={(e) => {
        // e.preventDefault(); // Prevent default only if we are manually scrolling
        // Manually update hash and scroll if needed, or let browser handle it
        // window.location.hash = href; 
        if (onClick) onClick();
        setActiveHash(href); // Immediately update active hash on click
      }}
      className={cn(
        "px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:text-accent hover:bg-accent/10 focus:outline-none focus:ring-2 focus:ring-accent/50",
        activeHash === href ? "text-accent font-semibold bg-accent/5" : "text-foreground/80"
      )}
    >
      {label}
    </Link>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/85 backdrop-blur-lg supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="#home" ref={logoRef} className="flex items-center gap-2 text-xl font-bold text-primary" onClick={() => setActiveHash('#home')}>
          <Code2 className="h-7 w-7 text-accent" />
          <span>Portfolio</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
          {navLinks.map((link) => (
            <NavLinkItem key={link.href} href={link.href} label={link.label} />
          ))}
        </nav>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-xs bg-background p-6 border-l-border/60">
              <div className="flex flex-col space-y-6">
                <div className="flex justify-between items-center">
                   <Link href="#home" className="flex items-center gap-2 text-lg font-bold text-primary" 
                         onClick={() => { setIsMobileMenuOpen(false); setActiveHash('#home'); }}>
                      <Code2 className="h-6 w-6 text-accent" />
                      <span>Portfolio</span>
                    </Link>
                  <SheetClose asChild>
                     <Button variant="ghost" size="icon">
                        <X className="h-6 w-6" />
                        <span className="sr-only">Close menu</span>
                      </Button>
                  </SheetClose>
                </div>
                <nav className="flex flex-col space-y-3">
                  {navLinks.map((link) => (
                    <NavLinkItem 
                      key={link.href} 
                      href={link.href} 
                      label={link.label} 
                      onClick={() => setIsMobileMenuOpen(false)}
                    />
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
