
import { supabase } from "@/integrations/supabase/client";
import { lightingCategories, lightingProducts } from "@/data/lightingProducts";
import { flooringCategories, flooringProducts } from "@/data/flooringProducts";
import { doorsWindowsCategories, doorsWindowsProducts } from "@/data/doorsWindowsProducts";
import { kitchenCategories, kitchenProducts } from "@/data/kitchenProducts";
import { bathroomCategories, bathroomProducts } from "@/data/bathroomProducts";
import { decorCategories, decorProducts } from "@/data/decorProducts";
import { furnitureSubcategories, furnitureProducts } from "@/data/furnitureProducts";

// Map category name to path
const categoryMapping = {
  "Furniture": "furniture",
  "Lighting": "lighting",
  "Doors & Windows": "doors-windows",
  "Flooring": "flooring",
  "Kitchen": "kitchen",
  "Bathroom": "bathroom",
  "Decor": "decor",
};

// Helper function to generate path from name
const generatePathFromName = (name: string): string => {
  return name.toLowerCase().replace(/\s+&\s+/g, '-').replace(/\s+/g, '-');
};

export const migrateCategories = async () => {
  try {
    console.log("Starting category migration...");
    
    // Define main categories
    const mainCategories = [
      {
        name: "Furniture",
        path: "furniture",
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1216&auto=format&fit=crop",
        description: "Sustainable furniture made from eco-friendly materials"
      },
      {
        name: "Lighting",
        path: "lighting",
        image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?q=80&w=1170&auto=format&fit=crop",
        description: "Energy-efficient lighting solutions for your home"
      },
      {
        name: "Doors & Windows",
        path: "doors-windows",
        image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=1170&auto=format&fit=crop",
        description: "Sustainable doors and windows for better insulation"
      },
      {
        name: "Flooring",
        path: "flooring",
        image: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=500&auto=format",
        description: "Eco-friendly flooring options from sustainable sources"
      },
      {
        name: "Kitchen",
        path: "kitchen",
        image: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?q=80&w=1469&auto=format&fit=crop",
        description: "Sustainable kitchen solutions for eco-conscious cooking"
      },
      {
        name: "Bathroom",
        path: "bathroom",
        image: "https://images.unsplash.com/photo-1620626011761-996317b8d101?q=80&w=2069&auto=format&fit=crop",
        description: "Water-saving and eco-friendly bathroom fixtures"
      },
      {
        name: "Decor",
        path: "decor",
        image: "https://images.unsplash.com/photo-1534349762230-e0cadf78f5da?q=80&w=1170&auto=format&fit=crop",
        description: "Eco-friendly decor items for sustainable living"
      }
    ];

    // Insert main categories
    for (const category of mainCategories) {
      const { data, error } = await supabase
        .from('categories')
        .insert(category)
        .select()
        .single();

      if (error) {
        if (error.code === '23505') { // Unique violation
          console.log(`Category ${category.name} already exists.`);
        } else {
          console.error(`Error inserting category ${category.name}:`, error);
        }
      } else {
        console.log(`Inserted category: ${category.name}`);
      }
    }

    console.log("Category migration completed.");
  } catch (error) {
    console.error("Error during category migration:", error);
  }
};

export const migrateSubcategories = async () => {
  try {
    console.log("Starting subcategory migration...");

    // Get all categories
    const { data: categories, error: categoriesError } = await supabase
      .from('categories')
      .select('id, name, path');

    if (categoriesError) {
      throw categoriesError;
    }

    // Map of all subcategories
    const subcategoriesMap = {
      'furniture': furnitureSubcategories,
      'lighting': lightingCategories,
      'doors-windows': doorsWindowsCategories,
      'flooring': flooringCategories,
      'kitchen': kitchenCategories,
      'bathroom': bathroomCategories,
      'decor': decorCategories
    };

    // Insert subcategories for each category
    for (const category of categories) {
      const subcategories = subcategoriesMap[category.path as keyof typeof subcategoriesMap];
      
      if (subcategories) {
        for (const subcategory of subcategories) {
          const subcategoryData = {
            category_id: category.id,
            name: subcategory.name,
            path: subcategory.path,
            image: subcategory.image,
            description: subcategory.description
          };

          const { data, error } = await supabase
            .from('subcategories')
            .insert(subcategoryData)
            .select()
            .single();

          if (error) {
            if (error.code === '23505') { // Unique violation
              console.log(`Subcategory ${subcategory.name} in ${category.name} already exists.`);
            } else {
              console.error(`Error inserting subcategory ${subcategory.name}:`, error);
            }
          } else {
            console.log(`Inserted subcategory: ${subcategory.name} in ${category.name}`);
          }
        }
      }
    }

    console.log("Subcategory migration completed.");
  } catch (error) {
    console.error("Error during subcategory migration:", error);
  }
};

