
// Kitchen subcategories and products data

// Helper function to generate unique IDs
const generateId = (category: string, subcategory: string, index: number): string => {
  return `${category}-${subcategory}-${index + 1}`;
};

// Kitchen subcategories
export const kitchenCategories = [
  { 
    name: "Countertop Materials", 
    path: "countertop-materials", 
    image: "https://images.unsplash.com/photo-1600607687644-a7e5a4c36115?q=80&w=2070&auto=format&fit=crop",
    description: "Sustainable and eco-friendly countertop options for your kitchen" 
  },
  { 
    name: "Backsplash Designs", 
    path: "backsplash-designs", 
    image: "https://images.unsplash.com/photo-1609650793855-4dd1b3e0a8cb?q=80&w=987&auto=format&fit=crop",
    description: "Beautiful and sustainable backsplash designs" 
  },
  { 
    name: "Lighting Types", 
    path: "lighting-types", 
    image: "https://images.unsplash.com/photo-1590502160462-58368aeeef7a?q=80&w=1035&auto=format&fit=crop",
    description: "Energy-efficient kitchen lighting solutions" 
  },
  { 
    name: "Kitchen Layouts", 
    path: "kitchen-layouts", 
    image: "https://images.unsplash.com/photo-1600489000022-c2086d79f9d4?q=80&w=1035&auto=format&fit=crop",
    description: "Space-efficient and functional kitchen layout designs" 
  },
  { 
    name: "Cabinet Styles", 
    path: "cabinet-styles", 
    image: "https://images.unsplash.com/photo-1556909212-d5b604d0c90d?q=80&w=2070&auto=format&fit=crop",
    description: "Sustainable cabinet designs made from eco-friendly materials" 
  },
  { 
    name: "Appliance Integration", 
    path: "appliance-integration", 
    image: "https://images.unsplash.com/photo-1550223026-0d6fd780c560?q=80&w=2070&auto=format&fit=crop",
    description: "Energy-efficient appliance solutions for your kitchen" 
  },
  { 
    name: "Storage Solutions", 
    path: "storage-solutions", 
    image: "https://images.unsplash.com/photo-1574282342653-c3d0390ff390?q=80&w=2070&auto=format&fit=crop",
    description: "Smart storage solutions for maximum efficiency" 
  },
  { 
    name: "Island Features", 
    path: "island-features", 
    image: "https://images.unsplash.com/photo-1570739258791-5c9a48453ad8?q=80&w=2070&auto=format&fit=crop",
    description: "Multifunctional kitchen islands for modern homes" 
  },
  { 
    name: "Eco-Friendly Elements", 
    path: "eco-friendly-elements", 
    image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=2074&auto=format&fit=crop",
    description: "Sustainable materials and designs for eco-conscious living" 
  },
  { 
    name: "Color Schemes", 
    path: "color-schemes", 
    image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=2074&auto=format&fit=crop",
    description: "Natural color palettes for harmonious kitchen designs" 
  }
];

