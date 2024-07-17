import { FileMigrationProvider, Kysely, Migrator, sql } from "kysely";
import path from "path";
import { promises as fs } from "fs";
import { createKysely } from "@vercel/postgres-kysely";
import { db } from "./db";

export async function executeMigration() {
  const migrator = new Migrator({
    db,
    provider: new FileMigrationProvider({
      fs,
      path,
      migrationFolder: path.join(__dirname, "../database/migrations"),
    }),
  });

  const { error, results } = await migrator.migrateToLatest();

  console.log(results);
  results?.forEach((it) => {
    if (it.status === "Success") {
      console.log(`migration "${it.migrationName}" was executed successfully`);
    } else if (it.status === "Error") {
      console.error(`failed to execute migration "${it.migrationName}"`);
    }
  });

  if (error) {
    console.error("failed to migrate");
    console.error(error);
    process.exit(1);
  }

  await db.destroy();
}

executeMigration();
