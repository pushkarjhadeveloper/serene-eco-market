
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
    // Navigate to furniture category with theme filter
    navigate(`/category/furniture?theme=${theme.toLowerCase().replace(/\s+/g, '-')}`);
  };

  const indianThemes = [
    {
      id: "rajasthan-royalty",
      name: "Rajasthan Royalty",
      description: "Ornate jharokhas, palace arches, block-printed curtains, gold/maroon decor with jewel tones – sapphire blue, ruby red, gold, ivory. Features mirror work, carved furniture, and camel motifs.",
      bgImage: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800&auto=format",
      textColor: "text-eco-cream"
    },
    {
      id: "kerala-serenity",
      name: "Kerala Serenity",
      description: "Open courtyards, Nilavilakku lamps, banana leaves, teak wood in ivory, forest green, rich brown, muted gold palette. Inspired by Kathakali masks and backwater imagery.",
      bgImage: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=800&auto=format",
      textColor: "text-eco-cream"
    },
    {
      id: "goan-colonial",
      name: "Goan Colonial",
      description: "Colorful Portuguese tiles, arched doorways, terrazzo floors in ocean blue, white, sea green, mustard palette. Features vintage clocks, rattan furniture, stained glass.",
      bgImage: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=800&auto=format",
      textColor: "text-eco-bark"
    },
    {
      id: "kashmiri-craft",
      name: "Kashmiri Craft",
      description: "Walnut carved panels, pashmina throws, Namda rugs in deep reds, icy blue, ivory, charcoal. Inspired by Chinar leaves and floral papier-mâché art.",
      bgImage: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&auto=format",
      textColor: "text-eco-bark"
    },
    {
      id: "gujarati-vibrance",
      name: "Gujarati Vibrance",
      description: "Embroidered cushions, mirror wall hangings, low seating in bright pinks, oranges, turquoise, silver. Features Bandhani, Kutchi motifs, and torans.",
      bgImage: "https://images.unsplash.com/photo-1602872030490-4a484a7b3ba6?w=800&auto=format",
      textColor: "text-eco-cream"
    },
    {
      id: "tamil-temple-essence",
      name: "Tamil Temple Essence",
      description: "Bronze idols, Tanjore paintings, Athangudi tiles in burnt sienna, deep green, gold, rust. Features temple bells, stone columns, and traditional pillars.",
      bgImage: "https://images.unsplash.com/photo-1466442929976-97f336a657be?w=800&auto=format",
      textColor: "text-eco-cream"
    },
    {
      id: "northeast-tribal-chic",
      name: "Northeast Tribal Chic",
      description: "Cane walls, handwoven fabrics, tribal masks in monochrome, terracotta, black, indigo. Features bamboo crafts and eco-conscious materials.",
      bgImage: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=800&auto=format",
      textColor: "text-eco-cream"
    },
    {
      id: "punjab-farmhouse-style",
      name: "Punjab Farmhouse Style",
      description: "Phulkari wall art, brass pitchers, sturdy wooden beds in warm yellow, fuchsia, earthy browns, indigo. Features harvest tools and woven charpais.",
      bgImage: "https://images.unsplash.com/photo-1602028915047-37269d1a73f7?w=800&auto=format",
      textColor: "text-eco-cream"
    },
    {
      id: "maharashtra-wada-living",
      name: "Maharashtra Wada Living",
      description: "Stone flooring, wood swings (jhoola), Paithani decor in slate grey, turmeric, aubergine, copper. Features courtyard fountains and Marathi calligraphy.",
      bgImage: "https://images.unsplash.com/photo-1618220179428-22790b461013?w=800&auto=format",
      textColor: "text-eco-cream"
    },
    {
      id: "bengal-renaissance",
      name: "Bengal Renaissance",
      description: "Colonial wood furniture, Jamdani drapes, terracotta tiles in ivory, olive green, rosewood, burnt orange. Features bookshelves and antique gramophones.",
      bgImage: "https://images.unsplash.com/photo-1473177104440-ffee2f376098?w=800&auto=format",
      textColor: "text-eco-bark"
    }
  ];

  const globalThemes = [
    {
      id: "earthy-tones",
      name: "Earthy Tones",
      description: "Traditional designs inspired by Rajasthani palaces and South Indian architecture, featuring warm beige, soft browns, terracotta, and muted olive green for a grounding, natural atmosphere.",
      bgImage: "https://images.unsplash.com/photo-1602872030490-4a484a7b3ba6?w=800&auto=format",
      textColor: "text-eco-cream"
    },
    {
      id: "scandinavian-minimalism",
      name: "Scandinavian Minimalism",
      description: "Modern minimalist designs with purpose and meaning, featuring cool whites, light greys, dusty blues, and soft blush for a clean, airy aesthetic.",
      bgImage: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&auto=format",
      textColor: "text-eco-bark"
    },
    {
      id: "luxury-neutrals",
      name: "Luxury Neutrals",
      description: "The epitome of luxury with premium materials and elegant designs, featuring charcoal, ivory, champagne gold, and soft greige for sophisticated elegance.",
      bgImage: "https://images.unsplash.com/photo-1618220179428-22790b461013?w=800&auto=format",
      textColor: "text-eco-cream"
    },
    {
      id: "japandi-minimalism",
      name: "Japandi Minimalism",
      description: "Shoji screens, neutral palettes, functional decor in soft beige, ash wood, black, stone grey. Inspired by Zen gardens, linen textures, and indoor bonsai.",
      bgImage: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&auto=format",
      textColor: "text-eco-bark"
    }
  ];

  return (
    <Layout>
      <div className="min-h-[calc(100vh-64px)]">
        {/* Header Section */}
        <div className="eco-container py-8 md:py-12">
          <h1 className="section-title text-center mb-4">Shop Collection Themes</h1>
          <p className="text-eco-bark text-center mx-auto max-w-3xl mb-8">
            Discover our curated collection of design themes inspired by India's rich cultural heritage and global aesthetics. 
            Each theme brings together authentic materials, traditional crafts, and sustainable practices.
          </p>
        </div>

        {/* Indian Themes Section */}
        <div className="eco-container py-8">
          <h2 className="font-serif text-2xl md:text-3xl font-medium text-eco-moss mb-6 text-center">
            🇮🇳 Indian Heritage Themes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {indianThemes.map((theme) => (
              <div 
                key={theme.id}
                className="eco-card overflow-hidden group cursor-pointer"
                onMouseEnter={() => setHoveredTheme(theme.id)}
                onMouseLeave={() => setHoveredTheme(null)}
                onClick={() => handleThemeSelect(theme.name)}
              >
                <div className="aspect-[4/3] relative overflow-hidden">
                  <img 
                    src={theme.bgImage} 
                    alt={theme.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20 group-hover:from-black/60 transition-all duration-300"></div>
                  
                  <div className="absolute inset-0 p-4 flex flex-col justify-end">
                    <h3 className={`font-serif text-xl md:text-2xl font-medium mb-2 ${theme.textColor}`}>
                      {theme.name}
                    </h3>
                    
                    <div className={`overflow-hidden transition-all duration-300 ${
                      hoveredTheme === theme.id ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                    }`}>
                      <p className={`${theme.textColor} text-sm mb-3 line-clamp-3`}>
                        {theme.description}
                      </p>
                      
                      <Button className="eco-button text-sm">
                        Explore {theme.name}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Global Themes Section */}
        <div className="eco-container py-8">
          <h2 className="font-serif text-2xl md:text-3xl font-medium text-eco-moss mb-6 text-center">
            🌍 Global Inspirations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {globalThemes.map((theme) => (
              <div 
                key={theme.id}
                className="eco-card overflow-hidden group cursor-pointer"
                onMouseEnter={() => setHoveredTheme(theme.id)}
                onMouseLeave={() => setHoveredTheme(null)}
                onClick={() => handleThemeSelect(theme.name)}
              >
                <div className="aspect-square relative overflow-hidden">
                  <img 
                    src={theme.bgImage} 
                    alt={theme.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20 group-hover:from-black/60 transition-all duration-300"></div>
                  
                  <div className="absolute inset-0 p-4 flex flex-col justify-end">
                    <h3 className={`font-serif text-lg md:text-xl font-medium mb-2 ${theme.textColor}`}>
                      {theme.name}
                    </h3>
                    
                    <div className={`overflow-hidden transition-all duration-300 ${
                      hoveredTheme === theme.id ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'
                    }`}>
                      <p className={`${theme.textColor} text-sm mb-3 line-clamp-2`}>
                        {theme.description}
                      </p>
                      
                      <Button className="eco-button text-sm">
                        Explore Collection
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ThemesPage;
