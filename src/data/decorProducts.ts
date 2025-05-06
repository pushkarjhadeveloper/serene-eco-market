
// Decor subcategories and products data

// Helper function to generate unique IDs
const generateId = (category: string, subcategory: string, index: number): string => {
  return `${category}-${subcategory}-${index + 1}`;
};

// Decor subcategories
export const decorCategories = [
  { 
    name: "Wall Art", 
    path: "wall-art", 
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=2070&auto=format&fit=crop",
    description: "Sustainable wall art made from eco-friendly materials" 
  },
  { 
    name: "Mirrors", 
    path: "mirrors", 
    image: "https://images.unsplash.com/photo-1618220624788-9c9c13b26913?q=80&w=987&auto=format&fit=crop",
    description: "Eco-friendly mirrors with sustainable frames" 
  },
  { 
    name: "Lighting Fixtures", 
    path: "lighting-fixtures", 
    image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?q=80&w=1170&auto=format&fit=crop",
    description: "Energy-efficient decorative lighting solutions" 
  },
  { 
    name: "Textiles", 
    path: "textiles", 
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1032&auto=format&fit=crop",
    description: "Organic and sustainable home textiles" 
  },
  { 
    name: "Plants & Greenery", 
    path: "plants-greenery", 
    image: "https://images.unsplash.com/photo-1608831540955-35094d19a33e?q=80&w=2103&auto=format&fit=crop",
    description: "Indoor plants and eco-friendly planters" 
  },
  { 
    name: "Functional Accessories", 
    path: "functional-accessories", 
    image: "https://images.unsplash.com/photo-1512473548599-0937a6d02fdd?q=80&w=987&auto=format&fit=crop",
    description: "Sustainable storage and organization solutions" 
  },
  { 
    name: "Personal Touches", 
    path: "personal-touches", 
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=2058&auto=format&fit=crop",
    description: "Eco-friendly personalized home decor" 
  },
  { 
    name: "Clocks", 
    path: "clocks", 
    image: "https://images.unsplash.com/photo-1516563670759-299070f0dc54?q=80&w=1170&auto=format&fit=crop",
    description: "Sustainable timepieces for your home" 
  },
  { 
    name: "Candles & Holders", 
    path: "candles-holders", 
    image: "https://images.unsplash.com/photo-1603006905003-be475563bc59?q=80&w=987&auto=format&fit=crop",
    description: "Natural wax candles and sustainable holders" 
  },
  { 
    name: "Sculptures & Figurines", 
    path: "sculptures-figurines", 
    image: "https://images.unsplash.com/photo-1591105514584-15af09e209a7?q=80&w=987&auto=format&fit=crop",
    description: "Artisanal sculptures made from sustainable materials" 
  },
  { 
    name: "Home Fragrance", 
    path: "home-fragrance", 
    image: "https://images.unsplash.com/photo-1601300655709-40084e786e46?q=80&w=987&auto=format&fit=crop",
    description: "Natural and organic home fragrance solutions" 
  }
];

// Sample product data for wall art
const wallArtProducts = Array(15).fill(null).map((_, index) => ({
  id: generateId("decor", "wall-art", index),
  name: [
    "Reclaimed Wood Wall Art", 
    "Recycled Paper Collage", 
    "Sustainable Bamboo Canvas",
    "Upcycled Metal Wall Sculpture",
    "Eco-Friendly Print Collection",
    "Pressed Botanical Art Frame",
    "Handmade Textile Wall Hanging",
    "Reclaimed Fabric Tapestry",
    "Salvaged Window Frame Art",
    "Natural Dye Abstract Painting",
    "Cork Board Geometric Design",
    "Upcycled Book Page Wall Art",
    "Recycled Glass Mosaic",
    "Sustainable Wood Relief Carving",
    "Natural Fiber Macramé Wall Art"
  ][index],
  price: 9999 + (index * 1500),
  description: "Beautiful wall art piece made from sustainable materials, adding character and eco-friendly style to your home.",
  material: ["Reclaimed wood", "Recycled paper", "Sustainable bamboo", "Upcycled metal", "Recycled paper with natural inks", "Pressed botanicals and sustainable frame", "Organic cotton and natural dyes", "Reclaimed fabric", "Salvaged window frame", "Natural dyes and organic canvas", "Sustainable cork", "Upcycled book pages", "Recycled glass", "FSC-certified wood", "Organic cotton rope"][index],
  deliveryTime: "1-2 weeks",
  images: [
    `https://images.unsplash.com/photo-${[
      "1513519245088-0e12902e5a38",
      "1600566753010-21d85a7b19b9",
      "1567225196000-7a08bcb65890",
      "1581867243300-e1da4aabdb24",
      "1582641547930-d99774536c93",
      "1546555131-f5305069433f",
      "1557682250-33bd709cbe85",
      "1533754655554-8a0bb10becb9",
      "1549388604-817d15aa0110",
      "1502307570-796a0357aaef",
      "1559595500-2810eb401100",
      "1542291566-dad37b41abfd",
      "1505693416388-ac5ce068fe85",
      "1520699049698-fb4430891149",
      "1503341733175-a1f09c45e64f"
    ][index]}?q=80&w=1035&auto=format&fit=crop`,
    `https://images.unsplash.com/photo-${[
      "1600566753010-21d85a7b19b9",
      "1567225196000-7a08bcb65890",
      "1581867243300-e1da4aabdb24",
      "1582641547930-d99774536c93",
      "1546555131-f5305069433f",
      "1557682250-33bd709cbe85",
      "1533754655554-8a0bb10becb9",
      "1549388604-817d15aa0110",
      "1502307570-796a0357aaef",
      "1559595500-2810eb401100",
      "1542291566-dad37b41abfd",
      "1505693416388-ac5ce068fe85",
      "1520699049698-fb4430891149",
      "1503341733175-a1f09c45e64f",
      "1513519245088-0e12902e5a38"
    ][index]}?q=80&w=1035&auto=format&fit=crop`
  ]
}));

