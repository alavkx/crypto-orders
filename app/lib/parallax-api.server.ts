import { Zodios } from "@zodios/core";
import { z } from "zod";

if (!process.env.PARALLAX_API_KEY)
  throw new Error("Env error: PARALLAX_API_KEY unset");
export const plx = new Zodios(
  "https://plx-hiring-api.fly.dev/api",
  [
    {
      method: "get",
      path: "/users",
      response: z.object({
        data: z
          .array(
            z.object({
              id: z.string(),
              name: z.string(),
              email: z.string(),
            })
          )
          .min(1),
      }),
    },
    {
      method: "get",
      path: "/users/:userId/orders",
      response: z.object({
        data: z.array(
          z.object({
            id: z.string(),
            status: z.union([
              z.literal("pending"),
              z.literal("completed"),
              z.literal("failed"),
            ]),
            quote_id: z.string(),
            user_id: z.string(),
            from_amount: z.string(),
          })
        ),
      }),
    },
    {
      method: "post",
      path: "/quotes",
      response: z.object({
        data: z.object({
          id: z.string(),
          created_at: z
            .string()
            /* API omits Z */
            .transform((s) => s + "Z"),
          rate: z.string(),
          /* Assuming literal for brevity */
          from_currency: z.literal("usd"),
          to_currency: z.literal("php"),
        }),
      }),
    },
    {
      method: "post",
      path: "/orders",
      requestFormat: "json",
      response: z.object({
        data: z.object({
          id: z.string(),
          status: z.string(),
          quote_id: z.string(),
          user_id: z.string(),
          from_amount: z.string(),
        }),
      }),
      parameters: [
        {
          name: "order fields",
          type: "Body",
          schema: z.object({
            quote_id: z.string(),
            user_id: z.string(),
            from_amount: z.string(),
          }),
        },
      ],
      errors: [
        {
          status: 422,
          description: "Incorrectly shaped request body",
          schema: z.object({
            data: z.object({
              errors: z.unknown(),
            }),
          }),
        },
      ],
    },
  ],
  {
    axiosConfig: {
      headers: {
        "X-Api-Key": process.env.PARALLAX_API_KEY,
      },
    },
  }
);
plx.axios.interceptors.request.use((request) => {
  console.log(`${request.method} ${request.url}`);
  return request;
});
plx.axios.interceptors.response.use((response) => {
  console.log(response.data);
  return response;
});
