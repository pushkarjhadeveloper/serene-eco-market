
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
