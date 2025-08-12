-- Create role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

-- Create user roles table
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL DEFAULT 'user',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check user roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Create function to check if user is admin
CREATE OR REPLACE FUNCTION public.is_admin(_user_id UUID)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
AS $$
  SELECT public.has_role(_user_id, 'admin')
$$;

-- Drop existing permissive policies and create secure ones
-- Categories policies
DROP POLICY IF EXISTS "Allow authenticated users to delete categories" ON public.categories;
DROP POLICY IF EXISTS "Allow authenticated users to insert categories" ON public.categories;
DROP POLICY IF EXISTS "Allow authenticated users to update categories" ON public.categories;

CREATE POLICY "Admin users can delete categories" ON public.categories
FOR DELETE USING (public.is_admin(auth.uid()));

CREATE POLICY "Admin users can insert categories" ON public.categories
FOR INSERT WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "Admin users can update categories" ON public.categories
FOR UPDATE USING (public.is_admin(auth.uid()));

-- Subcategories policies
DROP POLICY IF EXISTS "Allow authenticated users to delete subcategories" ON public.subcategories;
DROP POLICY IF EXISTS "Allow authenticated users to insert subcategories" ON public.subcategories;
DROP POLICY IF EXISTS "Allow authenticated users to update subcategories" ON public.subcategories;

CREATE POLICY "Admin users can delete subcategories" ON public.subcategories
FOR DELETE USING (public.is_admin(auth.uid()));

CREATE POLICY "Admin users can insert subcategories" ON public.subcategories
FOR INSERT WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "Admin users can update subcategories" ON public.subcategories
FOR UPDATE USING (public.is_admin(auth.uid()));

-- Products policies
DROP POLICY IF EXISTS "Allow authenticated users to delete products" ON public.products;
DROP POLICY IF EXISTS "Allow authenticated users to insert products" ON public.products;
DROP POLICY IF EXISTS "Allow authenticated users to update products" ON public.products;

CREATE POLICY "Admin users can delete products" ON public.products
FOR DELETE USING (public.is_admin(auth.uid()));

CREATE POLICY "Admin users can insert products" ON public.products
FOR INSERT WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "Admin users can update products" ON public.products
FOR UPDATE USING (public.is_admin(auth.uid()));

-- Product features policies
DROP POLICY IF EXISTS "Allow authenticated users to delete product features" ON public.product_features;
DROP POLICY IF EXISTS "Allow authenticated users to insert product features" ON public.product_features;
DROP POLICY IF EXISTS "Allow authenticated users to update product features" ON public.product_features;

CREATE POLICY "Admin users can delete product features" ON public.product_features
FOR DELETE USING (public.is_admin(auth.uid()));

CREATE POLICY "Admin users can insert product features" ON public.product_features
FOR INSERT WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "Admin users can update product features" ON public.product_features
FOR UPDATE USING (public.is_admin(auth.uid()));

-- Product images policies
DROP POLICY IF EXISTS "Allow authenticated users to delete product images" ON public.product_images;
DROP POLICY IF EXISTS "Allow authenticated users to insert product images" ON public.product_images;
DROP POLICY IF EXISTS "Allow authenticated users to update product images" ON public.product_images;

CREATE POLICY "Admin users can delete product images" ON public.product_images
FOR DELETE USING (public.is_admin(auth.uid()));

CREATE POLICY "Admin users can insert product images" ON public.product_images
FOR INSERT WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "Admin users can update product images" ON public.product_images
FOR UPDATE USING (public.is_admin(auth.uid()));

-- User roles policies - users can only view their own roles
CREATE POLICY "Users can view their own roles" ON public.user_roles
FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Admin users can manage all roles" ON public.user_roles
FOR ALL USING (public.is_admin(auth.uid()));

-- Insert default admin role for existing users (optional - you can manually assign roles)
-- This creates an admin role for the first user - remove this if not needed
-- INSERT INTO public.user_roles (user_id, role) 
-- SELECT id, 'admin' FROM auth.users LIMIT 1
-- ON CONFLICT (user_id, role) DO NOTHING;