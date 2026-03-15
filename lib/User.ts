import mongoose from "mongoose"
import { hashPassword } from "@/lib/auth"

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: true,
      lowercase: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, "Please provide a valid email"],
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
  { timestamps: true },
)

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next()
  try {
    this.password = await hashPassword(this.password)
    next()
  } catch (error) {
    next(error as Error)
  }
})

export const User = mongoose.models.User || mongoose.model("User", userSchema)
