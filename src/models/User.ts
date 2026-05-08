import mongoose from "mongoose";
import { User } from "../types/auth";
import { encrypt } from "../utils/encryption";
import { renderMailHtml, sendMail } from "../utils/mail/mail";
import { env } from "../utils/env";
import { ROLES } from "../utils/constant";

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
      unique: true,
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
      enum: [ROLES.ADMIN, ROLES.MEMBER],
      default: ROLES.MEMBER,
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
  this.activationCode = await encrypt(this.id);
});

userSchema.post("save", async function (doc, next) {
  try {
    const user = doc;

    const contentMail = await renderMailHtml("registration-success.ejs", {
      username: user.username,
      fullName: user.fullName,
      email: user.email,
      createdAt: user.createdAt,
      activationLink: `${env.CLIENT_HOST}/auth/activation?code=${user.activationCode}`,
    });

    await sendMail({
      from: env.EMAIL_SMTP_USER,
      to: user.email,
      subject: "Account Activation",
      content: contentMail,
    });
  } catch (error) {
    console.error(error);
  } finally {
    next();
  }
});

userSchema.methods.toJSON = function () {
  const user = this.toObject();

  delete user.password;

  return user;
};

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
