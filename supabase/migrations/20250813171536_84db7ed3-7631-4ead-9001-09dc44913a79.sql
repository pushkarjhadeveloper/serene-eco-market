-- Fix function search path mutable issue by updating existing functions
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Add missing RLS policy for subscription_plans admin management
CREATE POLICY "Admin users can manage subscription plans" 
ON public.subscription_plans 
FOR ALL 
USING (is_admin(auth.uid()));