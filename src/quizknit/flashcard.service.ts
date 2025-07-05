import OpenAI from "openai";
import Flashcard from "../models/flashcard.model";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export type FlashcardTextInput = {
  textInput: string;
  numberOfQuestions: string;
  difficultyLevel: string;
};

export const generateFlashcard = async (
  input: FlashcardTextInput
): Promise<any> => {
  const { textInput, numberOfQuestions, difficultyLevel } = input;

  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `Create ${numberOfQuestions} ${difficultyLevel} flashcards from the following text input: ${textInput}. I want the response as an array in  json format with they key flashcards. Each array item will have the following structure. Also add a flashcardSetTitle key to the json which gives the flashcards a title that is related to the text provided. Do not style the json using syntax like triple backticks
    {
    question: “The question will go here”,
    answer: “The answer will go here”,
    ],
  },`,
      },
    ],
    model: "gpt-4o",
  });

  return completion.choices[0].message.content;
};

export const saveFlashcardSet = async (flashcardSet: any): Promise<any> => {
  try {
    const newFlashcardSet = await Flashcard.create({
      flashcardSetTitle: flashcardSet.flashcardSetTitle,
      flashcards: flashcardSet.flashcards,
      dateCreated: new Date(),
      userId: flashcardSet.userId,
    });
    await newFlashcardSet.save();
    return newFlashcardSet;
  } catch (e) {}
};

export const getFlashcardSetById = async (
  flashcardSetId: string
): Promise<any> => {
  try {
    const flashcardSet = await Flashcard.findById(flashcardSetId);
    return flashcardSet;
  } catch (e) {
    console.log(e);
  }
};

export const getUserFlashcardSets = async (userId: string): Promise<any> => {
  try {
    const userFlashcardSets = await Flashcard.find({ userId });
    return userFlashcardSets;
  } catch (e) {
    console.log(e);
  }
};
