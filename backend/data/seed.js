require("dotenv").config();
const connectDB = require("../config/db");
const User = require("../models/userModel");

const initialUsers = [
  { name: "Alice Martin", email: "alice@example.com", role: "admin", createdAt: "2024-01-15" },
  { name: "Bob Dupont", email: "bob@example.com", role: "user", createdAt: "2024-02-20" },
  { name: "Clara Bernard", email: "clara@example.com", role: "user", createdAt: "2024-03-10" },
];

async function seed() {
  await connectDB();

  const count = await User.countDocuments();
  if (count > 0) {
    console.log(`Collection non vide (${count} utilisateurs). Seed ignoré.`);
  } else {
    await User.insertMany(initialUsers);
    console.log("3 utilisateurs insérés avec succès.");
  }

  await require("mongoose").disconnect();
}

seed();
