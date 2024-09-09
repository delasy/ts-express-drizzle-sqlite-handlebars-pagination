import 'dotenv/config';

import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  dialect: 'sqlite',
  driver: 'turso',
  out: './db/migrations',
  schema: './db/schema.ts',
  strict: true,
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
