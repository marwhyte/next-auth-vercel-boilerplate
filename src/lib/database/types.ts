import { Generated } from "kysely";

export interface Database {
  users: UserTable;
}

export interface UserTable {
  google_id?: string;
  id: Generated<number>;
  name: string;
  email: string;
  created_at: Date;
  password?: string;
}
