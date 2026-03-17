import { MongoClient } from "mongodb";

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri = process.env.MONGODB_URI;
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  // Development mode mein global variable use karte hain taaki 
  // HMR (Hot Module Replacement) ki wajah se baar-baar naye connection na bane.
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options);
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  // Production (Vercel) mein humesha naya client banta hai par scoped rehta hai.
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export async function connectDB() {
  const connectedClient = await clientPromise;
  return connectedClient;
}

// Export a module-scoped MongoClient promise. 
// By doing this in a separate module, the client can be shared across functions.
export default clientPromise;