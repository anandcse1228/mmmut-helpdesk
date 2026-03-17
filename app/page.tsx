"use client"

import AuthGuard from "@/components/auth-guard"

import { Navbar } from "@/components/navbar"
import { Sidebar } from "@/components/sidebar"
import { WelcomeSection } from "@/components/welcome-section"
import { TicketSummary } from "@/components/ticket-summary"
import { RecentActivity } from "@/components/recent-activity"

export default function Dashboard() {

  return (

    <AuthGuard>

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

    </AuthGuard>

  )

}