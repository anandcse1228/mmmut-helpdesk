import { TicketIcon, CheckCircle, Clock } from "lucide-react"

interface StatCardProps {
  title: string
  value: string
  icon: string
  color: "primary" | "secondary" | "accent"
}

export function StatCard({ title, value, icon, color }: StatCardProps) {
  const icons = {
    TicketIcon: <TicketIcon className="w-6 h-6" />,
    CheckCircle: <CheckCircle className="w-6 h-6" />,
    Clock: <Clock className="w-6 h-6" />,
  }

  const colorClasses = {
    primary: "from-primary/20 to-primary/5",
    secondary: "from-secondary/20 to-secondary/5",
    accent: "from-accent/20 to-accent/5",
  }

  return (
    <div className="glass-darker p-6 rounded-2xl border border-white/10 glow group cursor-pointer card-hover hover:glow-pulse transition-smooth">
      <div className="flex items-start justify-between mb-4">
        <div
          className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colorClasses[color]} flex items-center justify-center text-lg group-hover:scale-110 group-hover:glow transition-smooth`}
        >
          {icons[icon as keyof typeof icons]}
        </div>
      </div>
      <h3 className="text-muted-foreground text-sm font-medium mb-2">{title}</h3>
      <p className="text-3xl font-bold text-foreground text-balance">{value}</p>
    </div>
  )
}
