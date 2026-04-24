import mongoose from "mongoose";

declare global {
  var mongooseCache:
    | {
        conn: typeof mongoose | null;
        promise: Promise<typeof mongoose> | null;
      }
    | undefined;
}

const cache = global.mongooseCache ?? {
  conn: null,
  promise: null
};

global.mongooseCache = cache;

export async function connectToDatabase() {
  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    throw new Error("Missing MONGODB_URI environment variable.");
  }

  if (cache.conn) {
    return cache.conn;
  }

  if (!cache.promise) {
    cache.promise = mongoose.connect(mongoUri, {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000
    });
  }

  cache.conn = await cache.promise;
  return cache.conn;
}
