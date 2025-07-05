import mongoose, { model } from "mongoose";

const FlashcardSchema = new mongoose.Schema({
  flashcards: [
    {
      question: String,
      answer: String,
    },
  ],
  flashcardSetTitle: String,
  dateCreated: Date,
  userId: String,
});

const Flashcard = model("Flashcard", FlashcardSchema);

export default Flashcard;
