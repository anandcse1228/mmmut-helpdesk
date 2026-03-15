"use client"

import { useState } from "react"
import { Search, Trash2, Shield, ChevronRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface User {
  id: string
  name: string
  email: string
  role: "student" | "admin" | "support"
  status: "active" | "inactive"
  tickets: number
  joinedDate: string
}

const mockUsers: User[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah.johnson@university.edu",
    role: "student",
    status: "active",
    tickets: 3,
    joinedDate: "2024-01-15",
  },
  {
    id: "2",
    name: "Alex Chen",
    email: "alex.chen@university.edu",
    role: "admin",
    status: "active",
    tickets: 0,
    joinedDate: "2023-11-20",
  },
  {
    id: "3",
    name: "Emma Rodriguez",
    email: "emma.r@university.edu",
    role: "support",
    status: "active",
    tickets: 45,
    joinedDate: "2024-02-01",
  },
  {
    id: "4",
    name: "Michael Park",
    email: "m.park@university.edu",
    role: "student",
    status: "inactive",
    tickets: 1,
    joinedDate: "2024-03-10",
  },
]

export function UserManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [hoveredUser, setHoveredUser] = useState<string | null>(null)

  const filteredUsers = mockUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-secondary/20 text-secondary border-secondary/40"
      case "support":
        return "bg-blue-500/20 text-blue-300 border-blue-500/40"
      default:
        return "bg-primary/20 text-primary border-primary/40"
    }
  }

  const getStatusDot = (status: string) => {
    return status === "active" ? "bg-green-500" : "bg-red-500"
  }

  return (
    <div className="space-y-6">
      <div className="glass rounded-2xl border border-primary/10 p-4 focus-within:border-primary/30 focus-within:shadow-lg focus-within:shadow-primary/20 transition-all duration-300">
        <div className="flex items-center gap-3">
          <Search className="w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search users by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground/50 outline-none"
          />
        </div>
      </div>

      <div className="space-y-3">
        {filteredUsers.map((user) => (
          <div
            key={user.id}
            onMouseEnter={() => setHoveredUser(user.id)}
            onMouseLeave={() => setHoveredUser(null)}
            className="glass rounded-2xl border border-primary/10 p-5 hover:border-primary/20 hover:bg-white/8 hover:shadow-lg hover:shadow-primary/15 hover:-translate-y-1 transition-all duration-300 flex items-center justify-between group cursor-pointer"
          >
            {/* User info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-2">
                <div className={`w-2.5 h-2.5 rounded-full ${getStatusDot(user.status)}`} />
                <h3 className="font-semibold text-foreground truncate">{user.name}</h3>
              </div>
              <p className="text-sm text-muted-foreground truncate">{user.email}</p>
            </div>

            {/* Badges and info */}
            <div className="flex items-center gap-3 ml-4 flex-shrink-0">
              <div className="flex items-center gap-2">
                <Badge className={`capitalize text-xs font-medium border ${getRoleBadgeColor(user.role)}`}>
                  {user.role === "admin" && <Shield className="w-3 h-3 mr-1" />}
                  {user.role}
                </Badge>
                <span className="text-xs text-muted-foreground">{user.tickets} tickets</span>
              </div>

              {hoveredUser === user.id && (
                <button className="p-2 rounded-lg hover:bg-primary/20 transition-all duration-300 text-muted-foreground hover:text-red-400 flex-shrink-0">
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
              {hoveredUser === user.id && (
                <div className="text-muted-foreground group-hover:text-primary transition-colors">
                  <ChevronRight className="w-4 h-4" />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
