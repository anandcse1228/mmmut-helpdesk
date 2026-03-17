import { MongoClient } from "mongodb"

const uri = process.env.MONGODB_URI!

let client: MongoClient
let clientPromise: Promise<MongoClient>

client = new MongoClient(uri)
clientPromise = client.connect()

export async function connectDB() {
  return clientPromise
}