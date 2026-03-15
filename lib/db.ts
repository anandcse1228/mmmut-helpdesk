import { MongoClient } from "mongodb"

const uri = process.env.MONGODB_URI!

if (!uri) {
  throw new Error("Please define MONGODB_URI in .env.local")
}

let client: MongoClient
let clientPromise: Promise<MongoClient>

client = new MongoClient(uri)
clientPromise = client.connect()

export default clientPromise