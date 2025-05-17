import dotenv from "dotenv";
dotenv.config();

const config = {
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || "",
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET || "",
    SESSION_SECRET: process.env.SESSION_SECRET || "",
    DB_URL: process.env.DB_URL || "",
}
export default config;