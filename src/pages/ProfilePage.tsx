
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const ProfilePage = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      setIsLoading(true);
      
      const { data, error } = await supabase
        .from('profiles')
        .select('first_name, last_name')
        .eq('id', user?.id)
        .single();
      
      if (error) throw error;
      
      if (data) {
        setFirstName(data.first_name || '');
        setLastName(data.last_name || '');
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) return;
    
    try {
      setIsLoading(true);
      
      const { error } = await supabase
        .from('profiles')
        .update({
          first_name: firstName,
          last_name: lastName,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id);
      
      if (error) throw error;
      
      toast({
        title: "Profile updated",
        description: "Your profile information has been updated successfully.",
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        variant: "destructive",
        title: "Update failed",
        description: "Could not update your profile. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 sm:px-6 md:px-8 py-6 sm:py-8 md:py-12">
        <div className="max-w-md mx-auto bg-white p-6 sm:p-8 rounded-lg shadow-sm border border-eco-sand/30">
          <h1 className="font-serif text-2xl sm:text-3xl font-medium text-eco-moss mb-6">My Profile</h1>
          
          <form onSubmit={updateProfile} className="space-y-4 sm:space-y-6">
            <div>
              <label htmlFor="email" className="block text-eco-bark mb-2 text-sm sm:text-base">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={user?.email || ''}
                className="w-full px-3 sm:px-4 py-2 rounded-md border border-eco-sand bg-gray-50 text-sm sm:text-base"
                disabled
              />
              <p className="mt-1 text-xs sm:text-sm text-eco-bark/70">Email cannot be changed</p>
            </div>
            
            <div>
              <label htmlFor="firstName" className="block text-eco-bark mb-2 text-sm sm:text-base">
                First Name
              </label>
              <input
                id="firstName"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full px-3 sm:px-4 py-2 rounded-md border border-eco-sand focus:outline-none focus:ring-2 focus:ring-eco-sage text-sm sm:text-base"
              />
            </div>
            
            <div>
              <label htmlFor="lastName" className="block text-eco-bark mb-2 text-sm sm:text-base">
                Last Name
              </label>
              <input
                id="lastName"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full px-3 sm:px-4 py-2 rounded-md border border-eco-sand focus:outline-none focus:ring-2 focus:ring-eco-sage text-sm sm:text-base"
              />
            </div>
            
            <Button 
              type="submit" 
              className="eco-button w-full text-sm sm:text-base py-2 sm:py-3"
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </form>
          
          {/* Admin section */}
          <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-eco-sand/30">
            <h2 className="font-serif text-lg sm:text-xl font-medium text-eco-moss mb-3 sm:mb-4">Admin Tools</h2>
            <Link to="/data-migration">
              <Button variant="outline" className="w-full text-sm sm:text-base py-2 sm:py-3">
                Data Migration Tool
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;
