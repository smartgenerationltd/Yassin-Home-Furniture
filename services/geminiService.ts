
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("API_KEY environment variable not set. AI features will be disabled.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const generateDescription = async (prompt: string): Promise<string> => {
  if (!API_KEY) {
    return "AI service is unavailable. Please configure the API key.";
  }
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Generate a compelling, elegant, and concise product description for a furniture item. The prompt is: "${prompt}". The description should be around 2-3 sentences long.`,
    });
    return response.text.trim();
  } catch (error) {
    console.error("Error generating description with Gemini:", error);
    return "Failed to generate description. Please try again.";
  }
};
