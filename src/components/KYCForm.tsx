import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { FileText, Upload, CheckCircle, Shield } from "lucide-react";
import { CryptoUtils } from "@/utils/cryptoUtils";
import { RateLimiter } from "@/utils/rateLimiter";

const kycSchema = z.object({
  pan: z.string()
    .min(10, "PAN must be exactly 10 characters")
    .max(10, "PAN must be exactly 10 characters")
    .refine((val) => CryptoUtils.validatePAN(val), "Invalid PAN format (e.g., ABCDE1234F)"),
  gstin: z.string()
    .optional()
    .refine((val) => !val || CryptoUtils.validateGSTIN(val), "Invalid GSTIN format"),
  udyamRegistration: z.string().optional(),
  bankAccountHolderName: z.string()
    .min(2, "Account holder name is required")
    .max(100, "Name too long"),
  bankAccountNumber: z.string()
    .min(8, "Bank account number must be 8-18 digits")
    .max(18, "Bank account number must be 8-18 digits")
    .refine((val) => CryptoUtils.validateBankAccount(val), "Invalid bank account number"),
  bankIfscCode: z.string()
    .min(11, "IFSC code must be 11 characters")
    .max(11, "IFSC code must be 11 characters")
    .refine((val) => CryptoUtils.validateIFSC(val), "Invalid IFSC format (e.g., SBIN0000123)"),
  userPassword: z.string().min(6, "Password required for encryption"),
});

type KYCFormValues = z.infer<typeof kycSchema>;

interface KYCFormProps {
  userId: string;
  onKYCSubmitted: () => void;
}

