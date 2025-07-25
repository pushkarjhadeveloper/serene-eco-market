import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedListItem {
  id: string;
  text: string;
  icon?: React.ReactNode;
}

interface AnimatedListProps {
  items: AnimatedListItem[];
  className?: string;
  delay?: number;
}

const AnimatedList: React.FC<AnimatedListProps> = ({
  items,
  className,
  delay = 100
}) => {
  const [visibleItems, setVisibleItems] = useState<Set<string>>(new Set());

  useEffect(() => {
    items.forEach((item, index) => {
      setTimeout(() => {
        setVisibleItems(prev => new Set([...prev, item.id]));
      }, index * delay);
    });
  }, [items, delay]);

  return (
    <div className={cn("space-y-2", className)}>
      {items.map((item, index) => (
        <div
          key={item.id}
          className={cn(
            "flex items-center gap-3 p-3 rounded-lg border-2 border-eco-sand/20 bg-eco-cream/30 transition-all duration-500",
            visibleItems.has(item.id)
              ? "opacity-100 translate-x-0"
              : "opacity-0 translate-x-4"
          )}
          style={{
            transitionDelay: `${index * delay}ms`
          }}
        >
          {item.icon && (
            <div className="flex-shrink-0 text-eco-sage">
              {item.icon}
            </div>
          )}
          <span className="text-eco-bark text-sm font-medium">
            {item.text}
          </span>
        </div>
      ))}
    </div>
  );
};

export default AnimatedList;