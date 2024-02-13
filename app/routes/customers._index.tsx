import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { Link, json, useLoaderData, useOutletContext } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Customers | Parallax" },
    { name: "description", content: "Welcome to Parallax!" },
  ];
};

export async function loader() {
  const quotes = fetch;
  return json();
}

export default function Index() {
  const data = useLoaderData<typeof loader>();
  return (
    <>
      <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40">
        <div className="flex-1">
          <h1 className="font-semibold text-lg">Customers</h1>
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
