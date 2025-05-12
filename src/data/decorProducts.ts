
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

// Products for sculptures & figurines
const sculpturesFigurinesProducts = Array(15).fill(null).map((_, index) => ({
  id: generateId("decor", "sculptures-figurines", index),
  name: [
    "Recycled Metal Bird Sculpture",
    "Carved Bamboo Buddha Figurine",
    "Reclaimed Wood Animal Statuette",
    "Clay Earth Goddess Sculpture",
    "Upcycled Glass Sea Creatures",
    "Stone Balance Sculpture",
    "Terracotta Abstract Figure",
    "Sustainable Teak Root Carving",
    "Paper Pulp Modern Art Piece",
    "Hemp Fiber Forest Spirit",
    "Coconut Shell Carved Owl",
    "Handcrafted Ceramic Family Figures",
    "Salvaged Driftwood Horse",
    "Recycled Metal Wire Tree",
    "Natural Clay Indigenous Art Piece"
  ][index],
  price: 7999 + (index * 1200),
  description: "Artisan-made sculptures and figurines crafted from sustainable and eco-friendly materials, adding character to your home decor.",
  material: [
    "Recycled metal", 
    "Sustainable bamboo", 
    "Reclaimed wood", 
    "Natural clay", 
    "Upcycled glass", 
    "River stones", 
    "Local terracotta", 
    "Sustainable teak root", 
    "Recycled paper pulp", 
    "Organic hemp fiber", 
    "Coconut shell", 
    "Local clay and natural glazes", 
    "Natural driftwood", 
    "Recycled metal wire", 
    "Natural clay and pigments"
  ][index],
  deliveryTime: "2-3 weeks",
  images: [
    `https://images.unsplash.com/photo-${[
      "1591105514584-15af09e209a7",
      "1552053831-71594a6904b8",
      "1606913419164-31d3cd6ce2b5",
      "1563380144645-7b4ff25ab017",
      "1619964359339-202929cb6851",
      "1501644898242-cfea317d7faf",
      "1580192985937-9f97f8b7a5bf",
      "1623680665450-d3b93030ac1d",
      "1562076573-45591fac00c1",
      "1509423350916-44bd8f4d5788",
      "1569398934903-0b9c0dfd90b3",
      "1516437124483-dc42d5156521",
      "1601587694248-7068d4712a19",
      "1589848028212-5cd3d59c8314",
      "1597384045240-f172eaea2a50"
    ][index]}?q=80&w=1035&auto=format&fit=crop`,
    `https://images.unsplash.com/photo-${[
      "1552053831-71594a6904b8",
      "1606913419164-31d3cd6ce2b5",
      "1563380144645-7b4ff25ab017",
      "1619964359339-202929cb6851",
      "1501644898242-cfea317d7faf",
      "1580192985937-9f97f8b7a5bf",
      "1623680665450-d3b93030ac1d",
      "1562076573-45591fac00c1",
      "1509423350916-44bd8f4d5788",
      "1569398934903-0b9c0dfd90b3",
      "1516437124483-dc42d5156521",
      "1601587694248-7068d4712a19",
      "1589848028212-5cd3d59c8314",
      "1597384045240-f172eaea2a50",
      "1591105514584-15af09e209a7"
    ][index]}?q=80&w=1035&auto=format&fit=crop`
  ]
}));

