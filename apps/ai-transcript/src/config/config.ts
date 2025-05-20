import dotenv from "dotenv";
dotenv.config();

const config = {
    PORT: process.env.PORT || 4002,
    RMQ_URL: process.env.RMQ_URL || "",
    GEMINI_API_KEY: process.env.GEMINI_API_KEY || "",
}
export default config;