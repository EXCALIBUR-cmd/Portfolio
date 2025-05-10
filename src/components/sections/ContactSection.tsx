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

      if (formRef.current) {
        const formElements = gsap.utils.toArray(formRef.current.querySelectorAll('div > label, div > .form-input-field, div > button'));
        tl.fromTo(formElements,
          { opacity: 0, y: 40, x: -20, skewX: 5 },
          { opacity: 1, y: 0, x: 0, skewX: 0, stagger: 0.12, duration: 0.7, ease: 'power3.out' },
          "-=0.6"
        );
      }
      
      if (contactInfoRef.current) {
         const contactItems = gsap.utils.toArray(contactInfoRef.current.querySelectorAll('.contact-info-item'));
         tl.fromTo(contactItems,
          { opacity: 0, y: 40, x: 20, skewX: -5 },
          {
            opacity: 1, y: 0, x: 0, skewX: 0, stagger: 0.15, duration: 0.7, ease: 'power3.out',
          },
          "-=0.8" // Start contact info animation while form is still animating
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
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-6 bg-card/80 backdrop-blur-sm border border-border/50 p-8 rounded-xl shadow-xl">
          <div>
            <Label htmlFor="name" className="text-foreground font-medium">Full Name</Label>
            <Input type="text" id="name" name="name" required className="form-input-field mt-2 bg-background/70 border-border focus:border-accent focus:ring-accent" />
          </div>
          <div>
            <Label htmlFor="email" className="text-foreground font-medium">Email Address</Label>
            <Input type="email" id="email" name="email" required className="form-input-field mt-2 bg-background/70 border-border focus:border-accent focus:ring-accent" />
          </div>
          <div>
            <Label htmlFor="message" className="text-foreground font-medium">Message</Label>
            <Textarea id="message" name="message" rows={5} required className="form-input-field mt-2 bg-background/70 border-border focus:border-accent focus:ring-accent" />
          </div>
          <div>
            <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground shadow-md py-3 text-base" disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </Button>
          </div>
        </form>
        
        <div ref={contactInfoRef} className="space-y-8 bg-card/80 backdrop-blur-sm border border-border/50 p-8 rounded-xl shadow-xl">
          <h3 className="text-2xl font-semibold text-primary mb-4">Contact Information</h3>
          <div className="contact-info-item flex items-start space-x-4 text-muted-foreground">
            <Mail className="h-6 w-6 text-accent mt-1 shrink-0" />
            <div>
              <h4 className="font-medium text-foreground">Email</h4>
              <a href="mailto:hello@motionport.dev" className="hover:text-accent transition-colors">hello@motionport.dev</a>
            </div>
          </div>
           <div className="contact-info-item flex items-start space-x-4 text-muted-foreground">
            <Phone className="h-6 w-6 text-accent mt-1 shrink-0" />
            <div>
              <h4 className="font-medium text-foreground">Phone</h4>
              <a href="tel:+1234567890" className="hover:text-accent transition-colors">+1 (234) 567-890</a>
            </div>
          </div>
          <div className="contact-info-item flex items-start space-x-4 text-muted-foreground">
            <MapPin className="h-6 w-6 text-accent mt-1 shrink-0" />
            <div>
              <h4 className="font-medium text-foreground">Location</h4>
              <p>Creative City, Webland</p>
            </div>
          </div>
          <p className="contact-info-item text-sm text-muted-foreground/80 pt-2">
            Feel free to reach out through the form or contact me directly. I'm always excited to discuss new projects and opportunities!
          </p>
        </div>
      </div>
    </SectionWrapper>
  );
}