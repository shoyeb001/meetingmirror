import { GoogleGenAI } from "@google/genai";
import config from "../config/config";
import { channel, publishToQueue } from "../lib/rabbitmq";

const genAI = new GoogleGenAI({ apiKey: config.GEMINI_API_KEY });

export const createInsight = async (text: string, meetingId: string) => {
    const systemText = `You will be provided with a meeting transcript. Your task is to analyze this transcript and generate a JSON object with the following specific structure and content and only return the JSON object without any additional text or explanation. The JSON object should include the following fields:
{
    "summary": "A concise summary of the entire meeting. This should include the main topics discussed, key updates shared by participants, critical decisions made, and any identified next steps or action items.",
    "personalityTags": {
        "user1": "A descriptive tag for user1 based on their role, contribution, or observed communication style in the meeting (e.g., Facilitator, Technical Lead, Decision Maker, Skeptic, Contributor).",
        "user2": "A descriptive tag for user2, similar to user1.",
        "...": "Continue this pattern for all unique participants in the meeting."
    },
    "timespoken": {
        "user1": "The total duration user1 spoke during the meeting, formatted as a string and in second (e.g., 'X' or 'Y '). Calculate this from the timestamps provided in the transcript.",
        "user2": "The total duration user2 spoke, calculated and formatted similarly.",
        "...": "Continue this pattern for all unique participants."
    }
}`
    const response = await genAI.models.generateContent({
        model: "gemini-2.0-flash",
        contents: text,
        config: {
            systemInstruction: systemText,
        }
    });
    console.log(response.text)
    const insightData = {
        meetingId,
        insight: response.text
    }
    publishToQueue("insight_created", insightData);
}