// Sample product data for countertop materials
const countertopMaterialsProducts = Array(15).fill(null).map((_, index) => ({
  id: generateId("kitchen", "countertop-materials", index),
  name: [
    "Recycled Glass Countertop", 
    "Sustainable Bamboo Surface", 
    "Reclaimed Wood Butcher Block",
    "Eco-Friendly Concrete Countertop",
    "Recycled Paper Composite Surface",
    "Salvaged Stone Countertop",
    "FSC-Certified Maple Butcher Block",
    "Terrazzo Countertop with Recycled Glass",
    "Bio-Glass Translucent Surface",
    "Compressed Earth Countertop",
    "Cork Composite Surface",
    "Recycled Aluminum Countertop",
    "Sintered Stone Eco Surface",
    "Reclaimed Granite Countertop",
    "Hemp-Based Solid Surface"
  ][index],
  price: 24999 + (index * 3000),
  description: "Eco-friendly countertop made from sustainable materials, combining durability with environmental responsibility.",
  material: ["Recycled glass", "Sustainable bamboo", "Reclaimed wood", "Eco-concrete", "Recycled paper composite", "Salvaged stone", "FSC-certified maple", "Recycled glass terrazzo", "Recycled glass", "Compressed earth", "Cork composite", "Recycled aluminum", "Sintered stone", "Reclaimed granite", "Hemp composite"][index],
  deliveryTime: "3-4 weeks",
  images: [
    `https://images.unsplash.com/photo-${[
      "1600607687644-a7e5a4c36115",
      "1600585153890-cbe5d345b69a",
      "1556909212-d5b604d0c90d",
      "1556911220-bcc6a17789ff",
      "1565183928294-7dce0d813385",
      "1600965975088-b61c0dfb452d",
      "1534237865146-81ab4dc185e0",
      "1605629713580-cc8a0cb7c623",
      "1600566753086-00f18fb6b3ea",
      "1600492050305-9060d35cc0bd",
      "1556912173-3bb406ef7e8e",
      "1550223026-0d6fd780c560",
      "1604709177443-3d12349c7e55",
      "1575517087945-89c139d68cbf",
      "1603825510780-308e280f9ebf"
    ][index]}?q=80&w=1035&auto=format&fit=crop`,
    `https://images.unsplash.com/photo-${[
      "1600585153890-cbe5d345b69a",
      "1556911220-bcc6a17789ff",
      "1565183928294-7dce0d813385",
      "1600965975088-b61c0dfb452d",
      "1534237865146-81ab4dc185e0",
      "1605629713580-cc8a0cb7c623",
      "1600566753086-00f18fb6b3ea",
      "1600492050305-9060d35cc0bd",
      "1556912173-3bb406ef7e8e",
      "1550223026-0d6fd780c560",
      "1604709177443-3d12349c7e55",
      "1575517087945-89c139d68cbf",
      "1603825510780-308e280f9ebf",
      "1600607687644-a7e5a4c36115",
      "1556909212-d5b604d0c90d"
    ][index]}?q=80&w=1035&auto=format&fit=crop`
  ]
}));

// Sample product data for backsplash designs
const backsplashDesignsProducts = Array(15).fill(null).map((_, index) => ({
  id: generateId("kitchen", "backsplash-designs", index),
  name: [
    "Recycled Glass Mosaic Tiles", 
    "Reclaimed Wood Backsplash Panels", 
    "Sustainable Bamboo Tile Pattern",
    "Recycled Ceramic Subway Tiles",
    "Cork Wall Covering",
    "Recycled Metal Penny Rounds",
    "Salvaged Brick Veneer",
    "Handmade Clay Tiles",
    "Recycled Porcelain Geometric Tiles",
    "FSC-Certified Wooden Slats",
    "Biodegradable Wallpaper",
    "Reclaimed Stone Mosaic",
    "Crushed Recycled Glass Tile",
    "Sustainable Concrete Tiles",
    "Hemp Fiber Wall Panels"
  ][index],
  price: 17999 + (index * 2000),
  description: "Beautiful backsplash made from sustainable materials, adding character and eco-friendly charm to your kitchen.",
  material: ["Recycled glass", "Reclaimed wood", "Sustainable bamboo", "Recycled ceramic", "Cork", "Recycled metal", "Salvaged brick", "Natural clay", "Recycled porcelain", "FSC-certified wood", "Biodegradable material", "Reclaimed stone", "Crushed recycled glass", "Sustainable concrete", "Hemp fiber"][index],
  deliveryTime: "2-3 weeks",
  images: [
    `https://images.unsplash.com/photo-${[
      "1609650793855-4dd1b3e0a8cb",
      "1532372576444-dda954194ad0",
      "1588854277404-9a8596f2a774",
      "1610701596061-2ecf227e85b2",
      "1519974719865-e6559eac2575",
      "1565538810583-9a5c6c256ffe",
      "1519710164239-da123dc03ef4",
      "1551516594-56cb78394645",
      "1556912167-a57a4b560ba3",
      "1520038410233-7141be7e6f97",
      "1600607687939-ce8a8a11ebfe",
      "1527694647756-796296ad35fa",
      "1604709177443-3d12349c7e55",
      "1550223640655-0b0248b7f67e",
      "1599625876898-3ca449280e2a"
    ][index]}?q=80&w=1035&auto=format&fit=crop`,
    `https://images.unsplash.com/photo-${[
      "1532372576444-dda954194ad0",
      "1588854277404-9a8596f2a774",
      "1610701596061-2ecf227e85b2",
      "1519974719865-e6559eac2575",
      "1565538810583-9a5c6c256ffe",
      "1519710164239-da123dc03ef4",
      "1551516594-56cb78394645",
      "1556912167-a57a4b560ba3",
      "1520038410233-7141be7e6f97",
      "1600607687939-ce8a8a11ebfe",
      "1527694647756-796296ad35fa",
      "1604709177443-3d12349c7e55",
      "1550223640655-0b0248b7f67e",
      "1599625876898-3ca449280e2a",
      "1609650793855-4dd1b3e0a8cb"
    ][index]}?q=80&w=1035&auto=format&fit=crop`
  ]
}));

