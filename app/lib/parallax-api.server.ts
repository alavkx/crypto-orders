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
            /* datetime doesn't support omission of "Z"
             * https://github.com/colinhacks/zod/issues/2385
             */
            .refine(
              (value) =>
                /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(:\d{2}(\.\d+)?)?$/.test(
                  value
                ),
              {
                message:
                  "timestamp must be of the unqualified form yyyy-mm-ddThh:mm[:ss[.mmm]]",
              }
            ),
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
  console.log(JSON.stringify(response.data, null, 2));
  return response;
});
