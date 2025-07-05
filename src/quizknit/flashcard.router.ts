import express from "express";
import { body, validationResult } from "express-validator";
import type { NextFunction, Request, Response } from "express";
import * as FlashcardService from "./flashcard.service";

export const flashcardRouter = express.Router();

// POST: Create flashcards
// Body: textInput
flashcardRouter.post(
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
      const generatedFlashCard = await FlashcardService.generateFlashcard(
        quizTextInput
      );
      console.log("generatedFlashCard", generatedFlashCard);
      return response.status(201).json(generatedFlashCard);
    } catch (error: any) {
      return response.status(500).json(error.message);
    }
  }
);

flashcardRouter.post(
  "/save",
  body("flashcardSetTitle").isString(),
  body("flashcards").isArray(),
  body("userId").isString(),
  async (request: Request, response: Response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }
    try {
      const questions = request.body.flashcards;
      if (questions.length === 0) {
        throw new Error("No flashcards to save");
      }
      const savedFlashcardSet = await FlashcardService.saveFlashcardSet(
        request.body
      );
      return response.status(201).json({ id: savedFlashcardSet._id });
    } catch (error: any) {
      return response.status(500).json(error.message);
    }
  }
);

flashcardRouter.get(
  "/:flashcardSetId",
  async (request: Request, response: Response) => {
    const flashcardSetId: string = request.params.flashcardSetId;
    try {
      const flashcardSet = await FlashcardService.getFlashcardSetById(
        flashcardSetId
      );
      return response.status(200).json(flashcardSet);
    } catch (error: any) {
      return response.status(500).json(error.message);
    }
  }
);

flashcardRouter.get(
  "/user/:userId/all",
  async (request: Request, response: Response) => {
    const userId: string = request.params.userId;
    try {
      const flashcardSets = await FlashcardService.getUserFlashcardSets(userId);
      return response.status(200).json(flashcardSets);
    } catch (error: any) {
      return response.status(500).json(error.message);
    }
  }
);
