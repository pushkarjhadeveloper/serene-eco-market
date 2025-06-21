
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Mail, Phone, Globe, Award } from 'lucide-react';

interface ProfileCardProps {
  name: string;
  title: string;
  handle: string;
  status: 'Online' | 'Offline' | 'Away';
  contactText: string;
  avatarUrl: string;
  showUserInfo: boolean;
  enableTilt: boolean;
  location?: string;
  email?: string;
  phone?: string;
  website?: string;
  bio?: string;
  specialization?: string;
  onContactClick: () => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  name,
  title,
  handle,
  status,
  contactText,
  avatarUrl,
  showUserInfo,
  enableTilt,
  location,
  email,
  phone,
  website,
  bio,
  specialization,
  onContactClick
}) => {
  const statusColor = {
    Online: 'bg-green-500',
    Offline: 'bg-gray-500',
    Away: 'bg-yellow-500'
  }[status];

  return (
    <div className={`relative transform transition-all duration-300 ${enableTilt ? 'hover:scale-105 hover:rotate-1' : ''}`}>
      {/* Metallic background effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-300 via-gray-100 to-gray-300 rounded-2xl shadow-2xl"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/20 to-transparent rounded-2xl"></div>
      
      <Card className="relative bg-gradient-to-br from-white via-gray-50 to-gray-100 border-2 border-gray-300 rounded-2xl shadow-2xl p-8 max-w-md mx-auto backdrop-blur-sm">
        <CardContent className="p-0">
          {/* Header with avatar and basic info */}
          <div className="flex items-start gap-6 mb-6">
            <div className="relative">
              <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-eco-sage shadow-lg">
                {avatarUrl ? (
                  <img src={avatarUrl} alt={name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-eco-sage flex items-center justify-center text-white text-2xl font-bold">
                    {name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </div>
                )}
              </div>
              {showUserInfo && (
                <div className={`absolute -bottom-1 -right-1 w-6 h-6 ${statusColor} rounded-full border-2 border-white`}></div>
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <h2 className="text-2xl font-bold text-eco-moss font-serif mb-1 truncate">
                {name}
              </h2>
              <p className="text-eco-sage font-semibold mb-1">{title}</p>
              {specialization && (
                <p className="text-eco-bark text-sm mb-2">{specialization}</p>
              )}
              <div className="flex items-center gap-1 text-eco-bark text-sm">
                <span>@{handle}</span>
              </div>
              {showUserInfo && (
                <Badge variant="outline" className="mt-2 border-eco-sage text-eco-moss bg-eco-sage/10 text-xs">
                  {status}
                </Badge>
              )}
            </div>
          </div>

          {/* Bio section */}
          {bio && (
            <div className="mb-6">
              <h3 className="text-sm font-bold text-eco-moss mb-2 uppercase tracking-wide">About</h3>
              <p className="text-eco-bark text-sm leading-relaxed line-clamp-3">
                {bio}
              </p>
            </div>
          )}

          {/* Contact info */}
          <div className="space-y-2 mb-6">
            {location && (
              <div className="flex items-center gap-2 text-xs text-eco-bark">
                <MapPin className="h-3 w-3" />
                <span className="truncate">{location}</span>
              </div>
            )}
            {email && (
              <div className="flex items-center gap-2 text-xs text-eco-bark">
                <Mail className="h-3 w-3" />
                <span className="truncate">{email}</span>
              </div>
            )}
            {phone && (
              <div className="flex items-center gap-2 text-xs text-eco-bark">
                <Phone className="h-3 w-3" />
                <span>{phone}</span>
              </div>
            )}
            {website && (
              <div className="flex items-center gap-2 text-xs text-eco-bark">
                <Globe className="h-3 w-3" />
                <span className="truncate">{website}</span>
              </div>
            )}
          </div>

          {/* Contact button */}
          <Button 
            onClick={onContactClick}
            className="w-full bg-eco-sage hover:bg-eco-moss text-white font-semibold py-3 rounded-lg"
          >
            {contactText}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileCard;
