// models/Quiz.js
import mongoose from 'mongoose';

const QuizSchema = new mongoose.Schema({
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  questions: [
    {
      question: String,
      options: [String],
      correctAnswer: Number, // índice de la opción correcta
    },
  ],
});

export default mongoose.models.Quiz || mongoose.model('Quiz', QuizSchema);
