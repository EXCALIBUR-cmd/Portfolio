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
  const skillsGridRef = useRef<HTMLDivElement>(null);

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

      // Batch animation for SkillBar items
      if (skillsGridRef.current) {
        const skillItems = gsap.utils.toArray(skillsGridRef.current.querySelectorAll('.skill-bar-item'));
        // Note: SkillBar.tsx itself handles internal animations (name, progress bar)
        // This timeline only handles the entrance of the SkillBar component as a whole.
        tl.fromTo(skillItems,
          { opacity: 0, y: 60, scale: 0.95 },
          { 
            opacity: 1, 
            y: 0, 
            scale: 1,
            duration: 0.8, 
            ease: 'power3.out', 
            stagger: 0.15 // Stagger the appearance of each skill bar
          },
          "-=0.6" // Overlap with heading animation
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
      <div ref={skillsGridRef} className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2 md:gap-y-4"> {/* Reduced gap-y slightly */}
        {skillsData.map((skill, index) => (
          <SkillBar key={skill.name} skill={skill} index={index} />
        ))}
      </div>
    </SectionWrapper>
  );
}