import { Github, Linkedin, Mail } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/40 bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row sm:px-6 lg:px-8 max-w-screen-2xl">
        <p className="text-sm text-muted-foreground">
          &copy; {currentYear} MotionPort. All rights reserved.
        </p>
        <div className="flex items-center space-x-4">
          <Link 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            aria-label="GitHub" 
            className="text-muted-foreground hover:text-accent transition-all duration-300 transform hover:scale-125 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-accent/50 rounded-full p-1"
          >
            <Github className="h-5 w-5" />
          </Link>
          <Link 
            href="https://linkedin.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            aria-label="LinkedIn" 
            className="text-muted-foreground hover:text-accent transition-all duration-300 transform hover:scale-125 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-accent/50 rounded-full p-1"
          >
            <Linkedin className="h-5 w-5" />
          </Link>
          <Link 
            href="mailto:contact@motionport.com" 
            aria-label="Email" 
            className="text-muted-foreground hover:text-accent transition-all duration-300 transform hover:scale-125 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-accent/50 rounded-full p-1"
          >
            <Mail className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </footer>
  );
}