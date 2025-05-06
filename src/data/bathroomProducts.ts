
// Bathroom subcategories and products data

// Helper function to generate unique IDs
const generateId = (category: string, subcategory: string, index: number): string => {
  return `${category}-${subcategory}-${index + 1}`;
};

// Bathroom subcategories
export const bathroomCategories = [
  { 
    name: "Bathroom Types", 
    path: "bathroom-types", 
    image: "https://images.unsplash.com/photo-1620626011761-996317b8d101?q=80&w=2069&auto=format&fit=crop",
    description: "Eco-friendly designs for different bathroom types" 
  },
  { 
    name: "Design Styles", 
    path: "design-styles", 
    image: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=987&auto=format&fit=crop",
    description: "Sustainable bathroom design styles for every taste" 
  },
  { 
    name: "Fixtures & Fittings", 
    path: "fixtures-fittings", 
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2070&auto=format&fit=crop",
    description: "Water-saving and eco-friendly bathroom fixtures" 
  },
  { 
    name: "Lighting Options", 
    path: "lighting-options", 
    image: "https://images.unsplash.com/photo-1604709178681-82325c04f8bd?q=80&w=1035&auto=format&fit=crop",
    description: "Energy-efficient bathroom lighting solutions" 
  },
  { 
    name: "Flooring & Wall Materials", 
    path: "flooring-wall-materials", 
    image: "https://images.unsplash.com/photo-1584622781564-1d987f7333c1?q=80&w=2070&auto=format&fit=crop",
    description: "Sustainable materials for bathroom surfaces" 
  },
  { 
    name: "Storage Solutions", 
    path: "storage-solutions", 
    image: "https://images.unsplash.com/photo-1645427861434-5a7f85c2a3c4?q=80&w=1035&auto=format&fit=crop",
    description: "Space-efficient and eco-friendly bathroom storage" 
  },
  { 
    name: "Smart Features", 
    path: "smart-features", 
    image: "https://images.unsplash.com/photo-1600566752547-e0b1bbf5312c?q=80&w=987&auto=format&fit=crop",
    description: "Water and energy-saving smart bathroom technology" 
  },
  { 
    name: "Color Palettes", 
    path: "color-palettes", 
    image: "https://images.unsplash.com/photo-1620628184573-5dcde6918b3f?q=80&w=1035&auto=format&fit=crop",
    description: "Natural and sustainable color schemes for bathrooms" 
  },
  { 
    name: "Decor Elements", 
    path: "decor-elements", 
    image: "https://images.unsplash.com/photo-1629079447777-1e605162dc8d?q=80&w=987&auto=format&fit=crop",
    description: "Eco-friendly bathroom accessories and decor" 
  },
  { 
    name: "Eco-Friendly Features", 
    path: "eco-friendly-features", 
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2070&auto=format&fit=crop",
    description: "Water-saving and sustainable bathroom innovations" 
  }
];

