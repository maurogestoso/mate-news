import { eq } from "drizzle-orm";
import { db } from ".";
import { postsTable, usersTable } from "./schema";

export function getAllPosts() {
  return db
    .select({
      id: postsTable.id,
      title: postsTable.title,
      userName: usersTable.name,
      createdAt: postsTable.createdAt,
    })
    .from(postsTable)
    .innerJoin(usersTable, eq(postsTable.userId, usersTable.id))
    .orderBy(postsTable.createdAt);
}
