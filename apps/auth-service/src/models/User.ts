import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    googleId: { type: String, required: true, unique: true },
    name: { type: String },
    email: { type: String, required: true },
    photos: [{ type: String }],
}, {
    timestamps: true,
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);
export default User;