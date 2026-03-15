"use client"

import { MessageCircle, CheckCircle, AlertCircle, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

interface Ticket {
  id: string
  title: string
  description: string
  status: "open" | "in-progress" | "resolved"
  createdAt: string
}

function timeAgo(dateString: string) {
  const date = new Date(dateString)
  const now = new Date()

  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  if (days > 0) return `${days} day ago`
  if (hours > 0) return `${hours} hours ago`
  if (minutes > 0) return `${minutes} minutes ago`

  return "Just now"
}

export function RecentActivity() {

  const [activities, setActivities] = useState<Ticket[]>([])

  useEffect(() => {

    const fetchTickets = async () => {

      try {

        const res = await fetch("/api/tickets")
        const data = await res.json()

        // latest 3 tickets for dashboard
        setActivities(data.slice(0, 3))

      } catch (err) {
        console.error("Failed to fetch tickets:", err)
      }

    }

    fetchTickets()

  }, [])

  return (
    <section>

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-1">
          Recent Activity
        </h2>
        <p className="text-muted-foreground text-sm">
          Your latest support interactions
        </p>
      </div>

      {/* Activity List */}

      <div className="space-y-4">

        {activities.map((activity) => {

          const Icon =
            activity.status === "resolved"
              ? CheckCircle
              : activity.status === "in-progress"
              ? AlertCircle
              : MessageCircle

          const statusColor =
            activity.status === "resolved"
              ? "from-green-500/20 to-green-500/5"
              : activity.status === "in-progress"
              ? "from-primary/20 to-primary/5"
              : "from-accent/20 to-accent/5"

          const statusBgColor =
            activity.status === "resolved"
              ? "bg-green-500/10"
              : activity.status === "in-progress"
              ? "bg-primary/10"
              : "bg-accent/10"

          const statusTextColor =
            activity.status === "resolved"
              ? "text-green-400"
              : activity.status === "in-progress"
              ? "text-primary"
              : "text-accent"

          return (

            <Link
              key={activity.id}
              href={`/tickets/${activity.id.replace("#", "")}`}
              className="group block glass-darker rounded-2xl p-6 hover:border-white/20 hover:bg-white/8 transition-all duration-300 ease-out cursor-pointer"
            >

              <div className="flex items-start gap-4">

                {/* Icon */}

                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${statusColor} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className={`w-6 h-6 ${statusTextColor}`} />
                </div>

                {/* Content */}

                <div className="flex-1 min-w-0">

                  <div className="flex items-start justify-between gap-3 mb-2">

                    <div>
                      <h3 className="text-foreground font-semibold group-hover:text-primary transition-colors duration-200 truncate">
                        {activity.title}
                      </h3>

                      <p className="text-xs text-muted-foreground mt-1">
                        {timeAgo(activity.createdAt)}
                      </p>
                    </div>

                    <span className="text-xs font-mono text-muted-foreground flex-shrink-0">
                      {activity.id}
                    </span>

                  </div>

                  {/* Description */}

                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {activity.description}
                  </p>

                  {/* Status Badge */}

                  <div className="mt-3">

                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${statusBgColor} ${statusTextColor} border border-white/10`}
                    >
                      {activity.status === "resolved"
                        ? "Resolved"
                        : activity.status === "in-progress"
                        ? "In Progress"
                        : "Open"}
                    </span>

                  </div>

                </div>

                {/* Arrow */}

                <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-300 flex-shrink-0 mt-1" />

              </div>

            </Link>

          )

        })}

      </div>

      {/* View All */}

      <div className="mt-8">

        <Link
          href="/my-tickets"
          className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all duration-300 group"
        >
          View all tickets

          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />

        </Link>

      </div>

    </section>
  )
}