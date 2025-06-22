
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface PortfolioCardProps {
  name: string;
  description: string;
  imageUrl: string;
  designer: string;
}

const PortfolioCard: React.FC<PortfolioCardProps> = ({
  name,
  description,
  imageUrl,
  designer
}) => {
  return (
    <Card className="overflow-hidden group hover:shadow-lg transition-shadow duration-300">
      <div className="aspect-video overflow-hidden">
        <img 
          src={imageUrl} 
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <CardContent className="p-6">
        <h3 className="font-serif text-xl font-medium text-eco-moss mb-2">{name}</h3>
        <p className="text-eco-bark text-sm mb-4 line-clamp-2">{description}</p>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-eco-sage rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-semibold">
              {designer.split(' ').map(n => n[0]).join('').slice(0, 2)}
            </span>
          </div>
          <span className="text-eco-bark text-sm">by {designer}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default PortfolioCard;
