import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { User } from "@/lib/User"; // सुनिश्चित करें कि यह पाथ सही है

export const dynamic = 'force-dynamic';

async function connectToDatabase() {
  if (mongoose.connection.readyState >= 1) return;
  await mongoose.connect(process.env.MONGODB_URI as string);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password, role } = body;

    // ईमेल में गलती से आए स्पेस को हटा दें
    const cleanEmail = email?.toLowerCase().trim();
    console.log(`Login attempt: ${cleanEmail}`);

    if (!cleanEmail || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

    await connectToDatabase();

    // 1. User dhoondo
    const user = await User.findOne({ email: cleanEmail }).select("+password");

    if (!user) {
      console.log("User not found in DB");
      return NextResponse.json({ error: "User not found" }, { status: 401 });
    }

    // 2. Role match (Safe Check - अगर फ्रंटएंड से role आ रहा है तभी चेक करेगा)
    if (role && user.role) {
      if (user.role.toUpperCase() !== role.toUpperCase()) {
        console.log("Role mismatch. DB:", user.role, "Frontend:", role);
        return NextResponse.json({ error: "Role mismatch" }, { status: 401 });
      }
    }

    // 3. Password check (With Plain-Text Fallback for Local Testing)
    let isMatch = false;

    // Bcrypt hashes हमेशा $2 से शुरू होते हैं ($2a$, $2b$, etc.)
    const isHashed = user.password.startsWith("$2");

    if (isHashed) {
      // अगर डेटाबेस में पासवर्ड एन्क्रिप्टेड है
      isMatch = await bcrypt.compare(password, user.password);
    } else {
      // अगर आपने MongoDB में सीधे पासवर्ड (Plain text) लिख दिया है
      console.warn("⚠️ Warning: Plain text password found in DB. Comparing directly.");
      isMatch = (password === user.password);
    }
    
    if (!isMatch) {
      console.log("Password did not match for:", cleanEmail);
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    // 4. Success Response
    console.log("Login Successful!");
    return NextResponse.json({
      success: true,
      role: user.role ? user.role.toLowerCase() : "user",
      name: user.name
    });

  } catch (error: any) {
    console.error("Login Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}