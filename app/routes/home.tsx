import { getSession } from "~/sessions.server";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Mate News" },
    { name: "description", content: "An old school forum for my mates." },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  console.log("userId", session.get("userId"));
}

export default function Home() {
  return (
    <>
      <p>Home route</p>
    </>
  );
}
