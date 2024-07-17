import { createKysely } from "@vercel/postgres-kysely";
import { Database } from "./types";

export const db = createKysely<Database>();