// Sample product data for home fragrance
const homeFragranceProducts = Array(15).fill(null).map((_, index) => ({
  id: generateId("decor", "home-fragrance", index),
  name: [
    "Organic Essential Oil Diffuser", 
    "Sustainable Soy Wax Candle Set", 
    "Natural Reed Diffuser",
    "Handcrafted Ceramic Incense Holder",
    "Beeswax Candle Collection",
    "Bamboo Aromatherapy Diffuser",
    "Plant-Based Room Spray",
    "Himalayan Salt Lamp Diffuser",
    "Coconut Wax Massage Candle",
    "Dried Botanical Potpourri",
    "Aromatherapy Stone Diffuser",
    "Natural Linen Scent Sachets",
    "Handmade Incense Bundle",
    "Recycled Glass Oil Burner",
    "Organic Wax Melts Gift Set"
  ][index],
  price: 5999 + (index * 1000),
  description: "Natural home fragrance solution made with organic ingredients and sustainable materials for a toxin-free home environment.",
  material: ["Sustainable wood and glass", "Organic soy wax", "Bamboo reeds and natural oils", "Handcrafted ceramic", "Pure beeswax", "Sustainable bamboo and glass", "Organic plant extracts", "Himalayan salt and sustainable wood", "Organic coconut wax", "Dried organic botanicals", "Natural stone", "Organic linen and dried lavender", "Organic herbs and sustainable paper", "Recycled glass", "Organic wax and essential oils"][index],
  deliveryTime: "1 week",
  images: [
    `https://images.unsplash.com/photo-${[
      "1601300655709-40084e786e46",
      "1602535776816-6e28d80e3a8c",
      "1554585444-1d7d022d0e4b",
      "1563821549-588d2e634b4a",
      "1539245793521-d97cc8802e48",
      "1603006905003-be475563bc59",
      "1596139390822-047d9398f55f",
      "1599493758267-c6c884c7071f",
      "1530651627240-9ec3d874c91c",
      "1517999144257-13136bdde28f",
      "1626766941863-66ac81270c01",
      "1582845681693-c5fce2200505",
      "1562163937-de19475fd0c7",
      "1531756352890-743dcefa6608",
      "1604522339583-61e54cc4e7c8"
    ][index]}?q=80&w=1035&auto=format&fit=crop`,
    `https://images.unsplash.com/photo-${[
      "1602535776816-6e28d80e3a8c",
      "1554585444-1d7d022d0e4b",
      "1563821549-588d2e634b4a",
      "1539245793521-d97cc8802e48",
      "1603006905003-be475563bc59",
      "1596139390822-047d9398f55f",
      "1599493758267-c6c884c7071f",
      "1530651627240-9ec3d874c91c",
      "1517999144257-13136bdde28f",
      "1626766941863-66ac81270c01",
      "1582845681693-c5fce2200505",
      "1562163937-de19475fd0c7",
      "1531756352890-743dcefa6608",
      "1604522339583-61e54cc4e7c8",
      "1601300655709-40084e786e46"
    ][index]}?q=80&w=1035&auto=format&fit=crop`
  ]
}));

// Create 15 products for each remaining category
// For brevity, not including all the other products here
// In a real implementation, we'd add all remaining decor product subcategories

// Combine all decor products by subcategory
export const decorProducts = {
  "wall-art": wallArtProducts,
  "home-fragrance": homeFragranceProducts,
  // Add other subcategories here
};