// Products for candles & holders
const candlesHoldersProducts = Array(15).fill(null).map((_, index) => ({
  id: generateId("decor", "candles-holders", index),
  name: [
    "Organic Beeswax Pillar Candle Set",
    "Recycled Glass Tea Light Holder",
    "Carved Stone Candle Dish",
    "Bamboo Lantern Candle Holder",
    "Handcrafted Ceramic Candle Bowl",
    "Soy Wax Botanical Candles",
    "Reclaimed Wood Hurricane Lantern",
    "Terracotta Hanging Candle Holder",
    "Coconut Shell Votive Set",
    "Recycled Metal Taper Holders",
    "Hand-Poured Essential Oil Candles",
    "Carved Alabaster Candle Stand",
    "Driftwood Tealight Display",
    "Macramé Hanging Candle Holder",
    "Recycled Bottle Candelabra"
  ][index],
  price: 4499 + (index * 1000),
  description: "Sustainable candles and beautiful holders made from eco-friendly materials, creating a warm, inviting atmosphere in any space.",
  material: [
    "Organic beeswax", 
    "Recycled glass", 
    "Natural soapstone", 
    "Sustainable bamboo", 
    "Local clay", 
    "Organic soy wax and dried flowers", 
    "Reclaimed wood and glass", 
    "Natural terracotta", 
    "Coconut shell", 
    "Recycled metal", 
    "Organic soy wax and essential oils", 
    "Natural alabaster stone", 
    "Natural driftwood", 
    "Organic cotton rope", 
    "Upcycled glass bottles"
  ][index],
  deliveryTime: "1-2 weeks",
  images: [
    `https://images.unsplash.com/photo-${[
      "1603006905003-be475563bc59",
      "1547995886-67eff35d71ad",
      "1514090555194-9721aeecc9ce",
      "1528702451830-97e5d5d5a035",
      "1636716398357-fad5a41aa5d1",
      "1573551461515-4780dd4bc55a",
      "1602827167665-c8316d4eb861",
      "1603186982498-64b7ae3735a2",
      "1563086518389-ffae7213448a",
      "1586375300773-8384e3e4358e",
      "1531181616225-f8d883d52476",
      "1519528283154-c1bdb2a9018e",
      "1579547899548-a6a93023eee9",
      "1576598561229-99196c2a4657",
      "1594935803779-bf0846902957"
    ][index]}?q=80&w=1035&auto=format&fit=crop`,
    `https://images.unsplash.com/photo-${[
      "1547995886-67eff35d71ad",
      "1514090555194-9721aeecc9ce",
      "1528702451830-97e5d5d5a035",
      "1636716398357-fad5a41aa5d1",
      "1573551461515-4780dd4bc55a",
      "1602827167665-c8316d4eb861",
      "1603186982498-64b7ae3735a2",
      "1563086518389-ffae7213448a",
      "1586375300773-8384e3e4358e",
      "1531181616225-f8d883d52476",
      "1519528283154-c1bdb2a9018e",
      "1579547899548-a6a93023eee9",
      "1576598561229-99196c2a4657",
      "1594935803779-bf0846902957",
      "1603006905003-be475563bc59"
    ][index]}?q=80&w=1035&auto=format&fit=crop`
  ]
}));

// Products for clocks
const clocksProducts = Array(15).fill(null).map((_, index) => ({
  id: generateId("decor", "clocks", index),
  name: [
    "Reclaimed Barn Wood Wall Clock",
    "Minimalist Bamboo Desk Clock",
    "Recycled Metal Industrial Clock",
    "Handcrafted Ceramic Clock Face",
    "Sustainable Cork Wall Clock",
    "Solar-Powered Modern Timepiece",
    "Upcycled Vinyl Record Clock",
    "Natural Stone Table Clock",
    "Reclaimed Wood Gear Clock",
    "Handwoven Fiber Art Clock",
    "Recycled Paper Pulp Wall Clock",
    "Driftwood Coastal Wall Clock",
    "Repurposed Window Frame Clock",
    "Eco-Resin River Clock",
    "Salvaged Wood Pendulum Clock"
  ][index],
  price: 6499 + (index * 1100),
  description: "Beautiful and functional timepieces made from sustainable materials, blending style with eco-conscious design for your home.",
  material: [
    "Reclaimed barn wood", 
    "Sustainable bamboo", 
    "Recycled metal", 
    "Locally sourced clay", 
    "Sustainable cork", 
    "Recycled materials and solar power", 
    "Upcycled vinyl records", 
    "Natural marble stone", 
    "Reclaimed wood and recycled metal", 
    "Organic cotton and jute", 
    "Recycled paper pulp", 
    "Natural driftwood", 
    "Repurposed window frame", 
    "Plant-based eco-resin and reclaimed wood", 
    "Salvaged wood"
  ][index],
  deliveryTime: "2 weeks",
  images: [
    `https://images.unsplash.com/photo-${[
      "1516563670759-299070f0dc54",
      "1563861826100-9cb70f1656a3",
      "1611176772389-af6cc58ccc75",
      "1523149455396-556ef5106c4d",
      "1594386926308-8c329fdd5b35",
      "1501139083538-0139583c060f",
      "1525507119028-ed4c629a60a3",
      "1517466787929-bc90951d0974",
      "15831716382c631c55824ac517b97629",
      "1524634863453-f5a8966d9c15",
      "1533613929671-de2d1283d880",
      "1622920610133-9bbe43bc6ef7",
      "1533739709125-9f1b7a97c089",
      "1595171325718-a5a34a6b891b",
      "1580048612310-297b4f2461ff"
    ][index]}?q=80&w=1035&auto=format&fit=crop`,
    `https://images.unsplash.com/photo-${[
      "1563861826100-9cb70f1656a3",
      "1611176772389-af6cc58ccc75",
      "1523149455396-556ef5106c4d",
      "1594386926308-8c329fdd5b35",
      "1501139083538-0139583c060f",
      "1525507119028-ed4c629a60a3",
      "1517466787929-bc90951d0974",
      "1583171638c2c631c55824ac517b97629",
      "1524634863453-f5a8966d9c15",
      "1533613929671-de2d1283d880",
      "1622920610133-9bbe43bc6ef7",
      "1533739709125-9f1b7a97c089",
      "1595171325718-a5a34a6b891b",
      "1580048612310-297b4f2461ff",
      "1516563670759-299070f0dc54"
    ][index]}?q=80&w=1035&auto=format&fit=crop`
  ]
}));

