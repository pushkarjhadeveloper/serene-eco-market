
import React, { useRef, useEffect } from 'react';

export interface MetallicPaintParams {
  edge?: number;
  patternBlur?: number;
  patternScale?: number;
  refraction?: number;
  speed?: number;
  liquid?: number;
}

interface MetallicPaintProps {
  imageData: ImageData;
  params?: MetallicPaintParams;
  className?: string;
}

export const parseLogoImage = async (file: File): Promise<{ imageData: ImageData } | null> => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);
      
      const imageData = ctx?.getImageData(0, 0, canvas.width, canvas.height);
      resolve(imageData ? { imageData } : null);
    };
    
    img.onerror = () => resolve(null);
    img.src = URL.createObjectURL(file);
  });
};

const MetallicPaint: React.FC<MetallicPaintProps> = ({ 
  imageData, 
  params = {}, 
  className = '' 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  const defaultParams = {
    edge: 2,
    patternBlur: 0.005,
    patternScale: 2,
    refraction: 0.015,
    speed: 0.3,
    liquid: 0.07,
    ...params
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !imageData) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = imageData.width;
    canvas.height = imageData.height;

    let time = 0;

    const animate = () => {
      time += defaultParams.speed;
      
      // Create metallic effect
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, `hsl(${45 + Math.sin(time * 0.01) * 30}, 70%, ${50 + Math.sin(time * 0.02) * 20}%)`);
      gradient.addColorStop(0.5, `hsl(${60 + Math.cos(time * 0.015) * 40}, 80%, ${70 + Math.cos(time * 0.025) * 15}%)`);
      gradient.addColorStop(1, `hsl(${30 + Math.sin(time * 0.008) * 50}, 60%, ${40 + Math.sin(time * 0.018) * 25}%)`);

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Apply mask from imageData
      ctx.globalCompositeOperation = 'destination-in';
      ctx.putImageData(imageData, 0, 0);
      ctx.globalCompositeOperation = 'source-over';

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [imageData, defaultParams]);

  return (
    <canvas 
      ref={canvasRef} 
      className={`metallic-paint ${className}`}
      style={{ width: '100%', height: '100%' }}
    />
  );
};

export default MetallicPaint;
