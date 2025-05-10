"use client";

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { Card, CardContent } from '@/components/ui/card';

gsap.registerPlugin(ScrollTrigger);

export function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textContentRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headingRef.current) {
        gsap.fromTo(headingRef.current,
          { opacity: 0, y: 50 },
          {
            opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: headingRef.current, start: 'top 80%', toggleActions: 'play none none none' }
          }
        );
      }
      if (imageRef.current) {
        gsap.fromTo(imageRef.current,
          { opacity: 0, x: -100, scale: 0.8 },
          {
            opacity: 1, x: 0, scale: 1, duration: 1, ease: 'power3.out',
            scrollTrigger: { trigger: imageRef.current, start: 'top 80%', end: 'bottom 20%', scrub: 1 }
          }
        );
      }
      if (textContentRef.current) {
        gsap.fromTo(textContentRef.current,
          { opacity: 0, x: 100 },
          {
            opacity: 1, x: 0, duration: 1, ease: 'power3.out',
            scrollTrigger: { trigger: textContentRef.current, start: 'top 80%', toggleActions: 'play none none none' }
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <SectionWrapper id="about" ref={sectionRef} className="bg-background">
      <div className="text-center mb-12 md:mb-16">
        <h2 ref={headingRef} className="text-4xl md:text-5xl font-bold text-primary tracking-tight">
          About Me
        </h2>
        <div className="mt-4 h-1.5 w-24 bg-accent mx-auto rounded-full"></div>
      </div>
      <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
        <div ref={imageRef} className="relative aspect-square max-w-md mx-auto w-full">
          <Card className="overflow-hidden shadow-2xl rounded-xl h-full">
            <CardContent className="p-0 h-full">
             <Image
                src="https://picsum.photos/seed/profile/600/600"
                alt="Profile Picture"
                data-ai-hint="professional portrait"
                width={600}
                height={600}
                className="object-cover rounded-xl w-full h-full transform transition-transform duration-500 hover:scale-105"
              />
            </CardContent>
          </Card>
        </div>
        <div ref={textContentRef} className="space-y-6 text-lg text-muted-foreground text-left md:text-left">
          <p>
            Hello! I'm a passionate developer and designer with a knack for creating dynamic and engaging web experiences. My journey in tech has been driven by a love for visual storytelling and innovative problem-solving.
          </p>
          <p>
            With a strong foundation in front-end technologies like React and Next.js, I specialize in bringing ideas to life with fluid animations using GSAP. I believe that thoughtful design and seamless interactions are key to captivating users.
          </p>
          <p>
            When I'm not coding, you can find me exploring new design trends, contributing to open-source projects, or hiking in nature to recharge my creative batteries.
          </p>
        </div>
      </div>
    </SectionWrapper>
  );
}
