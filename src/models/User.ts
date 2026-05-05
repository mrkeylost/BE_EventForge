import mongoose from "mongoose";
import { User } from "../types/auth";
import { encrypt } from "../utils/encryption";

const Schema = mongoose.Schema;

const userSchema = new Schema<User>(
  {
    fullName: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    profilePicture: {
      type: String,
      default: "user.jpg",
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    activationCode: String,
  },
  { timestamps: true },
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  this.password = await encrypt(this.password);
});

userSchema.methods.toJSON = function () {
  const user = this.toObject();

  delete user.password;

  return user;
};

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
