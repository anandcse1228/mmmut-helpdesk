"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"

interface LoginFormProps {
  role: "STUDENT" | "ADMIN"
}

export function LoginForm({ role }: LoginFormProps) {

  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault()

    setError("")
    setLoading(true)

    try {

      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, role }),
      })

      const data = await res.json()

      if (!data.success) {
        setError(data.error || "Invalid email or password")
        setLoading(false)
        return
      }

      // Save session
      sessionStorage.setItem("loggedIn", "true")
      sessionStorage.setItem("role", data.role)

      // Redirect
      const redirectPath = data.role === "admin" ? "/admin" : "/"

      router.push(redirectPath)

    } catch (error) {

      setError("Server error. Please try again.")
      setLoading(false)

    }

  }

  return (

    <form onSubmit={handleSubmit} className="space-y-6 w-full">

      {/* Email */}

      <div className="space-y-2">

        <label className="text-sm font-medium text-foreground">
          Email Address
        </label>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="admin@mmmut.edu"
          required
          className="input-glass w-full px-4 py-3 rounded-2xl"
          disabled={loading}
        />

      </div>

      {/* Password */}

      <div className="space-y-2">

        <label className="text-sm font-medium text-foreground">
          Password
        </label>

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          required
          className="input-glass w-full px-4 py-3 rounded-2xl"
          disabled={loading}
        />

      </div>

      {/* Error */}

      {error && (

        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-sm text-red-400">
          {error}
        </div>

      )}

      {/* Button */}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold py-3 px-4 rounded-2xl hover:shadow-lg hover:scale-105 transition-all duration-300 disabled:opacity-50"
      >

        {loading ? "LOGGING IN..." : "LOGIN"}

      </button>

      {/* Links */}

      <div className="flex justify-between text-sm text-muted-foreground pt-4">

        <a href="#" className="hover:text-primary transition-colors">
          Forgot Password?
        </a>

        <a href="#" className="hover:text-primary transition-colors">
          Create {role === "ADMIN" ? "Admin" : "Student"} Account
        </a>

      </div>

    </form>

  )
}