
// Define types
type DoorsWindowsSubcategory = {
  name: string;
  path: string;
  image: string;
  description: string;
};

type DoorsWindowsProduct = {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
  material: string;
  deliveryTime: string;
  images: string[];
};

// Helper function to generate unique IDs
const generateId = (subcategory: string, index: number): string => {
  return `doors-windows-${subcategory}-${index + 1}`;
};

// Define subcategories
export const doorsWindowsCategories: DoorsWindowsSubcategory[] = [
  {
    name: "Smart & Automated",
    path: "smart-automated",
    image: "https://images.unsplash.com/photo-1558002038-10f30914014a?w=500&auto=format",
    description: "Smart home technology integrated doors and windows"
  },
  {
    name: "Sustainable Designs",
    path: "sustainable-designs",
    image: "https://images.unsplash.com/photo-1601761182568-e9fe11f48ed7?w=500&auto=format",
    description: "Eco-friendly and energy-efficient options"
  },
  {
    name: "Vintage & Antique",
    path: "vintage-antique",
    image: "https://images.unsplash.com/photo-1532247328070-f8f357a732df?w=500&auto=format",
    description: "Classic designs with historical charm"
  },
  {
    name: "Space-Saving",
    path: "space-saving",
    image: "https://images.unsplash.com/photo-1508022413785-fe20d0c2699a?w=500&auto=format",
    description: "Innovative solutions for compact spaces"
  },
  {
    name: "Decorative Glass",
    path: "decorative-glass",
    image: "https://images.unsplash.com/photo-1497604401993-f2e922e5cb0a?w=500&auto=format",
    description: "Beautiful glass designs for elegant interiors"
  },
  {
    name: "Steel-Framed",
    path: "steel-framed",
    image: "https://images.unsplash.com/photo-1493397212122-2b85dda8106b?w=500&auto=format",
    description: "Durable and modern steel frame options"
  },
  {
    name: "Customizable Colors",
    path: "customizable-colors",
    image: "https://images.unsplash.com/photo-1489171078254-c3365d6e359f?w=500&auto=format",
    description: "Personalize your doors and windows with custom colors"
  },
  {
    name: "Security & Fire-Resistant",
    path: "security-fire-resistant",
    image: "https://images.unsplash.com/photo-1622372738946-62e2b572d672?w=500&auto=format",
    description: "Enhanced protection for your home and family"
  },
  {
    name: "Acoustic Insulation",
    path: "acoustic-insulation",
    image: "https://images.unsplash.com/photo-1460574283810-2aab119d8511?w=500&auto=format",
    description: "Noise-reducing solutions for quiet spaces"
  },
  {
    name: "Traditional & Cultural",
    path: "traditional-cultural",
    image: "https://images.unsplash.com/photo-1519024778166-c84c3dfeb1a6?w=500&auto=format",
    description: "Culturally inspired designs from around the world"
  }
];

// Smart & Automated Doors and Windows products
const smartAutomatedProducts: DoorsWindowsProduct[] = Array(15).fill(null).map((_, index) => ({
  id: generateId("smart-automated", index),
  name: [
    "Smart Home Entry Door with Facial Recognition",
    "Voice-Controlled Sliding Window",
    "Fingerprint Access French Doors",
    "App-Controlled Bifold Door System",
    "Touchless Entry Smart Door",
    "Motion Sensor Bathroom Window",
    "Smartphone-Integrated Patio Door",
    "Auto-Tinting Smart Glass Window",
    "Weather-Responsive Skylight System",
    "Self-Locking Security Door",
    "Programmable Window Ventilation",
    "AI-Enabled Home Entry System",
    "Automated Blinds Integrated Window",
    "Gesture Control Sliding Door",
    "Temperature-Regulated Window System"
  ][index],
  price: 89999 + (index * 5000),
  description: "Cutting-edge smart technology integrated into high-quality doors and windows, offering convenience, security, and energy efficiency.",
  features: [
    "Smartphone integration",
    "Energy usage monitoring",
    "Customizable settings",
    "Remote access",
    "Voice control compatibility"
  ],
  material: "Aluminum frame with integrated electronics, tempered glass",
  deliveryTime: "3-4 weeks (custom installation required)",
  images: [
    "https://images.unsplash.com/photo-1558002038-10f30914014a?w=500&auto=format",
    "https://images.unsplash.com/photo-1613245342943-85d8928bfcb2?w=500&auto=format",
    "https://images.unsplash.com/photo-1600607686527-6fb886090705?w=500&auto=format"
  ]
}));

