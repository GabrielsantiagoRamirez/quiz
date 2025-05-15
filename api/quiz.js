// api/quiz.js
import { connectToDatabase } from '../utils/db';
import Quiz from '../models/Quiz';

export default async function handler(req, res) {
  await connectToDatabase();

if (req.method === 'POST') {
  try {
    const { courseId, questions } = req.body;

    if (!courseId) {
      return res.status(400).json({ error: 'courseId es requerido' });
    }

    // Verificar si ya existe un quiz con ese courseId
    const existingQuiz = await Quiz.findOne({ courseId });
    if (existingQuiz) {
      return res.status(409).json({ error: 'Ya existe un quiz para este courseId' });
    }

    // Crear un quiz nuevo
    const newQuiz = await Quiz.create({ courseId, questions });

    return res.status(201).json(newQuiz);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}


  if (req.method === 'GET') {
    try {
      const { courseId } = req.query;

      if (!courseId) {
        return res.status(400).json({ error: 'courseId es requerido' });
      }

      // Traer todos los quizzes para ese courseId
      const quizzes = await Quiz.find({ courseId });

      return res.status(200).json(quizzes);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  res.status(405).json({ error: 'Método no permitido' });
}
