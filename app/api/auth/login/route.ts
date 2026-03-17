import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { User } from "@/lib/User"; // Humne jo Mongoose model banaya tha

// 1. Build error se bachne ke liye force-dynamic
export const dynamic = 'force-dynamic';

// 2. Database connection function (Mongoose style)
async function connectToDatabase() {
  if (mongoose.connection.readyState >= 1) return;
  
  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is not defined in environment variables");
  }
  
  await mongoose.connect(process.env.MONGODB_URI);
}

export async function POST(req: Request) {
  try {
    const { email, password, role } = await req.json();

    await connectToDatabase();

    /**
     * Humne 'User' model mein 'role' field rakha hai (STUDENT/ADMIN).
     * Isliye hum alag-alag collections ki jagah ek hi 'User' collection 
     * mein filter karke dhoondhenge.
     */
    const user = await User.findOne({ 
      email: email.toLowerCase(), 
      role: role.toUpperCase() 
    }).select("+password"); // Password ko explicitly mangna padta hai kyunki select: false hai schema mein

    if (!user) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Password check
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Login successful
    return NextResponse.json({
      success: true,
      role: user.role.toLowerCase(),
      name: user.name,
      email: user.email
    });

  } catch (error: any) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}