// Sample product data for lighting types
const lightingTypesProducts = Array(15).fill(null).map((_, index) => ({
  id: generateId("kitchen", "lighting-types", index),
  name: [
    "Energy-Efficient LED Under Cabinet Lights", 
    "Solar-Powered Pendant Lamps", 
    "Recycled Glass Chandelier",
    "Bamboo Pendant Lighting",
    "Motion Sensor Cabinet Lights",
    "Reclaimed Wood Track Lighting",
    "Energy Star Task Lighting",
    "Recycled Metal Island Pendants",
    "Upcycled Industrial Spotlights",
    "Smart LED Strip Lighting",
    "Handcrafted Ceramic Pendants",
    "Zero-Energy Daylight Tubes",
    "Eco-Resin Ambient Lighting",
    "Cork Shade Ceiling Fixtures",
    "Recycled Bottle Glass Sconces"
  ][index],
  price: 12999 + (index * 1500),
  description: "Energy-efficient lighting made from sustainable materials, combining style with environmental consciousness.",
  material: ["LED technology with recycled hardware", "Solar-powered elements", "Recycled glass", "Sustainable bamboo", "Energy-efficient LED with sensors", "Reclaimed wood and LED", "Energy Star certified materials", "Recycled metal", "Upcycled industrial materials", "Smart LED technology", "Handcrafted ceramic", "Daylight-harvesting technology", "Eco-resin", "Cork and LED", "Recycled bottle glass"][index],
  deliveryTime: "2 weeks",
  images: [
    `https://images.unsplash.com/photo-${[
      "1590502160462-58368aeeef7a",
      "1513694203232-719a280e022f",
      "1536856136534-7ce1b56107b3",
      "1540932239986-30128078f3c5",
      "1586553183376-debea9683496",
      "1565125093593-e0f26b831489",
      "1592839618098-661cb5b4d0fc",
      "1567225206744-b9080f81c485",
      "1540932827474-1a29f50b3a57",
      "1593005059417-e1942b9f5829",
      "1610701596007-11502861dcfa",
      "1586153009909-4e31fc3fa97f",
      "1526887520775-4b14b9c88e23",
      "1589363190181-61304a71833b",
      "1549434193-bc9355a1cb2f"
    ][index]}?q=80&w=1035&auto=format&fit=crop`,
    `https://images.unsplash.com/photo-${[
      "1513694203232-719a280e022f",
      "1536856136534-7ce1b56107b3",
      "1540932239986-30128078f3c5",
      "1586553183376-debea9683496",
      "1565125093593-e0f26b831489",
      "1592839618098-661cb5b4d0fc",
      "1567225206744-b9080f81c485",
      "1540932827474-1a29f50b3a57",
      "1593005059417-e1942b9f5829",
      "1610701596007-11502861dcfa",
      "1586153009909-4e31fc3fa97f",
      "1526887520775-4b14b9c88e23",
      "1589363190181-61304a71833b",
      "1549434193-bc9355a1cb2f",
      "1590502160462-58368aeeef7a"
    ][index]}?q=80&w=1035&auto=format&fit=crop`
  ]
}));

