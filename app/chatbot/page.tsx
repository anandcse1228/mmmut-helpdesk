"use client"

import { Navbar } from "@/components/navbar"
import { Sidebar } from "@/components/sidebar"
import { ChatWindow } from "@/components/chat-window"

export default function ChatbotPage() {
  return (
    <>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 ml-64 h-[calc(100vh-4rem)] flex flex-col bg-transparent">
          <ChatWindow />
        </main>
      </div>
    </>
  )
}
