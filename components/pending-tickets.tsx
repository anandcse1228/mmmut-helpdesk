"use client"

import { AlertCircle, Clock, ChevronRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface PendingTicket {
  id: string
  title: string
  student: string
  priority: "urgent" | "high" | "medium"
  waitTime: string
  category: string
}

const mockPendingTickets: PendingTicket[] = [
  {
    id: "1",
    title: "Cannot access course materials",
    student: "Jake Wilson",
    priority: "urgent",
    waitTime: "45 min",
    category: "Technical",
  },
  {
    id: "2",
    title: "Grade appeal for midterm",
    student: "Lisa Chen",
    priority: "high",
    waitTime: "2 hrs",
    category: "Academic",
  },
  {
    id: "3",
    title: "Transcript request",
    student: "Jordan Smith",
    priority: "medium",
    waitTime: "3 hrs",
    category: "Administrative",
  },
]

export function PendingTickets() {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "bg-red-500/20 text-red-300 border-red-500/40"
      case "high":
        return "bg-orange-500/20 text-orange-300 border-orange-500/40"
      default:
        return "bg-yellow-500/20 text-yellow-300 border-yellow-500/40"
    }
  }

  return (
    <div className="space-y-4">
      {mockPendingTickets.map((ticket) => (
        <div
          key={ticket.id}
          className="glass rounded-2xl border border-primary/10 p-5 hover:border-primary/20 hover:bg-white/8 hover:shadow-lg hover:shadow-primary/15 hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-start gap-3 mb-3">
                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground mb-1">{ticket.title}</h3>
                  <p className="text-sm text-muted-foreground">{ticket.student}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <Badge className={`text-xs font-medium border capitalize ${getPriorityColor(ticket.priority)}`}>
                  {ticket.priority}
                </Badge>
                <span className="text-xs text-muted-foreground bg-white/5 px-2.5 py-1 rounded-lg">
                  {ticket.category}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 flex-shrink-0">
              <div className="flex items-center gap-1 text-muted-foreground text-sm">
                <Clock className="w-4 h-4" />
                <span>{ticket.waitTime}</span>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