// Sample product data for cabinet styles
const cabinetStylesProducts = Array(15).fill(null).map((_, index) => ({
  id: generateId("kitchen", "cabinet-styles", index),
  name: [
    "FSC-Certified Shaker Cabinets", 
    "Bamboo Flat-Panel Cabinets", 
    "Reclaimed Wood Glass-Front Cabinets",
    "Low-VOC Painted Open Shelving",
    "Recycled Metal Industrial Cabinets",
    "Salvaged Wood Rustic Cabinets",
    "Slab Door Cabinets With Eco-Friendly Finish",
    "Beadboard Cabinets With Non-Toxic Paint",
    "Sustainable Plywood Minimalist Cabinets",
    "Reclaimed Barn Wood Cabinet Fronts",
    "Louvered Cabinets With Natural Oil Finish",
    "Recycled Plastic Modern Cabinets",
    "Inset Door Cabinets With Eco Hardware",
    "Zero-Waste Manufacturing Cabinets",
    "Thermofoil Cabinets With Recycled Core"
  ][index],
  price: 37999 + (index * 4000),
  description: "Sustainable kitchen cabinets crafted from eco-friendly materials with non-toxic finishes, combining style and environmental responsibility.",
  material: ["FSC-certified hardwood", "Sustainable bamboo", "Reclaimed wood", "Low-VOC MDF", "Recycled metal", "Salvaged wood", "Eco-friendly composite", "Sustainable wood with natural paint", "Sustainable plywood", "Reclaimed barn wood", "Sustainable wood with natural oil", "Recycled plastic", "Sustainable hardwood", "Cradle-to-cradle certified materials", "Recycled materials with thermofoil finish"][index],
  deliveryTime: "4-6 weeks",
  images: [
    `https://images.unsplash.com/photo-${[
      "1556909212-d5b604d0c90d",
      "1600566753343-5d88e9d64352",
      "1588854277404-9a8596f2a774",
      "1600566752632-696d1cdfaa84",
      "1600566752790-6d185309cd23",
      "1590502592889-ce0e9c148a4a",
      "1586023492125-27b2c045efd7",
      "1583845112225-0458758cea00",
      "1556912043-5a79fd9ab4a9",
      "1600225572493-33de371125ef",
      "1560448204-61dc8275cf20",
      "1600585152220-90363fe7e115",
      "1630488249416-446bbfe92a54",
      "1564540586442-10a4a1756682",
      "1597404294793-1093f8648b1e"
    ][index]}?q=80&w=1035&auto=format&fit=crop`,
    `https://images.unsplash.com/photo-${[
      "1600566753343-5d88e9d64352",
      "1588854277404-9a8596f2a774",
      "1600566752632-696d1cdfaa84",
      "1600566752790-6d185309cd23",
      "1590502592889-ce0e9c148a4a",
      "1586023492125-27b2c045efd7",
      "1583845112225-0458758cea00",
      "1556912043-5a79fd9ab4a9",
      "1600225572493-33de371125ef",
      "1560448204-61dc8275cf20",
      "1600585152220-90363fe7e115",
      "1630488249416-446bbfe92a54",
      "1564540586442-10a4a1756682",
      "1597404294793-1093f8648b1e",
      "1556909212-d5b604d0c90d"
    ][index]}?q=80&w=1035&auto=format&fit=crop`
  ]
}));

// Create 15 products for each remaining category
// For brevity, not including all the other products here
// In a real implementation, we'd add all remaining kitchen product subcategories

// Combine all kitchen products by subcategory
export const kitchenProducts = {
  "countertop-materials": countertopMaterialsProducts,
  "backsplash-designs": backsplashDesignsProducts,
  "lighting-types": lightingTypesProducts,
  "cabinet-styles": cabinetStylesProducts,
  // Add other subcategories here
};
