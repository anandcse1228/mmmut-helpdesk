"use client"

import AuthGuard from "@/components/auth-guard"
import { Navbar } from "@/components/navbar"
import { Sidebar } from "@/components/sidebar"
import { CreateTicketForm } from "@/components/create-ticket-form"

export default function CreateTicketPage() {
  return (
    <AuthGuard>
      <Navbar />

      <div className="flex">
        <Sidebar />

        <main className="flex-1 ml-64 pt-20 pb-20">
          <div className="px-12 max-w-3xl">
            <CreateTicketForm />
          </div>
        </main>

      </div>
    </AuthGuard>
  )
}