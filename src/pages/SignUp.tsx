
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
import { supabase } from "@/integrations/supabase/client";
import RoleSelector from "@/components/RoleSelector";
import VendorSubscription from "@/components/VendorSubscription";
import Stepper, { Step } from "@/components/Stepper";
import { RateLimiter } from "@/utils/rateLimiter";
import { User, MapPin, FileText, Share2, Tag, Briefcase, FolderOpen } from "lucide-react";

const signUpSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
  userType: z.enum(['architect', 'designer', 'vendor']),
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
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedRole, setSelectedRole] = useState<'architect' | 'designer' | 'vendor' | null>(null);
  const [showSubscription, setShowSubscription] = useState(false);
  const [userId, setUserId] = useState<string>('');
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
      phone: "",
      password: "",
      confirmPassword: "",
      userType: selectedRole || 'architect',
      tagline: "",
      location: "",
      profileSummary: "",
      socialLinks: "",
      profileTags: "",
      experience: "",
      portfolioLinks: ""
    }
  });

  // Update form when role changes
  useEffect(() => {
    if (selectedRole) {
      form.setValue('userType', selectedRole);
    }
  }, [selectedRole, form]);

  const onSubmit = async (values: SignUpValues) => {
    setIsLoading(true);
    try {
      // Rate limiting check
      const rateLimitKey = `signup_${values.email}`;
      if (!RateLimiter.checkRateLimit(rateLimitKey, 3, 60 * 60 * 1000)) { // 3 attempts per hour
        const remainingTime = RateLimiter.getRemainingTime(rateLimitKey, 60 * 60 * 1000);
        toast({
          variant: "destructive",
          title: "Too many signup attempts",
          description: `Please wait ${remainingTime} minutes before trying again.`,
        });
        return;
      }

      // Include user type and phone in signup metadata with email redirect
      const { data, error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
          data: {
            first_name: values.firstName,
            last_name: values.lastName,
            user_type: values.userType,
            phone: values.phone,
          }
        }
      });

      if (error) {
        toast({
          variant: "destructive",
          title: "Sign up failed",
          description: error.message,
        });
        return;
      }

      if (data.user) {
        setUserId(data.user.id);
        
        if (values.userType === 'vendor') {
          setShowSubscription(true);
        } else {
          toast({
            title: "Account created!",
            description: "Check your email to confirm your registration.",
          });
          form.reset();
        }
      }
    } catch (error) {
      console.error('Sign up error:', error);
      toast({
        variant: "destructive",
        title: "Sign up failed",
        description: "An unexpected error occurred.",
      });
    } finally {
      setIsLoading(false);
    }
  };


  const handleSubscriptionComplete = () => {
    toast({
      title: "Welcome to SereneEco!",
      description: "Your vendor account is ready. You can now start listing products.",
    });
    navigate('/');
  };

  const handleRoleSelect = (role: 'architect' | 'designer' | 'vendor') => {
    setSelectedRole(role);
    setCurrentStep(1);
  };

  const canProceedToSignup = selectedRole !== null;

  // If showing subscription flow
  if (showSubscription && userId) {
    return (
      <Layout>
        <div className="eco-container py-12 max-w-4xl mx-auto">
          <VendorSubscription 
            onSubscriptionComplete={handleSubscriptionComplete}
            userEmail={form.getValues('email')}
            userId={userId}
          />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="eco-container py-12 max-w-4xl mx-auto">
        <div className="space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-serif font-medium text-primary">Create an Account</h1>
            <p className="mt-2 text-muted-foreground">Join SereneEco for sustainable design inspiration</p>
          </div>

          <Stepper initialStep={currentStep} onStepChange={setCurrentStep}>
            {/* Step 1: Role Selection */}
            <Step>
              <RoleSelector 
                selectedRole={selectedRole}
                onRoleSelect={handleRoleSelect}
              />
            </Step>

            {/* Step 2: Account Details */}
            <Step>
              <div className="max-w-md mx-auto">
                <div className="text-center mb-6">
                  <h2 className="text-xl font-semibold">Account Details</h2>
                  <p className="text-sm text-muted-foreground">
                    Creating account for: <span className="font-medium capitalize">{selectedRole}</span>
                  </p>
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
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input type="tel" placeholder="+91 98765 43210" {...field} />
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

                    {selectedRole === 'vendor' && (
                      <div className="p-4 bg-muted rounded-lg">
                        <p className="text-sm text-muted-foreground">
                          As a vendor, you'll need to complete subscription payment after creating your account to start listing products.
                        </p>
                      </div>
                    )}
                    
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? "Creating Account..." : 
                       selectedRole === 'vendor' ? "Create Account & Continue to Payment" : "Create Account"}
                    </Button>
                  </form>
                </Form>

              </div>
            </Step>
          </Stepper>
          
          <div className="text-center text-sm mt-6">
            <p className="text-muted-foreground">
              Already have an account?{" "}
              <Link to="/signin" className="text-primary hover:underline">
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
