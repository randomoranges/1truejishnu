import React, { useEffect, useRef, useState } from 'react';
import styles from './TechStackCloud.module.css';

type TechColor = 'navy' | 'purple' | 'orange' | 'coral' | 'yellow' | 'teal' | 'green' | 'pink';

export interface Technology {
  name: string;
  size?: 'sm' | 'md' | 'lg';
  color?: TechColor;
}

interface TechStackCloudProps {
  technologies: Technology[];
  className?: string;
}

// Helper to determine text color based on background color
const getTextColor = (backgroundColor: TechColor): 'light' | 'dark' => {
  switch (backgroundColor) {
    case 'coral':
    case 'yellow':
      return 'dark';
    case 'navy':
    case 'purple':
    case 'orange':
    case 'teal':
    case 'green':
    case 'pink':
    default:
      return 'light';
  }
};

// Pre-defined rotations to maintain consistency on re-renders
const rotations = [
  'rotate(var(--rotate-2))',
  'rotate(var(--rotate-neg-1))',
  'rotate(var(--rotate-1))',
  'rotate(var(--rotate-neg-3))',
  'rotate(var(--rotate-3))',
  'rotate(var(--rotate-neg-2))',
];

export const TechStackCloud = ({ technologies, className }: TechStackCloudProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className={`${styles.cloud} ${className || ''}`}
    >
      {technologies.map((tech, index) => {
        const size = tech.size || 'md';
        const color = tech.color || 'teal';
        const textColor = getTextColor(color);
        const rotation = rotations[index % rotations.length];
        
        // We use a CSS variable for delay to keep inline styles clean
        const delay = index * 50; 

        return (
          <div
            key={`${tech.name}-${index}`}
            className={`${styles.pill} ${styles[size]} ${styles[color]} ${styles[textColor]} ${isVisible ? styles.visible : styles.hidden}`}
            style={{ 
              '--rotation': rotation,
              transitionDelay: `${delay}ms`
            } as React.CSSProperties}
            aria-label={tech.name}
          >
            {tech.name}
          </div>
        );
      })}
    </div>
  );
};