import mongoose, { model } from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    email: String,
    emailVerified: String,
    name: String,
    image: String,
    hasPremium: Boolean,
    priceId: String,
    customerId: String,
  },
  { collection: "user", versionKey: false }
);

const User = model("User", UserSchema);

export default User;
