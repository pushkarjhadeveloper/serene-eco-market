-- Fix security linter issues

-- Fix Issue 1: RLS Enabled No Policy for security_audit_log table
-- The audit log table has RLS enabled but missing some policies, let's add them

CREATE POLICY "Users can view their own audit logs" 
ON public.security_audit_log 
FOR SELECT 
TO authenticated
USING (auth.uid() = user_id);

-- Fix Issue 2: Function Search Path Mutable
-- Update the log_security_event function to have immutable search path
CREATE OR REPLACE FUNCTION public.log_security_event(
  operation_name TEXT,
  user_id_param UUID DEFAULT auth.uid(),
  success_param BOOLEAN DEFAULT true
)
RETURNS VOID AS $$
BEGIN
  INSERT INTO public.security_audit_log (user_id, operation, success)
  VALUES (user_id_param, operation_name, success_param);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = 'public';

-- Update the existing has_role function to fix search path
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = 'public'
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Update the is_admin function as well
CREATE OR REPLACE FUNCTION public.is_admin(_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = 'public'
AS $$
  SELECT public.has_role(_user_id, 'admin')
$$;

-- Update handle_new_user function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
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
$$;