import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Search, MapPin, Award, Briefcase } from 'lucide-react';
import ProfileCard from '@/components/ProfileCard';

interface NetworkProfile {
  id: string;
  first_name: string | null;
  last_name: string | null;
  user_type: string | null;
  company_name: string | null;
  experience_years: string | null;
  city: string | null;
  state: string | null;
  bio: string | null;
  specialization: string | null;
  is_verified: boolean | null;
  tagline: string | null;
  avatar_url: string | null;
}

const NetworkPage = () => {
  const [profiles, setProfiles] = useState<NetworkProfile[]>([]);
  const [filteredProfiles, setFilteredProfiles] = useState<NetworkProfile[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchNetworkProfiles();
  }, []);

  useEffect(() => {
    filterProfiles();
  }, [searchTerm, selectedRole, profiles]);

  const fetchNetworkProfiles = async () => {
    try {
      // Query from the secure public_profiles view instead of profiles table
      const { data, error } = await supabase
        .from('public_profiles')
        .select('*');

      if (error) throw error;
      setProfiles(data || []);
    } catch (error) {
      console.error('Error fetching network profiles:', error);
      toast({
        title: "Error",
        description: "Failed to load network profiles",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const filterProfiles = () => {
    let filtered = profiles;

    // Filter by role
    if (selectedRole !== 'all') {
      filtered = filtered.filter(profile => profile.user_type === selectedRole);
    }

    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(profile =>
        profile.first_name?.toLowerCase().includes(term) ||
        profile.last_name?.toLowerCase().includes(term) ||
        profile.company_name?.toLowerCase().includes(term) ||
        profile.city?.toLowerCase().includes(term) ||
        profile.specialization?.toLowerCase().includes(term)
      );
    }

    setFilteredProfiles(filtered);
  };

  const getDisplayName = (profile: NetworkProfile) => {
    if (profile.company_name) return profile.company_name;
    return `${profile.first_name || ''} ${profile.last_name || ''}`.trim();
  };

  const getLocation = (profile: NetworkProfile) => {
    if (profile.city && profile.state) {
      return `${profile.city}, ${profile.state}`;
    }
    return profile.city || profile.state || '';
  };

  const handleContactClick = (profileId: string) => {
    toast({
      title: "Contact Information",
      description: "Contact details are private. Please connect through the platform.",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center">Loading network...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Network & People</h1>
          <p className="text-lg text-muted-foreground">
            Connect with architects, interior designers, and vendors in our professional community
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search by name, company, city, or specialization..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant={selectedRole === 'all' ? 'default' : 'outline'}
                  onClick={() => setSelectedRole('all')}
                >
                  All
                </Button>
                <Button
                  variant={selectedRole === 'architect' ? 'default' : 'outline'}
                  onClick={() => setSelectedRole('architect')}
                >
                  Architects
                </Button>
                <Button
                  variant={selectedRole === 'designer' ? 'default' : 'outline'}
                  onClick={() => setSelectedRole('designer')}
                >
                  Designers
                </Button>
                <Button
                  variant={selectedRole === 'vendor' ? 'default' : 'outline'}
                  onClick={() => setSelectedRole('vendor')}
                >
                  Vendors
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <div className="mb-4 text-sm text-muted-foreground">
          Showing {filteredProfiles.length} professional{filteredProfiles.length !== 1 ? 's' : ''}
        </div>

        {/* Network Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProfiles.map((profile) => (
            <ProfileCard
              key={profile.id}
              name={getDisplayName(profile)}
              title={profile.user_type === 'vendor' ? 'Vendor' : 
                    profile.user_type === 'architect' ? 'Architect' : 'Interior Designer'}
              handle={profile.id.slice(0, 8)}
              status="Offline"
              contactText="Connect"
              avatarUrl={profile.avatar_url || ''}
              showUserInfo={false}
              enableTilt={true}
              location={getLocation(profile)}
              bio={profile.bio || undefined}
              specialization={profile.specialization || undefined}
              onContactClick={() => handleContactClick(profile.id)}
            />
          ))}
        </div>

        {filteredProfiles.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <p className="text-muted-foreground">No professionals found matching your criteria.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default NetworkPage;