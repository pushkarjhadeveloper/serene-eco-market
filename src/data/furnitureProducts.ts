
// Furniture subcategories and products data

// Helper function to generate unique IDs
const generateId = (category: string, subcategory: string, index: number): string => {
  return `${category}-${subcategory}-${index + 1}`;
};

// Furniture subcategories
export const furnitureSubcategories = [
  { 
    name: "Sofas", 
    path: "sofas", 
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&auto=format", 
    description: "Eco-friendly sofas made with sustainable materials" 
  },
  { 
    name: "Beds", 
    path: "beds", 
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=500&auto=format", 
    description: "Sustainable bedroom furniture for restful sleep" 
  },
  { 
    name: "Wardrobes", 
    path: "wardrobes", 
    image: "https://images.unsplash.com/photo-1595515106864-077d30192c56?w=500&auto=format", 
    description: "Eco-conscious storage solutions for your home" 
  },
  { 
    name: "Dining", 
    path: "dining", 
    image: "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=500&auto=format", 
    description: "Sustainable dining tables and chairs" 
  },
  { 
    name: "Office Chairs", 
    path: "office-chairs", 
    image: "https://images.unsplash.com/photo-1518655061710-5ccf392c275a?w=500&auto=format", 
    description: "Ergonomic and sustainable office seating" 
  },
  { 
    name: "Outdoor", 
    path: "outdoor", 
    image: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=500&auto=format", 
    description: "Weather-resistant eco-friendly outdoor furniture" 
  }
];

// Generate 15 sofa products
const sofaProducts = Array(15).fill(null).map((_, index) => ({
  id: generateId("furniture", "sofas", index),
  name: [
    "Organic Cotton Sofa", 
    "Bamboo Sectional", 
    "Recycled Polyester Loveseat",
    "Hemp Fabric Couch",
    "Reclaimed Wood Frame Sofa",
    "Jute Upholstered Settee",
    "Non-Toxic L-Shaped Sectional",
    "Sustainable Linen Chaise Lounge",
    "Cork Accent Sofa",
    "Natural Latex Cushion Couch",
    "FSC-Certified Timber Daybed",
    "Upcycled Fabric Convertible Sofa",
    "Organic Wool Stuffed Settee",
    "Bamboo & Hemp Blend Futon",
    "Recycled Ocean Plastic Outdoor Sofa"
  ][index],
  price: 43999 + (index * 5000),
  description: "Handcrafted sofa with organic materials and sustainable wooden frame. Perfect for eco-conscious homes.",
  material: "Organic cotton, FSC-certified wood",
  deliveryTime: "3-4 weeks",
  images: [
    "https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=500&auto=format",
    "https://images.unsplash.com/photo-1560448075-32314de132c0?w=500&auto=format",
    "https://images.unsplash.com/photo-1550254478-ead40cc54513?w=500&auto=format"
  ]
}));

// Generate 15 bed products
const bedProducts = Array(15).fill(null).map((_, index) => ({
  id: generateId("furniture", "beds", index),
  name: [
    "Reclaimed Wood King Bed", 
    "Bamboo Queen Platform Bed", 
    "Organic Cotton Upholstered Bed",
    "Hemp Canopy Bed",
    "FSC-Certified Pine Twin Bed",
    "Upcycled Metal Frame Bed",
    "Natural Latex Mattress & Frame Set",
    "Solid Oak California King",
    "Sustainable Walnut Sleigh Bed",
    "Minimalist Bamboo Platform Bed",
    "Recycled Wood Panel Headboard Bed",
    "Cork & Wood Blend Frame",
    "Zero VOC Finish Maple Bed",
    "Organic Cotton Daybed",
    "Convertible Tatami Style Bed"
  ][index],
  price: 59999 + (index * 4000),
  description: "Eco-friendly bed frame crafted from sustainable materials with a natural finish. Sleep well knowing you've made an environmentally conscious choice.",
  material: "Reclaimed wood, Non-toxic finish",
  deliveryTime: "4 weeks",
  images: [
    "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=500&auto=format",
    "https://images.unsplash.com/photo-1505693314053-e3e1626c98e6?w=500&auto=format",
    "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=500&auto=format"
  ]
}));

// Generate 15 wardrobe products
const wardrobeProducts = Array(15).fill(null).map((_, index) => ({
  id: generateId("furniture", "wardrobes", index),
  name: [
    "Bamboo Sliding Door Wardrobe", 
    "Reclaimed Wood Armoire", 
    "Modular Sustainable Storage System",
    "FSC-Certified Oak Wardrobe",
    "Hemp Canvas Garment Organizer",
    "Minimalist Eco-Plywood Closet",
    "Recycled Metal Frame Wardrobe",
    "Jute & Wood Storage Cabinet",
    "Natural Oil Finish Pine Wardrobe",
    "Convertible Multi-use Storage",
    "Zero-Waste Birch Ply Wardrobe",
    "Organic Cotton Covered Storage System",
    "Upcycled Door Panel Armoire",
    "Bamboo & Rattan Flexible Storage",
    "Recycled Plastic Outdoor Storage Cabinet"
  ][index],
  price: 72999 + (index * 6000),
  description: "Spacious wardrobe made from sustainable materials, offering ample storage space while minimizing environmental impact.",
  material: "FSC-certified wood, Non-toxic finishes",
  deliveryTime: "5 weeks",
  images: [
    "https://images.unsplash.com/photo-1595515106864-077d30192c56?w=500&auto=format",
    "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=500&auto=format", 
    "https://images.unsplash.com/photo-1595515106864-077d30192c56?w=500&auto=format"
  ]
}));