// Sustainable & Eco-Friendly Designs products
const sustainableDesignsProducts: DoorsWindowsProduct[] = Array(15).fill(null).map((_, index) => ({
  id: generateId("sustainable-designs", index),
  name: [
    "Triple-Glazed Passive House Window",
    "Recycled Wood Frame Entry Door",
    "Solar-Powered Ventilation Window",
    "Bamboo-Framed Patio Door",
    "Low-E Glass Energy-Saving Window",
    "Reclaimed Timber Barn Door",
    "Thermal Break Insulated Window",
    "VOC-Free Eco-Friendly Door",
    "Upcycled Material French Door",
    "Sustainable Pine Interior Door",
    "Cork-Insulated Window Frame",
    "Rapidly-Renewable Fiber Door Core",
    "Carbon-Neutral Production Window",
    "Rainforest Alliance Certified Door",
    "Energy Star Rated Casement Window"
  ][index],
  price: 64999 + (index * 4000),
  description: "Environmentally conscious doors and windows designed to reduce carbon footprint while providing superior insulation and performance.",
  features: [
    "Sustainably sourced materials",
    "Energy efficient design",
    "Low environmental impact",
    "Excellent insulation",
    "Long lifecycle"
  ],
  material: "Recycled and sustainable materials, low-E glass",
  deliveryTime: "4-5 weeks",
  images: [
    "https://images.unsplash.com/photo-1601761182568-e9fe11f48ed7?w=500&auto=format",
    "https://images.unsplash.com/photo-1533779088228-9db21617b403?w=500&auto=format", 
    "https://images.unsplash.com/photo-1572207485327-496adb94c593?w=500&auto=format"
  ]
}));

// Vintage & Antique Styles products
const vintageAntiqueProducts: DoorsWindowsProduct[] = Array(15).fill(null).map((_, index) => ({
  id: generateId("vintage-antique", index),
  name: [
    "Victorian Era Reproduction Door",
    "Art Deco Style Window Frame",
    "1920s Craftsman Entry Door",
    "Colonial Revival Window Set",
    "Vintage Stained Glass Door Insert",
    "Antique French Casement Window",
    "Mid-Century Modern Sliding Door",
    "Restored 19th Century Door",
    "Gothic Revival Arched Window",
    "Baroque Style Carved Door",
    "Edwardian Period Bay Window",
    "Vintage Farmhouse Dutch Door",
    "Renaissance Revival Window Frame",
    "Art Nouveau Decorative Door",
    "Georgian Style Sash Window"
  ][index],
  price: 79999 + (index * 6000),
  description: "Beautifully crafted doors and windows inspired by historical designs, combining traditional aesthetics with modern functionality.",
  features: [
    "Period-appropriate details",
    "Hand-crafted elements",
    "Authentic hardware options",
    "Modern weatherproofing",
    "Custom sizing available"
  ],
  material: "Solid hardwood, antique-style glass",
  deliveryTime: "6-8 weeks (custom crafted)",
  images: [
    "https://images.unsplash.com/photo-1532247328070-f8f357a732df?w=500&auto=format",
    "https://images.unsplash.com/photo-1490644658840-3f2e3f8c5625?w=500&auto=format",
    "https://images.unsplash.com/photo-1541532713592-79a0317b6b77?w=500&auto=format"
  ]
}));

