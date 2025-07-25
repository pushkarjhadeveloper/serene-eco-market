
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
  const { signUp, user } = useAuth();
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
