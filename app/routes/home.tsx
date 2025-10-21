import { getSession } from "~/sessions.server";
import type { Route } from "./+types/home";
import { getUser } from "~/db/user";
import { getAllPosts } from "~/db/posts";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Mate News" },
    { name: "description", content: "An old school forum for my mates." },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const posts = await getAllPosts();

  const userId = session.get("userId");
  if (!userId) {
    return { user: null, posts };
  }

  const user = await getUser(userId);
  return { user, posts };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { posts } = loaderData;
  return (
    <>
      {posts.map((post) => (
        <article>
          <h3>{post.title}</h3>
          <p>
            by {post.userName} on {post.createdAt.toLocaleDateString("en-GB")}
          </p>
        </article>
      ))}
    </>
  );
}
