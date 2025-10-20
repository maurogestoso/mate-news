import { commitSession, getSession } from "~/sessions.server";
import type { Route } from "./+types/signup";
import { redirect } from "react-router";
import { createUser } from "~/db/auth";

export async function action({ request }: Route.ActionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const form = await request.formData();
  const name = form.get("name") as string;
  const email = form.get("email") as string;
  const password = form.get("password") as string;
  const confirmPassword = form.get("confirm-password") as string;

  if (password !== confirmPassword) {
    session.flash("error", "Password and confirmation don't match");
    return redirect("/signup", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  }

  const [{ insertedId }] = await createUser({ name, email, password });
  session.set("userId", insertedId);

  return redirect("/", {
    headers: { "Set-Cookie": await commitSession(session) },
  });
}
export default function Signup() {
  return (
    <>
      <form method="POST">
        <h2 className="font-bold text-xl">Create an account</h2>
        <label>
          Name: <input type="text" name="name" />
        </label>
        <label>
          Email: <input type="email" name="email" />
        </label>
        <label>
          Password: <input type="password" name="password" />
        </label>
        <label>
          Confirm password: <input type="password" name="confirm-password" />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </>
  );
}
