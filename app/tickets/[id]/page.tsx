"use client"

import { useParams } from "next/navigation"
import { useState, useEffect } from "react"
import { Clock, AlertCircle, CheckCircle, MessageCircle, Zap } from "lucide-react"

interface Ticket {
  id: string
  title: string
  description: string
  status: string
  priority: string
  createdAt: string
  updatedAt: string
  category: string
  adminReply?: string
}

interface Comment {
  id: number
  user: string
  message: string
  time: string
}

function timeAgo(dateString: string) {
  const date = new Date(dateString)
  const now = new Date()

  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  if (days > 0) return `${days} day ago`
  if (hours > 0) return `${hours} hour ago`
  if (minutes > 0) return `${minutes} minutes ago`

  return "Just now"
}

function getAdminResponse(category: string) {
  switch (category) {
    case "academic":
      return "The academic department has received your request and will review it shortly."
    case "technical":
      return "Our technical team is currently investigating the issue."
    case "account":
      return "Our support team is checking your account access issue."
    default:
      return "Our support team will review your request shortly."
  }
}

export default function TicketDetailsPage() {

  const params = useParams()
  const ticketId = params.id

  const [ticket, setTicket] = useState<Ticket | null>(null)
  const [status, setStatus] = useState("open")
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState("")
  const [role, setRole] = useState("STUDENT")

  useEffect(() => {

    const storedRole = localStorage.getItem("role")
    if (storedRole) setRole(storedRole)

    const fetchTicket = async () => {

      const res = await fetch("/api/tickets")
      const tickets = await res.json()

      const found = tickets.find((t: Ticket) => t.id.replace("#", "") === ticketId)

      if (found) {

        setTicket(found)
        setStatus(found.status)

        const adminReply = found.adminReply || getAdminResponse(found.category)

        setComments([
          {
            id: 1,
            user: "Student",
            message: found.description,
            time: timeAgo(found.createdAt),
          },
          {
            id: 2,
            user: "Admin",
            message: adminReply,
            time: timeAgo(found.updatedAt),
          },
        ])

      }

    }

    fetchTicket()

  }, [ticketId])

  const addComment = () => {

    if (!newComment.trim()) return

    const comment: Comment = {
      id: Date.now(),
      user: role === "ADMIN" ? "Admin" : "Student",
      message: newComment,
      time: "Just now",
    }

    setComments([...comments, comment])
    setNewComment("")

  }

  const getStatusIcon = () => {
    if (status === "open") return <AlertCircle className="w-4 h-4" />
    if (status === "in-progress") return <Clock className="w-4 h-4" />
    if (status === "resolved") return <CheckCircle className="w-4 h-4" />
  }

  const getStatusColor = () => {
    if (status === "open") return "bg-yellow-500/10 text-yellow-200"
    if (status === "in-progress") return "bg-blue-500/10 text-blue-200"
    if (status === "resolved") return "bg-green-500/10 text-green-200"
  }

  if (!ticket) return null

  return (

    <div className="max-w-4xl mx-auto px-8 py-10 text-white">

      {/* Ticket Header */}

      <div className="mb-10">

        <p className="text-sm text-gray-400">Ticket ID</p>

        <h1 className="text-3xl font-bold mb-4">
          {ticket.id}
        </h1>

        <h2 className="text-xl font-semibold mb-2">
          {ticket.title}
        </h2>

        <p className="text-gray-400 mb-4">
          {ticket.description}
        </p>

        <div className="flex items-center gap-4">

          <div
            className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm ${getStatusColor()}`}
          >
            {getStatusIcon()}
            {status}
          </div>

          <div className="flex items-center gap-1 text-red-400">
            <Zap className="w-4 h-4" />
            High Priority
          </div>

        </div>

      </div>

      {/* Timeline */}

      <div className="mb-12">

        <h3 className="text-lg font-semibold mb-4">
          Ticket Timeline
        </h3>

        <div className="space-y-4">

          <div className="border-l border-gray-700 pl-4">
            <p className="text-sm text-gray-300">
              Ticket created
            </p>
            <p className="text-xs text-gray-500">
              {timeAgo(ticket.createdAt)}
            </p>
          </div>

          <div className="border-l border-gray-700 pl-4">
            <p className="text-sm text-gray-300">
              Admin acknowledged ticket
            </p>
            <p className="text-xs text-gray-500">
              {timeAgo(ticket.updatedAt)}
            </p>
          </div>

        </div>

      </div>

      {/* Discussion */}

      <div className="mb-12">

        <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
          <MessageCircle className="w-5 h-5" />
          Discussion
        </h3>

        <div className="space-y-4">

          {comments.map((comment) => (

            <div
              key={comment.id}
              className={`flex ${comment.user === "Admin" ? "justify-end" : "justify-start"}`}
            >

              <div
                className={`max-w-md px-4 py-3 rounded-2xl ${
                  comment.user === "Admin"
                    ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white"
                    : "bg-white/10 text-gray-200"
                }`}
              >

                <div className="flex justify-between text-xs opacity-70 mb-1">
                  <span>{comment.user}</span>
                  <span>{comment.time}</span>
                </div>

                <p>{comment.message}</p>

              </div>

            </div>

          ))}

        </div>

      </div>

      {/* Reply Box */}

      <div className="mb-10">

        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a reply..."
          className="w-full p-4 rounded-xl bg-white/5 border border-white/10 outline-none"
        />

        <button
          onClick={addComment}
          className="mt-4 px-6 py-2 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full"
        >
          Send Reply
        </button>

      </div>

      {/* Admin Actions */}

      {role === "ADMIN" && (

        <div>

          <h3 className="text-lg font-semibold mb-4">
            Update Status
          </h3>

          <div className="flex gap-3">

            <button
              onClick={() => setStatus("open")}
              className="px-4 py-2 bg-yellow-600 rounded-full text-sm"
            >
              Open
            </button>

            <button
              onClick={() => setStatus("in-progress")}
              className="px-4 py-2 bg-blue-600 rounded-full text-sm"
            >
              In Progress
            </button>

            <button
              onClick={() => setStatus("resolved")}
              className="px-4 py-2 bg-green-600 rounded-full text-sm"
            >
              Resolve
            </button>

          </div>

        </div>

      )}

    </div>

  )

}