import React, { useEffect, useRef, useState, CSSProperties, ElementType } from "react";
import styles from "./ScrollReveal.module.css";

type ScrollRevealVariant = 
  | "fadeUp" 
  | "fadeIn" 
  | "fadeLeft" 
  | "fadeRight" 
  | "scale" 
  | "blur";

interface ScrollRevealProps {
  /**
   * The element type to render. Defaults to 'div'.
   */
  as?: ElementType;
  /**
   * The animation style to apply.
   * @default 'fadeUp'
   */
  variant?: ScrollRevealVariant;
  /**
   * Delay before animation starts in milliseconds.
   * @default 0
   */
  delay?: number;
  /**
   * Duration of the animation in milliseconds.
   * @default 600
   */
  duration?: number;
  /**
   * Intersection threshold (0-1).
   * @default 0.1
   */
  threshold?: number;
  /**
   * Whether to animate only once.
   * @default true
   */
  once?: boolean;
  children: React.ReactNode;
  className?: string;
  style?: CSSProperties;
  id?: string;
}

export function ScrollReveal({
  as: Component = "div",
  variant = "fadeUp",
  delay = 0,
  duration = 600,
  threshold = 0.1,
  once = true,
  className,
  style,
  children,
  id,
}: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // We cast to HTMLElement here because we know it's a valid DOM element even if ref is typed as HTMLDivElement
    const element = ref.current as unknown as HTMLElement;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) {
            observer.unobserve(element);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin: "0px 0px -50px 0px", // Slight offset to ensure element is actually entering
      }
    );

    observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, [threshold, once]);

  // Construct class names manually to avoid external dependency if not needed, 
  // but standard template literal works fine here.
  const variantClass = styles[variant];
  const visibleClass = isVisible ? styles.visible : "";
  const combinedClassName = `${styles.base} ${variantClass} ${visibleClass} ${className || ""}`;

  return (
    <Component
      id={id}
      ref={ref as any}
      className={combinedClassName}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
        ...style,
      }}
    >
      {children}
    </Component>
  );
}