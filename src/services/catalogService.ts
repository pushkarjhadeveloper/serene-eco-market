
import { supabase } from "@/integrations/supabase/client";

export interface Category {
  id: string;
  name: string;
  path: string;
  image: string;
  description: string;
}

export interface Subcategory {
  id: string;
  category_id: string;
  name: string;
  path: string;
  image: string;
  description: string;
}

export interface Product {
  id: string;
  subcategory_id: string;
  name: string;
  description: string;
  price: number;
  material?: string;
  delivery_time?: string;
  energy_rating?: string;
  bulb_type?: string;
  images: string[];
  features: string[];
}

export const getCategoriesWithSubcategories = async (): Promise<Category[]> => {
  try {
    // Fetch all categories
    const { data: categories, error: categoriesError } = await supabase
      .from('categories')
      .select('*')
      .order('name');

    if (categoriesError) throw categoriesError;

    // Return empty array if no categories found
    if (!categories || categories.length === 0) return [];

    return categories;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};

export const getSubcategoriesByCategory = async (categoryPath: string): Promise<Subcategory[]> => {
  try {
    // First get the category id
    const { data: category, error: categoryError } = await supabase
      .from('categories')
      .select('id')
      .eq('path', categoryPath)
      .single();

    if (categoryError) throw categoryError;

    // Fetch subcategories for this category
    const { data: subcategories, error: subcategoriesError } = await supabase
      .from('subcategories')
      .select('*')
      .eq('category_id', category.id)
      .order('name');

    if (subcategoriesError) throw subcategoriesError;

    return subcategories || [];
  } catch (error) {
    console.error(`Error fetching subcategories for category ${categoryPath}:`, error);
    return [];
  }
};

export const getProductsBySubcategory = async (categoryPath: string, subcategoryPath: string): Promise<Product[]> => {
  try {
    // First get the category
    const { data: category, error: categoryError } = await supabase
      .from('categories')
      .select('id')
      .eq('path', categoryPath)
      .single();

    if (categoryError) throw categoryError;

    // Then get the subcategory id
    const { data: subcategory, error: subcategoryError } = await supabase
      .from('subcategories')
      .select('id')
      .eq('category_id', category.id)
      .eq('path', subcategoryPath)
      .single();

    if (subcategoryError) throw subcategoryError;

    // Fetch products for this subcategory
    const { data: productsBasic, error: productsError } = await supabase
      .from('products')
      .select('*')
      .eq('subcategory_id', subcategory.id);

    if (productsError) throw productsError;

    if (!productsBasic || productsBasic.length === 0) return [];

    // For each product, fetch its images and features
    const productsWithDetails = await Promise.all(productsBasic.map(async (product) => {
      // Fetch images
      const { data: images, error: imagesError } = await supabase
        .from('product_images')
        .select('image_url')
        .eq('product_id', product.id);

      if (imagesError) throw imagesError;

      // Fetch features
      const { data: features, error: featuresError } = await supabase
        .from('product_features')
        .select('feature')
        .eq('product_id', product.id);

      if (featuresError) throw featuresError;

      return {
        ...product,
        images: images ? images.map(img => img.image_url) : [],
        features: features ? features.map(feat => feat.feature) : []
      };
    }));

    return productsWithDetails;
  } catch (error) {
    console.error(`Error fetching products for subcategory ${subcategoryPath}:`, error);
    return [];
  }
};

export const getProductById = async (productId: string): Promise<Product | null> => {
  try {
    // Fetch the basic product data
    const { data: product, error: productError } = await supabase
      .from('products')
      .select('*')
      .eq('id', productId)
      .single();

    if (productError) throw productError;

    // Fetch images
    const { data: images, error: imagesError } = await supabase
      .from('product_images')
      .select('image_url')
      .eq('product_id', productId);

    if (imagesError) throw imagesError;

    // Fetch features
    const { data: features, error: featuresError } = await supabase
      .from('product_features')
      .select('feature')
      .eq('product_id', productId);

    if (featuresError) throw featuresError;

    return {
      ...product,
      images: images ? images.map(img => img.image_url) : [],
      features: features ? features.map(feat => feat.feature) : []
    };
  } catch (error) {
    console.error(`Error fetching product ${productId}:`, error);
    return null;
  }
};