// Space-Saving Solutions products
const spaceSavingProducts: DoorsWindowsProduct[] = Array(15).fill(null).map((_, index) => ({
  id: generateId("space-saving", index),
  name: [
    "Pocket Door System",
    "Accordion Folding Door",
    "Sliding Barn Door Kit",
    "Corner Window Solution",
    "Compact Balcony Door",
    "Murphy-Style Folding Window",
    "Space-Efficient Casement Window",
    "Sliding French Door System",
    "Bifold Closet Door Set",
    "Nested Sliding Window",
    "Flat-Fold Patio Door",
    "Wall-Integrated Sliding Door",
    "Concealed Track System Door",
    "Flush Mount Swinging Door",
    "Transformer Multi-Function Door"
  ][index],
  price: 54999 + (index * 3500),
  description: "Innovative door and window solutions designed specifically for small spaces, maximizing functionality without sacrificing style.",
  features: [
    "Minimal clearance requirements",
    "Multi-functional design",
    "Smooth operation",
    "Space-optimized hardware",
    "Flexible installation options"
  ],
  material: "Aluminum, wood, and glass combinations",
  deliveryTime: "2-3 weeks",
  images: [
    "https://images.unsplash.com/photo-1508022413785-fe20d0c2699a?w=500&auto=format",
    "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=500&auto=format",
    "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=500&auto=format"
  ]
}));

// Decorative Glass Features products
const decorativeGlassProducts: DoorsWindowsProduct[] = Array(15).fill(null).map((_, index) => ({
  id: generateId("decorative-glass", index),
  name: [
    "Stained Glass Panel Door",
    "Textured Rain Glass Window",
    "Etched Floral Design Door Insert",
    "Leaded Glass Victorian Window",
    "Frosted Geometric Pattern Door",
    "Beveled Glass Entry Door",
    "Tiffany Style Glass Window Insert",
    "Sand-Carved Art Glass Door",
    "Dichroic Glass Feature Window",
    "Fused Glass Door Panel System",
    "Hand-Painted Glass French Doors",
    "Mosaic Glass Interior Door",
    "Crystal Cut Glass Window Elements",
    "Stained Glass Transom Window",
    "Crackle Glass Panel Door"
  ][index],
  price: 69999 + (index * 4500),
  description: "Stunning decorative glass features that transform ordinary doors and windows into breathtaking works of art, filtering light in beautiful ways.",
  features: [
    "Custom glass designs",
    "Handcrafted details",
    "Light-filtering properties",
    "UV protection options",
    "Privacy variations available"
  ],
  material: "Artisan glass, custom framing",
  deliveryTime: "5-7 weeks (custom made)",
  images: [
    "https://images.unsplash.com/photo-1497604401993-f2e922e5cb0a?w=500&auto=format",
    "https://images.unsplash.com/photo-1596474250152-c49d0f4bb991?w=500&auto=format",
    "https://images.unsplash.com/photo-1520420097861-e4959843b682?w=500&auto=format"
  ]
}));

// Steel-Framed Designs products
const steelFramedProducts: DoorsWindowsProduct[] = Array(15).fill(null).map((_, index) => ({
  id: generateId("steel-framed", index),
  name: [
    "Industrial Style Steel Door",
    "Steel-Framed Factory Window",
    "Modern Black Steel Patio Door",
    "Minimalist Steel Casement Window",
    "Steel Grid Pattern French Door",
    "Thermally Broken Steel Window",
    "Designer Steel Entry Door System",
    "Steel-Framed Pivot Door",
    "Warehouse Style Steel Window",
    "Contemporary Steel Glass Door",
    "Steel-Framed Skylight Window",
    "Slim Profile Steel Door",
    "Steel and Glass Corner Window",
    "Industrial Loft Steel Door Set",
    "Custom Steel Window Wall"
  ][index],
  price: 84999 + (index * 5500),
  description: "Sleek, durable steel-framed doors and windows that bring industrial chic style to any space with clean lines and timeless appeal.",
  features: [
    "Slender profiles",
    "Maximum glass area",
    "Superior strength",
    "Weather resistant",
    "Contemporary aesthetic"
  ],
  material: "Powder-coated steel, tempered glass",
  deliveryTime: "4-6 weeks",
  images: [
    "https://images.unsplash.com/photo-1493397212122-2b85dda8106b?w=500&auto=format",
    "https://images.unsplash.com/photo-1600011689503-94921c801a1c?w=500&auto=format",
    "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=500&auto=format"
  ]
}));

