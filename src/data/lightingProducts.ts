
export type LightingProduct = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  subcategory: string;
  material?: string;
  deliveryTime?: string;
  features?: string[];
  energyRating?: string;
  bulbType?: string;
  images: string[];
};

// Helper function to generate unique IDs
const generateId = (category: string, index: number): string => {
  return `light-${category.toLowerCase().replace(/\s+/g, '-')}-${index + 1}`;
};

// Create products for each lighting subcategory
export const lightingProducts: Record<string, LightingProduct[]> = {
  // Lamps
  "lamps": Array(15).fill(null).map((_, index) => ({
    id: generateId("lamps", index),
    name: [
      "Bamboo Table Lamp", 
      "Recycled Glass Desk Lamp", 
      "Hemp Shade Floor Lamp",
      "Ceramic Handcrafted Lamp",
      "Reclaimed Wood Lamp",
      "Eco-Hemp Bedside Lamp",
      "Sustainable Cane Lamp",
      "Biodegradable Paper Lamp",
      "Upcycled Metal Lamp",
      "Organic Cotton Lamp",
      "Cork Base Lamp",
      "Jute Hanging Lamp",
      "Stone Base Table Lamp",
      "Banana Fiber Shade Lamp",
      "Recycled Brass Lamp"
    ][index],
    description: "Handcrafted sustainable lamp made with eco-friendly materials. Energy-efficient and beautiful addition to any space.",
    price: 2500 + (index * 500),
    image: `https://images.unsplash.com/photo-${1550000000 + index * 10000}?w=500&auto=format`,
    category: "lighting",
    subcategory: "lamps",
    material: "Sustainable materials, recycled components",
    deliveryTime: "1-2 weeks",
    energyRating: "A++",
    bulbType: "LED compatible",
    images: [
      `https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=500&auto=format`,
      `https://images.unsplash.com/photo-1540932239986-30128078f3c5?w=500&auto=format`,
      `https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=500&auto=format`
    ]
  })),

  // Decorative lighting
  "decorative-lighting": Array(15).fill(null).map((_, index) => ({
    id: generateId("decorative", index),
    name: [
      "Constellation String Lights", 
      "Macramé Pendant Light", 
      "Himalayan Salt Lamp",
      "Bamboo Lantern Set",
      "Recycled Glass Chandelier",
      "Paper Origami Lights",
      "Copper Wire Fairy Lights",
      "Woven Rattan Pendant",
      "Handblown Glass Globe Light",
      "Wooden Geometric Lamp",
      "Crystal Salt Night Light",
      "Recycled Bottle Pendant",
      "Driftwood Hanging Light",
      "Plant Fiber Light Sculpture",
      "Cork Ball String Lights"
    ][index],
    description: "Beautiful decorative lighting made from sustainable materials. Perfect for creating ambiance in any room.",
    price: 1800 + (index * 400),
    image: `https://images.unsplash.com/photo-${1560000000 + index * 10000}?w=500&auto=format`,
    category: "lighting",
    subcategory: "decorative-lighting",
    material: "Eco-friendly materials, sustainable components",
    deliveryTime: "1-2 weeks",
    images: [
      `https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=500&auto=format`,
      `https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=500&auto=format`,
      `https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=500&auto=format`
    ]
  })),

  // Outdoor lighting
  "outdoor-lighting": Array(15).fill(null).map((_, index) => ({
    id: generateId("outdoor", index),
    name: [
      "Solar Garden Lights", 
      "Bamboo Torch Lamps", 
      "Recycled Metal Lanterns",
      "Stone Path Lights",
      "Sustainable Wooden Post Lights",
      "Solar-Powered String Lights",
      "Motion Sensor Eco Lights",
      "Biodegradable Floating Lights",
      "Recycled Glass Wall Sconces",
      "Bamboo Enclosed Patio Lights",
      "Hemp Rope Hanging Lanterns",
      "Reclaimed Wood Deck Lights",
      "Coconut Shell Garden Lights",
      "Terracotta Wall Washers",
      "Solar Ceramic Spotlights"
    ][index],
    description: "Weather-resistant outdoor lighting solutions powered by solar energy. Illuminate your outdoor spaces sustainably.",
    price: 3200 + (index * 600),
    image: `https://images.unsplash.com/photo-${1570000000 + index * 10000}?w=500&auto=format`,
    category: "lighting",
    subcategory: "outdoor-lighting",
    material: "Weather-resistant eco materials, solar components",
    deliveryTime: "2-3 weeks",
    energyRating: "A++",
    images: [
      `https://images.unsplash.com/photo-1500673922987-e212871fec22?w=500&auto=format`,
      `https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&auto=format`,
      `https://images.unsplash.com/photo-1500673922987-e212871fec22?w=500&auto=format`
    ]
  })),

  // Smart lighting
  "smart-lighting": Array(15).fill(null).map((_, index) => ({
    id: generateId("smart", index),
    name: [
      "Smart LED Bulb Set", 
      "Eco Voice Control Lights", 
      "Sustainable Smart Strip",
      "App-Controlled Pendant Light",
      "Bamboo Smart Table Lamp",
      "Recycled Plastic Smart Ceiling Light",
      "Eco-Friendly Motion Sensor Light",
      "Energy-Efficient Smart Downlight",
      "Sustainable Wood Smart Floor Lamp",
      "Low-Energy Smart Spotlight",
      "Hemp Shade Smart Lamp",
      "Biodegradable Smart Nightlight",
      "Cork Base Smart Light",
      "Recycled Metal Smart Sconce",
      "Jute Fiber Smart Pendant"
    ][index],
    description: "Energy-efficient smart lighting solutions with app and voice control. Reduce your carbon footprint while enhancing convenience.",
    price: 4500 + (index * 800),
    image: `https://images.unsplash.com/photo-${1580000000 + index * 10000}?w=500&auto=format`,
    category: "lighting",
    subcategory: "smart-lighting",
    material: "Eco-friendly materials with sustainable electronics",
    deliveryTime: "1-2 weeks",
    energyRating: "A+++",
    features: ["Voice control", "App integration", "Energy monitoring"],
    images: [
      `https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&auto=format`,
      `https://images.unsplash.com/photo-1550254478-ead40cc54513?w=500&auto=format`,
      `https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&auto=format`
    ]
  })),

  // Integrated lighting
  "integrated-lighting": Array(15).fill(null).map((_, index) => ({
    id: generateId("integrated", index),
    name: [
      "Built-in LED Bookshelf", 
      "Furniture with Integrated Lights", 
      "Eco Cabinet Lighting System",
      "Sustainable Stair Lighting",
      "Bamboo Wardrobe Light Kit",
      "Under-Cabinet Light Strip",
      "Recessed Shelf Lighting",
      "Eco-Friendly Drawer Lights",
      "Mirror with Integrated Lighting",
      "Sustainable Picture Light System",
      "Recycled Material Light Panel",
      "Energy-Efficient Display Lighting",
      "Eco Closet Lighting Solution",
      "Bamboo Kitchen Unit Lights",
      "Low-Energy Media Console Lighting"
    ][index],
    description: "Integrated lighting solutions designed to blend seamlessly with your furniture and architecture. Energy-efficient and sustainable.",
    price: 5800 + (index * 1200),
    image: `https://images.unsplash.com/photo-${1590000000 + index * 10000}?w=500&auto=format`,
    category: "lighting",
    subcategory: "integrated-lighting",
    material: "Sustainable materials with eco-efficient LEDs",
    deliveryTime: "2-4 weeks",
    energyRating: "A+++",
    features: ["Custom installation", "Long-life LEDs", "Minimal maintenance"],
    images: [
      `https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=500&auto=format`,
      `https://images.unsplash.com/photo-1540932239986-30128078f3c5?w=500&auto=format`,
      `https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=500&auto=format`
    ]
  })),

  // Bathroom lighting
  "bathroom-lighting": Array(15).fill(null).map((_, index) => ({
    id: generateId("bathroom", index),
    name: [
      "Water-Resistant LED Mirror", 
      "Sustainable Shower Light", 
      "Bamboo Bathroom Sconce",
      "Eco-Friendly Vanity Light",
      "Recycled Glass Bathroom Pendant",
      "Water-Saving Light Timer",
      "Humidity-Resistant Wall Light",
      "Low-Energy Ceiling Spotlight",
      "Natural Material Bathroom Chandelier",
      "Sustainable Tub Lighting",
      "Cork & Glass Wall Fixture",
      "Hemp Shade Bathroom Light",
      "Reclaimed Wood Vanity Lighting",
      "Eco-Safe Shower Recessed Lights",
      "Plant-Based Fixture Coating Light"
    ][index],
    description: "Water-resistant and humidity-proof lighting solutions for bathrooms. Made with sustainable materials and energy-efficient technology.",
    price: 3900 + (index * 700),
    image: `https://images.unsplash.com/photo-${1600000000 + index * 10000}?w=500&auto=format`,
    category: "lighting",
    subcategory: "bathroom-lighting",
    material: "Water-resistant sustainable materials",
    deliveryTime: "1-2 weeks",
    energyRating: "A++",
    features: ["Water-resistant", "Anti-fog", "Long-life"],
    images: [
      `https://images.unsplash.com/photo-1584145951017-d9f047e8420c?w=500&auto=format`,
      `https://images.unsplash.com/photo-1505693314053-e3e1626c98e6?w=500&auto=format`,
      `https://images.unsplash.com/photo-1584145951017-d9f047e8420c?w=500&auto=format`
    ]
  })),

  // Kitchen lighting
  "kitchen-lighting": Array(15).fill(null).map((_, index) => ({
    id: generateId("kitchen", index),
    name: [
      "Under-Cabinet LED Strip", 
      "Pendant Light for Island", 
      "Sustainable Track Lighting",
      "Bamboo Kitchen Chandelier",
      "Recycled Glass Sink Light",
      "Energy-Efficient Pantry Light",
      "Motion-Sensor Cabinet Light",
      "Eco-Friendly Range Hood Light",
      "Hemp Rope Pendant Set",
      "Reclaimed Wood Ceiling Light",
      "Recycled Metal Track System",
      "Sustainable Countertop Lighting",
      "Low-Energy Breakfast Bar Lights",
      "Natural Material Pot Rack with Lights",
      "Biodegradable Shade Pendant"
    ][index],
    description: "Functional and beautiful kitchen lighting solutions made from sustainable materials. Designed for optimal task lighting and ambiance.",
    price: 4200 + (index * 750),
    image: `https://images.unsplash.com/photo-${1610000000 + index * 10000}?w=500&auto=format`,
    category: "lighting",
    subcategory: "kitchen-lighting",
    material: "Food-safe sustainable materials",
    deliveryTime: "2-3 weeks",
    energyRating: "A++",
    features: ["Heat-resistant", "Easy to clean", "Durable"],
    images: [
      `https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=500&auto=format`,
      `https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=500&auto=format`,
      `https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=500&auto=format`
    ]
  })),

  // LED Bulbs
  "led-bulbs": Array(15).fill(null).map((_, index) => ({
    id: generateId("led", index),
    name: [
      "Eco-Friendly LED Bulb Pack", 
      "Sustainable Smart Bulb", 
      "Low Energy Consumption Bulb",
      "Recyclable LED Globe Bulb",
      "Long-Life Edison Style LED",
      "Biodegradable Base LED Bulb",
      "Energy-Saving Candle Bulb",
      "Eco-Manufactured Spotlight Bulb",
      "Plant-Based Component Bulb",
      "Carbon-Neutral Floodlight Bulb",
      "Sustainable Filament LED",
      "Recycled Content GU10 LED",
      "Low-Mercury LED Tube",
      "Eco-Certified Corn Bulb",
      "Minimal Waste Packaging Bulb Set"
    ][index],
    description: "Energy-efficient LED bulbs made with sustainable materials and manufacturing processes. Long-lasting and eco-friendly lighting solutions.",
    price: 800 + (index * 150),
    image: `https://images.unsplash.com/photo-${1620000000 + index * 10000}?w=500&auto=format`,
    category: "lighting",
    subcategory: "led-bulbs",
    material: "Recyclable components, minimal waste",
    deliveryTime: "3-5 days",
    energyRating: "A+++",
    bulbType: "LED",
    features: ["25,000+ hours life", "Low energy consumption", "Recyclable"],
    images: [
      `https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&auto=format`,
      `https://images.unsplash.com/photo-1550254478-ead40cc54513?w=500&auto=format`,
      `https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&auto=format`
    ]
  }))
};

