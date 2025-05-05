
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { verifyUpiId, verifyUpiCustomerNumber } from "@/utils/upiVerification";

interface UpiVerificationProps {
  onVerified: (data: { upiId: string, name: string, customerNumber?: string }) => void;
}

const UpiVerification = ({ onVerified }: UpiVerificationProps) => {
  const [upiId, setUpiId] = useState("");
  const [customerNumber, setCustomerNumber] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isIdVerified, setIsIdVerified] = useState(false);
  const [isNumberVerified, setIsNumberVerified] = useState(false);
  const [verifiedName, setVerifiedName] = useState("");
  const [bankName, setBankName] = useState("");
  const { toast } = useToast();

  const handleVerifyUpiId = async () => {
    if (!upiId) {
      toast({
        title: "Please enter UPI ID",
        variant: "destructive",
      });
      return;
    }

    setIsVerifying(true);
    try {
      const result = await verifyUpiId(upiId);
      
      if (result.success) {
        setVerifiedName(result.name || "");
        setBankName(result.bankName || "");
        setIsIdVerified(true);
        
        toast({
          title: "UPI ID Verified",
          description: `Verified as ${result.name}${result.bankName ? ` (${result.bankName})` : ''}`,
        });

        // If customer number is also verified, call the onVerified callback
        if (isNumberVerified) {
          onVerified({ upiId, name: result.name || "", customerNumber });
        }
      } else {
        toast({
          title: "Verification Failed",
          description: result.error,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred during verification",
        variant: "destructive",
      });
    } finally {
      setIsVerifying(false);
    }
  };

  const handleVerifyCustomerNumber = async () => {
    if (!customerNumber) {
      toast({
        title: "Please enter customer number",
        variant: "destructive",
      });
      return;
    }

    setIsVerifying(true);
    try {
      const result = await verifyUpiCustomerNumber(customerNumber);
      
      if (result.success && result.isValid) {
        setIsNumberVerified(true);
        
        toast({
          title: "Customer Number Verified",
          description: "The customer number is valid",
        });

        // If UPI ID is also verified, call the onVerified callback
        if (isIdVerified) {
          onVerified({ upiId, name: verifiedName, customerNumber });
        }
      } else {
        toast({
          title: "Verification Failed",
          description: result.error || "Customer number is not valid",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred during verification",
        variant: "destructive",
      });
    } finally {
      setIsVerifying(false);
    }
  };

  const handleContinue = () => {
    if (isIdVerified && isNumberVerified) {
      onVerified({ upiId, name: verifiedName, customerNumber });
    } else if (!isIdVerified) {
      toast({
        title: "UPI ID not verified",
        description: "Please verify your UPI ID first",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Customer number not verified",
        description: "Please verify your customer number",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-serif font-medium text-eco-moss">UPI Payment Details</h2>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="upi-id" className="block text-sm font-medium text-eco-bark mb-1">
            UPI ID
          </label>
          <div className="flex gap-2">
            <Input
              id="upi-id"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
              placeholder="yourname@upi"
              className={`flex-1 ${isIdVerified ? 'border-green-500' : ''}`}
              disabled={isIdVerified}
            />
            <Button 
              onClick={handleVerifyUpiId} 
              disabled={isVerifying || isIdVerified} 
              variant={isIdVerified ? "outline" : "default"}
              className={isIdVerified ? "border-green-500 text-green-600" : ""}
            >
              {isIdVerified ? "Verified ✓" : isVerifying ? "Verifying..." : "Verify"}
            </Button>
          </div>
          {isIdVerified && (
            <p className="text-sm text-green-600 mt-2">
              Verified as {verifiedName}
              {bankName && <span className="ml-1">({bankName})</span>}
            </p>
          )}
          <p className="text-xs text-eco-bark mt-1">
            Enter your UPI ID in the format username@handle (e.g., name@okicici)
          </p>
        </div>

        <div>
          <label htmlFor="customer-number" className="block text-sm font-medium text-eco-bark mb-1">
            UPI Registered Mobile Number
          </label>
          <div className="flex gap-2">
            <Input
              id="customer-number"
              value={customerNumber}
              onChange={(e) => setCustomerNumber(e.target.value)}
              placeholder="10-digit mobile number"
              className={`flex-1 ${isNumberVerified ? 'border-green-500' : ''}`}
              disabled={isNumberVerified}
              type="tel"
              maxLength={10}
            />
            <Button 
              onClick={handleVerifyCustomerNumber} 
              disabled={isVerifying || isNumberVerified} 
              variant={isNumberVerified ? "outline" : "default"}
              className={isNumberVerified ? "border-green-500 text-green-600" : ""}
            >
              {isNumberVerified ? "Verified ✓" : isVerifying ? "Verifying..." : "Verify"}
            </Button>
          </div>
          <p className="text-xs text-eco-bark mt-1">
            Enter the mobile number registered with your UPI ID
          </p>
        </div>
      </div>

      <Button 
        onClick={handleContinue}
        disabled={!isIdVerified || !isNumberVerified}
        className="w-full"
      >
        Continue to Payment
      </Button>
    </div>
  );
};

export default UpiVerification;
