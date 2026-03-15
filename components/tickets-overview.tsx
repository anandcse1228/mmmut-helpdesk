import { Badge } from "@/components/ui/badge"
import { TrendingUp } from "lucide-react"

const ticketCategories = [
  { name: "Academic Issues", count: 12, percentage: 35 },
  { name: "Technical Support", count: 15, percentage: 44 },
  { name: "Administrative", count: 7, percentage: 21 },
]

export function TicketsOverview() {
  return (
    <div className="glass-darker rounded-2xl border border-white/10 p-8 glow">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Ticket Distribution</h2>
          <p className="text-muted-foreground text-sm">Current support ticket breakdown by category</p>
        </div>
        <TrendingUp className="w-6 h-6 text-primary" />
      </div>

      <div className="space-y-4">
        {ticketCategories.map((category, i) => (
          <div key={i} className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-foreground">{category.name}</span>
              <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30">
                {category.count}
              </Badge>
            </div>
            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                style={{ width: `${category.percentage}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground text-right">{category.percentage}%</p>
          </div>
        ))}
      </div>
    </div>
  )
}
