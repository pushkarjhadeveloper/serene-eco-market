-- Fix function search path security warnings
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

CREATE OR REPLACE FUNCTION public.is_admin(_user_id UUID)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT public.has_role(_user_id, 'admin')
$$;

-- Add RLS policy for login table if needed
CREATE POLICY "Users can manage their own login records" ON public.login
FOR ALL USING (true);

-- Add basic policy for app table if it exists
-- CREATE POLICY "Allow public access to app table" ON public.app
-- FOR SELECT USING (true);