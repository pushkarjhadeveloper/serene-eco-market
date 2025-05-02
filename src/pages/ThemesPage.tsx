
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const ThemesPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [hoveredTheme, setHoveredTheme] = useState<string | null>(null);

  const handleThemeSelect = (theme: string) => {
    toast({
      title: "Theme Selected",
      description: `You selected the ${theme} theme. Products are being filtered.`,
    });
    // In a real app, this would navigate to a filtered product page
    navigate(`/category/furniture?theme=${theme.toLowerCase().replace(' ', '-')}`);
  };

  const themes = [
    {
      id: "earthy-tones",
      name: "Earthy Tones",
      description: "Traditional designs inspired by Rajasthani palaces and South Indian architecture, featuring warm beige, soft browns, terracotta, and muted olive green for a grounding, natural atmosphere.",
      bgImage: "https://images.unsplash.com/photo-1602872030490-4a484a7b3ba6?w=500&auto=format",
      textColor: "text-eco-cream"
    },
    {
      id: "scandinavian-minimalism",
      name: "Scandinavian Minimalism",
      description: "Modern minimalist designs with purpose and meaning, featuring cool whites, light greys, dusty blues, and soft blush for a clean, airy aesthetic.",
      bgImage: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=500&auto=format",
      textColor: "text-eco-bark"
    },
    {
      id: "luxury-neutrals",
      name: "Luxury Neutrals",
      description: "The epitome of luxury with premium materials and elegant designs, featuring charcoal, ivory, champagne gold, and soft greige for sophisticated elegance.",
      bgImage: "https://images.unsplash.com/photo-1618220179428-22790b461013?w=500&auto=format",
      textColor: "text-eco-cream"
    }
  ];

  return (
    <Layout>
      <div className="min-h-[calc(100vh-64px)]">
        <div className="flex flex-col md:flex-row h-full">
          {themes.map((theme) => (
            <div 
              key={theme.id}
              className="flex-1 relative overflow-hidden transition-all duration-500 ease-in-out group"
              onMouseEnter={() => setHoveredTheme(theme.id)}
              onMouseLeave={() => setHoveredTheme(null)}
              onClick={() => handleThemeSelect(theme.name)}
            >
              <div 
                className="h-[40vh] md:h-screen bg-cover bg-center transition-all duration-700 ease-in-out group-hover:scale-105 cursor-pointer"
                style={{ backgroundImage: `url(${theme.bgImage})` }}
              >
                <div className="absolute inset-0 bg-black bg-opacity-40 transition-opacity duration-500 group-hover:bg-opacity-20"></div>
                
                <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-8">
                  <h2 className={`font-serif text-3xl md:text-5xl mb-3 ${theme.textColor}`}>{theme.name}</h2>
                  
                  <div className={`overflow-hidden transition-all duration-500 ease-in-out ${hoveredTheme === theme.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <p className={`${theme.textColor} mb-6 max-w-md`}>
                      {theme.description}
                    </p>
                    
                    <Button className="eco-button">
                      Explore {theme.name}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ThemesPage;
