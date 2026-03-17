import mongoose from "mongoose"
import { hashPassword } from "@/lib/auth"

// Schema definition
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      select: false,
    },
    role: {
      type: String,
      enum: ["STUDENT", "ADMIN"],
      default: "STUDENT",
    },
    name: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
)

// Middleware: Hashing password
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  
  try {
    this.password = await hashPassword(this.password);
  } catch (error) {
    throw error;
  }
});

/**
 * IMPORTANT: Build error fix
 * Vercel build ke waqt mongoose.models ko check karna zaroori hai.
 * Hum 'User' model ko check kar rahe hain, agar wo exist karta hai toh wahi use karo, 
 * warna naya register karo.
 */
const User = mongoose.models.User || mongoose.model("User", userSchema);

export { User };