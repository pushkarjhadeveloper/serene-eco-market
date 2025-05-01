
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <Layout>
      <div className="eco-container py-24 text-center">
        <h1 className="font-serif text-5xl md:text-7xl font-medium text-eco-moss mb-4">404</h1>
        <p className="text-xl text-eco-bark mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Button className="eco-button" asChild>
          <a href="/">Return to Home</a>
        </Button>
      </div>
    </Layout>
  );
};

export default NotFound;