// Products for personal touches
const personalTouchesProducts = Array(15).fill(null).map((_, index) => ({
  id: generateId("decor", "personal-touches", index),
  name: [
    "Handcrafted Photo Frame Set",
    "Sustainable Family Name Sign",
    "Eco-Friendly Memory Box",
    "Custom Bamboo Monogram",
    "Recycled Glass Picture Holders",
    "Natural Fiber Initial Wreath",
    "Organic Cotton Custom Throw",
    "Engraved Reclaimed Wood Sign",
    "Handmade Initial Plant Holder",
    "Personalized Cork Board Map",
    "Custom Ceramic Name Plate",
    "Framed Pressed Flower Initials",
    "Personalized Bamboo Wall Calendar",
    "Family Growth Chart Ruler",
    "Custom Recycled Metal House Number"
  ][index],
  price: 5499 + (index * 1000),
  description: "Personalized decor items made from sustainable materials to add a unique and meaningful touch to your eco-friendly home.",
  material: [
    "Reclaimed wood and glass", 
    "Sustainable wood", 
    "Recycled cardboard and organic fabric", 
    "Sustainable bamboo", 
    "Recycled glass", 
    "Natural jute and dried flowers", 
    "Organic cotton", 
    "Reclaimed barn wood", 
    "Terracotta and natural finishes", 
    "Sustainable cork", 
    "Local clay and natural glazes", 
    "Pressed botanicals and reclaimed frames", 
    "Sustainable bamboo and soy-based ink", 
    "FSC-certified hardwood", 
    "Recycled metal"
  ][index],
  deliveryTime: "2-3 weeks",
  images: [
    `https://images.unsplash.com/photo-${[
      "1586023492125-27b2c045efd7",
      "1586536770626-7f538336b7ec",
      "1618044733550-bc07f241e7f5",
      "1584589167860-31e1768cbd45",
      "1506634064450-1592ef82b1f5",
      "1511184117514-a8ee3b7f4b5e",
      "1513519245088-0e12902e5a38",
      "1536852900845-c0873cff1e6e",
      "1585853733968-9d82641440cc",
      "1600093770254-27e6e9925cf8",
      "1599105103986-e42968379668",
      "1518150765664-d97b9efca01b",
      "1594194462551-16dd14271590",
      "1598726668841-9f0869942ff3",
      "1567225196000-7a08bcb65890"
    ][index]}?q=80&w=1035&auto=format&fit=crop`,
    `https://images.unsplash.com/photo-${[
      "1586536770626-7f538336b7ec",
      "1618044733550-bc07f241e7f5",
      "1584589167860-31e1768cbd45",
      "1506634064450-1592ef82b1f5",
      "1511184117514-a8ee3b7f4b5e",
      "1513519245088-0e12902e5a38",
      "1536852900845-c0873cff1e6e",
      "1585853733968-9d82641440cc",
      "1600093770254-27e6e9925cf8",
      "1599105103986-e42968379668",
      "1518150765664-d97b9efca01b",
      "1594194462551-16dd14271590",
      "1598726668841-9f0869942ff3",
      "1567225196000-7a08bcb65890",
      "1586023492125-27b2c045efd7"
    ][index]}?q=80&w=1035&auto=format&fit=crop`
  ]
}));

