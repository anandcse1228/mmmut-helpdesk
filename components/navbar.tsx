"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { LogOut, User } from "lucide-react"

export function Navbar() {

  const router = useRouter()

  const handleLogout = () => {

    if (typeof window === "undefined") return

    // clear auth session
    sessionStorage.removeItem("loggedIn")
    sessionStorage.removeItem("role")

    // force redirect to login
    router.replace("/login")

  }

  return (

    <nav className="glass sticky top-0 z-50 border-b border-primary/10 backdrop-blur-xl">

      <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">

        {/* Logo */}

        <Link href="/" className="flex items-center gap-3 group">

          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary text-primary-foreground flex items-center justify-center font-bold text-lg hover:shadow-lg hover:shadow-primary/40 group-hover:scale-110 transition-all duration-300">

            HD

          </div>

          <span className="text-lg font-semibold text-foreground group-hover:text-primary transition-all duration-300">

            HelpDesk

          </span>

        </Link>

        {/* Right Controls */}

        <div className="flex items-center gap-3">

          {/* Profile */}

          <button
            className="p-2.5 rounded-lg hover:bg-white/10 transition-all duration-300 group"
            aria-label="User profile"
          >

            <User className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-all duration-300" />

          </button>

          {/* Logout */}

          <button
            onClick={handleLogout}
            className="p-2.5 rounded-lg hover:bg-white/10 transition-all duration-300 group"
            aria-label="Logout"
          >

            <LogOut className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-all duration-300" />

          </button>

        </div>

      </div>

    </nav>

  )

}