import mongoose, { model } from "mongoose";

const optionSchema = new mongoose.Schema({
  text: String,
  isCorrectAnswer: Boolean,
});

const QuizSchema = new mongoose.Schema({
  questions: [
    {
      question: String,
      options: [optionSchema],
    },
  ],
  quizTitle: String,
  dateCreated: Date,
  userId: String,
});

const Quiz = model("Quiz", QuizSchema);

export default Quiz;
