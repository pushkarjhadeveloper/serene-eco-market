-- Recreate the view with SECURITY INVOKER to use querying user's permissions
DROP VIEW IF EXISTS public.public_profiles;

CREATE VIEW public.public_profiles 
WITH (security_invoker = true) AS
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
COMMENT ON VIEW public.public_profiles IS 'Public-safe view of professional profiles exposing only business information. Sensitive data like phone numbers, pin codes, and contact details are excluded. Uses security invoker for proper RLS enforcement.';