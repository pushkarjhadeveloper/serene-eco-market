
import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  const openSubscribeModal = () => {
    setIsSubscribeModalOpen(true);
  };

  const closeSubscribeModal = () => {
    setIsSubscribeModalOpen(false);
  };

  const handleShopCollection = () => {
    navigate('/themes');
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
          <div className="flex flex-col sm:flex-row gap-3">
            <Button onClick={openSubscribeModal} className="eco-button whitespace-nowrap">
              Subscribe Now
            </Button>
            <Button onClick={handleShopCollection} variant="outline" className="whitespace-nowrap border-eco-sage text-eco-moss hover:bg-eco-sage/10">
              Shop Collection
            </Button>
          </div>
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