// Generate 15 dining products
const diningProducts = Array(15).fill(null).map((_, index) => ({
  id: generateId("furniture", "dining", index),
  name: [
    "Reclaimed Wood Dining Table", 
    "Bamboo Extendable Table & Chairs", 
    "Organic Cotton Upholstered Set",
    "Sustainable Teak Dining Set",
    "Hemp Seat Cushion Chairs",
    "FSC-Certified Oak Table",
    "Live Edge Walnut Table",
    "Recycled Metal & Wood Set",
    "Round Bamboo Dining Table",
    "Minimalist Cork Chairs",
    "Natural Oil Finish Dining Set",
    "Upcycled Industrial Dining Table",
    "Zero VOC Pine Dining Set",
    "Handcrafted Rattan Chair Set",
    "Modular Sustainable Dining System"
  ][index],
  price: 85999 + (index * 7500),
  description: "Beautiful dining set crafted from sustainable materials. Perfect for eco-conscious entertaining and family meals.",
  material: "FSC-certified wood, Natural oil finish",
  deliveryTime: "4-6 weeks",
  images: [
    "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=500&auto=format",
    "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=500&auto=format",
    "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=500&auto=format"
  ]
}));

// Generate 15 office chair products
const officeChairProducts = Array(15).fill(null).map((_, index) => ({
  id: generateId("furniture", "office-chairs", index),
  name: [
    "Ergonomic Bamboo Office Chair", 
    "Recycled Fabric Task Chair", 
    "Hemp Upholstered Desk Chair",
    "Sustainable Wood & Steel Chair",
    "Organic Cotton Executive Chair",
    "Zero-Waste Manufacturing Chair",
    "Cork Seat Ergonomic Chair",
    "FSC-Certified Wood Frame Chair",
    "Adjustable Eco-Friendly Chair",
    "Recycled Plastic Mesh Back Chair",
    "Natural Latex Cushion Office Chair",
    "Biodegradable Components Chair",
    "Jute & Bamboo Conference Chair",
    "Minimalist Low-Impact Work Chair",
    "Upcycled Materials Designer Chair"
  ][index],
  price: 32999 + (index * 3000),
  description: "Ergonomic office chair made from sustainable materials, designed for comfort during long work sessions with minimal environmental impact.",
  material: "Recycled materials, Ergonomic design",
  deliveryTime: "2-3 weeks",
  images: [
    "https://images.unsplash.com/photo-1518655061710-5ccf392c275a?w=500&auto=format",
    "https://images.unsplash.com/photo-1518655061710-5ccf392c275a?w=500&auto=format",
    "https://images.unsplash.com/photo-1518655061710-5ccf392c275a?w=500&auto=format"
  ]
}));

// Generate 15 outdoor furniture products
const outdoorProducts = Array(15).fill(null).map((_, index) => ({
  id: generateId("furniture", "outdoor", index),
  name: [
    "Weather-Resistant Bamboo Set", 
    "Recycled Plastic Adirondack Chair", 
    "Sustainable Teak Patio Table",
    "Hemp Rope Hammock",
    "Reclaimed Wood Garden Bench",
    "Solar-Powered Lounge Set",
    "Biodegradable Rattan Furniture",
    "FSC-Certified Wooden Lounger",
    "Upcycled Metal Outdoor Set",
    "Cork & Bamboo Garden Table",
    "Rainwater-Collecting Planter Bench",
    "Natural Oil Finish Deck Chairs",
    "Recycled Sail Cloth Canopy",
    "Sustainable Outdoor Kitchen Set",
    "Non-Toxic Garden Furniture System"
  ][index],
  price: 49999 + (index * 4500),
  description: "Weather-resistant outdoor furniture made from sustainable materials, designed to withstand the elements while maintaining eco-friendly standards.",
  material: "Weather-resistant sustainable materials",
  deliveryTime: "3-5 weeks",
  images: [
    "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=500&auto=format",
    "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=500&auto=format",
    "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=500&auto=format"
  ]
}));

// Combine all the furniture products
export const furnitureProducts = {
  "sofas": sofaProducts,
  "beds": bedProducts,
  "wardrobes": wardrobeProducts,
  "dining": diningProducts,
  "office-chairs": officeChairProducts,
  "outdoor": outdoorProducts,
};
