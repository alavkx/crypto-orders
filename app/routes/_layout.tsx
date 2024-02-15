import { HomeIcon } from "@radix-ui/react-icons";
import { NavLink, Outlet } from "@remix-run/react";
import {
  LineChartIcon,
  Package2Icon,
  PackageIcon,
  ShoppingCartIcon,
  UsersIcon,
} from "~/components/icons";
import { cn } from "~/lib/utils";

export default function Layout() {
  return (
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
      </div>
    </div>
  );
}
