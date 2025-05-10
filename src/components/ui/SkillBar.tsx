"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { Skill } from '@/lib/constants';

gsap.registerPlugin(ScrollTrigger);

interface SkillBarProps {
  skill: Skill;
  // index is used by parent for batching, not directly here for animation logic
  index: number; 
}

export function SkillBar({ skill, index }: SkillBarProps) {
  const skillBarRootRef = useRef<HTMLDivElement>(null);
  const skillNameRef = useRef<HTMLDivElement>(null); // For icon and name
  const progressElementRef = useRef<HTMLDivElement>(null); // For the progress fill
  const Icon = skill.icon;

  useEffect(() => {
    const rootEl = skillBarRootRef.current;
    const nameEl = skillNameRef.current;
    const progressEl = progressElementRef.current;

    if (rootEl && nameEl && progressEl) {
      // Set initial states using GSAP for elements animated by the parent batch
      // The parent (SkillsSection) will animate the rootEl
      // Here we define how internal parts animate relative to the rootEl's trigger
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: rootEl, // Trigger animation when this specific skill bar enters view
          start: 'top 90%',
          toggleActions: 'play none none none',
        }
      });

      // Animate Icon and Name
      tl.fromTo(nameEl,
        { opacity: 0, x: -50, skewX: -10 },
        { 
          opacity: 1, 
          x: 0, 
          skewX: 0,
          duration: 0.8, 
          ease: 'power3.out',
        }
      );
      
      // Animate Progress Bar
      tl.fromTo(progressEl,
        { width: '0%' },
        {
          width: `${skill.level}%`,
          duration: 1.8, // Longer duration for a smoother fill
          ease: 'expo.out', // Smoother ease
        },
        "-=0.5" // Overlap with name animation
      );
      
      return () => {
        tl.kill(); // Kill timeline to free up resources
      };
    }
  }, [skill.level, skill.name]);

  return (
    <div ref={skillBarRootRef} className="skill-bar-item mb-7 opacity-0"> {/* Added opacity-0 for GSAP control by parent */}
      <div ref={skillNameRef} className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <Icon className="h-6 w-6 mr-3 text-accent" />
          <span className="text-md md:text-lg font-medium text-foreground">{skill.name}</span>
        </div>
        <span className="text-sm font-medium text-accent">{skill.level}%</span>
      </div>
      <div className="w-full bg-muted/50 rounded-full h-3 shadow-inner overflow-hidden">
        <div
          ref={progressElementRef}
          className="skill-progress bg-gradient-to-r from-primary/70 to-primary h-full rounded-full"
          style={{ width: '0%' }} // Initial width, GSAP will animate this
        ></div>
      </div>
    </div>
  );
}