
export type Project = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  imageHint: string;
  tags: string[];
  liveUrl?: string;
  repoUrl?: string;
};

export const projectsData: Project[] = [
  {
    id: '1',
    title: 'Interactive Data Visualization',
    description: 'A web application that visualizes complex datasets using interactive charts and maps, built with D3.js and React. Features smooth animations and real-time data updates.',
    imageUrl: 'https://picsum.photos/seed/dataviz/600/400',
    imageHint: 'data chart',
    tags: ['React', 'D3.js', 'GSAP', 'Node.js'],
    liveUrl: '#',
    repoUrl: '#',
  },
  {
    id: '2',
    title: 'E-commerce Platform Redesign',
    description: 'Led the redesign of a major e-commerce platform, focusing on user experience and conversion rate optimization. Implemented a new design system and GSAP-powered microinteractions.',
    imageUrl: 'https://picsum.photos/seed/ecommerce/600/400',
    imageHint: 'online shopping',
    tags: ['UX Design', 'Next.js', 'Tailwind CSS', 'Stripe'],
    liveUrl: '#',
  },
  {
    id: '3',
    title: 'Mobile Fitness App',
    description: 'Developed a cross-platform mobile fitness application with personalized workout plans and progress tracking. Used React Native and Firebase for backend services.',
    imageUrl: 'https://picsum.photos/seed/fitnessapp/600/400',
    imageHint: 'mobile fitness',
    tags: ['React Native', 'Firebase', 'GSAP', 'UI/UX'],
    repoUrl: '#',
  },
   {
    id: '4',
    title: 'Creative Agency Portfolio',
    description: 'Designed and developed a stunning portfolio website for a creative agency, highlighting their projects with immersive scroll-based animations and a unique visual identity.',
    imageUrl: 'https://picsum.photos/seed/agency/600/400',
    imageHint: 'web design',
    tags: ['Next.js', 'GSAP', 'Contentful', 'Figma'],
    liveUrl: '#',
    repoUrl: '#',
  },
];

export type Skill = {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  level: number; // Percentage 0-100
};

import { Code, Database, DraftingCompass, Smartphone, Palette, BarChartBig, SearchCode } from 'lucide-react';
import type React from 'react';

// Placeholder for GSAP icon
const GSAPIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
    <path d="M21.691 7.937C21.691 7.937 21.691 7.937 21.691 7.937C21.603 6.013 20.958 4.219 20.229 3.363C19.501 2.506 18.436 2.03 17.233 2.03C15.621 2.03 14.329 2.781 13.473 4.154C12.618 5.528 12.219 7.24 12.219 9.039C12.219 10.685 12.522 12.111 13.221 13.242C13.92 14.374 14.912 15.02 16.197 15.02C17.017 15.02 17.836 14.745 18.504 14.283C18.504 14.283 18.504 14.283 18.504 14.283C18.416 16.207 19.061 17.999999 19.79 18.856C20.519 19.713 21.584 20.189 22.787 20.189C24.399 20.189 25.691 19.438 26.547 18.065C27.402 16.691 27.801 14.979 27.801 13.18C27.801 11.521 27.498 10.095 26.799 8.964C26.099 7.832 25.107 7.186 23.822 7.186C23.003 7.186 22.184 7.461 21.516 7.923C21.516 7.923 21.516 7.923 21.691 7.937ZM17.233 3.759C17.974 3.759 18.501 3.994 18.777 4.296C19.054 4.6 19.331 5.398 19.331 6.383C19.331 6.383 19.331 6.383 19.331 6.383C19.418 4.971 18.979 4.115 18.415 3.827C18.098 3.759 17.671 3.759 17.233 3.759ZM22.787 8.915C23.528 8.915 24.055 9.149 24.331 9.452C24.608 9.755 24.885 10.554 24.885 11.538C24.885 11.538 24.885 11.538 24.885 11.538C24.973 10.126 24.533 9.27 23.97 8.982C23.652 8.915 23.225 8.915 22.787 8.915Z M6.527 2.3H10.22V20.46H6.527V2.3Z M0 2.3H3.693V20.46H0V2.3Z"/>
  </svg>
);


export const skillsData: Skill[] = [
  { name: 'React', icon: Code, level: 95 },
  { name: 'Next.js', icon: Code, level: 90 },
  { name: 'GSAP', icon: GSAPIcon, level: 85 },
  { name: 'Tailwind CSS', icon: Palette, level: 90 },
  { name: 'TypeScript', icon: Code, level: 80 },
  { name: 'Node.js', icon: Database, level: 75 },
  { name: 'UI/UX Design', icon: DraftingCompass, level: 80 },
  { name: 'Responsive Design', icon: Smartphone, level: 95 },
  { name: 'SEO', icon: SearchCode, level: 70 },
  { name: 'Data Visualization', icon: BarChartBig, level: 70 },
];
