import { eq } from "drizzle-orm";
import { db } from ".";
import { postsTable, usersTable } from "./schema";

async function main() {
  const [user] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.name, "Mauro"));

  const posts = [
    { title: "Se recontra viene!" },
    { title: "Que preferis, mear una uva o cagar una sandia?" },
    { title: "Convocatoria gordos Streets of Rage" },
  ];

  posts.forEach(async (post, i) => {
    const postData: typeof postsTable.$inferInsert = {
      title: post.title,
      userId: user.id,
      createdAt: new Date(Date.now() + i * 1000 * 60 * 60 * 24),
    };
    const result = await db.insert(postsTable).values(postData).returning();
    console.info("Inserted post", result);
  });
}

main();
