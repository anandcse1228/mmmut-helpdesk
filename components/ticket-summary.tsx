"use client"

import { useEffect, useState } from "react"
import { Zap, CheckCircle2, AlertCircle, Clock } from "lucide-react"

interface Ticket {
  id: string
  title: string
  status: "open" | "in-progress" | "resolved"
  createdAt: string
  updatedAt: string
}

export function TicketSummary() {

  const [openTickets, setOpenTickets] = useState(0)
  const [resolvedTickets, setResolvedTickets] = useState(0)

  useEffect(() => {

    const fetchTickets = async () => {

      try {

        const res = await fetch("/api/tickets")
        const data: Ticket[] = await res.json()

        const open = data.filter(ticket => ticket.status === "open").length
        const resolved = data.filter(ticket => ticket.status === "resolved").length

        setOpenTickets(open)
        setResolvedTickets(resolved)

      } catch (error) {
        console.error("Failed to fetch tickets:", error)
      }

    }

    fetchTickets()

  }, [])

  return (
    <section className="mb-16">

      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-1">
          Your Support Status
        </h2>
        <p className="text-muted-foreground text-sm">
          Quick overview of your tickets
        </p>
      </div>

      {/* Summary Panels */}

      <div className="grid grid-cols-3 gap-6">

        {/* Open Tickets */}

        <div className="group glass-darker rounded-3xl p-8 hover:-translate-y-1 transition-all duration-300 ease-out cursor-pointer">

          <div className="flex items-start justify-between mb-6">

            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <AlertCircle className="w-7 h-7 text-primary" />
            </div>

            <Zap className="w-5 h-5 text-primary/40" />

          </div>

          <p className="text-muted-foreground text-sm font-medium mb-2">
            Open Tickets
          </p>

          <p className="text-4xl font-bold text-foreground">
            {openTickets}
          </p>

          <p className="text-xs text-muted-foreground mt-3">
            Waiting for response
          </p>

        </div>

        {/* Resolved */}

        <div className="group glass-darker rounded-3xl p-8 hover:-translate-y-1 transition-all duration-300 ease-out cursor-pointer">

          <div className="flex items-start justify-between mb-6">

            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-secondary/30 to-secondary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <CheckCircle2 className="w-7 h-7 text-secondary" />
            </div>

            <Zap className="w-5 h-5 text-secondary/40" />

          </div>

          <p className="text-muted-foreground text-sm font-medium mb-2">
            Resolved Tickets
          </p>

          <p className="text-4xl font-bold text-foreground">
            {resolvedTickets}
          </p>

          <p className="text-xs text-muted-foreground mt-3">
            Great work!
          </p>

        </div>

        {/* Average Response */}

        <div className="group glass-darker rounded-3xl p-8 hover:-translate-y-1 transition-all duration-300 ease-out cursor-pointer">

          <div className="flex items-start justify-between mb-6">

            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Clock className="w-7 h-7 text-primary" />
            </div>

            <Zap className="w-5 h-5 text-primary/40" />

          </div>

          <p className="text-muted-foreground text-sm font-medium mb-2">
            Avg Response Time
          </p>

          <p className="text-4xl font-bold text-foreground">
            2.5 hrs
          </p>

          <p className="text-xs text-muted-foreground mt-3">
            Lightning fast
          </p>

        </div>

      </div>

    </section>
  )
}