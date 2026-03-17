import { NextResponse } from "next/server"
import mongoose from "mongoose"

// 1. Database Connection Logic
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

async function connectDB() {
  if (mongoose.connection.readyState >= 1) return;
  return mongoose.connect(MONGODB_URI as string);
}

// 2. Ticket Schema (MongoDB ke liye)
const TicketSchema = new mongoose.Schema({
  id: String,
  title: String,
  description: String,
  status: { type: String, enum: ["open", "in-progress", "resolved", "closed"], default: "open" },
  priority: { type: String, enum: ["low", "medium", "high", "urgent"] },
  category: String,
  createdAt: { type: String, default: () => new Date().toISOString() },
  updatedAt: { type: Date, default: Date.now }
});

// Model initialization
const Ticket = mongoose.models.Ticket || mongoose.model("Ticket", TicketSchema);

// 3. GET → Database se tickets lao
export async function GET() {
  try {
    await connectDB();
    let tickets = await Ticket.find({}).sort({ createdAt: -1 });

    // Agar database khali hai toh initial data daal do (First time only)
    if (tickets.length === 0) {
      const defaultTickets = [
        { id: "#1022", title: "Grade dispute regarding exam", description: "Resolved by Academic Team", status: "resolved", priority: "medium", category: "academic" },
        { id: "#1023", title: "Course material not loading", description: "Working on your issue", status: "in-progress", priority: "high", category: "technical" }
      ];
      await Ticket.insertMany(defaultTickets);
      tickets = await Ticket.find({}).sort({ createdAt: -1 });
    }

    return NextResponse.json(tickets);
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({ error: "Failed to fetch tickets" }, { status: 500 });
  }
}

// 4. POST → Database mein naya ticket save karo
export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    // Ticket count nikalne ke liye taaki ID generate ho sake
    const count = await Ticket.countDocuments();

    const newTicket = await Ticket.create({
      id: `#${1000 + count + 1}`,
      title: body.title,
      description: body.description,
      category: body.category,
      priority: body.priority,
      status: "open",
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json(newTicket, { status: 201 });
  } catch (error) {
    console.error("Ticket creation error:", error);
    return NextResponse.json(
      { error: "Failed to create ticket in database" },
      { status: 500 }
    );
  }
}