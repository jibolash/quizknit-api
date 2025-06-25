import OpenAI from "openai";
import Quiz from "../models/quiz.model";

export type QuizTextInput = {
  textInput: string;
  numberOfQuestions: string;
  difficultyLevel: string;
};

export const generateQuiz = async (input: QuizTextInput): Promise<any> => {
  const { textInput, numberOfQuestions, difficultyLevel } = input;

  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `Create ${numberOfQuestions} ${difficultyLevel} multi choice questions from the following text input: ${textInput}. I want the response as an array in  json format. Each array item will have the following structure. Also add a quizTitle key to the json which gives the quiz a title that is related to the text provided. Do not style the json using syntax like triple backticks
    {
    question: “The question will go here”,
    options: [
      {
        text: “A possible answer will go here”,
        isCorrectAnswer: “boolean true or false indicating if this array option is the correct answer”,
      },
      {
         text: “A possible answer will go here”,
        isCorrectAnswer: “boolean true or false indicating if this array option is the correct answer”,
      },
      {
       text: “A possible answer will go here”,
       isCorrectAnswer: “boolean true or false indicating if this array option is the correct answer”,
      },
      {
       text: “A possible answer will go here”,
       isCorrectAnswer: “boolean true or false indicating if this array option is the correct answer”,
      },
      {
       text: “A possible answer will go here”,
       isCorrectAnswer: “boolean true or false indicating if this array option is the correct answer”,
      },
    ],
  },`,
      },
    ],
    model: "gpt-4o",
  });

  return completion.choices[0].message.content;
};

export const saveQuestions = async (quiz: any): Promise<any> => {
  try {
    const newQuiz = await Quiz.create({
      questions: quiz.questions,
      quizTitle: quiz.quizTitle,
      dateCreated: new Date(),
      userId: quiz.userId,
    });
    await newQuiz.save();
    return newQuiz;
  } catch (e) {}
};

export const getQuizById = async (quizId: string): Promise<any> => {
  try {
    const quiz = await Quiz.findById(quizId);
    return quiz;
  } catch (e) {
    console.log(e);
  }
};

export const getAllQuizzes = async (): Promise<any> => {
  try {
    const allQuizzes = await Quiz.find({ userId: null });
    return allQuizzes;
  } catch (e) {
    console.log(e);
  }
};

export const getUserQuizzes = async (userId: string): Promise<any> => {
  try {
    const userQuizzes = await Quiz.find({ userId });
    return userQuizzes;
  } catch (e) {
    console.log(e);
  }
};

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
