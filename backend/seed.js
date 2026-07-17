// Run with: npm run seed
// Creates one admin user and a handful of sample products so the site isn't empty on first run.
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import User from "./models/User.js";
import Product from "./models/Product.js";

dotenv.config();
await connectDB();

const run = async () => {
  const adminEmail = "admin@jimtoz.com";
  const existingAdmin = await User.findOne({ email: adminEmail });
  if (!existingAdmin) {
    await User.create({
      name: "Jimtoz Admin",
      email: adminEmail,
      password: "ChangeMe123", // change this immediately after first login
      role: "admin",
    });
    console.log(`Admin created -> email: ${adminEmail} / password: ChangeMe123`);
  } else {
    console.log("Admin already exists, skipping.");
  }

  const sampleProducts = [
    {
      name: "Honey Wheat Sourdough",
      description: "A slow-fermented sourdough loaf with a hint of honey and a deep golden crust.",
      category: "bread",
      price: 450,
      isFeatured: true,
      tags: ["bestseller"],
    },
    {
      name: "Cinnamon Butter Croissant",
      description: "Flaky, buttery layers rolled with cinnamon sugar and finished with a light glaze.",
      category: "pastries",
      price: 250,
      isFeatured: true,
      tags: ["new"],
    },
    {
      name: "Salted Caramel Cheesecake",
      description: "Rich baked cheesecake topped with a silky salted caramel drizzle.",
      category: "cakes",
      price: 3200,
      isFeatured: true,
    },
    {
      name: "Classic Chocolate Chip Cookie",
      description: "Chewy in the middle, crisp at the edges, loaded with chocolate chunks.",
      category: "cookies",
      price: 120,
    },
  ];

  await Product.deleteMany({});
  await Product.insertMany(sampleProducts);
  console.log(`Seeded ${sampleProducts.length} sample products.`);

  process.exit();
};

run();
