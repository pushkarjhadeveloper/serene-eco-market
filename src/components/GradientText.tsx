
import React from 'react';

interface GradientTextProps {
  children: React.ReactNode;
  colors: string[];
  animationSpeed?: number;
  showBorder?: boolean;
  className?: string;
}

const GradientText: React.FC<GradientTextProps> = ({
  children,
  colors,
  animationSpeed = 3,
  showBorder = false,
  className = ''
}) => {
  const gradientColors = colors.join(', ');
  
  return (
    <span
      className={`inline-block bg-gradient-to-r bg-clip-text text-transparent ${className}`}
      style={{
        backgroundImage: `linear-gradient(45deg, ${gradientColors})`,
        backgroundSize: '400% 400%',
        animation: `gradient-shift ${animationSpeed}s ease infinite`,
        ...(showBorder && {
          WebkitTextStroke: '1px rgba(255,255,255,0.3)',
        }),
      }}
    >
      {children}
      <style jsx>{`
        @keyframes gradient-shift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </span>
  );
};

export default GradientText;
