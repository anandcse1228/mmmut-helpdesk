import mongoose from "mongoose"
import { hashPassword } from "@/lib/auth"

// Next.js Serverless environment mein hume ensure karna padta hai ki 
// model baar-baar compile na ho, isliye hum mongoose.models.User check karte hain.

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: true,
      lowercase: true,
      trim: true, // Extra spaces hata dega
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, "Please provide a valid email"],
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      select: false, // Login ke time pe password security ke liye hidden rahega jab tak hum explicitly select na karein
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
  { 
    timestamps: true,
    // Ye line important hai agar aapka database already exists hai
    strict: true 
  }
)

// Password hashing middleware
userSchema.pre("save", async function () {
  // Agar password change nahi hua toh kuch mat karo
  if (!this.isModified("password")) {
    return; 
  }

  try {
    // Hash the password
    this.password = await hashPassword(this.password);
  } catch (error: any) {
    // Agar koi error aaye toh throw kar do
    throw error;
  }
});

// Model Export
// mongoose.models.User check karta hai ki model pehle se register hai ya nahi
export const User = mongoose.models.User || mongoose.model("User", userSchema)