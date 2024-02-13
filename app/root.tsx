import { LinksFunction } from "@remix-run/node";
import {
  Links,
  Meta,
  NavLink,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import stylesheet from "~/tailwind.css";
import { Button } from "./components/ui/button";
import { BellIcon, HomeIcon } from "@radix-ui/react-icons";
import {
  Package2Icon,
  ShoppingCartIcon,
  PackageIcon,
  UsersIcon,
  LineChartIcon,
} from "./components/icons";
import { cn } from "./lib/utils";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
];
export default function App() {
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
                <Button
                  className="ml-auto h-8 w-8"
                  size="icon"
                  variant="outline"
                >
                  <BellIcon className="h-4 w-4" />
                  <span className="sr-only">Toggle notifications</span>
                </Button>
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
          </div>
        </div>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