// Products for functional accessories
const functionalAccessoriesProducts = Array(15).fill(null).map((_, index) => ({
  id: generateId("decor", "functional-accessories", index),
  name: [
    "Bamboo Storage Basket Set",
    "Recycled Fabric Catchall Trays",
    "Handwoven Wall Organizer",
    "Sustainable Wood Desk Caddy",
    "Recycled Paper Storage Boxes",
    "Natural Fiber Magazine Holder",
    "Reclaimed Wood Floating Shelves",
    "Eco-Friendly Key Holder",
    "Hemp Rope Hanging Organizer",
    "Recycled Metal Wall Hooks Set",
    "Sustainable Bamboo Book End",
    "Handcrafted Ceramic Utensil Holder",
    "Cork Wall Organizer System",
    "Natural Wood Cable Organizer",
    "Recycled Glass Storage Jars"
  ][index],
  price: 3999 + (index * 800),
  description: "Functional and stylish storage and organization solutions made from sustainable materials to keep your home beautiful and tidy.",
  material: [
    "Sustainable bamboo", 
    "Recycled cotton fabrics", 
    "Natural jute and cotton", 
    "Sustainable acacia wood", 
    "Recycled paper and cardboard", 
    "Water hyacinth fiber", 
    "Reclaimed pine wood", 
    "Sustainable teak and recycled metal", 
    "Organic hemp rope", 
    "Recycled metal", 
    "Sustainable bamboo", 
    "Local clay and natural glazes", 
    "Sustainable cork", 
    "FSC-certified wood", 
    "Recycled glass"
  ][index],
  deliveryTime: "1-2 weeks",
  images: [
    `https://images.unsplash.com/photo-${[
      "1512473548599-0937a6d02fdd",
      "1513135467881-b30532525051",
      "1522444195799-478538b28823",
      "1555641151-93ab6f84c057",
      "1601333332412-a4b2a4c1fed9",
      "1513584684374-8bab748fbf90",
      "1615874694998-43ec9fa2914f",
      "1614702255153-bed9493149ad",
      "1513708929605-483e781c4cde",
      "1600566752592-2bdc686b1745",
      "1613545505483-73e80b0dd3fd",
      "1531834275483-31700b9d82fc",
      "1514502987177-abd66922dcc0",
      "1550650066-19f5357d08f6",
      "1570006781061-4cc585d1bf0b"
    ][index]}?q=80&w=1035&auto=format&fit=crop`,
    `https://images.unsplash.com/photo-${[
      "1513135467881-b30532525051",
      "1522444195799-478538b28823",
      "1555641151-93ab6f84c057",
      "1601333332412-a4b2a4c1fed9",
      "1513584684374-8bab748fbf90",
      "1615874694998-43ec9fa2914f",
      "1614702255153-bed9493149ad",
      "1513708929605-483e781c4cde",
      "1600566752592-2bdc686b1745",
      "1613545505483-73e80b0dd3fd",
      "1531834275483-31700b9d82fc",
      "1514502987177-abd66922dcc0",
      "1550650066-19f5357d08f6",
      "1570006781061-4cc585d1bf0b",
      "1512473548599-0937a6d02fdd"
    ][index]}?q=80&w=1035&auto=format&fit=crop`
  ]
}));

