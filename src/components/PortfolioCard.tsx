
import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { MapPin, Award, Mail, Phone, Globe, Calendar } from 'lucide-react';

interface PortfolioCardProps {
  formData: {
    name: string;
    specialization: string;
    location: string;
    bio: string;
    dreamProject: string;
    aspirations: string;
    profileImage: string | null;
    email: string;
    phone: string;
    website: string;
  };
  isAnimating: boolean;
}

const PortfolioCard: React.FC<PortfolioCardProps> = ({ formData, isAnimating }) => {
  const [displayData, setDisplayData] = useState(formData);

  useEffect(() => {
    if (isAnimating) {
      // Animate data update with staggered delays
      const fields = Object.keys(formData);
      fields.forEach((field, index) => {
        setTimeout(() => {
          setDisplayData(prev => ({
            ...prev,
            [field]: formData[field as keyof typeof formData]
          }));
        }, index * 200);
      });
    } else {
      setDisplayData(formData);
    }
  }, [formData, isAnimating]);

  return (
    <div className={`relative transform transition-all duration-1000 ${isAnimating ? 'scale-105 rotate-1' : 'scale-100 rotate-0'}`}>
      {/* Metallic background effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-300 via-gray-100 to-gray-300 rounded-2xl shadow-2xl"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/20 to-transparent rounded-2xl"></div>
      
      {/* Main card */}
      <Card className="relative bg-gradient-to-br from-white via-gray-50 to-gray-100 border-2 border-gray-300 rounded-2xl shadow-2xl p-8 max-w-md mx-auto backdrop-blur-sm">
        {/* Header with avatar and basic info */}
        <div className="flex items-start gap-6 mb-6">
          <Avatar className="w-20 h-20 border-4 border-eco-sage shadow-lg">
            <AvatarImage src={displayData.profileImage || undefined} />
            <AvatarFallback className="bg-eco-sage text-white text-2xl font-bold">
              {displayData.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold text-eco-moss font-serif mb-1 truncate">
              {displayData.name || 'Designer Name'}
            </h2>
            <p className="text-eco-sage font-semibold mb-2">
              {displayData.specialization || 'Specialization'}
            </p>
            <div className="flex items-center gap-1 text-eco-bark text-sm">
              <MapPin className="h-4 w-4" />
              <span className="truncate">{displayData.location || 'Location'}</span>
            </div>
          </div>
        </div>

        {/* Bio section */}
        <div className="mb-6">
          <h3 className="text-sm font-bold text-eco-moss mb-2 uppercase tracking-wide">About</h3>
          <p className="text-eco-bark text-sm leading-relaxed line-clamp-3">
            {displayData.bio || 'Professional bio will appear here...'}
          </p>
        </div>

        {/* Aspirations */}
        <div className="mb-6">
          <h3 className="text-sm font-bold text-eco-moss mb-2 uppercase tracking-wide flex items-center gap-2">
            <Award className="h-4 w-4" />
            Aspirations
          </h3>
          <p className="text-eco-bark text-sm leading-relaxed">
            {displayData.aspirations || 'Career aspirations will appear here...'}
          </p>
        </div>

        {/* Dream Project */}
        <div className="mb-6">
          <h3 className="text-sm font-bold text-eco-moss mb-2 uppercase tracking-wide">Dream Project</h3>
          <Badge variant="outline" className="border-eco-sage text-eco-moss bg-eco-sage/10 text-xs px-3 py-1">
            {displayData.dreamProject || 'Dream project...'}
          </Badge>
        </div>

        {/* Contact info */}
        <div className="space-y-2 pt-4 border-t border-eco-sand">
          <div className="flex items-center gap-2 text-xs text-eco-bark">
            <Mail className="h-3 w-3" />
            <span className="truncate">{displayData.email || 'email@example.com'}</span>
          </div>
          {displayData.phone && (
            <div className="flex items-center gap-2 text-xs text-eco-bark">
              <Phone className="h-3 w-3" />
              <span>{displayData.phone}</span>
            </div>
          )}
          {displayData.website && (
            <div className="flex items-center gap-2 text-xs text-eco-bark">
              <Globe className="h-3 w-3" />
              <span className="truncate">{displayData.website}</span>
            </div>
          )}
        </div>

        {/* Timestamp */}
        <div className="flex items-center gap-2 text-xs text-eco-stone mt-4 pt-2 border-t border-eco-sand/50">
          <Calendar className="h-3 w-3" />
          <span>Portfolio created {new Date().toLocaleDateString()}</span>
        </div>
      </Card>
    </div>
  );
};

export default PortfolioCard;
