
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import Layout from "@/components/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import VendorSubscription from "@/components/VendorSubscription";
import Stepper, { Step } from "@/components/Stepper";
import { RateLimiter } from "@/utils/rateLimiter";
import AccountCreationStep from "@/components/signup/AccountCreationStep";
import RoleSelectionStep from "@/components/signup/RoleSelectionStep";
import ProfessionalDetailsStep from "@/components/signup/ProfessionalDetailsStep";
import PortfolioStep from "@/components/signup/PortfolioStep";
import CredibilityStep from "@/components/signup/CredibilityStep";
import ProfilePreviewStep from "@/components/signup/ProfilePreviewStep";

const signUpSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
  userType: z.enum(['architect', 'designer', 'vendor']),
  experience: z.string().optional(),
  education: z.string().optional(),
  coaNumber: z.string().optional(),
  companyName: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  pincode: z.string().optional(),
  portfolio: z.array(z.object({
    title: z.string().min(1, "Project title is required"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    budgetRange: z.string().min(1, "Budget range is required"),
    projectType: z.string().min(1, "Project type is required"),
    images: z.array(z.string()).optional()
  })).min(3, "Minimum 3 projects required").optional(),
  certifications: z.string().optional()
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
      experience: "",
      education: "",
      coaNumber: "",
      companyName: "",
      city: "",
      state: "",
      pincode: "",
      portfolio: [
        { title: "", description: "", budgetRange: "", projectType: "", images: [] },
        { title: "", description: "", budgetRange: "", projectType: "", images: [] },
        { title: "", description: "", budgetRange: "", projectType: "", images: [] }
      ],
      certifications: ""
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
    if (role === 'vendor') {
      setCurrentStep(1); // Keep vendor flow simple
    } else {
      setCurrentStep(1); // Start architect/designer flow
    }
  };

  const handleStepComplete = () => {
    if (selectedRole === 'vendor') {
      setCurrentStep(1); // Vendor goes to basic account creation
    } else {
      // For architects/designers, progress through all steps
      if (currentStep < 5) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const handleEditStep = (step: number) => {
    setCurrentStep(step);
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
            {/* Step 0: Role Selection */}
            <Step>
              <RoleSelectionStep 
                selectedRole={selectedRole as 'architect' | 'designer' | 'vendor' | null}
                onRoleSelect={handleRoleSelect}
              />
            </Step>

            {/* Step 1: Account Creation */}
            <Step>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-md mx-auto space-y-6">
                  {selectedRole === 'vendor' ? (
                    // Simple vendor flow
                    <div>
                      <div className="text-center mb-6">
                        <h2 className="text-xl font-semibold">Vendor Account Details</h2>
                        <p className="text-sm text-muted-foreground">
                          Creating vendor account
                        </p>
                      </div>
                      <AccountCreationStep control={form.control} />
                      <div className="p-4 bg-muted rounded-lg mt-4">
                        <p className="text-sm text-muted-foreground">
                          As a vendor, you'll need to complete subscription payment after creating your account to start listing products.
                        </p>
                      </div>
                      <Button type="submit" className="w-full mt-6" disabled={isLoading}>
                        {isLoading ? "Creating Account..." : "Create Account & Continue to Payment"}
                      </Button>
                    </div>
                  ) : (
                    // Architect/Designer flow
                    <div>
                      <AccountCreationStep control={form.control} />
                      <Button 
                        type="button" 
                        className="w-full mt-6" 
                        onClick={handleStepComplete}
                      >
                        Continue to Professional Details
                      </Button>
                    </div>
                  )}
                </form>
              </Form>
            </Step>

            {/* Step 2: Professional Details (Architects/Designers only) */}
            {selectedRole !== 'vendor' && (
              <Step>
                <Form {...form}>
                  <div className="max-w-md mx-auto">
                    <ProfessionalDetailsStep control={form.control} selectedRole={selectedRole} />
                    <div className="flex gap-4 mt-6">
                      <Button variant="outline" onClick={() => setCurrentStep(1)} className="w-full">
                        Back
                      </Button>
                      <Button onClick={handleStepComplete} className="w-full">
                        Continue to Portfolio
                      </Button>
                    </div>
                  </div>
                </Form>
              </Step>
            )}

            {/* Step 3: Portfolio Showcase (Architects/Designers only) */}
            {selectedRole !== 'vendor' && (
              <Step>
                <Form {...form}>
                  <div className="max-w-2xl mx-auto">
                    <PortfolioStep control={form.control} />
                    <div className="flex gap-4 mt-6">
                      <Button variant="outline" onClick={() => setCurrentStep(2)} className="w-full">
                        Back
                      </Button>
                      <Button onClick={handleStepComplete} className="w-full">
                        Continue to Verification
                      </Button>
                    </div>
                  </div>
                </Form>
              </Step>
            )}

            {/* Step 4: Credibility Boost (Architects/Designers only) */}
            {selectedRole !== 'vendor' && (
              <Step>
                <Form {...form}>
                  <div className="max-w-2xl mx-auto">
                    <CredibilityStep control={form.control} selectedRole={selectedRole} />
                    <div className="flex gap-4 mt-6">
                      <Button variant="outline" onClick={() => setCurrentStep(3)} className="w-full">
                        Back
                      </Button>
                      <Button variant="outline" onClick={handleStepComplete} className="w-full">
                        Skip Verification
                      </Button>
                      <Button onClick={handleStepComplete} className="w-full">
                        Continue to Preview
                      </Button>
                    </div>
                  </div>
                </Form>
              </Step>
            )}

            {/* Step 5: Profile Preview (Architects/Designers only) */}
            {selectedRole !== 'vendor' && (
              <Step>
                <Form {...form}>
                  <div className="max-w-4xl mx-auto">
                    <ProfilePreviewStep 
                      formData={form.getValues()} 
                      onEdit={handleEditStep}
                    />
                    <div className="flex gap-4 mt-6 max-w-md mx-auto">
                      <Button variant="outline" onClick={() => setCurrentStep(4)} className="w-full">
                        Back
                      </Button>
                      <Button 
                        type="submit" 
                        className="w-full" 
                        disabled={isLoading}
                        onClick={form.handleSubmit(onSubmit)}
                      >
                        {isLoading ? "Creating Profile..." : "Create Professional Profile"}
                      </Button>
                    </div>
                  </div>
                </Form>
              </Step>
            )}
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
