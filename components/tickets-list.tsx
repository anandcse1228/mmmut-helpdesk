"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ChevronRight, AlertCircle, Clock, CheckCircle, MessageCircle, Zap } from "lucide-react"

interface Ticket {
  id: string
  title: string
  description: string
  status: "open" | "in-progress" | "resolved" | "closed"
  priority: "low" | "medium" | "high" | "urgent"
  createdAt: string
  updatedAt: string
  category: string
}

export function TicketsList() {

  const router = useRouter()

  const [tickets, setTickets] = useState<Ticket[]>([])
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null)
  const [filterStatus, setFilterStatus] = useState<string>("all")

  // FETCH TICKETS
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const res = await fetch("/api/tickets")
        const data = await res.json()
        setTickets(data)
      } catch (error) {
        console.error("Failed to fetch tickets:", error)
      }
    }

    fetchTickets()
  }, [])

  const filteredTickets =
    filterStatus === "all"
      ? tickets
      : tickets.filter((t) => t.status === filterStatus)

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "open":
        return <AlertCircle className="w-4 h-4" />
      case "in-progress":
        return <Clock className="w-4 h-4" />
      case "resolved":
        return <CheckCircle className="w-4 h-4" />
      default:
        return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-yellow-500/10 text-yellow-200"
      case "in-progress":
        return "bg-blue-500/10 text-blue-200"
      case "resolved":
        return "bg-green-500/10 text-green-200"
      default:
        return "bg-white/10 text-muted-foreground"
    }
  }

  const getPriorityIcon = (priority: string) => {
    if (priority === "urgent") return <Zap className="w-3.5 h-3.5 text-red-400" />
    if (priority === "high") return <Zap className="w-3.5 h-3.5 text-orange-400" />
    return null
  }

  const formatDate = (date: string) => {
    const d = new Date(date)
    const now = new Date()

    const diffMs = now.getTime() - d.getTime()
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffHours < 1) return "just now"
    if (diffHours < 24) return `${diffHours}h ago`
    if (diffDays < 7) return `${diffDays}d ago`

    return d.toLocaleDateString()
  }

  return (
    <div>

      {/* PAGE HEADER */}

      <div className="mb-12">
        <h1 className="text-4xl font-bold text-foreground mb-3">
          My Tickets
        </h1>

        <p className="text-base text-muted-foreground">
          Stay on top of your requests
        </p>
      </div>


      {/* FILTER BUTTONS */}

      <div className="flex gap-2 mb-12 flex-wrap">
        {["all", "open", "in-progress", "resolved"].map((status) => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              filterStatus === status
                ? "bg-gradient-to-r from-primary to-secondary text-primary-foreground shadow-lg shadow-primary/30"
                : "text-muted-foreground hover:text-foreground hover:bg-white/5"
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1).replace("-", " ")}
          </button>
        ))}
      </div>


      {/* TICKET LIST */}

      <div className="space-y-2">
        {filteredTickets.map((ticket) => (
          <div key={ticket.id}>

            <button
              onClick={() =>
                setSelectedTicket(
                  selectedTicket === ticket.id ? null : ticket.id
                )
              }
              className="w-full text-left px-6 py-5 rounded-2xl transition-all hover:bg-white/5 group"
            >

              <div className="flex items-start justify-between gap-4">

                {/* LEFT CONTENT */}

                <div className="flex-1 min-w-0">

                  <div className="flex items-center gap-2 mb-2">

                    <span className="text-xs font-mono text-muted-foreground/60">
                      #{ticket.id}
                    </span>

                    <span className="text-xs text-muted-foreground/50 px-2 py-0.5 rounded-full bg-white/5">
                      {ticket.category}
                    </span>

                  </div>

                  <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors mb-1">
                    {ticket.title}
                  </h3>

                  <p className="text-sm text-muted-foreground/70 line-clamp-1 mb-3">
                    {ticket.description}
                  </p>

                  <span className="text-xs text-muted-foreground/50">
                    {formatDate(ticket.updatedAt)}
                  </span>

                </div>


                {/* RIGHT SIDE */}

                <div className="flex items-center gap-3 flex-shrink-0">

                  {getPriorityIcon(ticket.priority)}

                  <div
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${getStatusColor(ticket.status)}`}
                  >

                    <div className="w-1.5 h-1.5 rounded-full bg-current" />

                    {ticket.status.charAt(0).toUpperCase() +
                      ticket.status.slice(1).replace("-", " ")}

                  </div>

                  <ChevronRight className="w-5 h-5 text-muted-foreground/50 group-hover:text-primary group-hover:translate-x-1 transition-all duration-300" />

                </div>

              </div>

            </button>


            {/* EXPANDED SECTION */}

            {selectedTicket === ticket.id && (
              <div className="px-6 py-4 animate-in fade-in slide-in-from-top-2 duration-300">

                <div className="space-y-4 pl-4 border-l border-white/10">

                  <div>

                    <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                      Description
                    </h4>

                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {ticket.description}
                    </p>

                  </div>


                  {/* VIEW DETAILS BUTTON */}
                  <button
                    onClick={() =>
                              router.push(`/tickets/${ticket.id.replace("#","")}`)
                            }
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary to-secondary text-primary-foreground text-sm font-medium hover:shadow-lg hover:shadow-primary/40 transition-all duration-300"
                  >
                    View Details
                      <ChevronRight className="w-4 h-4" />
                  </button>

                </div>

              </div>
            )}

          </div>
        ))}
      </div>


      {/* EMPTY STATE */}

      {filteredTickets.length === 0 && (
        <div className="text-center py-16">

          <MessageCircle className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />

          <p className="text-muted-foreground">
            No tickets found
          </p>

        </div>
      )}

    </div>
  )
}