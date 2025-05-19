
/**
 * @fileOverview Hero section component for the Portfolio.
 * Features an animated headline, subtitle, and call-to-action button.
 * Uses GSAP for entry animations.
 */
"use client";

import type { ElementRef } from 'react';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Button } from '@/components/ui/button';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { ArrowDown } from 'lucide-react';
import Link from 'next/link';

export function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaButtonRef = useRef<HTMLAnchorElement>(null);
  const scrollIndicatorRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 });

      // Animate title characters
      if (titleRef.current) {
        const newTitle = "Front-End Developer";
        // Ensure the title is updated before splitting, if it's not already set
        if (titleRef.current.innerText.trim().toLowerCase() !== newTitle.trim().toLowerCase()) {
            titleRef.current.innerText = newTitle;
        }
        const chars = titleRef.current.innerText.split('');
        titleRef.current.innerHTML = chars.map(char =>
          `<span class="inline-block opacity-0 translate-y-10 rotate-x-[-90deg]">${char === ' ' ? '&nbsp;' : char}</span>`
        ).join('');

        tl.to(titleRef.current.children, {
          opacity: 1,
          y: 0,
          rotationX: 0,
          stagger: 0.05, // Adjusted stagger for potentially longer text
          duration: 1,
          ease: 'expo.out',
        });
      }

      // Animate subtitle
      tl.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 50, skewX: -5 },
        { opacity: 1, y: 0, skewX: 0, duration: 1.2, ease: 'expo.out' },
        "-=0.7" // Overlap with title animation
      );

      // Animate CTA button
      if (ctaButtonRef.current) { // Check if ref is not null
        tl.fromTo(
          ctaButtonRef.current,
          { opacity: 0, scale: 0.5, y: 30 },
          { opacity: 1, scale: 1, y: 0, duration: 1, ease: 'back.out(2)' },
          "-=0.8" // Overlap
        );
      }

      // Animate Scroll Indicator
      if (scrollIndicatorRef.current) { // Check if ref is not null
         gsap.fromTo(
          scrollIndicatorRef.current,
          { opacity: 0, y: -30 },
          { opacity: 1, y: 0, duration: 1.5, ease: 'power2.inOut', delay: 2.5, repeat: -1, yoyo: true }
        );
      }

    }, sectionRef);

    return () => ctx.revert(); // Cleanup GSAP animations
  }, []);

  return (
    <SectionWrapper id="home" ref={sectionRef} className="bg-gradient-to-br from-background to-secondary/50 text-center overflow-hidden">
      <div className="relative z-10 flex flex-col items-center">
        <h1 ref={titleRef} className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-8 text-primary leading-tight hero-title-glow">
          Front-End Developer
        </h1>
        <p ref={subtitleRef} className="text-xl md:text-2xl text-muted-foreground max-w-2xl mb-12">
          Crafting immersive digital experiences with cutting-edge animations and modern design.
        </p>
        <Link href="#projects" passHref ref={ctaButtonRef}>
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-full px-12 py-7 text-xl shadow-lg transform transition-transform hover:scale-105 active:scale-95">
              View My Work
            </Button>
        </Link>
      </div>
      <Link
        href="#about"
        passHref
        ref={scrollIndicatorRef}
      >
        <ArrowDown className="absolute bottom-12 left-1/2 -translate-x-1/2 text-accent hover:text-accent/80 transition-colors p-2 rounded-full h-10 w-10" />
        <span className="sr-only">Scroll to About section</span>
      </Link>
    </SectionWrapper>
  );
}
