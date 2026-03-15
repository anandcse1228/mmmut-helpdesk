"use client"

import { useState } from "react"
import { Users, BarChart3, AlertTriangle, TrendingUp } from "lucide-react"
import { AdminStats } from "@/components/admin-stats"
import { TicketsOverview } from "@/components/tickets-overview"
import { UserManagement } from "@/components/user-management"
import { PendingTickets } from "@/components/pending-tickets"
import { Badge } from "@/components/ui/badge"

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<"overview" | "users" | "analytics">("overview")

  const tabs = [
    { id: "overview", label: "Overview", icon: BarChart3 },
    { id: "users", label: "Users", icon: Users },
    { id: "analytics", label: "Analytics", icon: TrendingUp },
  ]

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2 text-balance">Admin Panel</h1>
            <p className="text-muted-foreground">Manage system, users, and support operations</p>
          </div>
          <Badge className="bg-red-500/20 text-red-300 border border-red-500/40 px-4 py-2 hover:bg-red-500/30 transition-colors">
            <AlertTriangle className="w-4 h-4 mr-2" />3 Pending Reviews
          </Badge>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="glass rounded-2xl border border-primary/10 mb-8 p-1.5 flex gap-1.5 w-fit">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === (tab.id as typeof activeTab)

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all duration-300 font-medium text-sm ${
                isActive
                  ? "bg-gradient-to-r from-primary/30 to-secondary/30 text-foreground border border-primary/20 shadow-lg shadow-primary/20"
                  : "text-muted-foreground hover:text-foreground hover:border-primary/20 border border-transparent"
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          )
        })}
      </div>

      {/* Tab Content */}
      {activeTab === "overview" && (
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">Pending Support</h2>
            <PendingTickets />
          </div>
          <AdminStats />
          <TicketsOverview />
        </div>
      )}

      {activeTab === "users" && <UserManagement />}

      {activeTab === "analytics" && (
        <div className="glass rounded-2xl border border-primary/10 p-8 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/15 transition-all duration-300">
          <h2 className="text-2xl font-bold text-foreground mb-6">System Analytics</h2>
          <p className="text-muted-foreground">
            Analytics dashboard coming soon. Track user engagement, response times, and system performance metrics.
          </p>
        </div>
      )}
    </div>
  )
}
