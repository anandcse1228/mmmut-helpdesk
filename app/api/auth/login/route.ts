import clientPromise from "@/lib/db"
import bcrypt from "bcryptjs"
import { NextResponse } from "next/server"

export async function POST(req: Request) {

  const { email, password, role } = await req.json()

  const client = await clientPromise
  const db = client.db("mmmut-helpdesk")

  let user

  // ADMIN LOGIN
  if (role === "ADMIN") {
    user = await db.collection("admins").findOne({ email })
  }

  // STUDENT LOGIN
  if (role === "STUDENT") {
    user = await db.collection("users").findOne({ email })
  }

  if (!user) {
    return NextResponse.json(
      { error: "Invalid credentials" },
      { status: 401 }
    )
  }

  const isMatch = await bcrypt.compare(password, user.password)

  if (!isMatch) {
    return NextResponse.json(
      { error: "Invalid credentials" },
      { status: 401 }
    )
  }

  return NextResponse.json({
    success: true,
    role: role === "ADMIN" ? "admin" : "student",
  })
}