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

function buildSessionQuestions(subject, category, count) {
  let pool = questions;
  if (subject !== 'all') {
    pool = pool.filter(q => q.subject === subject);
  }
  if (category !== 'all') {
    pool = pool.filter(q => q.category === category);
  }
  return shuffle(pool).slice(0, Math.min(count, pool.length)).map(q => {
    if (q.type === QUESTION_TYPES.MULTIPLE_CHOICE) {
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
  const [screen, setScreen] = useState('home');
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showExplanation, setShowExplanation] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [quizSubject, setQuizSubject] = useState('all');

  const startQuiz = useCallback((subject, category, count) => {
    const qs = buildSessionQuestions(subject, category, count);
    setQuizQuestions(qs);
    setCurrentIndex(0);
    setAnswers([]);
    setShowExplanation(false);
    setSelectedAnswer(null);
    setQuizSubject(subject);
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
      const correctCount = answers.filter(a => a.correct).length;
      saveResult({
        date: new Date().toISOString(),
        subject: quizSubject,
        total: quizQuestions.length,
        correct: correctCount,
        score: Math.round((correctCount / quizQuestions.length) * 100),
        answers,
      });
      setScreen('result');
    } else {
      setCurrentIndex(prev => prev + 1);
      setShowExplanation(false);
      setSelectedAnswer(null);
    }
  }, [currentIndex, quizQuestions.length, answers, quizSubject]);

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
