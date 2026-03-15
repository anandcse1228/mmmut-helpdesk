"use client"

import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { AlertCircle, Clock, CheckCircle } from "lucide-react"

interface Ticket {
  id: string
  title: string
  description: string
  status: string
  priority: string
  createdAt: string
  updatedAt: string
  category: string
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

export default function AdminManageTicket() {

  const params = useParams()
  const ticketId = params.id

  const [ticket, setTicket] = useState<Ticket | null>(null)
  const [status, setStatus] = useState("open")
  const [reply, setReply] = useState("")

  useEffect(() => {

    const fetchTicket = async () => {

      const res = await fetch("/api/tickets")
      const tickets = await res.json()

      const found = tickets.find((t: Ticket) =>
        t.id.replace("#", "") === ticketId
      )

      if (found) {
        setTicket(found)
        setStatus(found.status)
      }

    }

    fetchTicket()

  }, [ticketId])

  const updateStatus = (newStatus: string) => {
    setStatus(newStatus)
    alert(`Ticket status updated to ${newStatus}`)
  }

  const sendReply = () => {

    if (!reply.trim()) return

    alert("Reply sent to student")

    setReply("")
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

      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm ${getStatusColor()}`}>
        {getStatusIcon()}
        {status}
      </div>

      <div className="mt-10">

        <h3 className="text-lg font-semibold mb-4">
          Ticket Timeline
        </h3>

        <p className="text-sm">
          Created {timeAgo(ticket.createdAt)}
        </p>

        <p className="text-sm text-gray-400">
          Last updated {timeAgo(ticket.updatedAt)}
        </p>

      </div>

      <div className="mt-10">

        <h3 className="text-lg font-semibold mb-4">
          Reply to Student
        </h3>

        <textarea
          value={reply}
          onChange={(e) => setReply(e.target.value)}
          placeholder="Write reply..."
          className="w-full p-4 rounded-xl bg-white/5 border border-white/10 outline-none"
        />

        <button
          onClick={sendReply}
          className="mt-4 px-6 py-2 bg-purple-600 rounded-lg"
        >
          Send Reply
        </button>

      </div>

      <div className="mt-10">

        <h3 className="text-lg font-semibold mb-4">
          Update Ticket Status
        </h3>

        <div className="flex gap-4">

          <button
            onClick={() => updateStatus("open")}
            className="px-4 py-2 bg-yellow-600 rounded-lg"
          >
            Open
          </button>

          <button
            onClick={() => updateStatus("in-progress")}
            className="px-4 py-2 bg-blue-600 rounded-lg"
          >
            In Progress
          </button>

          <button
            onClick={() => updateStatus("resolved")}
            className="px-4 py-2 bg-green-600 rounded-lg"
          >
            Resolve
          </button>

        </div>

      </div>

    </div>

  )

}