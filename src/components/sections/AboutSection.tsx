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
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none none',
        }
      });

      if (headingRef.current) {
        tl.fromTo(headingRef.current,
          { opacity: 0, y: 80, rotationX: -30 },
          { opacity: 1, y: 0, rotationX: 0, duration: 1, ease: 'power4.out' }
        );
      }

      if (imageRef.current) {
        tl.fromTo(imageRef.current,
          { opacity: 0, x: -150, scale: 0.7, rotationZ: -10 },
          { opacity: 1, x: 0, scale: 1, rotationZ: 0, duration: 1.5, ease: 'expo.out' },
          "-=0.6" // Overlap with heading animation
        );
      }

      if (textContentRef.current) {
        const paragraphs = gsap.utils.toArray(textContentRef.current.children);
        tl.fromTo(paragraphs,
          { opacity: 0, y: 50, skewX: 5 },
          { opacity: 1, y: 0, skewX: 0, stagger: 0.25, duration: 1, ease: 'power3.out' },
          "-=1.2" // Overlap significantly
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
      <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
        <div ref={imageRef} className="relative aspect-[4/5] max-w-md mx-auto w-full group">
          <Card className="overflow-hidden shadow-2xl rounded-xl h-full">
            <CardContent className="p-0 h-full">
             <Image
                src="https://picsum.photos/seed/profile2/600/750" // Slightly taller aspect ratio
                alt="Profile Picture"
                data-ai-hint="modern professional"
                width={600}
                height={750}
                className="object-cover rounded-xl w-full h-full transform transition-transform duration-700 ease-out group-hover:scale-105"
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