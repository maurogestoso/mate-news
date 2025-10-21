import { destroySession, getSession } from "~/sessions.server";
import { getUser } from "~/db/user";
import { redirect } from "react-router";
import type { Route } from "./+types/account";

export async function loader({ request }: Route.LoaderArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  console.info("home.loader => session", session.data);

  const userId = session.get("userId");
  console.info("home.loader => session.userId", userId);
  if (!userId) {
    return { user: null };
  }

  const user = await getUser(userId);
  if (!user) return redirect("/login");
  return { user };
}

export async function action({ request }: Route.ActionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  return redirect("/login", {
    headers: {
      "Set-Cookie": await destroySession(session),
    },
  });
}

export default function Account({ loaderData }: Route.ComponentProps) {
  const { user } = loaderData;
  if (!user) return redirect("/login");

  return (
    <>
      <p>Logged in as {user.name}</p>
      <form method="POST">
        <button>Log out</button>
      </form>
    </>
  );
}