// Sample product data for bathroom types
const bathroomTypesProducts = Array(15).fill(null).map((_, index) => ({
  id: generateId("bathroom", "bathroom-types", index),
  name: [
    "Eco-Friendly Master Ensuite", 
    "Water-Saving Wet Room", 
    "Sustainable Jack and Jill Bathroom",
    "Compact Water-Efficient Bathroom",
    "Luxury Green Bathroom Suite",
    "Family Eco-Bathroom System",
    "Accessible Sustainable Bathroom",
    "Space-Saving Powder Room",
    "Low-Flow Guest Bathroom",
    "Outdoor Eco-Bathroom Design",
    "Tiny House Bathroom Solution",
    "Off-Grid Bathroom System",
    "Rainwater-Recycling Bathroom",
    "Energy-Neutral Bathroom Design",
    "Modular Eco-Bathroom Kit"
  ][index],
  price: 149999 + (index * 15000),
  description: "Complete sustainable bathroom solution designed with water conservation and eco-friendly materials in mind.",
  material: "Recycled materials, water-saving fixtures, energy-efficient systems",
  deliveryTime: "6-8 weeks",
  images: [
    `https://images.unsplash.com/photo-${[
      "1620626011761-996317b8d101",
      "1600566752355-35792bedcfea",
      "1552321554-5fefe8c9ef14",
      "1584622650111-993a426fbf0a",
      "1600210852198-03781ca5f49f",
      "1576698483491-8c43f0862543",
      "1631335252170-967d3391cb65",
      "1600566752734-c95cfc90f6cf",
      "1603825393939-e81892f54981",
      "1584187094780-b6841794a576",
      "1564540583424-8e98587dc714",
      "1564540586988-38a92a69ff24",
      "1507652955-f3dcef5a3be5",
      "1628602974433-b9f25621002b",
      "1600210491892-520d84efae9f"
    ][index]}?q=80&w=1035&auto=format&fit=crop`,
    `https://images.unsplash.com/photo-${[
      "1600566752355-35792bedcfea",
      "1552321554-5fefe8c9ef14",
      "1584622650111-993a426fbf0a",
      "1600210852198-03781ca5f49f",
      "1576698483491-8c43f0862543",
      "1631335252170-967d3391cb65",
      "1600566752734-c95cfc90f6cf",
      "1603825393939-e81892f54981",
      "1584187094780-b6841794a576",
      "1564540583424-8e98587dc714",
      "1564540586988-38a92a69ff24",
      "1507652955-f3dcef5a3be5",
      "1628602974433-b9f25621002b",
      "1600210491892-520d84efae9f",
      "1620626011761-996317b8d101"
    ][index]}?q=80&w=1035&auto=format&fit=crop`
  ]
}));

// Sample product data for design styles
const designStylesProducts = Array(15).fill(null).map((_, index) => ({
  id: generateId("bathroom", "design-styles", index),
  name: [
    "Modern Eco-Minimalist Bathroom", 
    "Contemporary Sustainable Design", 
    "Industrial Upcycled Bathroom",
    "Rustic Farmhouse Eco-Bath",
    "Mediterranean Water-Saving Design",
    "Zen Sustainable Retreat",
    "Scandinavian Eco-Bathroom",
    "Mid-Century Modern Green Design",
    "Bohemian Sustainable Bathroom",
    "Art Deco Eco-Friendly Style",
    "Coastal Sustainable Bathroom",
    "Traditional Eco-Conscious Design",
    "Tropical Rainwater Harvesting Bath",
    "Victorian-Inspired Green Bath",
    "Japanese Eco-Bath Experience"
  ][index],
  price: 89999 + (index * 10000),
  description: "Complete bathroom design style incorporating sustainable materials and water-saving features while maintaining distinctive aesthetic elements.",
  material: "Eco-friendly tiles, sustainable wood, recycled glass, water-efficient fixtures",
  deliveryTime: "5-7 weeks",
  images: [
    `https://images.unsplash.com/photo-${[
      "1600566752355-35792bedcfea",
      "1620626011761-996317b8d101",
      "1584622650111-993a426fbf0a",
      "1599696848614-f5d498fd6b6e",
      "1558944126-9c217c6df08d",
      "1600210492493-0946911123ea",
      "1580229116265-8adcda2b7bf6",
      "1600210491892-520d84efae9f",
      "1600607687920-4e2c827bad34",
      "1600607687939-ce8a8a11ebfe",
      "1523772721666-3a36d3baba50",
      "1507652313519-d4e7cf3c3533",
      "1597404294360-feeeda04612e",
      "1556909190-d022f435f2b2",
      "1600607688142-79c346b6a9fc"
    ][index]}?q=80&w=1035&auto=format&fit=crop`,
    `https://images.unsplash.com/photo-${[
      "1620626011761-996317b8d101",
      "1584622650111-993a426fbf0a",
      "1599696848614-f5d498fd6b6e",
      "1558944126-9c217c6df08d",
      "1600210492493-0946911123ea",
      "1580229116265-8adcda2b7bf6",
      "1600210491892-520d84efae9f",
      "1600607687920-4e2c827bad34",
      "1600607687939-ce8a8a11ebfe",
      "1523772721666-3a36d3baba50",
      "1507652313519-d4e7cf3c3533",
      "1597404294360-feeeda04612e",
      "1556909190-d022f435f2b2",
      "1600607688142-79c346b6a9fc",
      "1600566752355-35792bedcfea"
    ][index]}?q=80&w=1035&auto=format&fit=crop`
  ]
}));

