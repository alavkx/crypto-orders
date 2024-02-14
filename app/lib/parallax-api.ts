import { z } from "zod";

type EndpointPaths = "/users" | "/orders" | `${string}/orders` | "/quotes";
type RequestMethod = "get" | "post";
interface Endpoint {
  Response: z.ZodSchema;
  Request?: z.ZodSchema;
}
const endpoints = {
  "get /users": {
    Response: z.object({
      data: z
        .array(
          z.object({ id: z.string(), name: z.string(), email: z.string() })
        )
        .min(1),
    }),
  },
  "post /orders": {
    Request: z.object({
      quote_id: z.string(),
      user_id: z.string(),
      from_amount: z.string(),
    }),
    Response: z.object({
      data: z.object({
        id: z.string(),
        status: z.string(),
        quote_id: z.string(),
        user_id: z.string(),
        from_amount: z.string(),
      }),
    }),
  },
  "get :userId/orders": {
    Response: z.object({
      data: z.object({
        id: z.string(),
        status: z.union([z.literal("completed"), z.literal("failed")]),
        quote_id: z.string(),
        user_id: z.string(),
        from_amount: z.string(),
      }),
    }),
  },
  "post /quotes": {
    Response: z.object({
      data: z.object({
        id: z.string(),
        created_at: z.date(),
        rate: z.string(),
        /* Assuming literal for brevity */
        from_currency: z.literal("usd"),
        to_currency: z.literal("php"),
      }),
    }),
  },
} as const satisfies Record<`${RequestMethod} ${EndpointPaths}`, Endpoint>;

/** A naive abstraction over the `fetch` api to inject the parallax api key and base url including some mild type-safety that results in wordy consumer code. PR's welcome 👹
 *
 *
 * @example
 * const { Request, Response } = Plx.endpoints["post /orders"]
 * const res = await Plx.api("/orders", {
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(
      Request.parse({
        quote_id: "...",
        user_id: "...",
        from_amount: "...",
      })
    ),
  })
 * const orders = Response.parse().data
 */
async function api(path: EndpointPaths, init?: Parameters<typeof fetch>[1]) {
  if (!process.env.PARALLAX_API_KEY)
    throw new Error("Env error: PARALLAX_API_KEY unset");
  const key = { "X-Api-Key": process.env.PARALLAX_API_KEY };
  return fetch(
    `https://plx-hiring-api.fly.dev/api/${path}`,
    init ? { ...init, headers: { ...init.headers, ...key } } : { headers: key }
  ).then((res) => res.json());
}
export const Plx = { api, endpoints } as const;
