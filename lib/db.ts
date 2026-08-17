import type { Pool } from "pg";
import type { MongoClient as MongoClientType, Db } from "mongodb";

/**
 * IMPORTANT:
 * Netlify runs `next build` in an environment where
 * database connections MUST NOT be initialized.
 */

let pgPool: Pool | null = null;
let mongoClient: MongoClientType | null = null;

export function getPostgres(): Pool {
  if (process.env.NETLIFY === "true") {
    throw new Error("Postgres is disabled during Netlify build");
  }

  if (!pgPool) {
    const { Pool } = require("pg");
    pgPool = new Pool({
      connectionString: process.env.POSTGRES_URL,
      ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
    });
  }

  return pgPool;
}

export async function getMongo(): Promise<MongoClientType> {
  if (process.env.NETLIFY === "true") {
    throw new Error("MongoDB is disabled during Netlify build");
  }

  if (!mongoClient) {
    const { MongoClient } = require("mongodb");
    mongoClient = new MongoClient(process.env.MONGODB_URI!);
    await mongoClient.connect();
  }

  return mongoClient;
}

export async function getMongoDb(): Promise<Db> {
  const client = await getMongo();
  return client.db();
}
