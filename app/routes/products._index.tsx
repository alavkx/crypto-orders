import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Products | Parallax" },
    { name: "description", content: "Welcome to Parallax!" },
  ];
};

export default function Index() {
  return (
    <>
      <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40">
        <div className="flex-1">
          <h1 className="font-semibold text-lg">Products</h1>
        </div>
      </header>
      <main className="p-4">
        <h2 className="text-xl font-medium text-center">
          Go to{" "}
          <Link className="text-blue-600" to="/orders">
            /orders
          </Link>{" "}
          to get started
        </h2>
      </main>
    </>
  );
}
