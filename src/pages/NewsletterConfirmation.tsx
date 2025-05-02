
import { useEffect } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";

const NewsletterConfirmation = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <div className="eco-container py-16 md:py-24 flex flex-col items-center justify-center min-h-[60vh]">
        <div className="bg-white rounded-lg shadow-sm border border-eco-sand/30 p-8 md:p-12 max-w-lg mx-auto text-center">
          <div className="w-16 h-16 rounded-full bg-eco-sage/20 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-8 w-8 text-eco-sage" />
          </div>
          
          <h1 className="font-serif text-3xl md:text-4xl font-medium text-eco-moss mb-4">
            Thank You for Subscribing!
          </h1>
          
          <p className="text-eco-bark mb-6">
            You've successfully subscribed to our newsletter. We're excited to share sustainable design tips and exclusive offers with you.
          </p>
          
          <div className="bg-eco-cream/30 p-4 rounded-lg mb-8">
            <p className="text-sm text-eco-bark">
              Keep an eye on your inbox for our welcome email with a special discount on your first purchase.
            </p>
          </div>
          
          <Button className="eco-button mx-auto" asChild>
            <Link to="/">Back to Homepage</Link>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default NewsletterConfirmation;
