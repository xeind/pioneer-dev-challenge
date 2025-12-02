# Restaurant Finder Coding Challenge — Virgines

This is an LLM-driven restaurant search API that converts user query parameters into structured JSON for restaurant searches using Foursquare Places API

# Overview

- This API takes free-form natural language requests and uses Google Gemini AI to parse the request into structured JSON
- Forms the queries for Foursquare Places API for matching restaurants
- Returns restaurants list with information

# Stack

- Node.js & TypeScript
- Express.js
- Google Gemini AI (LLM)
- Foursquare Place API
- Zod (validator)

# Local Setup

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Google Gemini API key
- Foursquare API key

## Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/xeind/pioneer-dev-challenge.git
   cd pioneer-dev-challenge
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Create environment file**

   Create a `.env` file in the root directory:

   ```env
   GEMINI_API_KEY=your_google_gemini_api_key
   FSQ_KEY=your_foursquare_api_key
   PORT=3000
   ```

4. **Build the project**

   ```bash
   npm run build
   ```

5. **Start the server**

   ```bash
   npm start
   ```

   Or for development with auto-reload:

   ```bash
   npm run start:dev
   ```

6. **Verify it's running**

   Server should start on `http://localhost:3000`

## Testing Locally

After setup, you can test with:

**Browser:**

```
http://localhost:3000/api/execute?message=cheap%20sushi%20in%20LA&code=pioneerdevai
```

**Postman:**

Use Postman Agent for localhost

- Method: GET
- URL: `http://localhost:3000/api/execute`
- Params: `message` = `cheap sushi in LA`, `code` = `pioneerdevai`

# Documentation

## Authentication

Requires a `code` parameter with the value `pioneerdevai` to prevent unauthorized access and LLM calls

## Parameters

- `message`: String – Natural language search query
- `code` : String – Authentication code (pioneerdevai)

# Sample Requests

Using Browser/Postman:

```
GET https://pioneer-dev-challenge.onrender.com/api/execute?message=cheap chicken in india&code=pioneerdevai
```

## Response Format

```json
{
    "results": [
        {
            "fsq_place_id": "4db04fc00cb6442b2eb5f646",
            "latitude": 19.07078342149227,
            "longitude": 72.8230446191692,
            "categories": [
                {
                    "fsq_category_id": "4d4ae6fc7a7b7dea34424761",
                    "name": "Fried Chicken Joint",
                    "short_name": "Fried Chicken",
                    "plural_name": "Fried Chicken Joints",
                    "icon": {
                        "prefix": "https://ss3.4sqi.net/img/categories_v2/food/friedchicken_",
                        "suffix": ".png"
                    }
                },
        }
    ], ....
```

# Testing Guide

## Testing Deployed Version

1. Create a Postman GET request
2. Set URL: `https://pioneer-dev-challenge.onrender.com/api/execute`
3. Add Query Parameters:

- Key: `message`, Value: `chicken restaurant at downtown LA`
- Key: `code`, Value: `pioneerdevai`

4. The URL will look like this:

```
https://pioneer-dev-challenge.onrender.com/api/execute?message=chicken restaurant at downtown LA&code=pioneerdevai
```

5. Click Send

**Note:** First request to deployed version may be slow (15-30 seconds) due to Render free tier cold start. Subsequent requests will be faster (2-4 seconds).

## LLM Query Format

Example of what the LLM generates:

```json
{
  "action": "restaurant_search",
  "parameters": {
    "query": "sushi",
    "near": "Los Angeles",
    "price": "1",
    "open_now": true
  }
}
```

## Test Queries

### Simple Query

```
message: sushi in Los Angeles
```

### Price Filters

```
message: cheap chicken place in Manila
message: expensive French Restaurant in Beverly Hills
```

### Status Filters

```
message: chicken restaurants open now in Santa Monica
```

# Project Structure

```
pioneer-dev-challenge/
├── src/
│   ├── handlers/          # Business logic layer
│   │   └── execute.ts     # Main request orchestration
│   ├── routes/            # API endpoint definitions
│   │   └── execute.ts     # /api/execute route
│   ├── services/          # External API integrations
│   │   ├── llm.ts         # Google Gemini AI service
│   │   └── foursquare.ts  # Foursquare Places API service
│   ├── validators/        # Data validation schemas
│   │   └── restaurantSearch.ts  # Zod schemas for validation
│   ├── prompts/           # LLM prompt templates
│   │   └── restaurantSearchPrompt.ts  # Structured prompt for Gemini
│   └── server.ts          # Express app entry point
├── .env                   # Environment variables (not committed)
├── .gitignore            # Git ignore rules
├── package.json          # Dependencies and scripts
├── tsconfig.json         # TypeScript configuration
└── README.md             # This file
```

**Architecture:**

- **routes/** - HTTP endpoint definitions, request/response handling
- **handlers/** - Business logic, orchestrates the flow between services
- **services/** - External API integrations (LLM, Foursquare)
- **validators/** - Zod schemas for runtime type validation
- **prompts/** - LLM prompt engineering

# How it works

1. User sends a natural language query (message) → API endpoint receives the request
2. Request validation → Checks the authentication and format
3. LLM Processing → Gemini AI converts the message into JSON
4. JSON gets validated by Zod
5. The parameters are normalized to fit Foursquare API call
6. Foursquare API call → Queries restaurant database
7. Response → Returns restaurants data to user

# Assumptions & Limitations

## Assumptions

- **Language:** User queries are in English
- **Location format:** Location names are recognizable by Foursquare (e.g., "Los Angeles", "downtown LA", "Manila", "India")
- **Price mapping:**
  - "cheap" or "affordable" → price level 1
  - "moderate" → price level 2
  - "upscale" → price level 3
  - "expensive" → price level 4
- **Time context:** "open now" uses current server time
- **Valid API keys:** Assumes Google Gemini and Foursquare API keys are valid and have available quota
- **Basic REST knowledge:** Users understand how to make GET requests with query parameters

## Limitations

### Location Handling

- **Default behavior:** If no location is specified (e.g., just "pizza" or "mexican food"), the system defaults to "United States" as the search area
- **Reasoning:** Ensures results have geographic relevance rather than returning random restaurants globally
- **Impact:** Queries without explicit location may return very broad results across the entire US

### LLM Behavior

- **Variability:** LLM responses may vary slightly for identical queries due to AI's non-deterministic nature
- **Parsing inconsistency:** Very ambiguous, gibberish, or highly complex queries may produce unexpected JSON or fail validation
- **Language limitation:** Only supports English language queries

### Performance & Deployment

- **Response time:** Average 2-4 seconds per request (includes LLM processing + Foursquare API call)
- **Cold start:** First request after inactivity on Render free tier may take 15-30 seconds
- **No caching:** Each request makes fresh API calls (no result caching implemented)
- **No connection pooling:** Each request creates new connections to external APIs
