import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const generateHints = async (problem) => {

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

        const prompt = `
            You are an expert DSA tutor.

            Your task is to provide two levels of hints for the given coding problem title WITHOUT giving away the full solution.

            Problem Title: "${problem}"

            Instructions:
            - DO NOT explain anything outside the JSON.
            - Your ENTIRE output MUST be valid JSON ONLY.
            - STRICTLY follow this format:

            {
                "basic": "one sentence hint suitable for beginners",
                "detailed": "a more in-depth but non-solution-level guidance"
            }

            Example:

            {
                "basic": "Think about using a hash map to store values.",
                "detailed": "Try to iterate through the array while storing the complement values to check for matches."
            }
        `;

        const result = await model.generateContent(prompt);
        const text = result.response.text();

        let cleaned = text.trim();

        if (cleaned.startsWith('```')) {
            cleaned = cleaned.replace(/```json/i, '').replace(/```/g, '').trim();
        }

        return JSON.parse(cleaned);
    }
    catch (error) {
        console.error("Gemini API Error:", error);
        return { basic: "Error in Getting the hint", detailed: "Error in Getting the hint" };
    }
};
