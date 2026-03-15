"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { LoginForm } from "@/components/login-form"

export default function LoginPage() {

  const router = useRouter()

  const [role, setRole] = useState<"STUDENT" | "ADMIN">("STUDENT")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {

    setMounted(true)

    const isLoggedIn = sessionStorage.getItem("loggedIn")

    if (isLoggedIn === "true") {
      router.push("/")
    }

  }, [router])

  // Prevent hydration blank screen
  if (!mounted) return null

  return (

    <div className="min-h-screen w-full gradient-bg flex items-center justify-center p-4">

      {/* Main Container */}
      <div className="w-full max-w-md">

        {/* Role Toggle Tabs */}
        <div className="flex gap-3 mb-8 p-2 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl">

          <button
            onClick={() => setRole("STUDENT")}
            className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-300 ${
              role === "STUDENT"
                ? "bg-gradient-to-r from-primary to-secondary text-primary-foreground shadow-lg shadow-primary/20"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <span className="flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.5 1.5H9.5C4.81 1.5 1 5.31 1 10C1 14.69 4.81 18.5 9.5 18.5H10.5C15.19 18.5 19 14.69 19 10C19 5.31 15.19 1.5 10.5 1.5ZM10 16C6.13 16 3 12.87 3 9C3 5.13 6.13 2 10 2C13.87 2 17 5.13 17 9C17 12.87 13.87 16 10 16Z" />
              </svg>
              Student
            </span>
          </button>

          <button
            onClick={() => setRole("ADMIN")}
            className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-300 ${
              role === "ADMIN"
                ? "bg-gradient-to-r from-primary to-secondary text-primary-foreground shadow-lg shadow-primary/20"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <span className="flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2C5.58 2 2 5.58 2 10C2 14.42 5.58 18 10 18C14.42 18 18 14.42 18 10C18 5.58 14.42 2 10 2ZM10 16C6.68 16 4 13.32 4 10C4 6.68 6.68 4 10 4C13.32 4 16 6.68 16 10C16 13.32 13.32 16 10 16Z" />
              </svg>
              Admin
            </span>
          </button>

        </div>

        {/* Login Card */}
        <div className="glass p-8 rounded-3xl border-white/10">

          {/* Header */}
          <div className="text-center mb-8">

            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mx-auto mb-4 glow">
              <svg className="w-8 h-8 text-primary-foreground" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 1C5.58 1 2 4.58 2 9C2 13.42 5.58 17 10 17C14.42 17 18 13.42 18 9C18 4.58 14.42 1 10 1ZM10 15C6.68 15 4 12.32 4 9C4 5.68 6.68 3 10 3C13.32 3 16 5.68 16 9C16 12.32 13.32 15 10 15Z" />
              </svg>
            </div>

            <h1 className="text-2xl font-bold text-foreground mb-2">
              {role === "ADMIN" ? "Admin Login" : "Student Login"}
            </h1>

            <p className="text-muted-foreground text-sm">
              {role === "ADMIN"
                ? "Access the admin control panel"
                : "Access your student help desk portal."}
            </p>

          </div>

          {/* Login Form */}
          <LoginForm role={role} />

        </div>

        {/* Footer */}
        <div className="text-center text-xs text-muted-foreground mt-6">
          <p>© 2025 Student Help Desk. All rights reserved.</p>
        </div>

      </div>

    </div>
  )
}