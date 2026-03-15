import { Badge } from "@/components/ui/badge"

const tickets = [
  {
    id: "#1024",
    title: "Lab assignment submission issue",
    status: "open",
    date: "2 hours ago",
  },
  {
    id: "#1023",
    title: "Course material not loading",
    status: "in-progress",
    date: "4 hours ago",
  },
  {
    id: "#1022",
    title: "Grade dispute regarding exam",
    status: "resolved",
    date: "1 day ago",
  },
]

export function RecentTickets() {
  return (
    <div className="glass-darker rounded-2xl border border-white/10 p-8 glow">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-2">Recent Tickets</h2>
        <p className="text-muted-foreground text-sm">Your latest support requests</p>
      </div>

      <div className="space-y-4">
        {tickets.map((ticket) => (
          <div
            key={ticket.id}
            className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 group cursor-pointer"
          >
            <div className="flex-1">
              <p className="font-semibold text-foreground group-hover:text-primary transition-colors">{ticket.title}</p>
              <p className="text-xs text-muted-foreground mt-1">{ticket.date}</p>
            </div>
            <div className="flex items-center gap-3">
              <Badge
                variant={
                  ticket.status === "resolved" ? "default" : ticket.status === "in-progress" ? "secondary" : "outline"
                }
                className={`${
                  ticket.status === "resolved"
                    ? "bg-green-500/20 text-green-200 border-green-500/30"
                    : ticket.status === "in-progress"
                      ? "bg-primary/20 text-primary border-primary/30"
                      : "bg-muted text-muted-foreground border-white/10"
                }`}
              >
                {ticket.status}
              </Badge>
              <span className="text-xs font-mono text-muted-foreground">{ticket.id}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