export const migrateProducts = async () => {
  try {
    console.log("Starting product migration...");

    // Get all subcategories
    const { data: subcategories, error: subcategoriesError } = await supabase
      .from('subcategories')
      .select('id, category_id, path');

    if (subcategoriesError) {
      throw subcategoriesError;
    }

    // Get category information for each subcategory
    const { data: categories, error: categoriesError } = await supabase
      .from('categories')
      .select('id, path');

    if (categoriesError) {
      throw categoriesError;
    }

    // Create a map of category path to id
    const categoryMap = categories.reduce((acc: Record<string, string>, category) => {
      acc[category.path] = category.id;
      return acc;
    }, {});

    // Map subcategory path to id, including the category path as a prefix
    const subcategoryMap = subcategories.reduce((acc: Record<string, {id: string, categoryId: string}>, subcategory) => {
      // Find the category path for this subcategory
      const categoryPath = Object.entries(categoryMap).find(([_, id]) => id === subcategory.category_id)?.[0];
      if (categoryPath) {
        acc[`${categoryPath}:${subcategory.path}`] = {
          id: subcategory.id,
          categoryId: subcategory.category_id
        };
      }
      return acc;
    }, {});

    // Map of all products
    const productsData = {
      'furniture': furnitureProducts,
      'lighting': lightingProducts,
      'doors-windows': doorsWindowsProducts,
      'flooring': flooringProducts,
      'kitchen': kitchenProducts,
      'bathroom': bathroomProducts,
      'decor': decorProducts
    };

    // Process each category
    for (const [categoryPath, products] of Object.entries(productsData)) {
      // Process each subcategory in this category
      for (const [subcategoryPath, productList] of Object.entries(products)) {
        const subcategoryKey = `${categoryPath}:${subcategoryPath}`;
        const subcategoryInfo = subcategoryMap[subcategoryKey];
        
        if (!subcategoryInfo) {
          console.log(`Subcategory not found for: ${subcategoryKey}`);
          continue;
        }

        // Insert each product
        for (const product of productList) {
          // Basic product data
          const productData = {
            subcategory_id: subcategoryInfo.id,
            name: product.name,
            description: product.description,
            price: product.price,
            material: product.material,
            delivery_time: product.deliveryTime,
            energy_rating: product.energyRating,
            bulb_type: product.bulbType
          };

          // Insert product
          const { data: insertedProduct, error: productError } = await supabase
            .from('products')
            .insert(productData)
            .select()
            .single();

          if (productError) {
            console.error(`Error inserting product ${product.name}:`, productError);
            continue;
          }

          console.log(`Inserted product: ${product.name}`);

          // Insert product images
          if (product.images && product.images.length > 0) {
            const imageInserts = product.images.map(imageUrl => ({
              product_id: insertedProduct.id,
              image_url: imageUrl
            }));

            const { error: imagesError } = await supabase
              .from('product_images')
              .insert(imageInserts);

            if (imagesError) {
              console.error(`Error inserting images for product ${product.name}:`, imagesError);
            }
          }

          // Insert product features if available
          if (product.features && product.features.length > 0) {
            const featureInserts = product.features.map(feature => ({
              product_id: insertedProduct.id,
              feature: feature
            }));

            const { error: featuresError } = await supabase
              .from('product_features')
              .insert(featureInserts);

            if (featuresError) {
              console.error(`Error inserting features for product ${product.name}:`, featuresError);
            }
          }
        }
      }
    }

    console.log("Product migration completed.");
  } catch (error) {
    console.error("Error during product migration:", error);
  }
};

export const migrateCatalogData = async () => {
  await migrateCategories();
  await migrateSubcategories();
  await migrateProducts();
  console.log("Full catalog data migration completed.");
};
