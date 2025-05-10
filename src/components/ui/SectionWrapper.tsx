import { cn } from '@/lib/utils';
import type { HTMLAttributes } from 'react';

interface SectionWrapperProps extends HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export function SectionWrapper({ children, className, id, ...props }: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={cn(
        'min-h-screen w-full py-16 md:py-24 lg:py-32 flex flex-col justify-center items-center', // Ensure content is centered
        className
      )}
      {...props}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-screen-xl"> {/* Adjust max-width as needed */}
        {children}
      </div>
    </section>
  );
}