// Customizable Color Options products
const customizableColorsProducts: DoorsWindowsProduct[] = Array(15).fill(null).map((_, index) => ({
  id: generateId("customizable-colors", index),
  name: [
    "Color-Match Technology Door",
    "Custom RAL Color Window System",
    "Dual-Color Finish Entry Door",
    "Gradient Color Patio Door",
    "Pantone-Matched Interior Door",
    "Color-Changing Smart Glass Window",
    "Vibrant Color Palette French Doors",
    "Designer Color Series Window",
    "Multi-Hue Stained Door",
    "Brand Color Match Corporate Door",
    "Seasonal Color Change Window System",
    "Two-Tone Frame Sliding Door",
    "Color Psychology Window System",
    "Custom Ombré Effect Door",
    "Limited Edition Color Door Collection"
  ][index],
  price: 59999 + (index * 4000),
  description: "Express your unique style with doors and windows available in virtually any color, with custom finishing options to complement your space perfectly.",
  features: [
    "Unlimited color options",
    "Color-matching service",
    "UV-resistant finishes",
    "Interior/exterior color options",
    "Premium paint quality"
  ],
  material: "Various materials with custom paint finishes",
  deliveryTime: "3-5 weeks",
  images: [
    "https://images.unsplash.com/photo-1489171078254-c3365d6e359f?w=500&auto=format",
    "https://images.unsplash.com/photo-1517142089942-ba376ce32a2e?w=500&auto=format",
    "https://images.unsplash.com/photo-1534889156217-d643df14f14a?w=500&auto=format"
  ]
}));

// Security & Fire-Resistant Features products
const securityFireResistantProducts: DoorsWindowsProduct[] = Array(15).fill(null).map((_, index) => ({
  id: generateId("security-fire-resistant", index),
  name: [
    "Fire-Rated 90-Minute Door",
    "Bulletproof Security Window",
    "Multi-Point Locking Entry Door",
    "Hurricane-Impact Resistant Window",
    "Thermal Barrier Fire Door",
    "Forced Entry Resistant Patio Door",
    "Smoke-Seal Technology Door Frame",
    "Reinforced Security Glass Window",
    "Fire-Rated with Vision Panel Door",
    "Biometric Access Control Door System",
    "Intumescent Fire Seal Window",
    "Anti-Burglar Window System",
    "CCTV-Integrated Entry Door",
    "Fire-Rated Commercial Door System",
    "High-Security Anti-Ram Door"
  ][index],
  price: 94999 + (index * 6500),
  description: "Advanced security and fire-resistant doors and windows designed to protect your family and property against various threats and emergencies.",
  features: [
    "Fire resistance ratings",
    "Tamper-proof hardware",
    "Advanced locking systems",
    "Impact resistance",
    "Emergency exit functionality"
  ],
  material: "Fire-resistant materials, reinforced glass, steel core",
  deliveryTime: "4-6 weeks",
  images: [
    "https://images.unsplash.com/photo-1622372738946-62e2b572d672?w=500&auto=format",
    "https://images.unsplash.com/photo-1517457210348-703d63431471?w=500&auto=format",
    "https://images.unsplash.com/photo-1600273759837-a4d4abb62142?w=500&auto=format"
  ]
}));

