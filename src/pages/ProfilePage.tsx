
import { useState, useEffect } from "react";
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
          updated_at: new Date().toISOString(), // Convert Date to ISO string
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
      <div className="eco-container py-12">
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-sm border border-eco-sand/30">
          <h1 className="font-serif text-3xl font-medium text-eco-moss mb-6">My Profile</h1>
          
          <form onSubmit={updateProfile} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-eco-bark mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={user?.email || ''}
                className="w-full px-4 py-2 rounded-md border border-eco-sand bg-gray-50"
                disabled
              />
              <p className="mt-1 text-sm text-eco-bark/70">Email cannot be changed</p>
            </div>
            
            <div>
              <label htmlFor="firstName" className="block text-eco-bark mb-2">
                First Name
              </label>
              <input
                id="firstName"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full px-4 py-2 rounded-md border border-eco-sand focus:outline-none focus:ring-2 focus:ring-eco-sage"
              />
            </div>
            
            <div>
              <label htmlFor="lastName" className="block text-eco-bark mb-2">
                Last Name
              </label>
              <input
                id="lastName"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full px-4 py-2 rounded-md border border-eco-sand focus:outline-none focus:ring-2 focus:ring-eco-sage"
              />
            </div>
            
            <Button 
              type="submit" 
              className="eco-button w-full"
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;