const KYCForm = ({ userId, onKYCSubmitted }: KYCFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<KYCFormValues>({
    resolver: zodResolver(kycSchema),
    defaultValues: {
      pan: "",
      gstin: "",
      udyamRegistration: "",
      bankAccountHolderName: "",
      bankAccountNumber: "",
      bankIfscCode: "",
      userPassword: "",
    }
  });

  const onSubmit = async (values: KYCFormValues) => {
    setIsLoading(true);
    
    try {
      // Rate limiting check
      const rateLimitKey = `kyc_${userId}`;
      if (!RateLimiter.checkRateLimit(rateLimitKey, 3, 60 * 60 * 1000)) { // 3 attempts per hour
        const remainingTime = RateLimiter.getRemainingTime(rateLimitKey, 60 * 60 * 1000);
        toast({
          variant: "destructive",
          title: "Too many attempts",
          description: `Please wait ${remainingTime} minutes before trying again.`,
        });
        return;
      }

      // Sanitize all inputs
      const sanitizedValues = {
        pan: CryptoUtils.sanitizeInput(values.pan.toUpperCase()),
        gstin: values.gstin ? CryptoUtils.sanitizeInput(values.gstin.toUpperCase()) : null,
        udyamRegistration: values.udyamRegistration ? CryptoUtils.sanitizeInput(values.udyamRegistration.toUpperCase()) : null,
        bankAccountHolderName: CryptoUtils.sanitizeInput(values.bankAccountHolderName),
        bankAccountNumber: CryptoUtils.sanitizeInput(values.bankAccountNumber),
        bankIfscCode: CryptoUtils.sanitizeInput(values.bankIfscCode.toUpperCase()),
      };

      // Encrypt sensitive financial data
      const encryptedBankAccount = await CryptoUtils.encryptSensitiveData(
        sanitizedValues.bankAccountNumber,
        values.userPassword
      );
      
      const encryptedPAN = await CryptoUtils.encryptSensitiveData(
        sanitizedValues.pan,
        values.userPassword
      );

      // Insert KYC data with encrypted sensitive fields
      const { error } = await supabase
        .from('vendor_kyc')
        .insert({
          user_id: userId,
          pan: encryptedPAN,
          gstin: sanitizedValues.gstin,
          udyam_registration: sanitizedValues.udyamRegistration,
          bank_account_holder_name: sanitizedValues.bankAccountHolderName,
          bank_account_number: encryptedBankAccount,
          bank_ifsc_code: sanitizedValues.bankIfscCode,
          status: 'submitted'
        });

      if (error) throw error;

      // Update profile KYC status
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          kyc_status: 'submitted',
          kyc_submitted_at: new Date().toISOString()
        })
        .eq('id', userId);

      if (profileError) {
        console.error('Profile update error:', profileError);
      }

      toast({
        title: "KYC submitted securely!",
        description: "Your encrypted documents are under review. You'll be notified once approved.",
      });

      onKYCSubmitted();
    } catch (error) {
      console.error('KYC submission error:', error);
      toast({
        variant: "destructive",
        title: "KYC submission failed",
        description: error instanceof Error ? error.message : "Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="text-center">
        <Shield className="mx-auto h-12 w-12 text-primary mb-4" />
        <h2 className="text-2xl font-serif font-medium text-primary">Secure KYC Verification</h2>
        <p className="mt-2 text-muted-foreground">
          Your financial data is encrypted client-side for maximum security
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-primary" />
            Required Documents
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span><strong>PAN:</strong> Business or Personal PAN card (Required)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-muted rounded-full"></div>
              <span><strong>GSTIN:</strong> GST registration number (If registered)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-muted rounded-full"></div>
              <span><strong>Udyam:</strong> Udyam registration certificate (If registered)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span><strong>Bank Details:</strong> For receiving payouts (Required)</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Business Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="pan"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>PAN Number *</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="ABCDE1234F" 
                        {...field} 
                        style={{ textTransform: 'uppercase' }}
                        onChange={(e) => {
                          const value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
                          field.onChange(value);
                        }}
                        maxLength={10}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="gstin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>GSTIN (Optional)</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="22AAAAA0000A1Z5" 
                        {...field} 
                        style={{ textTransform: 'uppercase' }}
                        onChange={(e) => {
                          const value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
                          field.onChange(value);
                        }}
                        maxLength={15}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="udyamRegistration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Udyam Registration (Optional)</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="UDYAM-XX-00-0000000" 
                        {...field} 
                        style={{ textTransform: 'uppercase' }}
                        onChange={(e) => field.onChange(e.target.value.toUpperCase())}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Bank Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="bankAccountHolderName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Account Holder Name *</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="As per bank account" 
                        {...field}
                        onChange={(e) => {
                          const value = e.target.value.replace(/[<>'"&]/g, '');
                          field.onChange(value);
                        }}
                        maxLength={100}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="bankAccountNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bank Account Number *</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="1234567890123456" 
                        {...field}
                        onChange={(e) => {
                          const value = e.target.value.replace(/[^0-9]/g, '');
                          field.onChange(value);
                        }}
                        maxLength={18}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="bankIfscCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>IFSC Code *</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="SBIN0000123" 
                        {...field}
                        style={{ textTransform: 'uppercase' }}
                        onChange={(e) => {
                          const value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
                          field.onChange(value);
                        }}
                        maxLength={11}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Security Verification
              </CardTitle>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="userPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password for Data Encryption *</FormLabel>
                    <FormControl>
                      <Input 
                        type="password"
                        placeholder="Enter your password for encryption" 
                        {...field}
                      />
                    </FormControl>
                    <p className="text-xs text-muted-foreground">
                      Required to encrypt your sensitive financial data
                    </p>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <div className="bg-muted p-4 rounded-lg">
            <div className="flex items-start gap-3">
              <Upload className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div className="text-sm text-muted-foreground">
                <p className="font-medium mb-1">Document Upload</p>
                <p>
                  After submitting this form, our team will contact you via email to collect 
                  the required document uploads (PAN copy, bank statement/cancelled cheque, etc.).
                </p>
              </div>
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Submitting KYC..." : "Submit KYC Details"}
          </Button>
        </form>
      </Form>

      <div className="text-center text-sm text-muted-foreground">
        <p>
          Your KYC details are secure and will only be used for verification purposes.
          <br />
          Processing typically takes 1-2 business days.
        </p>
      </div>
    </div>
  );
};

export default KYCForm;