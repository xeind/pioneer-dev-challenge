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

1. Create a Postman GET request
2. Set URL: `https://pioneer-dev-challenge.onrender.com`
3. Add Query Parameters:

- Key: `message`, Value: `chicken restaurant at downtown LA`
- Key: `code`, Value: `pioneerdevai`

4. The URL will look like this:

```
https://pioneer-dev-challenge.onrender.com/api/execute?message=chicken restaurant at downtown LA&code=pioneerdevai
```

5. Click Send

## LLM Query

```json
{
  action: restaurant_search,
  parameters: {
    query: sushi,
    near: Los Angeles,
    price: 1,
    open_now: true
  }
}
```

## Test Queries

message: sushi in Los Angeles

### Price Filters

message: cheap chicken place in Manila
message: expensive French Restaurant in Beverly Hills

### Status Filters

message: chicken restaurants open now in Santa Monica

# How it works

1. User sends a natural language query (message) → API endpoint receives the request
2. Request validation → Checks the authentication and format
3. LLM Processing → Gemini AI converts the message into JSON
4. JSON gets validated by Zod
5. The parameters are normalized to fit Foursquare API call
6. Foursquare API call → Queries restaurant databse
7. Response → Returns restaurants data to user

## Limitations

- If location is not specified in query, it will assume "United States" for the location
- LLM responses may vary
- Error messages for all the various instances might not be supporte yet
- Complex queries may produce unexpected results
- Deployed using Render Free Tier so first requests may be slow
