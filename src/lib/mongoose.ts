import mongoose from "mongoose";

let cached = global.mongoose as typeof mongoose | undefined; // Next.js/Hot‑reload friendly

export async function connectMongoose() {
  if (cached && cached.connection.readyState === 1) return cached; // already up

  if (!cached) {
    cached = mongoose;
    await cached.connect(process.env.MONGODB_URL);
  }

  return cached;
}