export const allLightingProducts = Object.values(lightingProducts).flat();

// Categories data for navigation
export const lightingCategories = [
  { 
    name: "Lamps", 
    path: "lamps", 
    image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=500&auto=format",
    description: "Sustainable table, floor, and desk lamps for any space."
  },
  { 
    name: "Decorative Lighting", 
    path: "decorative-lighting", 
    image: "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=500&auto=format",
    description: "Beautiful accent lighting to enhance your home's ambiance."
  },
  { 
    name: "Outdoor Lighting", 
    path: "outdoor-lighting", 
    image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=500&auto=format",
    description: "Weather-resistant, solar-powered lighting for gardens and patios."
  },
  { 
    name: "Smart Lighting", 
    path: "smart-lighting", 
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&auto=format",
    description: "Energy-efficient lighting with smart control features."
  },
  { 
    name: "Integrated Lighting", 
    path: "integrated-lighting", 
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&auto=format",
    description: "Seamlessly integrated lighting solutions for furniture and architecture."
  },
  { 
    name: "Bathroom Lighting", 
    path: "bathroom-lighting", 
    image: "https://images.unsplash.com/photo-1584145951017-d9f047e8420c?w=500&auto=format",
    description: "Water-resistant, sustainable lighting for bathrooms."
  },
  { 
    name: "Kitchen Lighting", 
    path: "kitchen-lighting", 
    image: "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=500&auto=format",
    description: "Functional and eco-friendly lighting for kitchens."
  },
  { 
    name: "LED Bulbs", 
    path: "led-bulbs", 
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&auto=format",
    description: "Energy-saving LED bulbs with sustainable components."
  },
];
