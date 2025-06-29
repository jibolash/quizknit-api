import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URL);
export const db = client.db();

export const auth = betterAuth({
  user: {
    additionalFields: {
      hasPremium: {
        type: "boolean",
        required: false,
        defaultValue: false,
      },
      priceId: {
        type: "string",
        required: false,
        defaultValue: "",
      },
      customerId: {
        type: "string",
        required: false,
        defaultValue: "",
      },
    },
    deleteUser: {
      enabled: true,
    },
  },
  database: mongodbAdapter(db),
  emailAndPassword: {
    enabled: true,
  },
  trustedOrigins: [process.env.QUIZKNIT_CLIENT_URL],
  socialProviders: {
    google: {
      prompt: "select_account",
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },
  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ["google"],
    },
  },
  advanced: {
    crossSubDomainCookies: {
      enabled:
        process.env.QUIZKNIT_CLIENT_URL === "http://localhost:5173"
          ? false
          : true,
      domain:
        process.env.QUIZKNIT_CLIENT_URL === "http://localhost:5173"
          ? ""
          : ".quizknit.com",
    },
    defaultCookieAttributes: {
      secure: true,
      httpOnly: true,
      sameSite: "none",
      partitioned: true,
    },
  },
});
