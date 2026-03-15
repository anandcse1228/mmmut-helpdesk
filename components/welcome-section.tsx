"use client"

import { ArrowRight } from "lucide-react"
import Link from "next/link"

export function WelcomeSection() {
  return (
    <section className="mb-16">
      <div className="mb-8">
        <h1 className="text-5xl font-bold text-foreground mb-4 text-balance leading-tight">
          Welcome back! How can we help today?
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
          Whether you need quick answers to your questions or want to report an issue, we're here to support you every
          step of the way.
        </p>
      </div>

      {/* Quick Action */}
      <div className="flex gap-4">
        <Link
          href="/chatbot"
          className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-primary to-secondary text-primary-foreground font-semibold hover:shadow-lg hover:shadow-primary/50 hover:scale-105 transition-all duration-300 ease-out active:scale-95"
        >
          Start Chatting
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
        </Link>
        <Link
          href="/create-ticket"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white/5 border border-white/15 text-foreground font-semibold hover:bg-white/10 hover:border-primary/30 transition-all duration-300 ease-out"
        >
          Create Ticket
        </Link>
      </div>
    </section>
  )
}
