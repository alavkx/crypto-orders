import { LinksFunction, LoaderFunctionArgs, json } from "@remix-run/node";
import {
  Links,
  Meta,
  NavLink,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import stylesheet from "~/tailwind.css";
import { Button } from "./components/ui/button";
import { ExclamationTriangleIcon, HomeIcon } from "@radix-ui/react-icons";
import {
  Package2Icon,
  ShoppingCartIcon,
  PackageIcon,
  UsersIcon,
  LineChartIcon,
} from "./components/icons";
import { cn } from "./lib/utils";
import { z } from "zod";
import { commitSession, getSession } from "./sessions";
import { Alert, AlertDescription, AlertTitle } from "./components/ui/alert";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
];
export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  if (!process.env.PARALLAX_API_KEY)
    throw Error("Missing PARALLAX_API_KEY in .env file");
  if (!session.has("userId")) {
    /* Usually in a /login form; omitting login for brevity 

    https://remix.run/docs/en/main/utils/sessions
    */
    const usersRes = await fetch(`https://plx-hiring-api.fly.dev/api/users`, {
      headers: { "X-Api-Key": process.env.PARALLAX_API_KEY },
    }).then((res) => res.json());
    const users = ApiUsers.safeParse(usersRes);
    if (users.success) session.set("userId", users.data.data[0].id);
    else session.flash("error", "Failed to fetch users, check your .env 👹");
  }

  return json(
    { error: session.get("error") },
    {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    }
  );
}
export default function App() {
  const data = useLoaderData<typeof loader>();
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <div className="grid min-h-screen w-full overflow-hidden lg:grid-cols-[280px_1fr]">
          <div className="hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40">
            <div className="flex h-full max-h-screen flex-col gap-2">
              <div className="flex h-[60px] items-center border-b px-6">
                <NavLink
                  className="flex items-center gap-2 font-semibold"
                  to="#"
                >
                  <Package2Icon className="h-6 w-6" />
                  <span className="">Parallax</span>
                </NavLink>
              </div>
              <div className="flex-1 overflow-auto py-2">
                <nav className="grid items-start px-4 text-sm font-medium">
                  <NavLink
                    className={({ isActive }) =>
                      cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50",
                        isActive && "text-gray-900 dark:text-gray-50"
                      )
                    }
                    to="/"
                  >
                    <HomeIcon className="h-4 w-4" />
                    Home
                  </NavLink>
                  <NavLink
                    className={({ isActive }) =>
                      cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50",
                        isActive && "text-gray-900 dark:text-gray-50"
                      )
                    }
                    to="/orders"
                  >
                    <ShoppingCartIcon className="h-4 w-4" />
                    Orders
                  </NavLink>
                  <NavLink
                    className={({ isActive }) =>
                      cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50",
                        isActive && "text-gray-900 dark:text-gray-50"
                      )
                    }
                    to="/products"
                  >
                    <PackageIcon className="h-4 w-4" />
                    Products
                  </NavLink>
                  <NavLink
                    className={({ isActive }) =>
                      cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50",
                        isActive && "text-gray-900 dark:text-gray-50"
                      )
                    }
                    to="/customers"
                  >
                    <UsersIcon className="h-4 w-4" />
                    Customers
                  </NavLink>
                  <NavLink
                    className={({ isActive }) =>
                      cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50",
                        isActive && "text-gray-900 dark:text-gray-50"
                      )
                    }
                    to="/analytics"
                  >
                    <LineChartIcon className="h-4 w-4" />
                    Analytics
                  </NavLink>
                </nav>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <Outlet />
            {data.error ? (
              <Alert className="m-4 w-auto" variant="destructive">
                <ExclamationTriangleIcon className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{data.error}</AlertDescription>
              </Alert>
            ) : null}
          </div>
        </div>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
