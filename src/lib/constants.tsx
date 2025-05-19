
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
    title: 'Voice Assistant - "Friday"',
    description: 'Developed a smart, voice-activated personal assistant capable of opening applications, sending messages, playing music, and delivering real-time weather updates. Built using Python, Faster-Whisper, and Speech Achieved a 20% increase in command recognition accuracy through iterative testing and optimization. Resolved audio processing issues by implementing fallback logic and efficient handling of noisy input',
    imageUrl: 'https://multiverseapp.com/static/0734f916e15b25e59daa629ef415adf3/36489/F.R.I.D.A.Y.webp',
    imageHint: 'friday',
    tags: ['Python', 'Faster-Whisper', 'API'],
    repoUrl: 'https://github.com/EXCALIBUR-cmd/Friday_Voice_Assistant',
  },
  {
    id: '2',
    title: 'Royal Enfield Landing Page UI',
    description: ' Crafted a bold and immersive landing page inspired by Obys Agency’s design philosophy.Built using Next.js, GSAP, Framer Motion, and Locomotive Scroll for scroll-based animations and transitions. Focused on expressive typography, immersive visuals, and interactive storytelling to reflect the brand’s heritage. Styled using Tailwind CSS for clean, responsive design. Resulted in a high-performance, visually engaging experience.',
    imageUrl: 'https://c1.wallpaperflare.com/preview/255/167/781/bike-bullet-royal-enfield.jpg',
    imageHint: 'RE',
    tags: ['UX Design', 'Javascript', 'Tailwind CSS', 'GSAP', 'Locomotive'],
    repoUrl:'https://github.com/EXCALIBUR-cmd/Royal_Enfield-Landing-page',
    liveUrl: 'https://www.linkedin.com/posts/maninder-singh-00a126288_royalenfield-webdevelopment-royalenfield-activity-7309651605589540864-mmd8?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEXJFooBxB2xK_3LwjQS9-YoFnbxxnStn7w',
  },
  {
    id: '3',
    title: 'Refokus Clone (UI)',
    description: 'Recreated the 2022 version of the Refokus agency website, focusing solely on the frontend to replicate its high-end, interactive experience. Built using React, Framer Motion, and Locomotive Scroll to achieve smooth animations, scroll-triggered transitions, and polished UI interactions. The project emphasizes dynamic layouts, creative section reveals, and clean component architecture inspired by modern design agencies. Styled with Tailwind CSS for a scalable, responsive layout across devices. Delivered a visually engaging, code-efficient clone to explore advanced frontend techniques and creative coding practices.',
    imageUrl: 'https://cdn.prod.website-files.com/664dc8b6bc52b504509197e4/667c85a1151f26218228b9d3_Refokus.webp',
    imageHint: 'mobile fitness',
    tags: ['React Native', 'Tailwind CSS', 'GSAP', 'UI/UX', 'Locomotive'],
    repoUrl: 'https://github.com/EXCALIBUR-cmd/Refokus_Clone',
    liveUrl:'https://www.linkedin.com/posts/maninder-singh-00a126288_reactjs-webdevelopment-frontenddev-activity-7323025029246464000-shId?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEXJFooBxB2xK_3LwjQS9-YoFnbxxnStn7w'
  },
];

export type Skill = {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  level: number; // Percentage 0-100
};

import { Code, Database, DraftingCompass, Smartphone, Palette, BarChartBig, SearchCode } from 'lucide-react';
import type React from 'react';


export const skillsData: Skill[] = [
  { name: 'Javascript', icon: Code, level: 80 },
  { name: 'Python', icon: Code, level: 70 },
  { name: 'Java', icon: Code, level: 70},
  { name: 'React', icon: Code, level: 95 },
  { name: 'GSAP', icon: Code, level: 85 },
  { name: 'Tailwind CSS', icon: Palette, level: 90 },
  { name: 'UI/UX Design', icon: DraftingCompass, level: 80 },
  { name: 'Responsive Design', icon: Smartphone, level: 95 },
  { name: 'SEO', icon: SearchCode, level: 70 },
  { name: 'Data Visualization', icon: BarChartBig, level: 70 },
];
