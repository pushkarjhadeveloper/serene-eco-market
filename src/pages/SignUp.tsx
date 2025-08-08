
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import Layout from "@/components/Layout";
import { useAuth } from "@/contexts/AuthContext";
import AnimatedList from "@/components/AnimatedList";
import { User, MapPin, FileText, Share2, Tag, Briefcase, FolderOpen } from "lucide-react";

const signUpSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
  tagline: z.string().optional(),
  location: z.string().optional(),
  profileSummary: z.string().optional(),
  socialLinks: z.string().optional(),
  profileTags: z.string().optional(),
  experience: z.string().optional(),
  portfolioLinks: z.string().optional()
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
});

type SignUpValues = z.infer<typeof signUpSchema>;

const SignUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { signUp, signInWithGoogle, user } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);
  
  const form = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      tagline: "",
      location: "",
      profileSummary: "",
      socialLinks: "",
      profileTags: "",
      experience: "",
      portfolioLinks: ""
    }
  });

  const onSubmit = async (values: SignUpValues) => {
    setIsLoading(true);
    try {
      await signUp(values.email, values.password, values.firstName, values.lastName);
      form.reset();
      // The useEffect above will handle redirection once user state changes
    } catch (error) {
      console.error('Sign up error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error('Google sign up error:', error);
    }
  };

  return (
    <Layout>
      <div className="eco-container py-12 max-w-md mx-auto">
        <div className="space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-serif font-medium text-eco-moss">Create an Account</h1>
            <p className="mt-2 text-eco-bark">Join SereneEco for sustainable design inspiration</p>
          </div>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="john.doe@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Profile Completion Section */}
              <div className="border-t border-eco-sand/20 pt-6 mt-6">
                <h3 className="font-serif text-lg font-medium text-eco-moss mb-4">Complete Your Profile (Optional)</h3>
                
                {/* Animated List showing profile benefits */}
                <div className="mb-6">
                  <AnimatedList
                    items={[
                      {
                        id: "visibility",
                        text: "Increase your profile visibility in our designer community",
                        icon: <User className="h-4 w-4" />
                      },
                      {
                        id: "connect",
                        text: "Connect with clients and other sustainable design enthusiasts",
                        icon: <Share2 className="h-4 w-4" />
                      },
                      {
                        id: "showcase",
                        text: "Showcase your expertise and sustainable design portfolio",
                        icon: <FolderOpen className="h-4 w-4" />
                      }
                    ]}
                    delay={150}
                  />
                </div>
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="tagline"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Add tagline</FormLabel>
                        <FormControl>
                          <Input placeholder="Your professional tagline" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Add your location</FormLabel>
                        <FormControl>
                          <Input placeholder="City, Country" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="profileSummary"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Add a profile summary</FormLabel>
                        <FormControl>
                          <Input placeholder="Brief description about yourself" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="socialLinks"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Add social links</FormLabel>
                        <FormControl>
                          <Input placeholder="LinkedIn, Instagram, etc." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="profileTags"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Add profile tags</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., sustainable design, minimalism" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="experience"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Add Experience</FormLabel>
                        <FormControl>
                          <Input placeholder="Years of experience or expertise" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="portfolioLinks"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Add Portfolio Links</FormLabel>
                        <FormControl>
                          <Input placeholder="Portfolio website or project links" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              
              <Button type="submit" className="eco-button w-full" disabled={isLoading}>
                {isLoading ? "Creating Account..." : "Sign Up"}
              </Button>
            </form>
          </Form>
          
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-eco-sand/50"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-eco-cream text-eco-bark">Or continue with</span>
              </div>
            </div>
            
            <Button
              onClick={handleGoogleSignUp}
              variant="outline"
              className="w-full mt-4 border-eco-sand hover:bg-eco-cream/50"
              disabled={isLoading}
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </Button>
          </div>
          
          <div className="text-center text-sm">
            <p className="text-eco-bark">
              Already have an account?{" "}
              <Link to="/signin" className="text-eco-moss hover:underline">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SignUp;
