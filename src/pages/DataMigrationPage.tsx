
import { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { migrateCatalogData, migrateCategories, migrateSubcategories, migrateProducts } from "@/utils/dataMigration";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";

const DataMigrationPage = () => {
  const { user } = useAuth();
  const [status, setStatus] = useState<{
    message: string;
    loading: boolean;
    error?: string;
  }>({
    message: "Ready to migrate data",
    loading: false
  });

  // Ensure only authenticated users can access this page
  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  const handleMigration = async (type: "all" | "categories" | "subcategories" | "products") => {
    try {
      setStatus({ message: `Starting ${type} migration...`, loading: true });
      
      switch (type) {
        case "all":
          await migrateCatalogData();
          break;
        case "categories":
          await migrateCategories();
          break;
        case "subcategories":
          await migrateSubcategories();
          break;
        case "products":
          await migrateProducts();
          break;
      }
      
      setStatus({ message: `${type.charAt(0).toUpperCase() + type.slice(1)} migration completed successfully!`, loading: false });
    } catch (error: any) {
      console.error(`Error during ${type} migration:`, error);
      setStatus({ 
        message: `Error during ${type} migration`, 
        loading: false, 
        error: error?.message || "An unknown error occurred"
      });
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 sm:px-6 md:px-8 py-6 sm:py-8 md:py-12">
        <div className="max-w-3xl mx-auto bg-white p-6 sm:p-8 rounded-lg shadow-sm border border-eco-sand/30">
          <h1 className="font-serif text-2xl sm:text-3xl font-medium text-eco-moss mb-4 sm:mb-6">
            Product Catalog Data Migration
          </h1>
          
          <p className="text-eco-bark mb-6 sm:mb-8 text-sm sm:text-base">
            This utility will migrate your product catalog data from static files to the Supabase database.
            Choose which parts of the data you want to migrate:
          </p>
          
          {status.error && (
            <Alert variant="destructive" className="mb-4 sm:mb-6">
              <AlertTitle>Migration Error</AlertTitle>
              <AlertDescription className="text-sm">{status.error}</AlertDescription>
            </Alert>
          )}
          
          {!status.error && status.message && (
            <Alert className="mb-4 sm:mb-6">
              <AlertTitle>Status</AlertTitle>
              <AlertDescription className="flex items-center text-sm">
                {status.loading && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
                {status.message}
              </AlertDescription>
            </Alert>
          )}
          
          <div className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <Button 
                onClick={() => handleMigration("categories")}
                disabled={status.loading}
                className="eco-button w-full text-sm sm:text-base"
              >
                Migrate Categories
              </Button>
              
              <Button 
                onClick={() => handleMigration("subcategories")}
                disabled={status.loading}
                className="eco-button w-full text-sm sm:text-base"
              >
                Migrate Subcategories
              </Button>
              
              <Button 
                onClick={() => handleMigration("products")}
                disabled={status.loading}
                className="eco-button w-full sm:col-span-2 text-sm sm:text-base"
              >
                Migrate Products
              </Button>
            </div>
            
            <div className="pt-4 border-t border-eco-sand/20">
              <Button 
                onClick={() => handleMigration("all")}
                disabled={status.loading}
                className="eco-button w-full text-sm sm:text-base py-3 sm:py-4"
                size="lg"
              >
                {status.loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Migrating...
                  </>
                ) : "Migrate All Data"}
              </Button>
            </div>
          </div>
          
          <div className="mt-6 sm:mt-8 text-xs sm:text-sm text-eco-bark/70 space-y-2">
            <p>Note: This process might take some time depending on the amount of data.</p>
            <p>Already existing data with the same identifiers will be skipped to avoid duplicates.</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DataMigrationPage;
