import type { MetaFunction } from "@remix-run/node";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenu,
} from "~/components/ui/dropdown-menu";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "~/components/ui/table";
import {
  Package2Icon,
  SearchIcon,
  MoreHorizontalIcon,
} from "~/components/icons";

export const meta: MetaFunction = () => {
  return [
    { title: "Parallax" },
    { name: "description", content: "Welcome to Parallax!" },
  ];
};

export default function Index() {
  return (
    <>
      <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40">
        <a className="lg:hidden" href="#">
          <Package2Icon className="h-6 w-6" />
          <span className="sr-only">Home</span>
        </a>
        <div className="flex-1">
          <h1 className="font-semibold text-lg">Recent Orders</h1>
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
              <Button className="rounded-full" size="icon" variant="ghost">
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
        <div className="border shadow-sm rounded-lg p-2">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Order</TableHead>
                <TableHead className="min-w-[150px]">Customer</TableHead>
                <TableHead className="hidden md:table-cell">Channel</TableHead>
                <TableHead className="hidden md:table-cell">Date</TableHead>
                <TableHead className="text-right">Total</TableHead>
                <TableHead className="hidden sm:table-cell">Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">#3210</TableCell>
                <TableCell>Olivia Martin</TableCell>
                <TableCell className="hidden md:table-cell">
                  Online Store
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  February 20, 2022
                </TableCell>
                <TableCell className="text-right">$42.25</TableCell>
                <TableCell className="hidden sm:table-cell">Shipped</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button size="icon" variant="ghost">
                        <MoreHorizontalIcon className="w-4 h-4" />
                        <span className="sr-only">Actions</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View order</DropdownMenuItem>
                      <DropdownMenuItem>Customer details</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">#3209</TableCell>
                <TableCell>Ava Johnson</TableCell>
                <TableCell className="hidden md:table-cell">Shop</TableCell>
                <TableCell className="hidden md:table-cell">
                  January 5, 2022
                </TableCell>
                <TableCell className="text-right">$74.99</TableCell>
                <TableCell className="hidden sm:table-cell">Paid</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button size="icon" variant="ghost">
                        <MoreHorizontalIcon className="w-4 h-4" />
                        <span className="sr-only">Actions</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View order</DropdownMenuItem>
                      <DropdownMenuItem>Customer details</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">#3204</TableCell>
                <TableCell>Michael Johnson</TableCell>
                <TableCell className="hidden md:table-cell">Shop</TableCell>
                <TableCell className="hidden md:table-cell">
                  August 3, 2021
                </TableCell>
                <TableCell className="text-right">$64.75</TableCell>
                <TableCell className="hidden sm:table-cell">
                  Unfulfilled
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
                      <DropdownMenuItem>View order</DropdownMenuItem>
                      <DropdownMenuItem>Customer details</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">#3203</TableCell>
                <TableCell>Lisa Anderson</TableCell>
                <TableCell className="hidden md:table-cell">
                  Online Store
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  July 15, 2021
                </TableCell>
                <TableCell className="text-right">$34.50</TableCell>
                <TableCell className="hidden sm:table-cell">Shipped</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button size="icon" variant="ghost">
                        <MoreHorizontalIcon className="w-4 h-4" />
                        <span className="sr-only">Actions</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View order</DropdownMenuItem>
                      <DropdownMenuItem>Customer details</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">#3202</TableCell>
                <TableCell>Samantha Green</TableCell>
                <TableCell className="hidden md:table-cell">Shop</TableCell>
                <TableCell className="hidden md:table-cell">
                  June 5, 2021
                </TableCell>
                <TableCell className="text-right">$89.99</TableCell>
                <TableCell className="hidden sm:table-cell">Paid</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button size="icon" variant="ghost">
                        <MoreHorizontalIcon className="w-4 h-4" />
                        <span className="sr-only">Actions</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View order</DropdownMenuItem>
                      <DropdownMenuItem>Customer details</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">#3201</TableCell>
                <TableCell>Adam Barlow</TableCell>
                <TableCell className="hidden md:table-cell">
                  Online Store
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  May 20, 2021
                </TableCell>
                <TableCell className="text-right">$24.99</TableCell>
                <TableCell className="hidden sm:table-cell">
                  Unfulfilled
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
                      <DropdownMenuItem>View order</DropdownMenuItem>
                      <DropdownMenuItem>Customer details</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">#3207</TableCell>
                <TableCell>Sophia Anderson</TableCell>
                <TableCell className="hidden md:table-cell">Shop</TableCell>
                <TableCell className="hidden md:table-cell">
                  November 2, 2021
                </TableCell>
                <TableCell className="text-right">$99.99</TableCell>
                <TableCell className="hidden sm:table-cell">Paid</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button size="icon" variant="ghost">
                        <MoreHorizontalIcon className="w-4 h-4" />
                        <span className="sr-only">Actions</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View order</DropdownMenuItem>
                      <DropdownMenuItem>Customer details</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">#3206</TableCell>
                <TableCell>Daniel Smith</TableCell>
                <TableCell className="hidden md:table-cell">
                  Online Store
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  October 7, 2021
                </TableCell>
                <TableCell className="text-right">$67.50</TableCell>
                <TableCell className="hidden sm:table-cell">Shipped</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button size="icon" variant="ghost">
                        <MoreHorizontalIcon className="w-4 h-4" />
                        <span className="sr-only">Actions</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View order</DropdownMenuItem>
                      <DropdownMenuItem>Customer details</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </main>
    </>
  );
}
