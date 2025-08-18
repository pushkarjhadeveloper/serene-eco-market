-- Add professional fields to profiles table
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS company_name TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS experience_years TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS education TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS coa_number TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS city TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS state TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS pin_code TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS bio TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS specialization TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS design_styles TEXT[];
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS is_verified BOOLEAN DEFAULT false;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS tagline TEXT;

-- Create portfolio projects table
CREATE TABLE IF NOT EXISTS public.portfolio_projects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  budget_range TEXT,
  project_type TEXT,
  images TEXT[],
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on portfolio_projects
ALTER TABLE public.portfolio_projects ENABLE ROW LEVEL SECURITY;

-- Create policies for portfolio_projects
CREATE POLICY "Users can view their own portfolio projects" 
ON public.portfolio_projects 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own portfolio projects" 
ON public.portfolio_projects 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own portfolio projects" 
ON public.portfolio_projects 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own portfolio projects" 
ON public.portfolio_projects 
FOR DELETE 
USING (auth.uid() = user_id);

-- Allow public read access for vendors' portfolio projects (for network page)
CREATE POLICY "Public can view vendor portfolio projects" 
ON public.portfolio_projects 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE profiles.id = portfolio_projects.user_id 
    AND profiles.user_type = 'vendor'
  )
);

-- Add public read policy for profiles (limited fields only)
CREATE POLICY "Public can view basic vendor profiles" 
ON public.profiles 
FOR SELECT 
USING (user_type = 'vendor');

-- Create trigger for portfolio_projects updated_at
CREATE TRIGGER update_portfolio_projects_updated_at
BEFORE UPDATE ON public.portfolio_projects
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();