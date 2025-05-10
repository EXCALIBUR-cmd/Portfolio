"use client";

import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Github } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import type { Project } from '@/lib/constants';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ProjectCardProps {
  project: Project;
  index: number; // Used for stagger in parent, not directly here for individual animation logic
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cardElement = cardRef.current;
    if (!cardElement) return;

    // Hover animation
    const tlHover = gsap.timeline({ paused: true });
    tlHover.to(cardElement, { y: -15, scale: 1.04, duration: 0.4, ease: 'power3.out' })
      .to(cardElement.querySelector('.project-image-wrapper'), { scale: 1.08, duration: 0.4, ease: 'power3.out' }, 0)
      .to(cardElement.querySelector('.project-image'), { scale: 1.1, duration: 0.4, ease: 'power3.out' }, 0);
      
    cardElement.addEventListener('mouseenter', () => tlHover.play());
    cardElement.addEventListener('mouseleave', () => tlHover.reverse());
    
    // Scroll-triggered entrance animation
    // This will be triggered by ProjectsSection using batch for better performance and staggering
    // So, no individual ScrollTrigger here. We just set initial state if needed.
    gsap.set(cardElement, { opacity: 0, y: 80, scale: 0.9, rotationX: -20 });


    return () => {
      if (cardElement) {
        cardElement.removeEventListener('mouseenter', () => tlHover.play());
        cardElement.removeEventListener('mouseleave', () => tlHover.reverse());
      }
      // tlHover.kill(); // Kill timeline to free up resources
      // No need to kill ScrollTrigger here as it's managed by the parent for batching
    };
  }, []);

  return (
    <Card ref={cardRef} className="project-card-item flex flex-col h-full overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 rounded-xl bg-card/80 backdrop-blur-sm border border-border/50">
      <CardHeader className="p-0 relative">
        <div className="project-image-wrapper aspect-video overflow-hidden rounded-t-xl"> {/* Added wrapper for independent scaling */}
          <Image
            src={project.imageUrl}
            alt={project.title}
            data-ai-hint={project.imageHint}
            width={600}
            height={400}
            className="project-image object-cover w-full h-full transition-transform duration-500 ease-out"
          />
        </div>
      </CardHeader>
      <CardContent className="p-6 flex-grow">
        <CardTitle className="text-2xl font-semibold mb-3 text-primary group-hover:text-accent transition-colors duration-300">{project.title}</CardTitle>
        <p className="text-muted-foreground text-sm mb-4 leading-relaxed line-clamp-3">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs bg-primary/10 text-primary border-primary/30">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="p-6 border-t border-border/50 bg-card/50">
        <div className="flex justify-between w-full items-center">
          {project.liveUrl && (
            <Button asChild variant="outline" size="sm" className="border-accent/50 text-accent hover:bg-accent hover:text-accent-foreground hover:border-accent transition-all duration-300 transform hover:scale-105">
              <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
              </Link>
            </Button>
          )}
          {project.repoUrl && (
            <Button asChild variant="ghost" size="sm" className="text-muted-foreground hover:text-accent hover:bg-accent/10 transition-colors duration-300 transform hover:scale-105">
              <Link href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-4 w-4" /> View Code
              </Link>
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}