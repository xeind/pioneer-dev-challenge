export interface RestaurantSearchParams {
  action: string;
  parameters: {
    query: string;
    near: string;
    price?: string;
    open_now?: boolean;
  };
}

export function validateRestaurantSearch(
  data: any,
): data is RestaurantSearchParams {
  return (
    data &&
    data.action === "restaurant_search" &&
    data.parameters &&
    typeof data.parameters.query === "string" &&
    typeof data.parameters.near === "string" &&
    (typeof data.parameters.price === "string" ||
      data.parameters.price === undefined) &&
    (typeof data.parameters.open_now === "boolean" ||
      data.parameters.open_now === undefined)
  );
}
