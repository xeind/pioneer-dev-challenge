import { GoogleGenAI } from "@google/genai";
import { RESTAURANT_SEARCH_PROMPT } from "../prompts/restaurantSearchPrompt";

require("dotenv").config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function generateJSONFromQuery(message: String) {
  const prompt = RESTAURANT_SEARCH_PROMPT;
  // console.log(prompt);

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `${prompt}\n${message}`,
  });
  console.log(response);

  if (!response.text) {
    throw new Error();
  }

  console.log(`debugger ${response.text}`);

  let text = response.text;
  text = text
    .replace(/```json\n?/g, "")
    .replace(/```\n?/g, "")
    .trim();

  return text;
}
