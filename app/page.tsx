"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

import { Navbar } from "@/components/navbar"
import { Sidebar } from "@/components/sidebar"
import { WelcomeSection } from "@/components/welcome-section"
import { TicketSummary } from "@/components/ticket-summary"
import { RecentActivity } from "@/components/recent-activity"

export default function Dashboard() {

  const router = useRouter()

  const [authenticated, setAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    const loggedIn = sessionStorage.getItem("loggedIn")

    if (!loggedIn) {
      router.replace("/login")
    } else {
      setAuthenticated(true)
    }

    setLoading(false)

  }, [router])

  // loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-white">
        Loading...
      </div>
    )
  }

  // if not authenticated don't render dashboard
  if (!authenticated) return null

  return (
    <>
      <Navbar />

      <div className="flex">

        <Sidebar />

        <main className="flex-1 ml-64 pt-20 pb-16">

          <div className="px-12">

            {/* Welcome Section */}
            <WelcomeSection />

            {/* Ticket Summary */}
            <TicketSummary />

            {/* Recent Activity */}
            <RecentActivity />

          </div>

        </main>

      </div>
    </>
  )
}