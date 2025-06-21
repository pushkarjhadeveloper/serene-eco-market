
import React, { useRef, useState, useEffect } from 'react';

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
  spotlightSize?: number;
}

const SpotlightCard: React.FC<SpotlightCardProps> = ({
  children,
  className = '',
  spotlightColor = 'rgba(125, 157, 140, 0.3)',
  spotlightSize = 200
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
      }
    };

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    const cardElement = cardRef.current;
    if (cardElement) {
      cardElement.addEventListener('mousemove', handleMouseMove);
      cardElement.addEventListener('mouseenter', handleMouseEnter);
      cardElement.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (cardElement) {
        cardElement.removeEventListener('mousemove', handleMouseMove);
        cardElement.removeEventListener('mouseenter', handleMouseEnter);
        cardElement.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className={`relative overflow-hidden transition-all duration-300 ${className}`}
      style={{
        background: isHovered
          ? `radial-gradient(${spotlightSize}px circle at ${mousePosition.x}px ${mousePosition.y}px, ${spotlightColor}, transparent 80%)`
          : 'transparent'
      }}
    >
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default SpotlightCard;
