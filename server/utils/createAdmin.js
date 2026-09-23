require("dotenv").config();

const bcrypt = require("bcryptjs");

const connectDB = require("../config/db");
const User = require("../models/User");

const createAdmin = async () => {
  try {
    await connectDB();

    const email = "admin@cinerate.com";
    const password = "Admin@123";

    const existingUser = await User.findOne({
      email
    });

    if (existingUser) {
      existingUser.role = "admin";

      const passwordHash = await bcrypt.hash(
        password,
        12
      );

      existingUser.password = passwordHash;

      await existingUser.save();

      console.log("✅ Existing user promoted to admin");
      console.log(`Email: ${email}`);
      console.log(`Password: ${password}`);

      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash(
      password,
      12
    );

    const admin = await User.create({
      username: "admin",
      email,
      password: hashedPassword,
      role: "admin"
    });

    console.log("✅ Admin created successfully");
    console.log(`Email: ${admin.email}`);
    console.log(`Password: ${password}`);

    process.exit(0);
  } catch (error) {
    console.error(
      "❌ Failed to create admin:",
      error.message
    );

    process.exit(1);
  }
};

createAdmin();