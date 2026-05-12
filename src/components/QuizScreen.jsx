import { QUESTION_TYPES } from '../data/questions';

function ProgressBar({ current, total }) {
  const pct = Math.round((current / total) * 100);
  return (
    <div className="progress-bar-wrap">
      <div className="progress-bar-track">
        <div className="progress-bar-fill" style={{ width: `${pct}%` }} />
      </div>
      <span className="progress-text">{current} / {total}</span>
    </div>
  );
}

function MultipleChoiceQuestion({ question, selectedAnswer, showExplanation, onAnswer }) {
  return (
    <div className="choices-list">
      {question.choices.map((choice, i) => {
        let cls = 'choice-btn';
        if (showExplanation) {
          if (i === question.correctIndex) cls += ' correct';
          else if (i === selectedAnswer) cls += ' incorrect';
          else cls += ' disabled';
        } else if (selectedAnswer === i) {
          cls += ' selected';
        }
        return (
          <button
            key={i}
            className={cls}
            onClick={() => !showExplanation && onAnswer(i)}
            disabled={showExplanation}
          >
            <span className="choice-label">{String.fromCharCode(65 + i)}</span>
            <span className="choice-text">{choice}</span>
            {showExplanation && i === question.correctIndex && (
              <span className="choice-mark correct-mark">✓</span>
            )}
            {showExplanation && i === selectedAnswer && i !== question.correctIndex && (
              <span className="choice-mark incorrect-mark">✗</span>
            )}
          </button>
        );
      })}
    </div>
  );
}

function TrueFalseQuestion({ question, selectedAnswer, showExplanation, onAnswer }) {
  const options = [
    { value: true, label: '〇', sublabel: '正しい' },
    { value: false, label: '×', sublabel: '誤り' },
  ];
  return (
    <div className="tf-list">
      {options.map(opt => {
        let cls = 'tf-btn';
        if (showExplanation) {
          if (opt.value === question.correct) cls += ' correct';
          else if (selectedAnswer === opt.value) cls += ' incorrect';
          else cls += ' disabled';
        } else if (selectedAnswer === opt.value) {
          cls += ' selected';
        }
        return (
          <button
            key={String(opt.value)}
            className={cls}
            onClick={() => !showExplanation && onAnswer(opt.value)}
            disabled={showExplanation}
          >
            <span className="tf-mark">{opt.label}</span>
            <span className="tf-sublabel">{opt.sublabel}</span>
          </button>
        );
      })}
    </div>
  );
}

export default function QuizScreen({
  question,
  currentIndex,
  totalQuestions,
  selectedAnswer,
  showExplanation,
  onAnswer,
  onNext,
  onHome,
}) {
  if (!question) return null;

  const isLast = currentIndex + 1 >= totalQuestions;
  const isCorrect = showExplanation && (() => {
    if (question.type === QUESTION_TYPES.MULTIPLE_CHOICE) return selectedAnswer === question.correctIndex;
    return selectedAnswer === question.correct;
  })();

  return (
    <div className="screen quiz-screen">
      <div className="quiz-header">
        <button className="btn-back" onClick={onHome} title="ホームへ戻る">
          ✕
        </button>
        <ProgressBar current={currentIndex + 1} total={totalQuestions} />
      </div>

      <div className="question-card">
        <div className="question-meta">
          <span className="question-category">{question.category}</span>
          <span className={`question-type-badge ${question.type}`}>
            {question.type === QUESTION_TYPES.MULTIPLE_CHOICE ? '4択' : '〇×'}
          </span>
        </div>
        <p className="question-text">{question.question}</p>

        {question.type === QUESTION_TYPES.MULTIPLE_CHOICE ? (
          <MultipleChoiceQuestion
            question={question}
            selectedAnswer={selectedAnswer}
            showExplanation={showExplanation}
            onAnswer={onAnswer}
          />
        ) : (
          <TrueFalseQuestion
            question={question}
            selectedAnswer={selectedAnswer}
            showExplanation={showExplanation}
            onAnswer={onAnswer}
          />
        )}

        {showExplanation && (
          <div className={`explanation-box ${isCorrect ? 'correct' : 'incorrect'}`}>
            <div className="explanation-header">
              <span className="explanation-verdict">{isCorrect ? '正解！' : '不正解'}</span>
            </div>
            <p className="explanation-text">{question.explanation}</p>
          </div>
        )}
      </div>

      {showExplanation && (
        <button className="btn-primary" onClick={onNext}>
          {isLast ? '結果を見る' : '次の問題へ'}
        </button>
      )}
    </div>
  );
}
