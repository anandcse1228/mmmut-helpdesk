"use client"

import AuthGuard from "@/components/auth-guard"
import { Navbar } from "@/components/navbar"
import { Sidebar } from "@/components/sidebar"
import { TicketsList } from "@/components/tickets-list"

export default function MyTicketsPage() {
  return (
    <AuthGuard>
      <Navbar />

      <div className="flex">
        <Sidebar />

        <main className="flex-1 ml-64 pt-12 pb-12">
          <div className="px-12 max-w-5xl">
            <TicketsList />
          </div>
        </main>

      </div>
    </AuthGuard>
  )
}