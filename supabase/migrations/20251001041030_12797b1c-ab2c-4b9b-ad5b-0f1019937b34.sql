-- Drop the overly permissive public policy
DROP POLICY IF EXISTS "Public can view basic vendor profiles" ON public.profiles;

-- Create a secure public view that only exposes safe business information
CREATE OR REPLACE VIEW public.public_profiles AS
SELECT 
  id,
  first_name,
  last_name,
  user_type,
  company_name,
  experience_years,
  city,
  state,
  bio,
  specialization,
  is_verified,
  tagline,
  avatar_url,
  design_styles
FROM public.profiles
WHERE user_type IN ('architect', 'designer', 'vendor')
  AND first_name IS NOT NULL;

-- Grant public access to the view
GRANT SELECT ON public.public_profiles TO anon;
GRANT SELECT ON public.public_profiles TO authenticated;

-- Add comment explaining the view's purpose
COMMENT ON VIEW public.public_profiles IS 'Public-safe view of professional profiles exposing only business information. Sensitive data like phone numbers, addresses, and contact details are excluded.';

-- Ensure existing policies for authenticated users remain
-- Users can still view their full profile when authenticated
-- (The existing "Users can view their own profile" policy handles this)