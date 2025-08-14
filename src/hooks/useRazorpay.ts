import { useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

declare global {
  interface Window {
    Razorpay: any;
  }
}

export interface RazorpayOptions {
  amount: number; // Amount in paise
  currency: string;
  orderId: string;
  customerDetails: {
    name: string;
    email?: string;
    contact: string;
  };
  onSuccess: (response: any) => void;
  onError: (error: any) => void;
}

export const useRazorpay = () => {
  const { toast } = useToast();

  const loadRazorpay = useCallback(() => {
    return new Promise((resolve) => {
      const existingScript = document.getElementById('razorpay-script');
      if (existingScript) {
        resolve(true);
        return;
      }

      const script = document.createElement('script');
      script.id = 'razorpay-script';
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  }, []);

  const createOrder = useCallback(async (amount: number, currency: string = 'INR') => {
    try {
      const { data, error } = await supabase.functions.invoke('create-razorpay-order', {
        body: { amount, currency }
      });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error creating Razorpay order:', error);
      toast({
        variant: "destructive",
        title: "Payment Error",
        description: "Failed to create payment order. Please try again.",
      });
      throw error;
    }
  }, [toast]);

  const initiatePayment = useCallback(async (options: RazorpayOptions) => {
    try {
      const isLoaded = await loadRazorpay();
      if (!isLoaded) {
        throw new Error('Failed to load Razorpay SDK');
      }

      // Get the secure Razorpay key from the order response
      const orderData = await createOrder(options.amount, options.currency);
      
      const razorpayOptions = {
        key: orderData.razorpay_key_id, // Secure key from server
        amount: options.amount,
        currency: options.currency,
        order_id: options.orderId,
        name: 'EcoHaven Interiors',
        description: 'Payment for your EcoHaven order',
        image: '/favicon.ico',
        prefill: {
          name: options.customerDetails.name,
          email: options.customerDetails.email,
          contact: options.customerDetails.contact,
        },
        theme: {
          color: '#8B9F8A' // eco-sage color
        },
        handler: options.onSuccess,
        modal: {
          ondismiss: () => {
            toast({
              title: "Payment Cancelled",
              description: "You cancelled the payment. You can try again anytime.",
            });
          }
        }
      };

      const razorpay = new window.Razorpay(razorpayOptions);
      razorpay.on('payment.failed', options.onError);
      razorpay.open();
    } catch (error) {
      console.error('Error initiating Razorpay payment:', error);
      options.onError(error);
    }
  }, [loadRazorpay, toast]);

  return {
    createOrder,
    initiatePayment,
  };
};