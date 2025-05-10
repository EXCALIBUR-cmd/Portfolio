"use client";

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
      // Animate title characters
      if (titleRef.current) {
        const chars = titleRef.current.innerText.split('');
        titleRef.current.innerHTML = chars.map(char => `<span class="inline-block opacity-0 translate-y-10">${char === ' ' ? '&nbsp;' : char}</span>`).join('');
        gsap.to(titleRef.current.children, {
          opacity: 1,
          y: 0,
          stagger: 0.05,
          duration: 0.8,
          ease: 'power3.out',
          delay: 0.5,
        });
      }

      // Animate subtitle
      gsap.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 1.2 }
      );

      // Animate CTA button
      gsap.fromTo(
        ctaButtonRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.7)', delay: 1.7 }
      );
      
      // Animate Scroll Indicator
       gsap.fromTo(
        scrollIndicatorRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 2.2, repeat: -1, yoyo: true }
      );

    }, sectionRef);

    return () => ctx.revert(); // Cleanup GSAP animations
  }, []);

  return (
    <SectionWrapper id="home" ref={sectionRef} className="bg-gradient-to-br from-background to-secondary/30 text-center overflow-hidden">
      <div className="relative z-10 flex flex-col items-center">
        <h1 ref={titleRef} className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-6 text-primary leading-tight">
          MotionPort
        </h1>
        <p ref={subtitleRef} className="text-xl md:text-2xl text-muted-foreground max-w-2xl mb-10">
          Crafting immersive digital experiences with cutting-edge animations and modern design.
        </p>
        <Link href="#projects" passHref legacyBehavior ref={ctaButtonRef}>
          <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-full px-10 py-6 text-lg shadow-lg transform transition-transform hover:scale-105">
            View My Work
          </Button>
        </Link>
      </div>
      <Link href="#about" passHref legacyBehavior ref={scrollIndicatorRef}>
        <a className="absolute bottom-10 left-1/2 -translate-x-1/2 text-accent hover:text-accent/80 transition-colors p-2 rounded-full animate-bounce">
          <ArrowDown className="h-8 w-8" />
          <span className="sr-only">Scroll to About section</span>
        </a>
      </Link>
    </SectionWrapper>
  );
}
