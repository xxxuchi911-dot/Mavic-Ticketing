import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import { travelPackages } from "./drizzle/schema.ts";

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error("DATABASE_URL is not set");
  process.exit(1);
}

const seedPackages = [
  {
    name: "Tokyo Adventure",
    destination: "Japan",
    price: 129900, // $1299.00
    duration: "7 days",
    description: "Experience the perfect blend of ancient temples and modern technology in Tokyo. Visit iconic landmarks, enjoy traditional cuisine, and explore vibrant neighborhoods.",
    image: "/manus-storage/xe74tjIEco1k_44d31a86.jpg",
    availability: "available",
  },
  {
    name: "European Grand Tour",
    destination: "Europe",
    price: 189900, // $1899.00
    duration: "10 days",
    description: "Explore the best of Europe with visits to Paris, Rome, and Barcelona. Experience world-class museums, stunning architecture, and delicious cuisine.",
    image: "/manus-storage/yari8dNJRN9y_a729feaf.jpg",
    availability: "available",
  },
  {
    name: "USA National Parks",
    destination: "America",
    price: 159900, // $1599.00
    duration: "8 days",
    description: "Discover the natural wonders of America. Visit Yellowstone, Grand Canyon, and Yosemite National Parks for unforgettable landscapes and outdoor adventures.",
    image: "/manus-storage/I4xl6TEJLawi_803fe6a0.jpg",
    availability: "available",
  },
  {
    name: "Thailand Beach Escape",
    destination: "Thailand",
    price: 99900, // $999.00
    duration: "5 days",
    description: "Relax on pristine beaches and explore tropical islands. Enjoy water sports, island hopping, and authentic Thai cuisine in this paradise destination.",
    image: "/manus-storage/mNbOfjJY6lwz_91b86aba.jpg",
    availability: "available",
  },
  {
    name: "Great Barrier Reef Explorer",
    destination: "Australia",
    price: 149900, // $1499.00
    duration: "6 days",
    description: "Dive into the world's largest coral reef system. Experience incredible marine life, stunning beaches, and unique Australian wildlife.",
    image: "/manus-storage/zvmf59DSR8CO_516a8309.jpg",
    availability: "available",
  },
  {
    name: "Caribbean Paradise",
    destination: "Caribbean",
    price: 119900, // $1199.00
    duration: "7 days",
    description: "Escape to tropical islands with crystal-clear waters and white sand beaches. Perfect for relaxation, water sports, and island exploration.",
    image: "/manus-storage/krWC5O7TxauR_b921de3f.jpg",
    availability: "available",
  },
  {
    name: "Mount Fuji & Kyoto",
    destination: "Japan",
    price: 139900, // $1399.00
    duration: "6 days",
    description: "Discover Japan's cultural heart with visits to Kyoto's temples and the iconic Mount Fuji. Experience traditional culture and breathtaking natural beauty.",
    image: "/manus-storage/dRzp6G9wnvhD_25102412.jpg",
    availability: "available",
  },
  {
    name: "Swiss Alps Adventure",
    destination: "Europe",
    price: 179900, // $1799.00
    duration: "8 days",
    description: "Experience the majestic Swiss Alps with hiking, mountain scenery, and charming alpine villages. Perfect for nature lovers and adventure seekers.",
    image: "/manus-storage/z3J9e9UX57Sq_41f38274.jpg",
    availability: "coming_soon",
  },
];

async function seed() {
  try {
    const connection = await mysql.createConnection(DATABASE_URL);
    const db = drizzle(connection);

    console.log("Seeding packages...");

    for (const pkg of seedPackages) {
      await db.insert(travelPackages).values(pkg);
      console.log(`✓ Created package: ${pkg.name}`);
    }

    console.log("\n✓ Seeding completed successfully!");
    await connection.end();
  } catch (error) {
    console.error("Error seeding packages:", error);
    process.exit(1);
  }
}

seed();