// Sample product data for fixtures & fittings
const fixturesFittingsProducts = Array(15).fill(null).map((_, index) => ({
  id: generateId("bathroom", "fixtures-fittings", index),
  name: [
    "Low-Flow Eco Sink", 
    "Water-Saving Toilet System", 
    "Recycled Glass Basin",
    "Sustainable Wood Vanity",
    "Energy-Efficient Shower System",
    "Dual-Flush Water-Saving Toilet",
    "Eco-Friendly Freestanding Tub",
    "Bamboo Vessel Sink",
    "Recycled Metal Faucet Set",
    "Solar-Heated Bathtub",
    "Reclaimed Stone Basin",
    "Water-Conserving Bidet Toilet",
    "Eco-Resin Shower Base",
    "Salvaged Copper Fixtures",
    "Composting Toilet System"
  ][index],
  price: 29999 + (index * 6000),
  description: "Water-efficient bathroom fixture designed with sustainable materials and eco-friendly manufacturing processes.",
  material: ["Recycled porcelain", "Water-saving ceramic", "Recycled glass", "Sustainable wood", "Eco-friendly composite", "Low-flow ceramic", "Recycled acrylic", "Sustainable bamboo", "Recycled metal", "Sustainable composite with solar technology", "Reclaimed stone", "Water-saving ceramic with bidet function", "Eco-resin", "Salvaged copper", "Eco-composite"][index],
  deliveryTime: "3-5 weeks",
  images: [
    `https://images.unsplash.com/photo-${[
      "1584622650111-993a426fbf0a",
      "1573546509863-481535731a5c",
      "1600210491892-520d84efae9f",
      "1585128903850-518d0cfe2a05",
      "1532301908234-1c3c7a578171",
      "1611977342296-1cda1c668a6b",
      "1507652955-f3dcef5a3be5",
      "1600607688142-79c346b6a9fc",
      "1584622781564-1d987f7333c1",
      "1612478535297-4287ff8b8303",
      "1600607687920-4e2c827bad34",
      "1603033156166-2ae22eb2b7e2",
      "1552321554-5fefe8c9ef14",
      "1600607687644-a7e5a4c36115",
      "1600566752355-35792bedcfea"
    ][index]}?q=80&w=1035&auto=format&fit=crop`,
    `https://images.unsplash.com/photo-${[
      "1573546509863-481535731a5c",
      "1600210491892-520d84efae9f",
      "1585128903850-518d0cfe2a05",
      "1532301908234-1c3a668a6e1b",
      "1611977342296-1cda1c668a6b",
      "1507652955-f3dcef5a3be5",
      "1600607688142-79c346b6a9fc",
      "1584622781564-1d987f7333c1",
      "1612478535297-4287ff8b8303",
      "1600607687920-4e2c827bad34",
      "1603033156166-2ae22eb2b7e2",
      "1552321554-5fefe8c9ef14",
      "1600607687644-a7e5a4c36115",
      "1600566752355-35792bedcfea",
      "1584622650111-993a426fbf0a"
    ][index]}?q=80&w=1035&auto=format&fit=crop`
  ]
}));

// Create 15 products for each remaining category
// For brevity, not including all the other products here
// In a real implementation, we'd add all remaining bathroom product subcategories

// Combine all bathroom products by subcategory
export const bathroomProducts = {
  "bathroom-types": bathroomTypesProducts,
  "design-styles": designStylesProducts,
  "fixtures-fittings": fixturesFittingsProducts,
  // Add other subcategories here
};
