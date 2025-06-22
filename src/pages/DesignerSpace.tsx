import React from 'react';
import Layout from '@/components/Layout';
import SplitText from '@/components/SplitText';
import SpotlightCard from '@/components/SpotlightCard';
import PortfolioCard from '@/components/PortfolioCard';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { Lightbulb, Users, Palette, LayoutDashboard } from 'lucide-react';

const features = [
  {
    title: "Sustainable Design Resources",
    description: "Access a curated library of eco-friendly materials, suppliers, and design guides to create sustainable spaces.",
    icon: Lightbulb,
  },
  {
    title: "Collaborative Projects",
    description: "Connect with other designers and eco-enthusiasts to collaborate on projects that make a positive impact.",
    icon: Users,
  },
  {
    title: "Inspiration Gallery",
    description: "Explore a diverse collection of sustainable interior designs to spark your creativity and innovation.",
    icon: Palette,
  },
];

const portfolios = [
  {
    name: "EcoChic Interiors",
    description: "A minimalist apartment using reclaimed wood and energy-efficient lighting.",
    imageUrl: "https://images.unsplash.com/photo-1618224482892-459f59f191ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    designer: "Jane Doe",
  },
  {
    name: "Green Living Spaces",
    description: "A family home designed with solar panels, rainwater harvesting, and a lush indoor garden.",
    imageUrl: "https://images.unsplash.com/photo-1560185893-a55cbc92ca39?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    designer: "Alex Johnson",
  },
  {
    name: "Urban Oasis Designs",
    description: "A rooftop garden and outdoor living space in the heart of the city, promoting biodiversity.",
    imageUrl: "https://images.unsplash.com/photo-1599420186946-7b6fb74991ee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    designer: "Emily White",
  },
];

const tools = [
  {
    title: "Material Database",
    description: "Explore a comprehensive database of sustainable materials with detailed information on sourcing, certifications, and environmental impact.",
    icon: LayoutDashboard,
    features: ["Eco-Labels", "Certifications", "Supplier Info"],
  },
  {
    title: "Carbon Footprint Calculator",
    description: "Estimate the carbon footprint of your design projects and identify opportunities to reduce environmental impact.",
    icon: LayoutDashboard,
    features: ["Energy Use", "Material Selection", "Waste Reduction"],
  },
];

const DesignerSpace = () => {

  return (
    <Layout>
      <div className="eco-container py-16 md:py-24">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="font-serif text-4xl md:text-6xl font-medium text-eco-moss mb-6">
            <SplitText text="Designer Space" />
          </h1>
          <p className="text-xl text-eco-bark max-w-3xl mx-auto">
            A collaborative platform where interior designers and eco-enthusiasts come together 
            to create sustainable, beautiful spaces that honor both aesthetics and our planet.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <SpotlightCard key={index} className="p-6 bg-white rounded-xl shadow-sm border border-eco-sand/20">
              <div className="w-12 h-12 bg-eco-sage/20 rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="h-6 w-6 text-eco-sage" />
              </div>
              <h3 className="font-serif text-xl font-medium text-eco-moss mb-3">{feature.title}</h3>
              <p className="text-eco-bark">{feature.description}</p>
            </SpotlightCard>
          ))}
        </div>

        {/* Community Section */}
        <div className="bg-eco-cream/30 rounded-2xl p-8 md:p-12 mb-16 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-medium text-eco-moss mb-6">
            Join Our Designer Community
          </h2>
          <p className="text-xl text-eco-bark mb-8 max-w-2xl mx-auto">
            Connect with like-minded designers, share your projects, and collaborate on sustainable design solutions.
          </p>
          <Button 
            className="eco-button text-lg px-8 py-4" 
            asChild
          >
            <Link to="/designer-community">Join Community</Link>
          </Button>
        </div>

        {/* Portfolio Showcase */}
        <div className="mb-16">
          <h2 className="font-serif text-3xl md:text-4xl font-medium text-eco-moss text-center mb-12">
            Featured Designer Portfolios
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolios.map((portfolio, index) => (
              <PortfolioCard key={index} {...portfolio} />
            ))}
          </div>
        </div>

        {/* Tools Section */}
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-eco-sand/20">
          <h2 className="font-serif text-3xl md:text-4xl font-medium text-eco-moss text-center mb-12">
            Designer Tools & Resources
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {tools.map((tool, index) => (
              <Card key={index} className="border-eco-sand/20">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-eco-sage/20 rounded-lg flex items-center justify-center">
                      <tool.icon className="h-5 w-5 text-eco-sage" />
                    </div>
                    <CardTitle className="text-eco-moss">{tool.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-eco-bark mb-4">
                    {tool.description}
                  </CardDescription>
                  <div className="flex flex-wrap gap-2">
                    {tool.features.map((feature, idx) => (
                      <Badge key={idx} variant="outline" className="border-eco-sage text-eco-sage">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DesignerSpace;
