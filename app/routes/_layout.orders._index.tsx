import { ReloadIcon } from "@radix-ui/react-icons";
import {
  json,
  redirect,
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
  type MetaFunction,
} from "@remix-run/node";
import {
  Form,
  useActionData,
  useFetcher,
  useLoaderData,
  useNavigation,
  useRevalidator,
} from "@remix-run/react";
import { isErrorFromPath } from "@zodios/core";
import React from "react";
import {
  MoreHorizontalIcon,
  Package2Icon,
  SearchIcon,
} from "~/components/icons";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Progress } from "~/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { plx } from "~/lib/parallax-api.server";
import { cn } from "~/lib/utils";
import { getSession } from "~/sessions";

export const meta: MetaFunction = () => {
  return [
    { title: "Orders | Parallax" },
    { name: "description", content: "Welcome to Parallax!" },
  ];
};
export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const userId = session.get("userId");
  if (!userId) return redirect("/login");
  return json({
    orders: (
      await plx.get("/users/:userId/orders", { params: { userId } })
    ) /* Maybe should sort as well in the future; response is re-ordered after status settles and causes the cotton-eyed joe to occur in the table */.data
      .reverse(),
  });
}
export default function Index() {
  const l = useLoaderData<typeof loader>();
  const a = useActionData<typeof action>();
  const navigation = useNavigation();
  const fetcher = useFetcher<typeof action>(
    a?.kind === "order" ? { key: a.order.id } : undefined
  );
  const revalidator = useRevalidator();
  const [fromAmount, setFromAmount] = React.useState<string>("");
  const [lastOrderId, setLastOrderId] =
    React.useState<string>("none");
  const createOrderFormId = React.useId();
  const [now, setNow] = React.useReducer(
    () => new Date(),
    new Date()
  );
  const timeRemaining =
    fetcher?.data?.kind === "quote"
      ? 300 -
        (now.getTime() -
          new Date(fetcher.data.quote.created_at).getTime()) /
          1000
      : 0;
  useInterval(() => setNow(), 1000);
  useInterval(() => {
    if (l.orders.some((o) => o.status === "pending"))
      revalidator.revalidate();
  }, 5000);
  if (a?.kind === "order" && a.order.id !== lastOrderId) {
    setLastOrderId(a.order.id);
    setFromAmount("");
  }
  return (
    <>
      <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40">
        <a className="lg:hidden" href="/">
          <Package2Icon className="h-6 w-6" />
          <span className="sr-only">Home</span>
        </a>
        <div className="flex-1">
          <h1 className="font-semibold text-lg">Orders</h1>
        </div>
        <div className="flex flex-1 items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <form className="ml-auto flex-1 sm:flex-initial">
            <div className="relative">
              <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
              <Input
                className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px] bg-white"
                placeholder="Search orders..."
                type="search"
              />
            </div>
          </form>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                className="rounded-full"
                size="icon"
                variant="ghost"
              >
                <img
                  alt="Avatar"
                  className="rounded-full"
                  height="32"
                  src="https://upload.wikimedia.org/wikipedia/commons/2/24/Missing_avatar.svg"
                  style={{
                    aspectRatio: "32/32",
                    objectFit: "cover",
                  }}
                  width="32"
                />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
        <section className="inline-flex gap-4 items-center">
          <Card className="w-[350px]">
            <CardHeader>
              <CardTitle>Request quote</CardTitle>
              <CardDescription>
                Get our up-to-date currency conversion rates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="">
                <div className="inline-flex items-baseline">
                  <span className="text-xs">PHP</span>
                  <span
                    className={cn(
                      "ml-1 font-mono text-lg",
                      fetcher?.data?.kind === "quote" &&
                        timeRemaining <= 0 &&
                        "line-through"
                    )}
                  >
                    ₱
                    {fetcher?.data?.kind === "quote"
                      ? Number(fetcher.data.quote.rate).toFixed(2)
                      : "00.00"}
                  </span>
                  {fetcher?.data?.kind === "quote" &&
                  timeRemaining <= 0 ? (
                    <span className="text-muted-foreground text-xs ml-1">
                      (expired)
                    </span>
                  ) : null}
                </div>
                <div className="text-sm">↑</div>
                <div className="inline-flex items-baseline">
                  <span className="text-xs">USD</span>
                  <span className="ml-1 font-mono text-lg">
                    $
                    {fetcher?.data?.kind === "quote"
                      ? "01.00"
                      : "00.00"}
                  </span>
                </div>
                <div className="mt-4">
                  <Label>
                    Time remaining
                    <Progress value={timeRemaining / 3} />
                  </Label>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <fetcher.Form method="post">
                <input
                  type="hidden"
                  name="action"
                  value="request-quote"
                />
                {fetcher.state !== "idle" ? (
                  <Button disabled>
                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />{" "}
                    Quoting...
                  </Button>
                ) : (
                  <Button type="submit">Request quote</Button>
                )}
              </fetcher.Form>
            </CardFooter>
          </Card>
          {fetcher.data?.kind === "quote" ? (
            <>
              <div>→</div>
              <Card className="w-[350px]">
                <CardHeader>
                  <CardTitle>Create order</CardTitle>
                  <CardDescription>
                    Convert your currency in one click
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form
                    id={createOrderFormId}
                    method="POST"
                    replace
                    preventScrollReset
                  >
                    <input
                      type="hidden"
                      name="action"
                      value="create-order"
                    />
                    <input
                      type="hidden"
                      name="quoteId"
                      value={fetcher.data.quote.id}
                    />
                    <div className="grid w-full items-center gap-4">
                      <div className="flex flex-col space-y-1.5">
                        <Label
                          htmlFor="fromAmount"
                          className={
                            a?.kind == "validation-error"
                              ? "text-red-500"
                              : undefined
                          }
                        >
                          You will pay
                        </Label>
                        <Input
                          id="fromAmount"
                          name="fromAmount"
                          placeholder="Amount USD ($) to convert"
                          onChange={(event) =>
                            setFromAmount(event.target.value)
                          }
                        />
                        {a?.kind === "validation-error" ? (
                          <p className="text-red-500 text-sm">
                            {a.message}
                          </p>
                        ) : null}
                      </div>
                      <div className="flex flex-col space-y-1.5">
                        <div className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          You will receive
                        </div>
                        <div className="inline-flex items-baseline">
                          <span className="text-xs">PHP</span>
                          <span className="ml-1 font-mono text-lg">
                            ₱
                            {!Number.isNaN(parseFloat(fromAmount))
                              ? (
                                  parseFloat(fromAmount) *
                                  Number(fetcher.data.quote.rate)
                                ).toFixed(2)
                              : "00.00"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Form>
                </CardContent>
                <CardFooter className="flex justify-end">
                  {navigation.state !== "idle" ? (
                    <Button disabled>
                      <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />{" "}
                      Creating...
                    </Button>
                  ) : (
                    <Button type="submit" form={createOrderFormId}>
                      Create order
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </>
          ) : null}
        </section>

        <div className="border shadow-sm rounded-lg p-2">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Order</TableHead>
                <TableHead className="min-w-[150px]">
                  Amount
                </TableHead>
                <TableHead className="hidden sm:table-cell">
                  Status
                </TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {l.orders.map((o, i, arr) => (
                <TableRow key={o.id}>
                  <TableCell className="font-medium">
                    #{arr.length - i}
                  </TableCell>
                  <TableCell className="text-left">
                    ${parseFloat(o.from_amount).toFixed(2)}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {o.status === "completed" ? (
                      "Completed"
                    ) : o.status === "pending" ? (
                      <span className="text-muted-foreground inline-flex items-center">
                        Pending
                        <ReloadIcon className="ml-2 h-3 w-3 animate-spin" />{" "}
                      </span>
                    ) : (
                      "Failed"
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="icon" variant="ghost">
                          <MoreHorizontalIcon className="w-4 h-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          View order
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          Customer details
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </main>
    </>
  );
}
export async function action({ request }: ActionFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const userId = session.get("userId");
  if (!userId) return redirect("/login");
  const body = await request.formData();
  switch (body.get("action")) {
    case "request-quote":
      return json({
        kind: "quote" as const,
        quote: (await plx.post("/quotes", undefined)).data,
      });
    case "create-order":
      if (isNaN(parseFloat(body.get("fromAmount") as string)))
        return json({
          kind: "validation-error" as const,
          message: "Amount must be a number",
        });
      try {
        const res = await plx.post("/orders", {
          quote_id: body.get("quoteId") as string,
          user_id: userId,
          from_amount: body.get("fromAmount") as string,
        });
        return json({ kind: "order" as const, order: res.data });
      } catch (error) {
        console.error((error as any).response.data);
        if (
          isErrorFromPath(plx.api, "post", "/orders", error) &&
          error.response.status === 422
        )
          return json({
            kind: "plx-error" as const,
            errors: error.response.data.data.errors,
          });
        else return json({ kind: "plx-error" as const });
      }
    default:
      throw new Error(
        `Matched unimplemented action: ${body.get("action")}`
      );
  }
}
function useInterval<Fn extends Function>(
  callback: Fn,
  delay: number
) {
  const savedCallback = React.useRef<Fn>();
  React.useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);
  React.useEffect(() => {
    function tick() {
      savedCallback.current?.();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
