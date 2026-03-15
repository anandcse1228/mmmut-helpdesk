import { Users, TicketIcon, TrendingUp, Clock } from "lucide-react"

const stats = [
  {
    title: "Total Users",
    value: "1,247",
    change: "+12.5%",
    icon: Users,
    color: "primary",
  },
  {
    title: "Open Tickets",
    value: "34",
    change: "-8.2%",
    icon: TicketIcon,
    color: "secondary",
  },
  {
    title: "Avg Resolution",
    value: "2.4 hrs",
    change: "-15.3%",
    icon: Clock,
    color: "accent",
  },
  {
    title: "Customer Satisfaction",
    value: "4.8/5",
    change: "+2.1%",
    icon: TrendingUp,
    color: "primary",
  },
]

export function AdminStats() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-foreground mb-4">System Metrics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon
          const colorMap = {
            primary: "from-primary/25 to-primary/10",
            secondary: "from-secondary/25 to-secondary/10",
            accent: "from-blue-500/25 to-blue-500/10",
          }

          return (
            <div
              key={i}
              className="glass rounded-2xl border border-primary/10 p-5 hover:border-primary/20 hover:bg-white/8 hover:shadow-lg hover:shadow-primary/15 hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="flex items-start justify-between mb-3">
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colorMap[stat.color as keyof typeof colorMap]} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <span className="text-xs font-semibold text-green-400">{stat.change}</span>
              </div>
              <h3 className="text-muted-foreground text-sm font-medium mb-1">{stat.title}</h3>
              <p className="text-3xl font-bold text-foreground text-balance">{stat.value}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
