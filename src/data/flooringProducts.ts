
// Flooring subcategories with descriptions and images
export const flooringCategories = [
  { name: "Hardwood", path: "hardwood", image: "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=500&auto=format", description: "Classic, durable hardwood flooring options" },
  { name: "Engineered Wood", path: "engineered-wood", image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=500&auto=format", description: "Versatile engineered wood solutions" },
  { name: "Laminate", path: "laminate", image: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=500&auto=format", description: "Affordable and durable laminate flooring" },
  { name: "Vinyl Plank", path: "vinyl-plank", image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=500&auto=format", description: "Water-resistant luxury vinyl plank options" },
  { name: "Vinyl Tile", path: "vinyl-tile", image: "https://images.unsplash.com/photo-1458668383970-8ddd3927deed?w=500&auto=format", description: "Stylish and practical vinyl tile flooring" },
  { name: "Sheet Vinyl", path: "sheet-vinyl", image: "https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=500&auto=format", description: "Seamless sheet vinyl for bathroom and kitchen" },
  { name: "Ceramic Tile", path: "ceramic-tile", image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=500&auto=format", description: "Durable ceramic tile flooring options" },
  { name: "Porcelain Tile", path: "porcelain-tile", image: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=500&auto=format", description: "Premium porcelain tile solutions" },
  { name: "Natural Stone", path: "natural-stone", image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=500&auto=format", description: "Elegant natural stone flooring" },
  { name: "Carpet", path: "carpet", image: "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?w=500&auto=format", description: "Soft and comfortable carpet options" },
  { name: "Bamboo", path: "bamboo", image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=500&auto=format", description: "Sustainable bamboo flooring solutions" },
  { name: "Cork", path: "cork", image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=500&auto=format", description: "Eco-friendly cork flooring options" },
  { name: "Concrete", path: "concrete", image: "https://images.unsplash.com/photo-1615729947596-a598e5de0ab3?w=500&auto=format", description: "Modern polished concrete flooring" },
  { name: "Epoxy", path: "epoxy", image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=500&auto=format", description: "Seamless epoxy floor coatings" },
  { name: "Rubber", path: "rubber", image: "https://images.unsplash.com/photo-1493397212122-2b85dda8106b?w=500&auto=format", description: "Durable rubber flooring solutions" },
];

// Helper function to generate unique IDs
const generateId = (subcategory: string, index: number): string => {
  return `flooring-${subcategory}-${index + 1}`;
};

// Generate 15 hardwood flooring products
export const hardwoodProducts = Array(15).fill(null).map((_, index) => ({
  id: generateId("hardwood", index),
  name: [
    "Classic Oak Hardwood", 
    "Brazilian Cherry Hardwood", 
    "Maple Natural Hardwood",
    "White Oak Engineered Hardwood",
    "Walnut Dark Stain Hardwood",
    "Hickory Hand-Scraped Hardwood",
    "Acacia Distressed Hardwood",
    "Ash Gray Solid Hardwood",
    "Reclaimed Barnwood Planks",
    "Teak Premium Hardwood",
    "Mahogany Exotic Hardwood",
    "Pine Rustic Wide Plank",
    "Red Oak Traditional Hardwood",
    "Tigerwood Exotic Hardwood",
    "Black Walnut Premium Hardwood"
  ][index],
  price: 32999 + (index * 2000),
  description: "Beautiful, durable hardwood flooring made from sustainable forests. Adds warmth and character to any room.",
  material: "Solid hardwood",
  coverage: "25 sq. ft. per box",
  warranty: "25 years residential",
  images: [
    [
      "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=500&auto=format",
      "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=500&auto=format",
      "https://images.unsplash.com/photo-1562663474-6cbb3eaa4d14?w=500&auto=format"
    ],
    [
      "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=500&auto=format",
      "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=500&auto=format",
      "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=500&auto=format"
    ],
    [
      "https://images.unsplash.com/photo-1538098321-39b0c6906fd4?w=500&auto=format",
      "https://images.unsplash.com/photo-1595515106864-077d30192c56?w=500&auto=format",
      "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=500&auto=format"
    ]
  ][index % 3]
}));

// Generate 15 engineered wood flooring products
export const engineeredWoodProducts = Array(15).fill(null).map((_, index) => ({
  id: generateId("engineered-wood", index),
  name: [
    "Oak Engineered Hardwood", 
    "Maple Engineered Flooring", 
    "Hickory Engineered Planks",
    "Walnut Engineered Hardwood",
    "European Oak Engineered",
    "French Oak Engineered Wood",
    "Acacia Engineered Hardwood",
    "Birch Multi-layer Engineered",
    "White Oak Wire-Brushed Engineered",
    "Cherry Engineered Hardwood",
    "Mahogany Engineered Planks",
    "Bamboo Engineered Flooring",
    "Beech Engineered Hardwood",
    "Ash Engineered Wood Planks",
    "Teak Engineered Hardwood"
  ][index],
  price: 27999 + (index * 1500),
  description: "Multi-layered engineered wood flooring that combines stability with the beauty of real hardwood.",
  material: "Engineered hardwood",
  coverage: "22 sq. ft. per box",
  warranty: "20 years residential",
  images: [
    [
      "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=500&auto=format",
      "https://images.unsplash.com/photo-1517207591548-ca350c599304?w=500&auto=format",
      "https://images.unsplash.com/photo-1523413307857-ef24c53571ae?w=500&auto=format"
    ],
    [
      "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=500&auto=format",
      "https://images.unsplash.com/photo-1517207591548-ca350c599304?w=500&auto=format",
      "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=500&auto=format"
    ],
    [
      "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=500&auto=format",
      "https://images.unsplash.com/photo-1466248597128-23e04283a2f8?w=500&auto=format",
      "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=500&auto=format"
    ]
  ][index % 3]
}));

// Generate 15 laminate flooring products
export const laminateProducts = Array(15).fill(null).map((_, index) => ({
  id: generateId("laminate", index),
  name: [
    "Oak Effect Laminate", 
    "Walnut Finish Laminate", 
    "Stone Look Waterproof Laminate",
    "Gray Oak Laminate Planks",
    "Whitewashed Wood Laminate",
    "Cherry Effect Laminate",
    "Distressed Wood Laminate",
    "Maple Look Laminate Flooring",
    "Rustic Farmhouse Laminate",
    "High-gloss White Laminate",
    "Slate Effect Laminate",
    "Barn Wood Style Laminate",
    "Hickory Look Laminate",
    "Concrete Effect Laminate",
    "Vintage Wood Laminate"
  ][index],
  price: 18999 + (index * 1000),
  description: "Durable, affordable laminate flooring with realistic wood or stone appearance and easy installation.",
  material: "High-density fiberboard with melamine wear layer",
  coverage: "30 sq. ft. per box",
  warranty: "15 years residential",
  images: [
    [
      "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=500&auto=format",
      "https://images.unsplash.com/photo-1604014838805-4e6f3fb0a89c?w=500&auto=format",
      "https://images.unsplash.com/photo-1541123437800-1bb1317badc2?w=500&auto=format"
    ],
    [
      "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=500&auto=format",
      "https://images.unsplash.com/photo-1605774337664-7a846e9cdf17?w=500&auto=format",
      "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=500&auto=format"
    ],
    [
      "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=500&auto=format",
      "https://images.unsplash.com/photo-1630699144918-784b8b9d0128?w=500&auto=format",
      "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=500&auto=format"
    ]
  ][index % 3]
}));

// Generate 15 vinyl plank flooring products
export const vinylPlankProducts = Array(15).fill(null).map((_, index) => ({
  id: generateId("vinyl-plank", index),
  name: [
    "Waterproof LVP Oak", 
    "Stone-Look Vinyl Plank", 
    "Gray Ash Vinyl Planks",
    "Reclaimed Wood LVP",
    "Rigid Core Vinyl Planks",
    "Coastal Oak Vinyl Flooring",
    "Weathered Pine LVP",
    "Click-Lock Vinyl Planks",
    "Farmhouse Vinyl Flooring",
    "Commercial Grade LVP",
    "Wide Plank Luxury Vinyl",
    "Distressed Wood Vinyl Planks",
    "Marble-Look Vinyl Planks",
    "Hickory Vinyl Plank Flooring",
    "Slate Effect LVP"
  ][index],
  price: 21999 + (index * 1200),
  description: "Waterproof, durable luxury vinyl plank flooring with realistic wood or stone appearance.",
  material: "Luxury vinyl with wear layer",
  coverage: "35 sq. ft. per box",
  warranty: "20 years residential",
  images: [
    [
      "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=500&auto=format",
      "https://images.unsplash.com/photo-1618219944342-824e40a13285?w=500&auto=format",
      "https://images.unsplash.com/photo-1580485881553-144cc892e336?w=500&auto=format"
    ],
    [
      "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=500&auto=format",
      "https://images.unsplash.com/photo-1618219944342-824e40a13285?w=500&auto=format",
      "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=500&auto=format"
    ],
    [
      "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=500&auto=format",
      "https://images.unsplash.com/photo-1604014838805-4e6f3fb0a89c?w=500&auto=format",
      "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=500&auto=format"
    ]
  ][index % 3]
}));

// Generate 15 vinyl tile flooring products
export const vinylTileProducts = Array(15).fill(null).map((_, index) => ({
  id: generateId("vinyl-tile", index),
  name: [
    "Marble Look LVT", 
    "Stone Effect Vinyl Tiles", 
    "Travertine Vinyl Tile",
    "Slate Look LVT",
    "Ceramic-Look Vinyl Tiles",
    "Terrazzo Effect LVT",
    "Peel-and-Stick Vinyl Tiles",
    "Herringbone LVT Design",
    "Limestone Look Vinyl Tile",
    "Concrete Effect LVT",
    "Granite Look Vinyl Tiles",
    "Geometric Pattern LVT",
    "Sandstone Effect Vinyl Tile",
    "Wood-Look Vinyl Tiles",
    "Metallic Finish LVT"
  ][index],
  price: 19999 + (index * 1100),
  description: "Durable and waterproof luxury vinyl tiles that replicate the look of ceramic, stone, or decorative patterns.",
  material: "Luxury vinyl with wear layer",
  coverage: "30 sq. ft. per box",
  warranty: "15 years residential",
  images: [
    [
      "https://images.unsplash.com/photo-1458668383970-8ddd3927deed?w=500&auto=format",
      "https://images.unsplash.com/photo-1607825923769-87713df580d2?w=500&auto=format",
      "https://images.unsplash.com/photo-1590997029696-8066b2c9ce9f?w=500&auto=format"
    ],
    [
      "https://images.unsplash.com/photo-1458668383970-8ddd3927deed?w=500&auto=format",
      "https://images.unsplash.com/photo-1590997029696-8066b2c9ce9f?w=500&auto=format",
      "https://images.unsplash.com/photo-1458668383970-8ddd3927deed?w=500&auto=format"
    ],
    [
      "https://images.unsplash.com/photo-1458668383970-8ddd3927deed?w=500&auto=format",
      "https://images.unsplash.com/photo-1647016020212-1fe7191ae198?w=500&auto=format",
      "https://images.unsplash.com/photo-1458668383970-8ddd3927deed?w=500&auto=format"
    ]
  ][index % 3]
}));

// Generate 15 sheet vinyl flooring products
export const sheetVinylProducts = Array(15).fill(null).map((_, index) => ({
  id: generateId("sheet-vinyl", index),
  name: [
    "Wood Pattern Sheet Vinyl", 
    "Marble Look Sheet Vinyl", 
    "Stone Effect Cushioned Vinyl",
    "Floral Pattern Sheet Vinyl",
    "Geometric Design Vinyl Sheet",
    "Tile Look Sheet Vinyl",
    "Mosaic Pattern Cushioned Vinyl",
    "Slate Effect Sheet Vinyl",
    "Terrazzo Look Sheet Vinyl",
    "Concrete Pattern Vinyl Sheet",
    "Classic Parquet Vinyl",
    "Modern Abstract Sheet Vinyl",
    "Waterproof Kitchen Sheet Vinyl",
    "Bathroom Safe Vinyl Flooring",
    "Commercial Grade Sheet Vinyl"
  ][index],
  price: 15999 + (index * 800),
  description: "Seamless sheet vinyl flooring that's water-resistant and perfect for bathrooms, kitchens, and laundry rooms.",
  material: "PVC vinyl with cushioned backing",
  coverage: "12 ft. width, sold by linear foot",
  warranty: "10 years residential",
  images: [
    [
      "https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=500&auto=format",
      "https://images.unsplash.com/photo-1580485881553-144cc892e336?w=500&auto=format",
      "https://images.unsplash.com/photo-1604014838805-4e6f3fb0a89c?w=500&auto=format"
    ],
    [
      "https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=500&auto=format",
      "https://images.unsplash.com/photo-1604014838805-4e6f3fb0a89c?w=500&auto=format",
      "https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=500&auto=format"
    ],
    [
      "https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=500&auto=format",
      "https://images.unsplash.com/photo-1594126723255-58c9a9283d23?w=500&auto=format",
      "https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=500&auto=format"
    ]
  ][index % 3]
}));

// Generate 15 ceramic tile flooring products
export const ceramicTileProducts = Array(15).fill(null).map((_, index) => ({
  id: generateId("ceramic-tile", index),
  name: [
    "Classic White Ceramic Tile", 
    "Subway Ceramic Wall Tile", 
    "Moroccan Pattern Ceramic",
    "Wood Look Ceramic Planks",
    "Stone Effect Ceramic Tile",
    "Hexagon Ceramic Floor Tile",
    "Terracotta Ceramic Tiles",
    "Blue Decorative Ceramic",
    "Weathered Look Ceramic",
    "Modern Gray Ceramic Tile",
    "Patterned Encaustic-Look Ceramic",
    "Glossy Ceramic Wall Tile",
    "Matte Finish Floor Ceramic",
    "Rustic Farmhouse Ceramic",
    "Industrial Style Ceramic Tile"
  ][index],
  price: 22999 + (index * 1300),
  description: "Durable ceramic tile flooring available in countless designs, colors, and sizes for any room.",
  material: "Ceramic",
  coverage: "15 sq. ft. per box",
  warranty: "Limited lifetime warranty",
  images: [
    [
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=500&auto=format",
      "https://images.unsplash.com/photo-1541123437800-1bb1317badc2?w=500&auto=format",
      "https://images.unsplash.com/photo-1594068304167-3010686c91fc?w=500&auto=format"
    ],
    [
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=500&auto=format",
      "https://images.unsplash.com/photo-1594068304167-3010686c91fc?w=500&auto=format",
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=500&auto=format"
    ],
    [
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=500&auto=format",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=500&auto=format",
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=500&auto=format"
    ]
  ][index % 3]
}));

// Generate 15 porcelain tile flooring products
export const porcelainTileProducts = Array(15).fill(null).map((_, index) => ({
  id: generateId("porcelain-tile", index),
  name: [
    "Italian Porcelain Floor Tile", 
    "Marble Look Porcelain", 
    "Wood Effect Porcelain Planks",
    "Slate Look Porcelain Tile",
    "Travertine Style Porcelain",
    "Large Format Porcelain Slabs",
    "Concrete Look Porcelain Tile",
    "Terrazzo Effect Porcelain",
    "Limestone Look Porcelain",
    "Industrial Style Porcelain",
    "Crystal Polished Porcelain",
    "Textured Porcelain Tile",
    "Outdoor Porcelain Pavers",
    "Stone Effect Porcelain",
    "Designer Pattern Porcelain"
  ][index],
  price: 29999 + (index * 1800),
  description: "Premium porcelain tile with superior durability, moisture resistance, and design versatility.",
  material: "Porcelain",
  coverage: "12 sq. ft. per box",
  warranty: "Limited lifetime warranty",
  images: [
    [
      "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=500&auto=format",
      "https://images.unsplash.com/photo-1631735237431-5df4a5a56ab9?w=500&auto=format",
      "https://images.unsplash.com/photo-1631735237688-012900559c96?w=500&auto=format"
    ],
    [
      "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=500&auto=format",
      "https://images.unsplash.com/photo-1631735237688-012900559c96?w=500&auto=format",
      "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=500&auto=format"
    ],
    [
      "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=500&auto=format",
      "https://images.unsplash.com/photo-1607825923769-87713df580d2?w=500&auto=format",
      "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=500&auto=format"
    ]
  ][index % 3]
}));

// Generate 15 natural stone flooring products
export const naturalStoneProducts = Array(15).fill(null).map((_, index) => ({
  id: generateId("natural-stone", index),
  name: [
    "Carrara Marble Tiles", 
    "Black Granite Floor Tiles", 
    "Travertine Natural Stone",
    "Jerusalem Gold Limestone",
    "Slate Floor Tiles",
    "Quartzite Stone Flooring",
    "Onyx Premium Stone Tiles",
    "Sandstone Floor Pavers",
    "Bluestone Natural Tiles",
    "Green Marble Flooring",
    "Emperador Marble Tiles",
    "Basalt Stone Flooring",
    "Calacatta Gold Marble",
    "Tumbled Limestone Pavers",
    "Polished Granite Tiles"
  ][index],
  price: 39999 + (index * 2500),
  description: "Luxurious natural stone flooring that adds timeless beauty and value to any space.",
  material: "Natural stone",
  coverage: "10 sq. ft. per box",
  warranty: "Limited lifetime warranty",
  images: [
    [
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=500&auto=format",
      "https://images.unsplash.com/photo-1590997029696-8066b2c9ce9f?w=500&auto=format",
      "https://images.unsplash.com/photo-1594068304883-69c85646cc2a?w=500&auto=format"
    ],
    [
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=500&auto=format",
      "https://images.unsplash.com/photo-1594068304883-69c85646cc2a?w=500&auto=format",
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=500&auto=format"
    ],
    [
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=500&auto=format",
      "https://images.unsplash.com/photo-1647016020212-1fe7191ae198?w=500&auto=format",
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=500&auto=format"
    ]
  ][index % 3]
}));

// Generate 15 carpet flooring products
export const carpetProducts = Array(15).fill(null).map((_, index) => ({
  id: generateId("carpet", index),
  name: [
    "Plush Wool Carpet", 
    "Berber Loop Carpet", 
    "Cut Pile Textured Carpet",
    "Frieze Twisted Carpet",
    "Pattern Loop Carpet",
    "Saxony Deep Pile Carpet",
    "Level Loop Commercial Carpet",
    "Indoor-Outdoor Carpet",
    "Cut and Loop Pattern Carpet",
    "Pet-Friendly Stain Resistant Carpet",
    "Wool Blend Luxury Carpet",
    "Low Pile Office Carpet",
    "Patterned Hospitality Carpet",
    "Eco-Friendly Recycled Carpet",
    "Waterproof Basement Carpet"
  ][index],
  price: 24999 + (index * 1200),
  description: "Soft, comfortable carpet flooring available in various styles, textures, and colors for cozy spaces.",
  material: "Nylon, polyester, or wool blend",
  coverage: "Sold by square yard",
  warranty: "10-15 years stain and wear warranty",
  images: [
    [
      "https://images.unsplash.com/photo-1523713999610-f77fbcfc3843?w=500&auto=format",
      "https://images.unsplash.com/photo-1589834390005-5d4d488c95bb?w=500&auto=format",
      "https://images.unsplash.com/photo-1533044309907-0fa3413da946?w=500&auto=format"
    ],
    [
      "https://images.unsplash.com/photo-1523713999610-f77fbcfc3843?w=500&auto=format",
      "https://images.unsplash.com/photo-1533044309907-0fa3413da946?w=500&auto=format",
      "https://images.unsplash.com/photo-1523713999610-f77fbcfc3843?w=500&auto=format"
    ],
    [
      "https://images.unsplash.com/photo-1523713999610-f77fbcfc3843?w=500&auto=format",
      "https://images.unsplash.com/photo-1544427920-c49ccfb85579?w=500&auto=format",
      "https://images.unsplash.com/photo-1523713999610-f77fbcfc3843?w=500&auto=format"
    ]
  ][index % 3]
}));

// Generate 15 bamboo flooring products
export const bambooProducts = Array(15).fill(null).map((_, index) => ({
  id: generateId("bamboo", index),
  name: [
    "Solid Bamboo Flooring", 
    "Engineered Bamboo Planks", 
    "Strand Woven Bamboo",
    "Carbonized Bamboo Flooring",
    "Natural Vertical Bamboo",
    "Horizontal Grain Bamboo",
    "Tiger Stripe Bamboo",
    "Distressed Bamboo Flooring",
    "Hand-Scraped Bamboo",
    "Click-Lock Bamboo Planks",
    "Wide Plank Bamboo Flooring",
    "Antiqued Bamboo Floors",
    "Brushed Bamboo Planks",
    "High Gloss Bamboo Flooring",
    "Matte Finish Sustainable Bamboo"
  ][index],
  price: 26999 + (index * 1400),
  description: "Sustainable, durable bamboo flooring with the look of hardwood and excellent ecological benefits.",
  material: "Moso bamboo",
  coverage: "22 sq. ft. per box",
  warranty: "25 years residential",
  images: [
    [
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=500&auto=format",
      "https://images.unsplash.com/photo-1528819066940-41bfca34bf46?w=500&auto=format",
      "https://images.unsplash.com/photo-1600566753543-3d9a35368eac?w=500&auto=format"
    ],
    [
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=500&auto=format",
      "https://images.unsplash.com/photo-1600566753543-3d9a35368eac?w=500&auto=format",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=500&auto=format"
    ],
    [
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=500&auto=format",
      "https://images.unsplash.com/photo-1581929955747-61e5c9fe23e0?w=500&auto=format",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=500&auto=format"
    ]
  ][index % 3]
}));

// Generate 15 cork flooring products
export const corkProducts = Array(15).fill(null).map((_, index) => ({
  id: generateId("cork", index),
  name: [
    "Natural Cork Tiles", 
    "Engineered Cork Planks", 
    "Floating Cork Flooring",
    "Patterned Cork Tiles",
    "Colored Cork Flooring",
    "High-Density Cork Planks",
    "Wide Plank Cork Flooring",
    "Glue-Down Cork Tiles",
    "Acoustic Cork Underlayment",
    "Digital Print Cork Flooring",
    "Cork and Wood Composite",
    "Marble Look Cork Tiles",
    "Textured Surface Cork",
    "Commercial Grade Cork Flooring",
    "Thermal Insulating Cork Planks"
  ][index],
  price: 23999 + (index * 1100),
  description: "Sustainable cork flooring that provides comfort underfoot, noise reduction, and natural insulation.",
  material: "Cork oak bark",
  coverage: "20 sq. ft. per box",
  warranty: "15 years residential",
  images: [
    [
      "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=500&auto=format",
      "https://images.unsplash.com/photo-1610328466269-1f36faad9381?w=500&auto=format",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3d7?w=500&auto=format"
    ],
    [
      "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=500&auto=format",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3d7?w=500&auto=format",
      "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=500&auto=format"
    ],
    [
      "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=500&auto=format",
      "https://images.unsplash.com/photo-1517898717281-71787fcf5a9b?w=500&auto=format",
      "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=500&auto=format"
    ]
  ][index % 3]
}));

// Generate 15 concrete flooring products
export const concreteProducts = Array(15).fill(null).map((_, index) => ({
  id: generateId("concrete", index),
  name: [
    "Polished Concrete System", 
    "Stained Concrete Flooring", 
    "Concrete Microtopping",
    "Stamped Concrete Overlay",
    "Acid-Stained Concrete",
    "Concrete Resurfacing System",
    "Decorative Concrete Overlay",
    "Industrial Concrete Sealer",
    "Colored Concrete Finish",
    "Metallic Epoxy Concrete Coating",
    "Concrete Grinding System",
    "Exposed Aggregate Concrete",
    "Self-Leveling Concrete",
    "Concrete Densifier Treatment",
    "Designer Concrete Flooring"
  ][index],
  price: 19999 + (index * 1500),
  description: "Modern, durable concrete flooring solutions from polished concrete to decorative overlays.",
  material: "Concrete with specialized treatments",
  coverage: "System components sold separately",
  warranty: "5-10 years depending on system",
  images: [
    [
      "https://images.unsplash.com/photo-1615729947596-a598e5de0ab3?w=500&auto=format",
      "https://images.unsplash.com/photo-1594068304544-3b79f1a1355c?w=500&auto=format",
      "https://images.unsplash.com/photo-1598030305578-a8c4483a8da5?w=500&auto=format"
    ],
    [
      "https://images.unsplash.com/photo-1615729947596-a598e5de0ab3?w=500&auto=format",
      "https://images.unsplash.com/photo-1598030305578-a8c4483a8da5?w=500&auto=format",
      "https://images.unsplash.com/photo-1615729947596-a598e5de0ab3?w=500&auto=format"
    ],
    [
      "https://images.unsplash.com/photo-1615729947596-a598e5de0ab3?w=500&auto=format",
      "https://images.unsplash.com/photo-1609616567658-8fb198e79944?w=500&auto=format",
      "https://images.unsplash.com/photo-1615729947596-a598e5de0ab3?w=500&auto=format"
    ]
  ][index % 3]
}));

// Generate 15 epoxy flooring products
export const epoxyProducts = Array(15).fill(null).map((_, index) => ({
  id: generateId("epoxy", index),
  name: [
    "Metallic Epoxy System", 
    "Solid Color Epoxy Floor Coating", 
    "Flake Epoxy System",
    "Clear Epoxy Sealer",
    "High-Build Epoxy Coating",
    "Decorative Quartz Epoxy",
    "3D Effect Epoxy Flooring",
    "Industrial Epoxy System",
    "Commercial Kitchen Epoxy",
    "Garage Floor Epoxy Kit",
    "Hospital Grade Antimicrobial Epoxy",
    "Self-Leveling Epoxy",
    "Chemical Resistant Epoxy",
    "Designer Metallic Epoxy",
    "UV-Stable Epoxy Coating"
  ][index],
  price: 28999 + (index * 1700),
  description: "Seamless, durable epoxy flooring systems for commercial, industrial, and residential applications.",
  material: "Two-component epoxy resin",
  coverage: "Covers approximately 300 sq. ft. per kit",
  warranty: "5 years residential, 3 years commercial",
  images: [
    [
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=500&auto=format",
      "https://images.unsplash.com/photo-1594068304544-3b79f1a1355c?w=500&auto=format",
      "https://images.unsplash.com/photo-1461799398477-cf5c22831b6f?w=500&auto=format"
    ],
    [
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=500&auto=format",
      "https://images.unsplash.com/photo-1461799398477-cf5c22831b6f?w=500&auto=format",
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=500&auto=format"
    ],
    [
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=500&auto=format",
      "https://images.unsplash.com/photo-1598030305578-a8c4483a8da5?w=500&auto=format",
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=500&auto=format"
    ]
  ][index % 3]
}));

// Generate 15 rubber flooring products
export const rubberProducts = Array(15).fill(null).map((_, index) => ({
  id: generateId("rubber", index),
  name: [
    "Rubber Gym Flooring Rolls", 
    "Interlocking Rubber Tiles", 
    "Recycled Rubber Flooring",
    "Commercial Rubber Tiles",
    "Rubber Playground Tiles",
    "Color Fleck Rubber Flooring",
    "Anti-Fatigue Rubber Mats",
    "Rubber Sports Flooring",
    "Non-Slip Rubber Flooring",
    "Sound Dampening Rubber Underlayment",
    "Rubber Stair Treads",
    "Designer Rubber Floor Tiles",
    "Rubber Sheet Flooring",
    "Rubber Dance Floor",
    "Impact Absorbing Rubber Flooring"
  ][index],
  price: 18999 + (index * 900),
  description: "Durable, resilient rubber flooring perfect for gyms, playrooms, and high-traffic commercial spaces.",
  material: "Recycled or virgin rubber",
  coverage: "Varies by product format",
  warranty: "5-10 years depending on application",
  images: [
    [
      "https://images.unsplash.com/photo-1493397212122-2b85dda8106b?w=500&auto=format",
      "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=500&auto=format",
      "https://images.unsplash.com/photo-1461799398477-cf5c22831b6f?w=500&auto=format"
    ],
    [
      "https://images.unsplash.com/photo-1493397212122-2b85dda8106b?w=500&auto=format",
      "https://images.unsplash.com/photo-1461799398477-cf5c22831b6f?w=500&auto=format",
      "https://images.unsplash.com/photo-1493397212122-2b85dda8106b?w=500&auto=format"
    ],
    [
      "https://images.unsplash.com/photo-1493397212122-2b85dda8106b?w=500&auto=format",
      "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=500&auto=format",
      "https://images.unsplash.com/photo-1493397212122-2b85dda8106b?w=500&auto=format"
    ]
  ][index % 3]
}));

// Export combined flooring products data
export const flooringProducts = {
  "hardwood": hardwoodProducts,
  "engineered-wood": engineeredWoodProducts,
  "laminate": laminateProducts,
  "vinyl-plank": vinylPlankProducts,
  "vinyl-tile": vinylTileProducts,
  "sheet-vinyl": sheetVinylProducts,
  "ceramic-tile": ceramicTileProducts,
  "porcelain-tile": porcelainTileProducts,
  "natural-stone": naturalStoneProducts,
  "carpet": carpetProducts,
  "bamboo": bambooProducts,
  "cork": corkProducts,
  "concrete": concreteProducts,
  "epoxy": epoxyProducts,
  "rubber": rubberProducts,
};
