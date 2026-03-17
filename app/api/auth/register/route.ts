import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { User } from "@/lib/User";

// Vercel build fix
export const dynamic = 'force-dynamic';

async function connectToDatabase() {
  if (mongoose.connection.readyState >= 1) return;
  
  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is missing in .env.local");
  }
  
  await mongoose.connect(process.env.MONGODB_URI);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password, name, role } = body;

    console.log("Registering user:", email); // Terminal mein dikhega

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

    await connectToDatabase();

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    // Naya user create karo
    // Note: Password hashing User model ke pre-save hook mein ho rahi hai
    const newUser = await User.create({
      name: name || email.split('@')[0],
      email: email.toLowerCase(),
      password,
      role: role || "STUDENT"
    });

    console.log("User created successfully!");

    return NextResponse.json({
      success: true,
      user: { id: newUser._id, email: newUser.email }
    }, { status: 201 });

  } catch (error: any) {
    console.error("Registration API Error:", error);
    return NextResponse.json(
      { error: error.message || "Registration failed" },
      { status: 500 }
    );
  }
}