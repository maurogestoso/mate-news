import { randomBytes, scryptSync } from "crypto";
import { usersTable } from "./schema";
import { db } from ".";

export async function createUser({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}) {
  const passwordSalt = randomBytes(16);
  const passwordHash = scryptSync(password, passwordSalt, 64);
  const user: typeof usersTable.$inferInsert = {
    name,
    email,
    passwordHash: passwordHash.toString("hex"),
    passwordSalt: passwordSalt.toString("hex"),
  };

  return await db
    .insert(usersTable)
    .values(user)
    .returning({ insertedId: usersTable.id });
}
