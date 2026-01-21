import { GoogleGenAI } from "@google/genai";

export async function POST(req) {
  try {
    // Get prompt from frontend request
    const { prompt } = await req.json();

    if (!prompt) {
      return new Response(JSON.stringify({ error: "No prompt provided" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Initialize Gemini client with your API key
    const ai = new GoogleGenAI({
      apiKey: process.env.API_KEY,
    });

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash", // free tier model
      contents: prompt,
    });

    return new Response(JSON.stringify({ result: response.text }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Gemini API error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
