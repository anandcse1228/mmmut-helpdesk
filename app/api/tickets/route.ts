import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

interface Ticket {
  id: string
  title: string
  description: string
  status: "open" | "in-progress" | "resolved" | "closed"
  priority: "low" | "medium" | "high" | "urgent"
  createdAt: string
  updatedAt: string
  category: string
}

const dataDir = path.join(process.cwd(), "data")
const filePath = path.join(dataDir, "tickets.json")

// ensure data folder exists
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir)
}

// ensure tickets file exists
if (!fs.existsSync(filePath)) {
  fs.writeFileSync(filePath, JSON.stringify([]))
}

// read tickets
function getTickets(): Ticket[] {
  const data = fs.readFileSync(filePath, "utf8")
  return JSON.parse(data)
}

// save tickets
function saveTickets(tickets: Ticket[]) {
  fs.writeFileSync(filePath, JSON.stringify(tickets, null, 2))
}


// ensure dummy tickets exist
function ensureInitialTickets() {

  let tickets = getTickets()

  const defaultTickets: Ticket[] = [

    {
      id:"#1022",
      title:"Grade dispute regarding exam",
      description:"Your dispute has been resolved by the Academic Team",
      status:"resolved",
      priority:"medium",
      category:"academic",
      createdAt:"2026-03-14T10:00:00.000Z",
      updatedAt:"2026-03-14T10:00:00.000Z"
    },

    {
      id:"#1023",
      title:"Course material not loading",
      description:"Our support team is currently working on your issue",
      status:"in-progress",
      priority:"high",
      category:"technical",
      createdAt:"2026-03-15T10:00:00.000Z",
      updatedAt:"2026-03-15T10:00:00.000Z"
    },

    {
      id:"#1024",
      title:"Lab assignment submission issue",
      description:"We received your request and will respond shortly",
      status:"open",
      priority:"medium",
      category:"academic",
      createdAt:"2026-03-15T11:00:00.000Z",
      updatedAt:"2026-03-15T11:00:00.000Z"
    }

  ]

  defaultTickets.forEach(ticket => {

    if (!tickets.find(t => t.id === ticket.id)) {
      tickets.push(ticket)
    }

  })

  saveTickets(tickets)
}


// GET → return all tickets
export async function GET() {

  // 🔥 IMPORTANT
  ensureInitialTickets()

  const tickets = getTickets()

  return NextResponse.json(tickets)

}


// POST → create ticket
export async function POST(req: Request) {

  try {

    const body = await req.json()

    const tickets = getTickets()

    const newTicket: Ticket = {

      id: `#${1000 + tickets.length + 1}`,
      title: body.title,
      description: body.description,
      category: body.category,
      priority: body.priority,
      status: "open",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),

    }

    tickets.unshift(newTicket)

    saveTickets(tickets)

    return NextResponse.json(newTicket, { status: 201 })

  } catch (error) {

    console.error("Ticket creation error:", error)

    return NextResponse.json(
      { error: "Failed to create ticket" },
      { status: 500 }
    )

  }

}