export const RESTAURANT_SEARCH_PROMPT = `
Convert the restaurant message requests into JSON
This is used to call an API from Foursquares places
OUTPUT SCHEMA:
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
- "near" is REQUIRED in EVERY Response
- If user specified the location, use it
- If NO location mentioned, just default to near:"United States"
- Currently open → "open_now": true
- "cheap sushi" → {"query": "sushi", "price": "1"}
- "expensive Italian downtown LA" → {"query": "Italian", "near": "downtown Los Angeles", "price": "4"}
Return ONLY VALID JSON. No extra text
`.trim();
