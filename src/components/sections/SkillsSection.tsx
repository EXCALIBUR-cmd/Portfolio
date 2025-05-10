"use client";

import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { SkillBar } from '@/components/ui/SkillBar';
import { skillsData } from '@/lib/constants';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function SkillsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
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
    }, sectionRef);
    return () => ctx.revert();
  }, []);


  return (
    <SectionWrapper id="skills" ref={sectionRef} className="bg-background">
      <div className="text-center mb-12 md:mb-16">
        <h2 ref={headingRef} className="text-4xl md:text-5xl font-bold text-primary tracking-tight">
          My Skills
        </h2>
        <div className="mt-4 h-1.5 w-24 bg-accent mx-auto rounded-full"></div>
      </div>
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
        {skillsData.map((skill) => (
          <SkillBar key={skill.name} skill={skill} />
        ))}
      </div>
    </SectionWrapper>
  );
}
