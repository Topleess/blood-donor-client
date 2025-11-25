import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getDailyHealthTip = async (donorName: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Generate a short, encouraging, one-sentence health tip for a blood donor named ${donorName} in Russian language. Focus on hydration, iron intake, or rest. Do not be generic.`,
    });
    return response.text || "Пейте больше воды и употребляйте продукты, богатые железом!";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Спасибо, что спасаете жизни! Не забудьте хорошо отдохнуть.";
  }
};