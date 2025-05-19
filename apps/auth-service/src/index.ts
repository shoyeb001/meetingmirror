import express, { Request, Response } from "express";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import cookieSession from "cookie-session";
import cors from "cors";
import config from "./config/config";
import session from "express-session";
import mongoose from "mongoose";
import User from "./models/User";
import { RedisStore } from "connect-redis";
import { createClient } from "redis";

const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:3001", credentials: true }));
mongoose
    .connect(config.DB_URL)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log(err));

//Redis Client
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
app.use(passport.initialize());
app.use(passport.session());
passport.use(
    new GoogleStrategy(
        {
            clientID: config.GOOGLE_CLIENT_ID,
            clientSecret: config.GOOGLE_CLIENT_SECRET,
            callbackURL: '/auth/google/callback',
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                // Check if user already exists
                let existingUser = await User.findOne({ googleId: profile.id });

                if (existingUser) {
                    return done(null, existingUser);
                }

                // If not, create new user
                const newUser = new User({
                    googleId: profile.id,
                    name: profile.displayName,
                    email: profile.emails?.[0].value,
                    photo: profile.photos?.[0].value,
                });

                await newUser.save();
                done(null, newUser);
            } catch (err) {
                done(err, undefined);
            }
        }
    )
);
passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((user: any, done) => {
    done(null, user);
})

app.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email",] }));
app.get("/auth/google/callback", passport.authenticate("google", {
    successRedirect: "http://localhost:3001/dashboard",
    failureRedirect: "http://localhost:3001/login"
}));

app.get("/auth/logout", (req: Request, res: Response) => {
    req.logout(() => {
        res.redirect("http://localhost:3001/login");
    })
});

app.get("/auth/user", (req: Request, res: Response) => {
    console.log(req.user)
    res.status(200).json({
        isSuccess: true,
        message: "User data fetched",
        data: req.user || null
    })
});


app.listen(4000, () => console.log("Auth service running on http://localhost:4000"));
