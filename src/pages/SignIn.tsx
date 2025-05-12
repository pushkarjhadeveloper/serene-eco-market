
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { signIn, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await signIn(email, password);
      // Redirect is handled by the useEffect above when user state changes
    } catch (error) {
      console.error('Sign in error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="eco-container py-16">
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-sm border border-eco-sand/30">
          <h1 className="font-serif text-3xl font-medium text-eco-moss mb-6 text-center">
            Sign In
          </h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-eco-bark mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 rounded-md border border-eco-sand focus:outline-none focus:ring-2 focus:ring-eco-sage"
                required
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-eco-bark mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 rounded-md border border-eco-sand focus:outline-none focus:ring-2 focus:ring-eco-sage"
                required
              />
            </div>
            
            <Button 
              type="submit" 
              className="eco-button w-full" 
              disabled={isSubmitting}
            >
              {isSubmitting ? "Signing in..." : "Sign In"}
            </Button>
          </form>
          
          <p className="mt-6 text-center text-eco-bark text-sm">
            Don't have an account?{" "}
            <Link to="/signup" className="text-eco-moss hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default SignIn;
