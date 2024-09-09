import 'dotenv/config';

import { migrate } from 'drizzle-orm/libsql/migrator';
import { client, db } from '.';

async function main() {
  await migrate(db, {
    migrationsFolder: './db/migrations',
    migrationsTable: 'drizzle_migrations',
  });

  client.close();
}

void main();

process.on('SIGINT', () => {
  client.close();
});
