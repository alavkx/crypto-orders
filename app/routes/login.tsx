import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  MetaFunction,
  json,
  redirect,
} from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "~/components/ui/alert";
import { Button } from "~/components/ui/button";
import { plx } from "~/lib/parallax-api.server";
import { commitSession, getSession } from "~/sessions";

export const meta: MetaFunction = () => {
  return [
    { title: "Login | Parallax" },
    { name: "description", content: "Welcome to Parallax!" },
  ];
};
export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  if (session.has("userId")) return redirect("/");
  return json(
    { error: session.get("error") },
    {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    }
  );
}
export default function Login() {
  const data = useLoaderData<typeof loader>();
  return (
    <>
      <form method="POST">
        <Button>Login</Button>
      </form>
      {data.error ? (
        <Alert className="m-4 w-auto" variant="destructive">
          <ExclamationTriangleIcon className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{data.error}</AlertDescription>
        </Alert>
      ) : null}
    </>
  );
}
export async function action({ request }: ActionFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const form = await request.formData();
  const username = form.get("username");
  const password = form.get("password");
  const users = (await plx.get("/users")).data;
  if (users) {
    session.set("userId", users[0].id);
    return redirect("/", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  }
  session.flash("error", "Failed to fetch users, check your .env 👹");
  return redirect("/login", {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
}
