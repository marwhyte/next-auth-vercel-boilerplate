import { db } from "../db";
import { Database } from "../types";

export async function getUsers() {
  const users = await db.selectFrom("users").selectAll().execute();
  return users;
}

export async function getUserByEmail(email: string) {
  const user = await db
    .selectFrom("users")
    .selectAll()
    .where("email", "=", email)
    .executeTakeFirst();
  return user;
}

export async function addUser(user: {
  name: string;
  email: string;
  googleId?: string;
  password?: string;
}) {
  if (!user.googleId && !user.password) {
    throw new Error("Either googleId or password is required");
  }

  await db
    .insertInto("users")
    .values({
      name: user.name,
      email: user.email,
      password: user.password,
      google_id: user.googleId,
      created_at: new Date(),
    })
    .execute();
}
