-- Enable leaked password protection and enhance authentication security
-- Note: This configures Supabase settings that should be applied via dashboard

-- Create a security audit log table for sensitive operations
CREATE TABLE IF NOT EXISTS public.security_audit_log (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  operation TEXT NOT NULL,
  ip_address INET,
  user_agent TEXT,
  success BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on audit log
ALTER TABLE public.security_audit_log ENABLE ROW LEVEL SECURITY;

-- Create policies for audit log (admin access only)
CREATE POLICY "Admin users can view all audit logs" 
ON public.security_audit_log 
FOR SELECT 
TO authenticated
USING (is_admin(auth.uid()));

CREATE POLICY "System can insert audit logs" 
ON public.security_audit_log 
FOR INSERT 
TO authenticated
WITH CHECK (true);

-- Create function to log security events
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
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to automatically update timestamps on audit log
CREATE TRIGGER update_security_audit_log_updated_at
BEFORE UPDATE ON public.security_audit_log
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();