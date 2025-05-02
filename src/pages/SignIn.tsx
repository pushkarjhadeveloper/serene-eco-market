
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import { Link } from "react-router-dom";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would handle authentication
    console.log("Sign in attempt with:", email);
    // For now, just log the attempt
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
            
            <Button type="submit" className="eco-button w-full">
              Sign In
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