// Products for plants & greenery
const plantsGreeneryProducts = Array(15).fill(null).map((_, index) => ({
  id: generateId("decor", "plants-greenery", index),
  name: [
    "Air Purifying Plant Collection",
    "Handcrafted Ceramic Plant Pot Set",
    "Hanging Macramé Plant Holder",
    "Reclaimed Wood Planter Box",
    "Self-Watering Bamboo Planter",
    "Vertical Wall Garden System",
    "Terrarium DIY Kit",
    "Low Maintenance Succulent Set",
    "Recycled Glass Herb Garden",
    "Handwoven Basket Planters",
    "Biodegradable Seed Starter Kit",
    "Preserved Moss Wall Frame",
    "Indoor Mini Garden System",
    "Hanging Glass Plant Terrariums",
    "Natural Fiber Plant Hammock"
  ][index],
  price: 5499 + (index * 1200),
  description: "Living and preserved plants with sustainable planters to bring nature indoors and create a healthier home environment.",
  material: [
    "Organic potting soil and ceramic", 
    "Local clay and natural glazes", 
    "Organic cotton rope", 
    "Reclaimed pine wood", 
    "Sustainable bamboo", 
    "Recycled materials and compostable pots", 
    "Recycled glass and sustainable soil", 
    "Organic soil and ceramic pots", 
    "Recycled glass and organic seeds", 
    "Natural seagrass and water hyacinth", 
    "Compostable pots and organic seeds", 
    "Preserved moss and reclaimed frame", 
    "Sustainable materials and organic soil", 
    "Recycled glass", 
    "Organic jute and cotton"
  ][index],
  deliveryTime: "1-2 weeks",
  images: [
    `https://images.unsplash.com/photo-${[
      "1608831540955-35094d19a33e",
      "1560809451-d6c9d6653878",
      "1531452595-2d0644cdc196",
      "1564976486543-1459a0e7c786",
      "1521443559158-54067eefec7c",
      "1466692476655-9e5e73ca1e59",
      "1545051024-c8b3c95d2d68",
      "1509423350916-44bd8f4d5788",
      "1555955321-be7fb6220fef",
      "1531538525888-7f5069fc0cb3",
      "1547570456-76d6bef5cd23",
      "1561300057-0976e2b423ea",
      "1554631668-6015e82977bb",
      "1596073827920-11ae14c28368",
      "1587517763083-324909ff83aa"
    ][index]}?q=80&w=1035&auto=format&fit=crop`,
    `https://images.unsplash.com/photo-${[
      "1560809451-d6c9d6653878",
      "1531452595-2d0644cdc196",
      "1564976486543-1459a0e7c786",
      "1521443559158-54067eefec7c",
      "1466692476655-9e5e73ca1e59",
      "1545051024-c8b3c95d2d68",
      "1509423350916-44bd8f4d5788",
      "1555955321-be7fb6220fef",
      "1531538525888-7f5069fc0cb3",
      "1547570456-76d6bef5cd23",
      "1561300057-0976e2b423ea",
      "1554631668-6015e82977bb",
      "1596073827920-11ae14c28368",
      "1587517763083-324909ff83aa",
      "1608831540955-35094d19a33e"
    ][index]}?q=80&w=1035&auto=format&fit=crop`
  ]
}));

// Products for textiles
const textilesProducts = Array(15).fill(null).map((_, index) => ({
  id: generateId("decor", "textiles", index),
  name: [
    "Organic Cotton Throw Blanket",
    "Handwoven Hemp Pillow Covers",
    "Natural Dye Table Runner",
    "Sustainable Linen Curtains",
    "Recycled Fabric Patchwork Quilt",
    "Handmade Macramé Wall Hanging",
    "Organic Wool Area Rug",
    "Plant-Dyed Silk Cushions",
    "Jute Braided Floor Mat",
    "Organic Cotton Meditation Cushion",
    "Vintage Fabric Tapestry",
    "Hand-Block Printed Table Cloth",
    "Recycled Denim Floor Pillows",
    "Natural Fiber Hammock",
    "Handwoven Bamboo Placemats"
  ][index],
  price: 6999 + (index * 1300),
  description: "Soft and sustainable textiles made from organic and eco-friendly fibers to add comfort and style to your living spaces.",
  material: [
    "Organic cotton", 
    "Hemp fabric", 
    "Organic cotton and natural dyes", 
    "Organic linen", 
    "Upcycled fabric scraps", 
    "Organic cotton rope", 
    "Organic wool", 
    "Peace silk and plant-based dyes", 
    "Natural jute", 
    "Organic cotton and buckwheat hulls", 
    "Reclaimed vintage fabrics", 
    "Organic cotton and natural dyes", 
    "Recycled denim", 
    "Organic cotton", 
    "Sustainable bamboo"
  ][index],
  deliveryTime: "2-3 weeks",
  images: [
    `https://images.unsplash.com/photo-${[
      "1616486338812-3dadae4b4ace",
      "1522708323590-d24dbb6b0267",
      "1584346911337-a291a0e65239",
      "1592136383924-d7c183492aef",
      "1513519245088-0e12902e5a38",
      "1631657520337-9cfb5a83c9e8",
      "1600210210963-39f822731e8c",
      "1599517918376-7973b37dcd43",
      "1547528073-8969b0ace4e4",
      "1616142577613-e3e0ec5973a6",
      "1583847268964-b28dc8f51f36",
      "1516455590571-18256e5bb9ff",
      "1636711625043-f68f81153a3b",
      "1591139233666-9e8c937d300c",
      "1522758848553-308bf8692b46"
    ][index]}?q=80&w=1035&auto=format&fit=crop`,
    `https://images.unsplash.com/photo-${[
      "1522708323590-d7c183492aef",
      "1584346911337-a291a0e65239",
      "1592136383924-d7c183492aef",
      "1513519245088-0e12902e5a38",
      "1631657520337-9cfb5a83c9e8",
      "1600210210963-39f822731e8c",
      "1599517918376-7973b37dcd43",
      "1547528073-8969b0ace4e4",
      "1616142577613-e3e0ec5973a6",
      "1583847268964-b28dc8f51f36",
      "1516455590571-18256e5bb9ff",
      "1636711625043-f68f81153a3b",
      "1591139233666-9e8c937d300c",
      "1522758848553-308bf8692b46",
      "1616486338812-3dadae4b4ace"
    ][index]}?q=80&w=1035&auto=format&fit=crop`
  ]
}));

