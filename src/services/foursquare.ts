import { RestaurantSearchParams } from "../validators/restaurantSearch";

export interface FoursquareSearchParams {
  query: string;
  near: string;
  open_now?: boolean;
  price?: string;
  open_at?: string;
}

// export const FoursquareSearchSchema = z.object({
//   query: z.string().min(1, "Query can't be empty"),
//   near: z.string().min(1, "Query can't be empty"),
//   price: z.string().optional(),
//   open_now: z.boolean().optional(),
//   open_at: z.string().optional(),
// });

// export type FoursquareSearchParams = z.infer<typeof FoursquareSearchSchema>;
//
// export function validateFoursquareSearch(
//   data: unknown,
// ): FoursquareSearchParams {
//   return FoursquareSearchSchema.parse(data);
// }

export function normalizeFoursquareParams(
  llmData: RestaurantSearchParams,
): FoursquareSearchParams {
  return {
    query: llmData.parameters.query,
    near: llmData.parameters.near,
    open_now: llmData.parameters.open_now,
    price: llmData.parameters.price,
    open_at: llmData.parameters.open_at,
  };
}

// We will build the URL
// base URL + every query params
export function buildFoursquareURL(params: FoursquareSearchParams) {
  const baseURL = "https://places-api.foursquare.com/places/search";

  const searchParams = new URLSearchParams();

  searchParams.append("query", params.query);
  searchParams.append("near", params.near);

  if (params.price !== undefined) {
    searchParams.append("price", params.price);
  }

  if (params.open_now !== undefined) {
    searchParams.append("open_now", params.open_now.toString());
  }

  // https://place-api.foursquare.com/places/search?query=sushi%20place%20in%20LA
  const apiCallURL = `${baseURL}?${searchParams.toString()}`;

  return apiCallURL;
}

export async function searchRestaurants(params: FoursquareSearchParams) {
  const apiKey = process.env.FSQ_KEY || "";

  const url = buildFoursquareURL(params);

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      Accept: "application/json",
      "X-Places-Api-Version": "2025-06-17",
    },
  });

  return response.json();
}
