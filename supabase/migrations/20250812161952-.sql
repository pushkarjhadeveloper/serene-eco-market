-- Create enum for user types
CREATE TYPE public.user_type AS ENUM ('architect', 'designer', 'vendor');

-- Create enum for subscription status
CREATE TYPE public.subscription_status AS ENUM ('active', 'inactive', 'trial', 'expired');

-- Create enum for KYC status
CREATE TYPE public.kyc_status AS ENUM ('pending', 'submitted', 'approved', 'rejected');

-- Update profiles table to include user type and phone
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS user_type public.user_type DEFAULT 'architect',
ADD COLUMN IF NOT EXISTS phone text,
ADD COLUMN IF NOT EXISTS subscription_status public.subscription_status DEFAULT 'inactive',
ADD COLUMN IF NOT EXISTS subscription_end_date timestamptz,
ADD COLUMN IF NOT EXISTS kyc_status public.kyc_status DEFAULT 'pending',
ADD COLUMN IF NOT EXISTS kyc_submitted_at timestamptz,
ADD COLUMN IF NOT EXISTS kyc_approved_at timestamptz;

-- Create vendor_kyc table for KYC documents
CREATE TABLE public.vendor_kyc (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  gstin text,
  udyam_registration text,
  pan text NOT NULL,
  bank_account_holder_name text NOT NULL,
  bank_account_number text NOT NULL,
  bank_ifsc_code text NOT NULL,
  bank_proof_url text,
  pan_proof_url text,
  gstin_proof_url text,
  udyam_proof_url text,
  status public.kyc_status NOT NULL DEFAULT 'pending',
  rejection_reason text,
  submitted_at timestamptz DEFAULT now(),
  reviewed_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS on vendor_kyc table
ALTER TABLE public.vendor_kyc ENABLE ROW LEVEL SECURITY;

-- Create policies for vendor_kyc
CREATE POLICY "Users can view their own KYC data" 
ON public.vendor_kyc 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own KYC data" 
ON public.vendor_kyc 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own KYC data" 
ON public.vendor_kyc 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Admin users can manage all KYC data" 
ON public.vendor_kyc 
FOR ALL 
USING (is_admin(auth.uid()));

-- Add draft status to products table
ALTER TABLE public.products 
ADD COLUMN IF NOT EXISTS status text DEFAULT 'draft' CHECK (status IN ('draft', 'live', 'rejected')),
ADD COLUMN IF NOT EXISTS vendor_id uuid REFERENCES auth.users(id);

-- Update product policies to allow vendors to manage their own products
CREATE POLICY "Vendors can manage their own products" 
ON public.products 
FOR ALL 
USING (
  auth.uid() = vendor_id 
  OR is_admin(auth.uid())
);

-- Create subscription_plans table
CREATE TABLE public.subscription_plans (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  description text,
  price_monthly integer NOT NULL, -- in paise for Razorpay
  price_yearly integer, -- in paise for Razorpay
  features jsonb,
  is_active boolean DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS on subscription_plans
ALTER TABLE public.subscription_plans ENABLE ROW LEVEL SECURITY;

-- Allow public read access to subscription plans
CREATE POLICY "Allow public read access to subscription plans" 
ON public.subscription_plans 
FOR SELECT 
USING (is_active = true);

-- Insert default vendor subscription plan
INSERT INTO public.subscription_plans (name, description, price_monthly, price_yearly, features) VALUES (
  'Vendor Basic',
  'Basic vendor plan with product listing capabilities',
  299900, -- ₹2999 in paise
  2999000, -- ₹29990 in paise (10% discount)
  '["Product Listing", "Dashboard Access", "Basic Analytics", "Customer Support"]'::jsonb
);

-- Create vendor_subscriptions table
CREATE TABLE public.vendor_subscriptions (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  plan_id uuid NOT NULL REFERENCES public.subscription_plans(id),
  razorpay_subscription_id text,
  razorpay_customer_id text,
  status public.subscription_status NOT NULL DEFAULT 'inactive',
  start_date timestamptz,
  end_date timestamptz,
  auto_renew boolean DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS on vendor_subscriptions
ALTER TABLE public.vendor_subscriptions ENABLE ROW LEVEL SECURITY;

-- Create policies for vendor_subscriptions
CREATE POLICY "Users can view their own subscription" 
ON public.vendor_subscriptions 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own subscription" 
ON public.vendor_subscriptions 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admin users can manage all subscriptions" 
ON public.vendor_subscriptions 
FOR ALL 
USING (is_admin(auth.uid()));

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_vendor_kyc_updated_at
  BEFORE UPDATE ON public.vendor_kyc
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_vendor_subscriptions_updated_at
  BEFORE UPDATE ON public.vendor_subscriptions
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Update the handle_new_user function to include user_type and phone
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $function$
BEGIN
  INSERT INTO public.profiles (id, first_name, last_name, user_type, phone)
  VALUES (
    new.id, 
    new.raw_user_meta_data ->> 'first_name', 
    new.raw_user_meta_data ->> 'last_name',
    COALESCE((new.raw_user_meta_data ->> 'user_type')::public.user_type, 'architect'),
    new.raw_user_meta_data ->> 'phone'
  );
  RETURN new;
END;
$function$;