// Products for lighting fixtures
const lightingFixturesProducts = Array(15).fill(null).map((_, index) => ({
  id: generateId("decor", "lighting-fixtures", index),
  name: [
    "Bamboo Pendant Light Shade",
    "Recycled Glass Table Lamp",
    "Handwoven Rattan Floor Lamp",
    "Solar-Powered LED String Lights",
    "Reclaimed Wood Wall Sconce",
    "Ceramic Table Lamp with Linen Shade",
    "Upcycled Bottle Chandelier",
    "Natural Fiber Hanging Light",
    "Recycled Metal Industrial Lamp",
    "Cork and Wood Desk Light",
    "Handblown Glass Pendant Light",
    "Paper Pulp Sculptural Lamp",
    "Driftwood Floor Lamp",
    "Recycled Textile Lampshade",
    "Sustainable Wood Bedside Lamp"
  ][index],
  price: 7499 + (index * 1500),
  description: "Energy-efficient lighting fixtures made from sustainable materials that illuminate your space with style and eco-conscious design.",
  material: [
    "Sustainable bamboo", 
    "Recycled glass and sustainable wood", 
    "Natural rattan", 
    "Recycled materials and solar panels", 
    "Reclaimed barn wood", 
    "Local clay and organic linen", 
    "Upcycled wine bottles", 
    "Jute and organic cotton", 
    "Recycled metal", 
    "Sustainable cork and FSC-certified wood", 
    "Recycled glass", 
    "Recycled paper pulp", 
    "Natural driftwood", 
    "Upcycled fabrics", 
    "FSC-certified wood"
  ][index],
  deliveryTime: "2-3 weeks",
  images: [
    `https://images.unsplash.com/photo-${[
      "1513506003901-1e6a229e2d15",
      "1540932239986-30128078f3c5",
      "1519710164239-da123dc03ef4",
      "1565097763705-e58cc297d37d",
      "1576071531095-fd5b53e7aec8",
      "1585937250798-4d48bf600ad4",
      "1592217791226-d3b5a3f37c49",
      "1595256064618-9a42f10ac51d",
      "1516594915456-9d5327657671",
      "1513475382585-d06e58bcb0f0",
      "1542989635-d1769a7697ae",
      "1512663156528-991cf9be6d37",
      "1581972698544-ec9a40991556",
      "1599619354331-c0da8c528e26",
      "1489269637500-908de802289e"
    ][index]}?q=80&w=1035&auto=format&fit=crop`,
    `https://images.unsplash.com/photo-${[
      "1540932239986-30128078f3c5",
      "1519710164239-da123dc03ef4",
      "1565097763705-e58cc297d37d",
      "1576071531095-fd5b53e7aec8",
      "1585937250798-4d48bf600ad4",
      "1592217791226-d3b5a3f37c49",
      "1595256064618-9a42f10ac51d",
      "1516594915456-9d5327657671",
      "1513475382585-d06e58bcb0f0",
      "1542989635-d1769a7697ae",
      "1512663156528-991cf9be6d37",
      "1581972698544-ec9a40991556",
      "1599619354331-c0da8c528e26",
      "1489269637500-908de802289e",
      "1513506003901-1e6a229e2d15"
    ][index]}?q=80&w=1035&auto=format&fit=crop`
  ]
}));

