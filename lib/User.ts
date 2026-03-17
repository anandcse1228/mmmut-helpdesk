import mongoose from "mongoose"
import { hashPassword } from "@/lib/auth"

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

// Middleware: next() hata kar simple async use kiya build error se bachne ke liye
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  
  try {
    this.password = await hashPassword(this.password);
  } catch (error) {
    throw error;
  }
});

// IMPORTANT: Build error se bachne ke liye model check
export const User = mongoose.models.User || mongoose.model("User", userSchema)