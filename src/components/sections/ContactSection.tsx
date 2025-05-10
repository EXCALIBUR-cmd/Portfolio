"use client";

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Mail, MapPin, Phone } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const contactInfoRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      if (formRef.current) {
        gsap.fromTo(formRef.current,
          { opacity: 0, y: 50 },
          {
            opacity: 1, y: 0, duration: 1, ease: 'power3.out',
            scrollTrigger: { trigger: formRef.current, start: 'top 80%', toggleActions: 'play none none none' }
          }
        );
      }
      if (contactInfoRef.current) {
         gsap.fromTo(contactInfoRef.current,
          { opacity: 0, y: 50 },
          {
            opacity: 1, y: 0, duration: 1, ease: 'power3.out',
            scrollTrigger: { trigger: contactInfoRef.current, start: 'top 80%', toggleActions: 'play none none none' },
            delay: 0.2 // Slight delay for contact info
          }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    toast({
      title: "Message Sent!",
      description: "Thanks for reaching out. I'll get back to you soon.",
      variant: "default", 
    });
    formRef.current?.reset();
  };

  return (
    <SectionWrapper id="contact" ref={sectionRef} className="bg-secondary/30">
      <div className="text-center mb-12 md:mb-16">
        <h2 ref={headingRef} className="text-4xl md:text-5xl font-bold text-primary tracking-tight">
          Get In Touch
        </h2>
        <div className="mt-4 h-1.5 w-24 bg-accent mx-auto rounded-full"></div>
      </div>
      <div className="grid lg:grid-cols-2 gap-12 md:gap-16 items-start">
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-6 bg-card p-8 rounded-xl shadow-xl">
          <div>
            <Label htmlFor="name" className="text-foreground">Full Name</Label>
            <Input type="text" id="name" name="name" required className="mt-1 bg-background/70 border-border focus:border-accent focus:ring-accent" />
          </div>
          <div>
            <Label htmlFor="email" className="text-foreground">Email Address</Label>
            <Input type="email" id="email" name="email" required className="mt-1 bg-background/70 border-border focus:border-accent focus:ring-accent" />
          </div>
          <div>
            <Label htmlFor="message" className="text-foreground">Message</Label>
            <Textarea id="message" name="message" rows={5} required className="mt-1 bg-background/70 border-border focus:border-accent focus:ring-accent" />
          </div>
          <div>
            <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground shadow-md" disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </Button>
          </div>
        </form>
        
        <div ref={contactInfoRef} className="space-y-8 bg-card p-8 rounded-xl shadow-xl">
          <h3 className="text-2xl font-semibold text-primary mb-4">Contact Information</h3>
          <div className="flex items-start space-x-4 text-muted-foreground">
            <Mail className="h-6 w-6 text-accent mt-1 shrink-0" />
            <div>
              <h4 className="font-medium text-foreground">Email</h4>
              <a href="mailto:hello@motionport.dev" className="hover:text-accent transition-colors">hello@motionport.dev</a>
            </div>
          </div>
           <div className="flex items-start space-x-4 text-muted-foreground">
            <Phone className="h-6 w-6 text-accent mt-1 shrink-0" />
            <div>
              <h4 className="font-medium text-foreground">Phone</h4>
              <a href="tel:+1234567890" className="hover:text-accent transition-colors">+1 (234) 567-890</a>
            </div>
          </div>
          <div className="flex items-start space-x-4 text-muted-foreground">
            <MapPin className="h-6 w-6 text-accent mt-1 shrink-0" />
            <div>
              <h4 className="font-medium text-foreground">Location</h4>
              <p>Creative City, Webland</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground/80">
            Feel free to reach out through the form or contact me directly. I'm always excited to discuss new projects and opportunities!
          </p>
        </div>
      </div>
    </SectionWrapper>
  );
}
