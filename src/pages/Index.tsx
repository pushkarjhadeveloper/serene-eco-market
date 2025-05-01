
import Layout from "@/components/Layout";
import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import FeaturedProducts from "@/components/FeaturedProducts";
import Sustainability from "@/components/Sustainability";
import Testimonials from "@/components/Testimonials";
import Newsletter from "@/components/Newsletter";

const Index = () => {
  return (
    <Layout>
      <Hero />
      <Categories />
      <FeaturedProducts />
      <Sustainability />
      <Testimonials />
      <Newsletter />
    </Layout>
  );
};

export default Index;
