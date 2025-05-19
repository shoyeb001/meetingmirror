import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import config from "./config/config";
const app = express();
app.use(express.json())
app.use(cors());

mongoose
    .connect(config.DB_URL)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log(err));

app.listen(config.PORT, () => {
    console.log(`Server is running on port ${config.PORT}`);
});
