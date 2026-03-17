"use client"

import AuthGuard from "@/components/auth-guard"
import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

interface Ticket {
id: string
title: string
description: string
status: string
priority: string
createdAt: string
category: string
}

function timeAgo(dateString: string) {
const date = new Date(dateString)
const now = new Date()

const seconds = Math.floor((now.getTime() - date.getTime()) / 1000)
const minutes = Math.floor(seconds / 60)
const hours = Math.floor(minutes / 60)
const days = Math.floor(hours / 24)

if (days > 0) return `${days} day ago`
if (hours > 0) return `${hours} hour ago`
if (minutes > 0) return `${minutes} minutes ago`

return "Just now"
}

export default function AdminTicketsPage() {

const [tickets, setTickets] = useState<Ticket[]>([])

useEffect(() => {

const fetchTickets = async () => {
  const res = await fetch("/api/tickets")
  const data = await res.json()
  setTickets(data)
}

fetchTickets()

}, [])

return (

<AuthGuard>

<div className="max-w-5xl mx-auto px-8 py-10 text-white">

  <h1 className="text-3xl font-bold mb-10">
    All Support Tickets
  </h1>

  <div className="space-y-6">

    {tickets.map((ticket) => (

      <div
        key={ticket.id}
        className="bg-white/5 p-6 rounded-xl flex justify-between items-center"
      >

        <div>

          <p className="text-xs text-gray-400 mb-1">
            {ticket.id} • {ticket.category}
          </p>

          <h2 className="text-lg font-semibold">
            {ticket.title}
          </h2>

          <p className="text-sm text-gray-400 mt-1">
            {ticket.description}
          </p>

          <p className="text-xs text-gray-500 mt-2">
            {timeAgo(ticket.createdAt)}
          </p>

        </div>

        <div className="flex items-center gap-4">

          <span className="px-3 py-1 bg-white/10 rounded-full text-xs">
            {ticket.status}
          </span>

          <Link
            href={`/admin/tickets/${ticket.id.replace("#", "")}`}
            className="flex items-center gap-2 text-purple-400"
          >
            Manage
            <ArrowRight className="w-4 h-4" />
          </Link>

        </div>

      </div>

    ))}

  </div>

</div>

</AuthGuard>

)

}
