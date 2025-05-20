import dotenv from "dotenv";
dotenv.config();

const config = {
    PORT: process.env.PORT || 8000,
    AUTH_SERVICE_URL: process.env.AUTH_SERVICE_URL || "http://localhost:4000",
    MEETING_SERVICE_URL: process.env.MEETING_SERVICE_URL || "http://localhost:4001",
}
export default config;