import { getSession } from "~/sessions.server";
import type { Route } from "./+types/home";
import { getUser } from "~/db/user";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Mate News" },
    { name: "description", content: "An old school forum for my mates." },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  const session = await getSession(request.headers.get("Cookie"));

  const userId = session.get("userId");
  if (!userId) {
    return { user: null };
  }

  const user = await getUser(userId);
  return { user };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { user } = loaderData;
  return (
    <>
      <p>Home route</p>
      {user ? (
        <>
          <p>Logged in as {user.name}</p>
        </>
      ) : (
        <p>Not logged in</p>
      )}
    </>
  );
}
