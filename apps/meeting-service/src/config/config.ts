import dotenv from "dotenv";
dotenv.config();

const config = {
    DB_URL: process.env.DB_URL || "",
    PORT: process.env.PORT || 4001,
    SESSION_SECRET: process.env.SESSION_SECRET || "",
    RMQ_URL: process.env.RMQ_URL || "",
}
export default config;