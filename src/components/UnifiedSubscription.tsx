import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Check, Crown, Zap, Copy, MessageCircle } from "lucide-react";

interface UnifiedSubscriptionProps {
  onSubscriptionComplete: () => void;
  userEmail: string;
  userId: string;
  userType: 'architect' | 'designer' | 'vendor';
}

const UnifiedSubscription = ({ onSubscriptionComplete, userEmail, userId, userType }: UnifiedSubscriptionProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const isVendor = userType === 'vendor';
  const isProfessional = userType === 'architect' || userType === 'designer';

  const subscriptionPlans = {
    vendor: {
      name: "Vendor Plan",
      monthlyPrice: 7999,
      yearlyPrice: 79999,
      features: [
        "List unlimited products",
        "Priority listing placement",
        "Advanced analytics dashboard",
        "Dedicated account manager",
        "24/7 customer support",
        "KYC verification assistance",
        "Marketing tools & promotions"
      ]
    },
    professional: {
      name: isProfessional ? (userType === 'architect' ? 'Architect Plan' : 'Interior Designer Plan') : '',
      monthlyPrice: 4999,
      yearlyPrice: 49999,
      features: [
        "Premium profile showcase",
        "Portfolio management",
        "Lead generation tools",
        "Network with vendors",
        "Project collaboration tools",
        "Marketing & visibility boost",
        "Priority support"
      ]
    }
  };

  const currentPlan = isVendor ? subscriptionPlans.vendor : subscriptionPlans.professional;
  const upiId = "9911258992@slc";

  const copyUpiId = () => {
    navigator.clipboard.writeText(upiId);
    toast({
      title: "UPI ID Copied",
      description: "UPI ID has been copied to clipboard",
    });
  };

  const handleTalkToFounder = () => {
    // Open WhatsApp with founder's number
    const message = encodeURIComponent(`Hi! I'm interested in the ${userType} plan and would like to discuss.`);
    window.open(`https://wa.me/919911258992?text=${message}`, '_blank');
  };

  const handleSubscription = async (planType: 'monthly' | 'yearly') => {
    setIsLoading(true);
    try {
      const amount = planType === 'monthly' ? currentPlan.monthlyPrice : currentPlan.yearlyPrice;
      
      toast({
        title: "Payment Instructions",
        description: `Please pay ₹${amount} to UPI ID: ${upiId}. After payment, contact support to activate your subscription.`,
      });
      
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
        <h2 className="text-2xl font-serif font-medium text-primary">
          {isVendor ? 'Choose Your Vendor Plan' : 'Choose Your Professional Plan'}
        </h2>
        <p className="mt-2 text-muted-foreground">
          {isVendor ? 'Start selling on our premium marketplace' : 'Unlock premium features and grow your network'}
        </p>
      </div>

      {isProfessional && (
        <div className="max-w-2xl mx-auto">
          <Card className="border-primary bg-primary/5">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-lg mb-1">Need help or have suggestions?</h3>
                  <p className="text-sm text-muted-foreground">
                    Talk to our founder directly for personalized assistance
                  </p>
                </div>
                <Button onClick={handleTalkToFounder} variant="outline" className="gap-2">
                  <MessageCircle className="h-4 w-4" />
                  Talk to Founder
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
        {/* Monthly Plan */}
        <Card className="relative">
          <CardHeader>
            <CardTitle className="text-center">
              <div className="text-lg font-semibold">Monthly Plan</div>
              <div className="text-3xl font-bold text-primary mt-2">
                ₹{currentPlan.monthlyPrice.toLocaleString('en-IN')}
                <span className="text-sm font-normal text-muted-foreground">/month</span>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="space-y-2">
              {currentPlan.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>
            <div className="space-y-3">
              <div className="p-3 bg-eco-sand/20 rounded-lg">
                <div className="text-center mb-3">
                  <p className="text-sm font-medium text-eco-bark mb-2">Scan QR Code to Pay</p>
                  <div className="bg-white p-2 rounded-lg inline-block">
                    <img 
                      src="/lovable-uploads/309971c4-f714-4445-a38e-5dee636a2e88.png" 
                      alt="UPI QR Code" 
                      className="w-32 h-32 object-contain"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-eco-bark">Or pay via UPI ID</p>
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
              2 Months Free
            </div>
          </div>
          <CardHeader>
            <CardTitle className="text-center">
              <div className="text-lg font-semibold">Yearly Plan</div>
              <div className="text-3xl font-bold text-primary mt-2">
                ₹{currentPlan.yearlyPrice.toLocaleString('en-IN')}
                <span className="text-sm font-normal text-muted-foreground">/year</span>
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                ₹{Math.round(currentPlan.yearlyPrice / 12).toLocaleString('en-IN')}/month
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="space-y-2">
              {currentPlan.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <span className="text-sm font-medium text-primary">2 months free (Save ₹{(currentPlan.monthlyPrice * 2).toLocaleString('en-IN')})</span>
              </li>
            </ul>
            <div className="space-y-3">
              <div className="p-3 bg-eco-sand/20 rounded-lg">
                <div className="text-center mb-3">
                  <p className="text-sm font-medium text-eco-bark mb-2">Scan QR Code to Pay</p>
                  <div className="bg-white p-2 rounded-lg inline-block">
                    <img 
                      src="/lovable-uploads/309971c4-f714-4445-a38e-5dee636a2e88.png" 
                      alt="UPI QR Code" 
                      className="w-32 h-32 object-contain"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-eco-bark">Or pay via UPI ID</p>
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
          {isVendor ? (
            <>
              • Start listing products immediately in draft mode<br/>
              • Complete KYC verification before going live<br/>
              • 24/7 customer support included<br/>
              • Cancel anytime
            </>
          ) : (
            <>
              • Access premium features immediately<br/>
              • Build your professional network<br/>
              • Get priority support<br/>
              • Cancel anytime
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default UnifiedSubscription;