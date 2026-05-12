import { useState, useCallback } from 'react';
import questions, { QUESTION_TYPES } from '../data/questions';
import { saveResult } from '../utils/storage';

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildSessionQuestions(category, count) {
  const pool = category === 'all'
    ? questions
    : questions.filter(q => q.category === category);
  return shuffle(pool).slice(0, Math.min(count, pool.length)).map(q => {
    if (q.type === QUESTION_TYPES.MULTIPLE_CHOICE) {
      // Shuffle choices and track new correct index
      const indexed = q.choices.map((text, i) => ({ text, isCorrect: i === q.correctIndex }));
      const shuffled = shuffle(indexed);
      return {
        ...q,
        choices: shuffled.map(c => c.text),
        correctIndex: shuffled.findIndex(c => c.isCorrect),
      };
    }
    return q;
  });
}

export default function useQuiz() {
  const [screen, setScreen] = useState('home'); // home | quiz | result | history
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState([]); // { selectedIndex|selectedBool, correct, question }
  const [showExplanation, setShowExplanation] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const startQuiz = useCallback((category, count) => {
    const qs = buildSessionQuestions(category, count);
    setQuizQuestions(qs);
    setCurrentIndex(0);
    setAnswers([]);
    setShowExplanation(false);
    setSelectedAnswer(null);
    setScreen('quiz');
  }, []);

  const submitAnswer = useCallback((answer) => {
    const q = quizQuestions[currentIndex];
    let correct;
    if (q.type === QUESTION_TYPES.MULTIPLE_CHOICE) {
      correct = answer === q.correctIndex;
    } else {
      correct = answer === q.correct;
    }
    setSelectedAnswer(answer);
    setAnswers(prev => [...prev, { question: q, answer, correct }]);
    setShowExplanation(true);
  }, [quizQuestions, currentIndex]);

  const nextQuestion = useCallback(() => {
    if (currentIndex + 1 >= quizQuestions.length) {
      // Save result
      const score = answers.filter(a => a.correct).length + (answers.length < quizQuestions.length ? 0 : 0);
      const finalAnswers = answers; // already has all answers at this point
      const correctCount = finalAnswers.filter(a => a.correct).length;
      saveResult({
        date: new Date().toISOString(),
        total: quizQuestions.length,
        correct: correctCount,
        score: Math.round((correctCount / quizQuestions.length) * 100),
        answers: finalAnswers,
      });
      setScreen('result');
    } else {
      setCurrentIndex(prev => prev + 1);
      setShowExplanation(false);
      setSelectedAnswer(null);
    }
  }, [currentIndex, quizQuestions.length, answers]);

  const goHome = useCallback(() => setScreen('home'), []);
  const goHistory = useCallback(() => setScreen('history'), []);
  const goResult = useCallback(() => setScreen('result'), []);

  const currentQuestion = quizQuestions[currentIndex] || null;
  const correctCount = answers.filter(a => a.correct).length;
  const finalScore = quizQuestions.length > 0
    ? Math.round((correctCount / quizQuestions.length) * 100)
    : 0;

  return {
    screen,
    currentQuestion,
    currentIndex,
    totalQuestions: quizQuestions.length,
    answers,
    showExplanation,
    selectedAnswer,
    correctCount,
    finalScore,
    startQuiz,
    submitAnswer,
    nextQuestion,
    goHome,
    goHistory,
    goResult,
  };
}
