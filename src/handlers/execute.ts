import { generateJSONFromQuery } from "../services/llm";
import { validateRestaurantSearch } from "../validators/restaurantSearch";

export async function executeHandler(message: String) {
  const convertedQuery = await generateJSONFromQuery(message);
  const parsedQuery = JSON.parse(convertedQuery);

  if (!validateRestaurantSearch(parsedQuery)) {
    throw new Error("Invalid data Structure");
  }

  return parsedQuery;
}
