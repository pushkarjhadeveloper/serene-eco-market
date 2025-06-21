
import React from 'react';

interface ShinyTextProps {
  text: string;
  disabled?: boolean;
  speed?: number;
  className?: string;
}

const ShinyText: React.FC<ShinyTextProps> = ({
  text,
  disabled = false,
  speed = 3,
  className = ''
}) => {
  if (disabled) {
    return <span className={className}>{text}</span>;
  }

  return (
    <>
      <style>
        {`
          @keyframes shine {
            0% {
              background-position: -200% center;
            }
            100% {
              background-position: 200% center;
            }
          }
        `}
      </style>
      <span
        className={`inline-block bg-gradient-to-r from-transparent via-white to-transparent bg-clip-text text-transparent animate-shine ${className}`}
        style={{
          backgroundImage: 'linear-gradient(90deg, #7D9D8C 0%, #5E8B6F 25%, #ffffff 50%, #4A6952 75%, #7D9D8C 100%)',
          backgroundSize: '200% auto',
          animation: `shine ${speed}s ease-in-out infinite`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        {text}
      </span>
    </>
  );
};

export default ShinyText;
