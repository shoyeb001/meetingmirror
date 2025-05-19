import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import config from "./config/config";
import { createClient } from "redis";
import { RedisStore } from "connect-redis";
import session from "express-session";
import { auth } from "./middleware/auth";
import { user } from "./middleware/user";
import { Response } from "express";
const app = express();
app.use(express.json())
app.use(cors());

mongoose
    .connect(config.DB_URL)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log(err));
const authRedisClient = createClient({});
authRedisClient.connect().catch((err) => console.log(err));
let redisStore = new RedisStore({
    client: authRedisClient,
    prefix: "auth:",
});

app.use(
    session({
        store: redisStore,
        secret: config.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false }, // set secure: true if on https
    })
);
app.get("/meeting/all", [auth, user], (req: any, res: Response) => {
    res.status(200).json({
        isSuccess: true,
        message: "Meeting data fetched",
        data: {
            msg: req.user,
        }
    })
});
app.listen(config.PORT, () => {
    console.log(`Server is running on port ${config.PORT}`);
});
