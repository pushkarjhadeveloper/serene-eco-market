
import React, { useEffect, useRef, useState } from 'react';

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  ease?: string;
  splitType?: 'chars' | 'words' | 'lines';
  from?: {
    opacity?: number;
    y?: number;
    x?: number;
    scale?: number;
  };
  to?: {
    opacity?: number;
    y?: number;
    x?: number;
    scale?: number;
  };
  threshold?: number;
  rootMargin?: string;
  textAlign?: 'left' | 'center' | 'right';
  onLetterAnimationComplete?: () => void;
}

const SplitText: React.FC<SplitTextProps> = ({
  text,
  className = '',
  delay = 100,
  duration = 0.6,
  ease = 'power3.out',
  splitType = 'chars',
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = '-100px',
  textAlign = 'center',
  onLetterAnimationComplete
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      {
        threshold,
        rootMargin
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  const splitText = () => {
    if (splitType === 'chars') {
      return text.split('').map((char, index) => (
        <span
          key={index}
          className={`inline-block transition-all ${isVisible ? 'animate-in' : ''}`}
          style={{
            opacity: isVisible ? to.opacity || 1 : from.opacity || 0,
            transform: `translateY(${isVisible ? to.y || 0 : from.y || 40}px) translateX(${isVisible ? to.x || 0 : from.x || 0}px) scale(${isVisible ? to.scale || 1 : from.scale || 1})`,
            transitionDelay: `${index * delay}ms`,
            transitionDuration: `${duration * 1000}ms`,
            transitionTimingFunction: ease === 'power3.out' ? 'cubic-bezier(0.215, 0.610, 0.355, 1)' : 'ease'
          }}
          onTransitionEnd={() => {
            if (index === text.length - 1 && onLetterAnimationComplete) {
              onLetterAnimationComplete();
            }
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ));
    } else if (splitType === 'words') {
      return text.split(' ').map((word, index) => (
        <span
          key={index}
          className={`inline-block mr-2 transition-all ${isVisible ? 'animate-in' : ''}`}
          style={{
            opacity: isVisible ? to.opacity || 1 : from.opacity || 0,
            transform: `translateY(${isVisible ? to.y || 0 : from.y || 40}px) translateX(${isVisible ? to.x || 0 : from.x || 0}px) scale(${isVisible ? to.scale || 1 : from.scale || 1})`,
            transitionDelay: `${index * delay}ms`,
            transitionDuration: `${duration * 1000}ms`,
            transitionTimingFunction: ease === 'power3.out' ? 'cubic-bezier(0.215, 0.610, 0.355, 1)' : 'ease'
          }}
        >
          {word}
        </span>
      ));
    } else {
      return <span className={className}>{text}</span>;
    }
  };

  return (
    <div
      ref={containerRef}
      className={`${className}`}
      style={{ textAlign }}
    >
      {splitText()}
    </div>
  );
};

export default SplitText;
