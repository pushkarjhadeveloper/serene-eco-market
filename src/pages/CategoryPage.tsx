
import { useParams } from "react-router-dom";
import Layout from "@/components/Layout";

const CategoryPage = () => {
  const { categoryName } = useParams<{ categoryName: string }>();
  
  // Convert categoryName from URL format to display format (e.g., "doors-windows" to "Doors & Windows")
  const formatCategoryName = (name: string) => {
    if (!name) return "";
    
    // Handle special case for doors-windows
    if (name === "doors-windows") return "Doors & Windows";
    
    return name
      .split("-")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const displayName = formatCategoryName(categoryName || "");

  return (
    <Layout>
      <div className="eco-container py-12">
        <div className="mb-8">
          <h1 className="font-serif text-4xl md:text-5xl font-medium text-eco-moss mb-4">
            {displayName}
          </h1>
          <div className="flex items-center text-eco-bark text-sm">
            <a href="/" className="hover:text-eco-moss">Home</a>
            <span className="mx-2">/</span>
            <span className="text-eco-moss">{displayName}</span>
          </div>
        </div>
        
        <div className="bg-eco-sand/10 rounded-lg p-8 text-center">
          <p className="text-eco-bark text-lg mb-4">
            We're currently curating our {displayName.toLowerCase()} collection.
          </p>
          <p className="text-eco-moss">
            Check back soon to explore our sustainable {displayName.toLowerCase()} options.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default CategoryPage;
