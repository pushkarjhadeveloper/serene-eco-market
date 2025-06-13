
import { useState } from "react";
import Layout from "@/components/Layout";
import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import FeaturedProducts from "@/components/FeaturedProducts";
import Sustainability from "@/components/Sustainability";
import Testimonials from "@/components/Testimonials";
import Newsletter from "@/components/Newsletter";
import SubscribeModal from "@/components/SubscribeModal";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [isSubscribeModalOpen, setIsSubscribeModalOpen] = useState(false);

  const openSubscribeModal = () => {
    setIsSubscribeModalOpen(true);
  };

  const closeSubscribeModal = () => {
    setIsSubscribeModalOpen(false);
  };

  return (
    <Layout>
      <Hero />
      <div className="eco-container my-8">
        <div className="bg-eco-sage/10 rounded-lg p-6 flex flex-col sm:flex-row items-center justify-between">
          <div className="mb-4 sm:mb-0">
            <h3 className="font-serif text-xl font-medium text-eco-moss">Get Personalized Design Ideas</h3>
            <p className="text-eco-bark">Subscribe to receive interior design recommendations tailored to your style.</p>
          </div>
          <Button onClick={openSubscribeModal} className="eco-button whitespace-nowrap">
            Subscribe Now
          </Button>
        </div>
      </div>
      <Categories />
      <FeaturedProducts />
      <Sustainability />
      <Testimonials />
      <Newsletter />
      <SubscribeModal isOpen={isSubscribeModalOpen} onClose={closeSubscribeModal} />
    </Layout>
  );
};

export default Index;
