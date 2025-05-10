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

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cardElement = cardRef.current;
    if (!cardElement) return;

    const tl = gsap.timeline({ paused: true });
    tl.to(cardElement, { y: -10, scale: 1.03, duration: 0.3, ease: 'power2.out' })
      .to(cardElement.querySelector('.project-image'), { scale: 1.05, duration: 0.3, ease: 'power2.out' }, 0);
      

    cardElement.addEventListener('mouseenter', () => tl.play());
    cardElement.addEventListener('mouseleave', () => tl.reverse());
    
    // Scroll-triggered animation
    gsap.fromTo(cardElement, 
      { opacity: 0, y: 50, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cardElement,
          start: 'top 90%', // Start animation when 90% of card is visible from top
          toggleActions: 'play none none none',
        },
        delay: index * 0.1 // Stagger animation
      }
    );

    return () => {
      if (cardElement) {
        cardElement.removeEventListener('mouseenter', () => tl.play());
        cardElement.removeEventListener('mouseleave', () => tl.reverse());
      }
      // Kill ScrollTrigger instance if needed, though GSAP usually handles this well on component unmount with context.
      // ScrollTrigger.getAll().forEach(trigger => {
      //   if (trigger.trigger === cardElement) {
      //     trigger.kill();
      //   }
      // });
    };
  }, [index]);

  return (
    <Card ref={cardRef} className="flex flex-col h-full overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 rounded-xl bg-card">
      <CardHeader className="p-0 relative">
        <div className="aspect-video overflow-hidden">
          <Image
            src={project.imageUrl}
            alt={project.title}
            data-ai-hint={project.imageHint}
            width={600}
            height={400}
            className="project-image object-cover w-full h-full transition-transform duration-300"
          />
        </div>
      </CardHeader>
      <CardContent className="p-6 flex-grow">
        <CardTitle className="text-2xl font-semibold mb-3 text-primary">{project.title}</CardTitle>
        <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs bg-accent/10 text-accent border-accent/30">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="p-6 border-t bg-muted/30">
        <div className="flex justify-between w-full">
          {project.liveUrl && (
            <Button asChild variant="outline" size="sm" className="hover:bg-accent hover:text-accent-foreground hover:border-accent transition-colors">
              <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
              </Link>
            </Button>
          )}
          {project.repoUrl && (
            <Button asChild variant="ghost" size="sm" className="text-muted-foreground hover:text-accent hover:bg-accent/10 transition-colors">
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
