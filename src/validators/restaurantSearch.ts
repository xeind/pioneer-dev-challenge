import * as z from "zod";

export const RestaurantSearchSchema = z.object({
  action: z.literal("restaurant_search"),
  parameters: z.object({
    query: z
      .string()
      .min(1, "Query can't be empty")
      .transform((s) => s.trim()),
    near: z
      .string()
      .min(1, "Tell the location")
      .transform((s) => s.trim()),
    price: z
      .string()
      .optional()
      .transform((s) => s?.trim()),
    open_now: z.boolean().optional(),
    // open_at: z
    //   .string()
    //   .optional()
    //   .transform((s) => s?.trim()),
  }),
});

export type RestaurantSearchParams = z.infer<typeof RestaurantSearchSchema>;

export function validateRestaurantSearch(
  data: unknown,
): RestaurantSearchParams {
  return RestaurantSearchSchema.parse(data);
}

// export interface RestaurantSearchParams {
//   action: string;
//   parameters: {
//     query: string;
//     near: string;
//     price?: string;
//     open_now?: boolean;
//   };
// }

// export function validateRestaurantSearch(
//   data: any,
// ): data is RestaurantSearchParams {
//   return (
//     data &&
//     data.action === "restaurant_search" &&
//     data.parameters &&
//     typeof data.parameters.query === "string" &&
//     typeof data.parameters.near === "string" &&
//     (typeof data.parameters.price === "string" ||
//       data.parameters.price === undefined) &&
//     (typeof data.parameters.open_now === "boolean" ||
//       data.parameters.open_now === undefined)
//   );
// }
