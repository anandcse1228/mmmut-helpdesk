"use client"

import type React from "react"
import { useRef, useEffect, useState } from "react"
import { Send, Plus, Smile } from "lucide-react"

interface Message {
  id: string
  content: string
  role: "user" | "assistant"
}

export function ChatWindow() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const displayMessages =
    messages.length === 0
      ? [
          {
            id: "welcome-1",
            content:
              "Hey! 👋 I'm here to help with any campus questions—whether it's about your classes, deadlines, resources, or anything else student life related.",
            role: "assistant" as const,
          },
          {
            id: "welcome-2",
            content:
              "Need help with course registration? Lost your student ID? Let me know what's up!",
            role: "assistant" as const,
          },
        ]
      : messages

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [displayMessages])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, userMessage],
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Failed to get response")
      }

      const data = await response.json()

      // 🔥 Handle both Gemini response formats
      const aiText =
        data?.choices?.[0]?.message?.content ||
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "Sorry, I couldn't generate a response."

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiText,
        role: "assistant",
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("[chat] Chat error:", error)

      const errorMessage: Message = {
        id: (Date.now() + 2).toString(),
        content:
          error instanceof Error
            ? error.message
            : "Sorry, something went wrong. Please try again.",
        role: "assistant",
      }

      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
      inputRef.current?.focus()
    }
  }

  return (
    <div className="flex flex-col h-full p-8 bg-transparent">

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-1">
          Campus Assistant
        </h1>
        <p className="text-sm text-muted-foreground">
          Chat with your campus support team
        </p>
      </div>

      <div className="flex-1 overflow-y-auto mb-8 pr-6 flex flex-col gap-3">

        {displayMessages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.role === "user"
                ? "justify-end"
                : "justify-start"
            }`}
          >
            <div
              className={`max-w-xl px-6 py-4 ${
                message.role === "user"
                  ? "bg-gradient-to-br from-primary/50 to-secondary/30 border border-primary/40 text-foreground rounded-3xl rounded-tr-lg"
                  : "bg-white/8 border border-white/15 text-foreground rounded-3xl rounded-tl-lg"
              }`}
            >
              <p className="text-sm leading-relaxed">
                {message.content}
              </p>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white/8 border border-white/15 px-6 py-4 rounded-3xl rounded-tl-lg">
              <div className="flex gap-2">
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:0.2s]" />
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />

      </div>

      <form onSubmit={handleSubmit} className="flex gap-3 items-end">

        <button
          type="button"
          className="p-2.5 rounded-full hover:bg-white/10 transition text-muted-foreground"
        >
          <Plus className="w-5 h-5" />
        </button>

        <div className="flex-1 bg-white/5 border border-white/15 rounded-full px-5 py-3 flex items-center gap-3">

          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything..."
            className="flex-1 bg-transparent text-foreground outline-none text-sm"
          />

          <button type="button" className="p-1.5">
            <Smile className="w-4 h-4" />
          </button>

        </div>

        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          className="p-2.5 rounded-full bg-gradient-to-br from-primary to-secondary text-primary-foreground"
        >
          <Send className="w-5 h-5" />
        </button>

      </form>

    </div>
  )
}