// Products for mirrors
const mirrorsProducts = Array(15).fill(null).map((_, index) => ({
  id: generateId("decor", "mirrors", index),
  name: [
    "Reclaimed Wood Frame Mirror",
    "Bamboo Round Wall Mirror",
    "Recycled Metal Sunburst Mirror",
    "Natural Rope Hanging Mirror",
    "Sustainable Teak Full Length Mirror",
    "Upcycled Window Frame Mirror",
    "Handcrafted Ceramic Tile Mirror",
    "Cork Border Vanity Mirror",
    "Driftwood Beach Style Mirror",
    "Recycled Metal Industrial Mirror",
    "Handwoven Rattan Mirror Frame",
    "Salvaged Wood Mosaic Mirror",
    "Natural Stone Embedded Mirror",
    "Recycled Leather Strap Mirror",
    "Pressed Botanical Frame Mirror"
  ][index],
  price: 8499 + (index * 1600),
  description: "Beautiful mirrors with eco-friendly frames that reflect your commitment to sustainable living while enhancing your space.",
  material: [
    "Reclaimed barn wood", 
    "Sustainable bamboo", 
    "Recycled metal", 
    "Natural jute rope", 
    "Sustainable teak", 
    "Salvaged window frame", 
    "Local clay and glazes", 
    "Sustainable cork", 
    "Natural driftwood", 
    "Recycled industrial metal", 
    "Natural rattan", 
    "Salvaged wood pieces", 
    "Natural river stone", 
    "Recycled leather", 
    "Pressed flowers and sustainable wood"
  ][index],
  deliveryTime: "2-3 weeks",
  images: [
    `https://images.unsplash.com/photo-${[
      "1618220624788-9c9c13b26913",
      "1552454799-5453a94aeaab",
      "1532372576444-dda954194ad0",
      "1556784341-6096245f89fe",
      "1540518614846-de0dcd4ef9a7",
      "1567016376408-0226e4d0b018",
      "1600607686039-e1f8dc352b2c",
      "1590251024379-337fbf2d38cd",
      "1582584471889-229267a2e6cc",
      "1602028311711-e6642b13d0b8",
      "1505693416388-ac5ce068fe85",
      "1502162772633-595d2835f7e5",
      "1519710164239-da123dc03ef4",
      "1520034636798-af0ffda7a9b6",
      "1600566752592-2bdc686b1745"
    ][index]}?q=80&w=1035&auto=format&fit=crop`,
    `https://images.unsplash.com/photo-${[
      "1552454799-5453a94aeaab",
      "1532372576444-dda954194ad0",
      "1556784341-6096245f89fe",
      "1540518614846-de0dcd4ef9a7",
      "1567016376408-0226e4d0b018",
      "1600607686039-e1f8dc352b2c",
      "1590251024379-337fbf2d38cd",
      "1582584471889-229267a2e6cc",
      "1602028311711-e6642b13d0b8",
      "1505693416388-ac5ce068fe85",
      "1502162772633-595d2835f7e5",
      "1519710164239-da123dc03ef4",
      "1520034636798-af0ffda7a9b6",
      "1600566752592-2bdc686b1745",
      "1618220624788-9c9c13b26913"
    ][index]}?q=80&w=1035&auto=format&fit=crop`
  ]
}));

// Combine all decor products by subcategory
export const decorProducts = {
  "wall-art": wallArtProducts,
  "home-fragrance": homeFragranceProducts,
  "sculptures-figurines": sculpturesFigurinesProducts,
  "candles-holders": candlesHoldersProducts,
  "clocks": clocksProducts,
  "personal-touches": personalTouchesProducts,
  "functional-accessories": functionalAccessoriesProducts,
  "plants-greenery": plantsGreeneryProducts,
  "textiles": textilesProducts,
  "lighting-fixtures": lightingFixturesProducts,
  "mirrors": mirrorsProducts,
};