// Acoustic Insulation Solutions products
const acousticInsulationProducts: DoorsWindowsProduct[] = Array(15).fill(null).map((_, index) => ({
  id: generateId("acoustic-insulation", index),
  name: [
    "Sound Dampening Studio Door",
    "Acoustic-Rated Window System",
    "Triple-Glazed Noise Reduction Window",
    "Urban Quiet Series Entry Door",
    "Soundproof Home Office Door",
    "Acoustic Laminated Glass Window",
    "Decibel-Control Sliding Door",
    "Traffic Noise Reduction Window",
    "Recording Studio Grade Door",
    "Vibration Dampening Window Frame",
    "Sound Transmission Class 55 Door",
    "Noise Cancelling Technology Window",
    "Airport Zone Acoustic Door",
    "Multi-Chamber Sound Block Window",
    "Mass-Loaded Acoustic Core Door"
  ][index],
  price: 74999 + (index * 5000),
  description: "Specially designed doors and windows that significantly reduce noise transmission, creating peaceful, quiet environments even in busy locations.",
  features: [
    "High STC ratings",
    "Noise reduction technology",
    "Specialized acoustic seals",
    "Multi-layer glass options",
    "Vibration dampening frames"
  ],
  material: "Acoustic glass, multi-density materials, specialized sealing",
  deliveryTime: "3-5 weeks",
  images: [
    "https://images.unsplash.com/photo-1460574283810-2aab119d8511?w=500&auto=format",
    "https://images.unsplash.com/photo-1603712562908-6cb1e49d01d9?w=500&auto=format",
    "https://images.unsplash.com/photo-1564183695335-cde9f9dd8637?w=500&auto=format"
  ]
}));

// Traditional & Cultural Designs products
const traditionalCulturalProducts: DoorsWindowsProduct[] = Array(15).fill(null).map((_, index) => ({
  id: generateId("traditional-cultural", index),
  name: [
    "Japanese Shoji Screen Door",
    "Moroccan Carved Wood Door",
    "Victorian Style Bay Window",
    "Spanish Colonial Arched Door",
    "Chinese Lattice Pattern Window",
    "Indian Haveli Style Door",
    "Dutch Colonial Double-Hung Window",
    "Mediterranean Wrought Iron Door",
    "Scandinavian Hygge Window Design",
    "Thai Temple-Inspired Entry Door",
    "Russian Dacha Style Window",
    "African Tribal Pattern Door",
    "Greek Revival Window Pediment",
    "Middle Eastern Mashrabiya Window",
    "Celtic Knotwork Carved Door"
  ][index],
  price: 89999 + (index * 7000),
  description: "Culturally inspired doors and windows that celebrate traditional craftsmanship and design elements from around the world.",
  features: [
    "Authentic cultural elements",
    "Traditional crafting methods",
    "Symbolic patterns and motifs",
    "Regional design aesthetics",
    "Historical significance"
  ],
  material: "Varies by cultural style - hardwoods, metalwork, specialty glass",
  deliveryTime: "8-10 weeks (hand-crafted)",
  images: [
    "https://images.unsplash.com/photo-1519024778166-c84c3dfeb1a6?w=500&auto=format",
    "https://images.unsplash.com/photo-1514447114606-d38e646066a5?w=500&auto=format",
    "https://images.unsplash.com/photo-1603384699007-50799d835034?w=500&auto=format"
  ]
}));

// Combine all the doors and windows products
export const doorsWindowsProducts = {
  "smart-automated": smartAutomatedProducts,
  "sustainable-designs": sustainableDesignsProducts,
  "vintage-antique": vintageAntiqueProducts,
  "space-saving": spaceSavingProducts,
  "decorative-glass": decorativeGlassProducts,
  "steel-framed": steelFramedProducts,
  "customizable-colors": customizableColorsProducts,
  "security-fire-resistant": securityFireResistantProducts,
  "acoustic-insulation": acousticInsulationProducts,
  "traditional-cultural": traditionalCulturalProducts,
};
