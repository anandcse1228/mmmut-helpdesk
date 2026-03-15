"use client"

// Client-side auth utilities
import { useRouter } from "next/navigation"

export function useAuth() {
  const router = useRouter()

  const logout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" })
      router.push("/login")
      router.refresh()
    } catch (error) {
      console.error("[v0] Logout error:", error)
    }
  }

  return { logout }
}
