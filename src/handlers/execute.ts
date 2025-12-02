import {
  normalizeFoursquareParams,
  searchRestaurants,
} from "../services/foursquare";
import { generateJSONFromQuery } from "../services/llm";
import { validateRestaurantSearch } from "../validators/restaurantSearch";

export async function executeHandler(message: string) {
  const convertedQuery = await generateJSONFromQuery(message);

  if (!convertedQuery) {
    throw new Error("Failed to generate JSON from query");
  }

  const parsedQuery = JSON.parse(convertedQuery);

  const validatedLLM = validateRestaurantSearch(parsedQuery);
  // console.log(`Validated LLM: `, validatedLLM);

  const foursquareParams = normalizeFoursquareParams(validatedLLM);
  if (!validatedLLM.parameters.query) {
    return {
      error: "Location required",
      message: "Please specify a location. (e.g., 'korean chicken in LA')",
    };
  }
  // console.log(foursquareParams);

  const restaurants = await searchRestaurants(foursquareParams);

  return restaurants;
}
