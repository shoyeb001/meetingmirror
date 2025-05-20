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
import router from "./routes/route";
import { initRabbitMq, channel } from "./lib/rabbbitmq";
import { Meeting } from "./model/meeting.model";
import { consumeQueue } from "./lib/consume";

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
app.use("/meeting", router);


app.listen(config.PORT, async () => {
    await consumeQueue();
    console.log(`Server is running on port ${config.PORT}`);
});
