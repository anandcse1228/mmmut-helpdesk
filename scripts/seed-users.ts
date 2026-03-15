import mongoose from "mongoose"
import { User } from "@/lib/User"
import { hashPassword } from "@/lib/auth"

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/student-helpdesk"

async function seedUsers() {
  try {
    await mongoose.connect(MONGODB_URI)
    console.log("[v0] Connected to MongoDB")

    // Clear existing users (optional - comment out to keep existing data)
    // await User.deleteMany({})

    const users = [
      {
        email: "student@example.com",
        password: "student123",
        role: "STUDENT",
        name: "John Student",
      },
      {
        email: "admin@example.com",
        password: "admin123",
        role: "ADMIN",
        name: "Admin User",
      },
      {
        email: "anandpsingh1228@gmail.com",
        password: "password123",
        role: "STUDENT",
        name: "Anand Singh",
      },
    ]

    for (const userData of users) {
      const existingUser = await User.findOne({ email: userData.email })
      if (!existingUser) {
        const hashedPassword = await hashPassword(userData.password)
        await User.create({
          email: userData.email,
          password: hashedPassword,
          role: userData.role,
          name: userData.name,
        })
        console.log(`[v0] Created user: ${userData.email}`)
      } else {
        console.log(`[v0] User already exists: ${userData.email}`)
      }
    }

    console.log("[v0] Seeding completed successfully")
    process.exit(0)
  } catch (error) {
    console.error("[v0] Seeding error:", error)
    process.exit(1)
  }
}

seedUsers()
