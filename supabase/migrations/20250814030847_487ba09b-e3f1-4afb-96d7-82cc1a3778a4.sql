-- Fix security vulnerability in login table
-- Add user_id column to associate login records with users
ALTER TABLE public.login 
ADD COLUMN user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;

-- Drop the insecure policy that allows public access
DROP POLICY IF EXISTS "Users can manage their own login records" ON public.login;

-- Create secure policies that restrict access to authenticated users and their own records
CREATE POLICY "Users can view their own login records" 
ON public.login 
FOR SELECT 
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own login records" 
ON public.login 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own login records" 
ON public.login 
FOR UPDATE 
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own login records" 
ON public.login 
FOR DELETE 
TO authenticated
USING (auth.uid() = user_id);

-- Admin users can manage all login records for monitoring purposes
CREATE POLICY "Admin users can manage all login records" 
ON public.login 
FOR ALL 
TO authenticated
USING (is_admin(auth.uid()));

-- Update existing records to set user_id (if any exist)
-- Note: Existing records without user_id will need manual assignment or removal
UPDATE public.login 
SET user_id = auth.uid() 
WHERE user_id IS NULL AND auth.uid() IS NOT NULL;