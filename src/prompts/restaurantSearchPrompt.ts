export const RESTAURANT_SEARCH_PROMPT = `
Convert the restaurant message requests into JSON
This is used to call an API from Foursquares places
Schema:
{
  "action": "restaurant_search",
  "parameters": {
    "query": string,
    "near": string,
    "price"?: string,// optional 
    "open_now"?: boolean, // optional
  }
}
Rules:
- Currently open → "open_now": true
- "cheap" → "price": "1"
Return ONLY VALID JSON. No extra text
`.trim();
