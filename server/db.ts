import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "@shared/schema";

// Needed for Neon database in serverless environments
neonConfig.webSocketConstructor = ws;

export const hasDatabase = Boolean(process.env.DATABASE_URL);

// Create and export the database connection only if DATABASE_URL is configured
export const pool = hasDatabase
  ? new Pool({ connectionString: process.env.DATABASE_URL })
  : null;

export const db = pool ? drizzle(pool, { schema }) : null;

if (hasDatabase) {
  console.log("Database connection established");
} else {
  console.warn("DATABASE_URL not set. Falling back to in-memory storage.");
}
