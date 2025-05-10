"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { Skill } from '@/lib/constants';

gsap.registerPlugin(ScrollTrigger);

interface SkillBarProps {
  skill: Skill;
}

export function SkillBar({ skill }: SkillBarProps) {
  const barRef = useRef<HTMLDivElement>(null);
  const skillNameRef = useRef<HTMLDivElement>(null);
  const Icon = skill.icon;

  useEffect(() => {
    const barElement = barRef.current;
    const skillNameElement = skillNameRef.current;

    if (barElement && skillNameElement) {
      const ctx = gsap.context(() => {
        gsap.fromTo(skillNameElement,
          { opacity: 0, x: -20 },
          { 
            opacity: 1, 
            x: 0, 
            duration: 0.6, 
            ease: 'power2.out',
            scrollTrigger: {
              trigger: skillNameElement,
              start: 'top 90%',
              toggleActions: 'play none none none'
            }
          }
        );
        gsap.fromTo(barElement.querySelector('.skill-progress'),
          { width: '0%' },
          {
            width: `${skill.level}%`,
            duration: 1.5,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: barElement,
              start: 'top 90%',
              toggleActions: 'play none none none'
            }
          }
        );
      });
      return () => ctx.revert();
    }
  }, [skill.level]);

  return (
    <div className="mb-6">
      <div ref={skillNameRef} className="flex items-center justify-between mb-1">
        <div className="flex items-center">
          <Icon className="h-5 w-5 mr-2 text-accent" />
          <span className="text-md font-medium text-foreground">{skill.name}</span>
        </div>
        <span className="text-sm font-medium text-accent">{skill.level}%</span>
      </div>
      <div ref={barRef} className="w-full bg-muted rounded-full h-2.5 shadow-inner">
        <div
          className="skill-progress bg-gradient-to-r from-accent/70 to-accent h-2.5 rounded-full transition-all duration-500 ease-out"
          style={{ width: '0%' }} // Initial width, GSAP will animate this
        ></div>
      </div>
    </div>
  );
}
