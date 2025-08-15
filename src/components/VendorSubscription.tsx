import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Check, Crown, Zap, Copy } from "lucide-react";

interface VendorSubscriptionProps {
  onSubscriptionComplete: () => void;
  userEmail: string;
  userId: string;
}

const VendorSubscription = ({ onSubscriptionComplete, userEmail, userId }: VendorSubscriptionProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const subscriptionPlan = {
    name: "Vendor Basic",
    monthlyPrice: 2999,
    yearlyPrice: 29990,
    features: [
      "List unlimited products",
      "Dashboard access",
      "Basic analytics",
      "Customer support",
      "Draft mode listing",
      "KYC verification assistance"
    ]
  };

  const upiId = "9911258992@slc";

  const copyUpiId = () => {
    navigator.clipboard.writeText(upiId);
    toast({
      title: "UPI ID Copied",
      description: "UPI ID has been copied to clipboard",
    });
  };

  const handleSubscription = async (planType: 'monthly' | 'yearly') => {
    setIsLoading(true);
    try {
      // Get subscription plan from database
      const { data: plans, error: planError } = await supabase
        .from('subscription_plans')
        .select('*')
        .eq('name', 'Vendor Basic')
        .single();

      if (planError || !plans) {
        throw new Error('Failed to fetch subscription plan');
      }

      const amount = planType === 'monthly' ? plans.price_monthly : plans.price_yearly;
      
      toast({
        title: "Payment Instructions",
        description: `Please pay ₹${amount} to UPI ID: ${upiId} and contact support to activate your subscription.`,
      });

      // For now, we'll just show the payment instructions
      // In a real implementation, you'd want to handle manual verification
      
    } catch (error) {
      console.error('Subscription error:', error);
      toast({
        variant: "destructive",
        title: "Subscription failed",
        description: "Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <Crown className="mx-auto h-12 w-12 text-primary mb-4" />
        <h2 className="text-2xl font-serif font-medium text-primary">Choose Your Vendor Plan</h2>
        <p className="mt-2 text-muted-foreground">Start selling on our premium marketplace</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
        {/* Monthly Plan */}
        <Card className="relative">
          <CardHeader>
            <CardTitle className="text-center">
              <div className="text-lg font-semibold">Monthly Plan</div>
              <div className="text-3xl font-bold text-primary mt-2">
                ₹{subscriptionPlan.monthlyPrice}
                <span className="text-sm font-normal text-muted-foreground">/month</span>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="space-y-2">
              {subscriptionPlan.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>
            <div className="space-y-3">
              <div className="p-3 bg-eco-sand/20 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-eco-bark">Pay via UPI</p>
                    <p className="text-xs text-muted-foreground">{upiId}</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={copyUpiId}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <Button 
                className="w-full" 
                onClick={() => handleSubscription('monthly')}
                disabled={isLoading}
              >
                {isLoading ? "Processing..." : "Get Payment Details"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Yearly Plan */}
        <Card className="relative border-primary">
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
            <div className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
              <Zap className="h-3 w-3" />
              Save 17%
            </div>
          </div>
          <CardHeader>
            <CardTitle className="text-center">
              <div className="text-lg font-semibold">Yearly Plan</div>
              <div className="text-3xl font-bold text-primary mt-2">
                ₹{subscriptionPlan.yearlyPrice}
                <span className="text-sm font-normal text-muted-foreground">/year</span>
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                ₹{Math.round(subscriptionPlan.yearlyPrice / 12)}/month
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="space-y-2">
              {subscriptionPlan.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <span className="text-sm font-medium text-primary">2 months free!</span>
              </li>
            </ul>
            <div className="space-y-3">
              <div className="p-3 bg-eco-sand/20 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-eco-bark">Pay via UPI</p>
                    <p className="text-xs text-muted-foreground">{upiId}</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={copyUpiId}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <Button 
                className="w-full" 
                onClick={() => handleSubscription('yearly')}
                disabled={isLoading}
              >
                {isLoading ? "Processing..." : "Get Payment Details"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="text-center text-sm text-muted-foreground max-w-2xl mx-auto">
        <p>
          • Start listing products immediately in draft mode<br/>
          • Complete KYC verification before going live<br/>
          • 24/7 customer support included<br/>
          • Cancel anytime
        </p>
      </div>
    </div>
  );
};

export default VendorSubscription;