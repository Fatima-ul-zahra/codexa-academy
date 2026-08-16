require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Admin = require("../models/Admin");

const createAdmin = async () => {
  try {
    // -----------------------------
    // Validate environment variables
    // -----------------------------
    const { MONGO_URI, ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;

    if (!MONGO_URI) {
      throw new Error("MONGO_URI is missing from .env");
    }

    if (!ADMIN_EMAIL) {
      throw new Error("ADMIN_EMAIL is missing from .env");
    }

    if (!ADMIN_PASSWORD) {
      throw new Error("ADMIN_PASSWORD is missing from .env");
    }

    // -----------------------------
    // Connect to MongoDB
    // -----------------------------
    await mongoose.connect(MONGO_URI);

    console.log("MongoDB connected.");

    // -----------------------------
    // Normalize email
    // -----------------------------
    const email = ADMIN_EMAIL.trim().toLowerCase();

    // -----------------------------
    // Hash password
    // -----------------------------
    const passwordHash = await bcrypt.hash(
      ADMIN_PASSWORD,
      12
    );

    // -----------------------------
    // Check existing admin
    // -----------------------------
    let admin = await Admin.findOne({ email }).select("+password");

    if (admin) {
      // Update existing admin
      admin.password = passwordHash;
      admin.role = "admin";
      admin.isActive = true;

      await admin.save();

      console.log("Admin account updated successfully.");
    } else {
      // Create new admin
      admin = await Admin.create({
        email,
        password: passwordHash,
        role: "admin",
        isActive: true,
      });

      console.log("Admin account created successfully.");
    }

    console.log(`Admin email: ${email}`);

    // -----------------------------
    // Close database connection
    // -----------------------------
    await mongoose.connection.close();

    console.log("MongoDB connection closed.");
    console.log("Admin setup completed.");

    process.exit(0);
  } catch (error) {
    console.error("Admin setup failed:");
    console.error(error.message);

    await mongoose.connection.close().catch(() => {});

    process.exit(1);
  }
};

createAdmin();