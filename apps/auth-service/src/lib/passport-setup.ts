// passport-setup.ts
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/User";

passport.serializeUser((user: any, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            callbackURL: process.env.GOOGLE_CALLBACK_URL!,
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
                    displayName: profile.displayName,
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
