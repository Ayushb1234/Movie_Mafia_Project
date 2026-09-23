require("dotenv").config();

const bcrypt = require("bcryptjs");
const connectDB = require("../config/db");
const User = require("../models/User");

const createAdmin = async () => {
  try {
    const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
    const password = process.env.ADMIN_PASSWORD;

    if (!email || !password || password.length < 12) {
      throw new Error("Set ADMIN_EMAIL and ADMIN_PASSWORD (at least 12 characters) in server/.env");
    }

    await connectDB();
    const user = await User.findOne({ email });

    if (user) {
      user.role = "admin";
      await user.save();
      console.log(`Promoted ${email} to admin; existing password was kept.`);
    } else {
      await User.create({
        username: (email.split("@")[0].replace(/[^a-z0-9_]/gi, "_").slice(0, 30) || "admin").padEnd(3, "_"),
        email,
        password: await bcrypt.hash(password, 12),
        role: "admin"
      });
      console.log(`Admin created: ${email}`);
    }

    process.exit(0);
  } catch (error) {
    console.error("Failed to create admin:", error.message);
    process.exit(1);
  }
};

createAdmin();
