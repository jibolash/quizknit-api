import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import { quizRouter } from "./quizknit/quiz.router";
import mongoose from "mongoose";
import cookieSession from "cookie-session";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((e) => console.log("Error connecting to MongoDB", e));

const PORT: number = 3000;

const app = express();

app.use(
  cors({
    origin: process.env.QUIZKNIT_CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.all("/api/auth/*", toNodeHandler(auth));

app.use(express.json());
app.use(
  cookieSession({
    name: "quizknitSession",
    keys: ["my session key"],
    maxAge: 24 * 60 * 60 * 100,
  })
);

app.get("/api", (req, res) => {
  res.send("Lift Tracker API");
});

app.use("/api/quiz", quizRouter);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
