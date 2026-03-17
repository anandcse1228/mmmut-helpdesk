"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, MessageCircle, Plus, TicketIcon, Settings } from "lucide-react"

const navItems = [
  { href: "/", icon: Home, label: "Dashboard" },
  { href: "/chatbot", icon: MessageCircle, label: "AI Chatbot" },
  { href: "/create-ticket", icon: Plus, label: "Create Ticket" },
  { href: "/my-tickets", icon: TicketIcon, label: "My Tickets" },
  { href: "/admin/tickets", icon: Settings, label: "Admin Panel" },
]

export function Sidebar() {
  const pathname = usePathname()

  const isActiveRoute = (href: string) => {
    if (href === "/") return pathname === "/"
    return pathname.startsWith(href)
  }

  return (
    <aside className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 border-r border-primary/10 p-6 overflow-y-auto">
      <div className="space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = isActiveRoute(item.href)

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-5 py-3 rounded-xl font-medium transition-all duration-300 ease-out group ${
                isActive
                  ? "bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/40 text-primary shadow-lg shadow-primary/25"
                  : "text-muted-foreground hover:text-foreground hover:bg-white/5 border border-transparent hover:border-primary/20"
              }`}
            >
              <Icon
                className={`w-5 h-5 flex-shrink-0 transition-all duration-300 ${
                  isActive ? "text-primary" : "group-hover:text-primary"
                }`}
              />

              <span className="text-sm">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </aside>
  )
}