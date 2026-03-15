import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import { User } from "@/lib/User"

export async function POST(request: NextRequest) {
  try {
    console.log("[v0] Registration attempt started")

    await connectDB()
    console.log("[v0] Database connected for registration")

    const { email, password } = await request.json()
    console.log("[v0] Registration request for email:", email)

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Please provide a valid email address" }, { status: 400 })
    }

    if (password.length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters long" }, { status: 400 })
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() })
    console.log("[v0] Existing user check:", existingUser ? "User exists" : "No existing user")

    if (existingUser) {
      return NextResponse.json({ error: "Email is already registered" }, { status: 409 })
    }

    const newUser = new User({
      email: email.toLowerCase(),
      password,
      role: "STUDENT",
    })

    await newUser.save()
    console.log("[v0] Student registered successfully:", email)

    return NextResponse.json(
      {
        message: "Registration successful",
        user: {
          id: newUser._id,
          email: newUser.email,
          role: newUser.role,
        },
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("[v0] Registration error details:", {
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    })
    return NextResponse.json({ error: "An error occurred during registration" }, { status: 500 })
  }
}
