"use client";

import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { ProjectCard } from '@/components/ui/ProjectCard';
import { projectsData } from '@/lib/constants';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function ProjectsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%', // Start animations when section is 70% from top of viewport
          toggleActions: 'play none none none',
        }
      });

      if (headingRef.current) {
        tl.fromTo(headingRef.current,
          { opacity: 0, y: 80, rotationX: -30 },
          { opacity: 1, y: 0, rotationX: 0, duration: 1, ease: 'power4.out' }
        );
      }
      
      // Batch animation for project cards
      if (gridRef.current) {
        const cards = gsap.utils.toArray(gridRef.current.querySelectorAll('.project-card-item'));
        tl.to(cards, {
          opacity: 1,
          y: 0,
          scale: 1,
          rotationX: 0,
          duration: 1,
          ease: 'power4.out',
          stagger: 0.2,
        }, "-=0.5"); // Start card animations slightly after heading starts
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);
  
  return (
    <SectionWrapper id="projects" ref={sectionRef} className="bg-secondary/50">
      <div className="text-center mb-12 md:mb-16">
        <h2 ref={headingRef} className="text-4xl md:text-5xl font-bold text-primary tracking-tight">
          My Projects
        </h2>
        <div className="mt-4 h-1.5 w-24 bg-accent mx-auto rounded-full"></div>
      </div>
      <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 lg:gap-12">
        {projectsData.map((project, index) => (
          // Pass index for potential key or other non-animation logic, but animation is batched
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </SectionWrapper>
  );
}