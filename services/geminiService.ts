import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getDailyHealthTip = async (donorName: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Generate a short, encouraging, one-sentence health tip for a blood donor named ${donorName}. Focus on hydration, iron intake, or rest. Do not be generic.`,
    });
    return response.text || "Stay hydrated and eat iron-rich foods!";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Thank you for being a lifesaver! Remember to drink plenty of water.";
  }
};