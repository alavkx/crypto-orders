import { Form, Link, redirect } from "@remix-run/react";
import { getSession, destroySession } from "../sessions";
import { ActionFunctionArgs } from "@remix-run/node";
import { Button } from "~/components/ui/button";

export const action = async ({ request }: ActionFunctionArgs) => {
  const session = await getSession(request.headers.get("Cookie"));
  return redirect("/login", {
    headers: {
      "Set-Cookie": await destroySession(session),
    },
  });
};

export default function LogoutRoute() {
  return (
    <main className="p-4 justify-between w-[400px]">
      <p className="text-lg">Are you sure you want to log out?</p>
      <div className="inline-flex flex-1">
        <Link to="/">Never mind</Link>
        <Form method="post">
          <Button>Logout</Button>
        </Form>
      </div>
    </main>
  );
}
