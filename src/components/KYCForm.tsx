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
import { FileText, Upload, CheckCircle } from "lucide-react";

const kycSchema = z.object({
  pan: z.string().min(10, "PAN must be exactly 10 characters").max(10, "PAN must be exactly 10 characters"),
  gstin: z.string().optional(),
  udyamRegistration: z.string().optional(),
  bankAccountHolderName: z.string().min(2, "Account holder name is required"),
  bankAccountNumber: z.string().min(8, "Valid bank account number required"),
  bankIfscCode: z.string().min(11, "IFSC code must be 11 characters").max(11, "IFSC code must be 11 characters"),
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
    }
  });

  const onSubmit = async (values: KYCFormValues) => {
    setIsLoading(true);
    try {
      // Insert KYC data
      const { error } = await supabase
        .from('vendor_kyc')
        .insert({
          user_id: userId,
          pan: values.pan,
          gstin: values.gstin || null,
          udyam_registration: values.udyamRegistration || null,
          bank_account_holder_name: values.bankAccountHolderName,
          bank_account_number: values.bankAccountNumber,
          bank_ifsc_code: values.bankIfscCode,
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
        title: "KYC submitted successfully!",
        description: "Your documents are under review. You'll be notified once approved.",
      });

      onKYCSubmitted();
    } catch (error) {
      console.error('KYC submission error:', error);
      toast({
        variant: "destructive",
        title: "KYC submission failed",
        description: "Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="text-center">
        <FileText className="mx-auto h-12 w-12 text-primary mb-4" />
        <h2 className="text-2xl font-serif font-medium text-primary">Complete KYC Verification</h2>
        <p className="mt-2 text-muted-foreground">
          Provide your business details to start receiving payouts
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
                        onChange={(e) => field.onChange(e.target.value.toUpperCase())}
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
                        onChange={(e) => field.onChange(e.target.value.toUpperCase())}
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
                      <Input placeholder="As per bank account" {...field} />
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
                      <Input placeholder="1234567890123456" {...field} />
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
                        onChange={(e) => field.onChange(e.target.value.toUpperCase())}
                      />
                    </FormControl>
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