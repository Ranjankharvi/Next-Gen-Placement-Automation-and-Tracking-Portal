// createSuperUser.js
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/user.model");
require("dotenv").config();

async function createSuperUser() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const email = "admin@gmail.com";
    const plainPassword = "Admin@123"; // password you’ll use to login
    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    const superUser = await User.findOneAndUpdate(
      { email },
      {
        first_name: "System",
        last_name: "Admin",
        email,
        password: hashedPassword,
        role: "superuser", // ✅ must be from enum: ["student","tpo_admin","management_admin","superuser","admin"]
      },
      { upsert: true, new: true }
    );

    console.log("✅ Superuser created/updated:", superUser.email);
    console.log("➡️ Login with ->", email, "/", plainPassword);

    process.exit(0);
  } catch (err) {
    console.error("❌ Error creating superuser:", err);
    process.exit(1);
  }
}

createSuperUser();
