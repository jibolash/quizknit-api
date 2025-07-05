import express from "express";
import { body, validationResult } from "express-validator";
import type { NextFunction, Request, Response } from "express";
import * as QuizService from "./quiz.service";

export const quizRouter = express.Router();

// POST: Create a quiz
// Body: textInput
quizRouter.post(
  "/",
  body("textInput").isString(),
  async (request: Request, response: Response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }
    try {
      const quizTextInput = request.body;
      if (quizTextInput.textInput.length === 0) {
        throw new Error("No text input provided");
      }
      const generatedQuiz = await QuizService.generateQuiz(quizTextInput);
      return response.status(201).json(generatedQuiz);
    } catch (error: any) {
      return response.status(500).json(error.message);
    }
  }
);

quizRouter.post(
  "/saveQuestions",
  body("questions").isArray(),
  body("quizTitle").isString(),
  body("userId").isString(),
  async (request: Request, response: Response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }
    try {
      const questions = request.body.questions;
      if (questions.length === 0) {
        throw new Error("No questions to save");
      }
      const savedQuestion = await QuizService.saveQuestions(request.body);
      return response.status(201).json({ id: savedQuestion._id });
    } catch (error: any) {
      return response.status(500).json(error.message);
    }
  }
);

quizRouter.get("/:quizId", async (request: Request, response: Response) => {
  const quizId: string = request.params.quizId;
  try {
    const quiz = await QuizService.getQuizById(quizId);
    return response.status(200).json(quiz);
  } catch (error: any) {
    return response.status(500).json(error.message);
  }
});

quizRouter.get("/all/quizzes", async (request: Request, response: Response) => {
  try {
    const quizzes = await QuizService.getAllQuizzes();
    return response.status(200).json(quizzes);
  } catch (error: any) {
    return response.status(500).json(error.message);
  }
});

quizRouter.get(
  "/user/:userId/quizzes",
  async (request: Request, response: Response) => {
    const userId: string = request.params.userId;
    try {
      const quizzes = await QuizService.getUserQuizzes(userId);
      return response.status(200).json(quizzes);
    } catch (error: any) {
      return response.status(500).json(error.message);
    }
  }
);
