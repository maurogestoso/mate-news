import { eq } from "drizzle-orm";
import { usersTable } from "./schema";
import { db } from ".";

async function main() {
  const user: typeof usersTable.$inferInsert = {
    name: "Mario",
    email: "mauro@example.com",
  };

  await db.insert(usersTable).values(user);
  console.log("New user created!");

  const users = await db.select().from(usersTable);
  console.log("Getting all users from the database: ", users);

  await db
    .update(usersTable)
    .set({
      name: "Mauro",
    })
    .where(eq(usersTable.email, user.email));
  console.log("User info updated!");

  await db.delete(usersTable).where(eq(usersTable.email, user.email));
  console.log("User deleted!");
}

main();
