import mongoose from "mongoose";

const NEXT_PUBLIC_MONGODB_URI = process.env.NEXT_PUBLIC_MONGODB_URI as string;
console.log("NEXT_PUBLIC_MONGODB_URI", NEXT_PUBLIC_MONGODB_URI);

if (!NEXT_PUBLIC_MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

interface Cached {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

let cached: Cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function connectToDatabase(): Promise<typeof mongoose> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose
      .connect(NEXT_PUBLIC_MONGODB_URI, opts)
      .then((mongoose) => {
        return mongoose;
      });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectToDatabase;
