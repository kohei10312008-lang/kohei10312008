import { QUESTION_TYPES } from '../data/questions';

function ScoreRing({ score }) {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const color = score >= 80 ? '#22c55e' : score >= 60 ? '#f59e0b' : '#ef4444';

  return (
    <div className="score-ring-wrap">
      <svg width="140" height="140" viewBox="0 0 140 140">
        <circle cx="70" cy="70" r={radius} fill="none" stroke="#e5e7eb" strokeWidth="12" />
        <circle
          cx="70" cy="70" r={radius}
          fill="none"
          stroke={color}
          strokeWidth="12"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform="rotate(-90 70 70)"
          style={{ transition: 'stroke-dashoffset 0.8s ease' }}
        />
      </svg>
      <div className="score-ring-text">
        <span className="score-value" style={{ color }}>{score}</span>
        <span className="score-unit">点</span>
      </div>
    </div>
  );
}

function getGrade(score) {
  if (score >= 90) return { label: '優秀', color: '#7c3aed' };
  if (score >= 80) return { label: '合格圏内', color: '#22c55e' };
  if (score >= 60) return { label: 'もう少し', color: '#f59e0b' };
  return { label: '要復習', color: '#ef4444' };
}

export default function ResultScreen({ answers, correctCount, finalScore, onHome, onRetry }) {
  const grade = getGrade(finalScore);

  return (
    <div className="screen result-screen">
      <h2 className="result-title">試験結果</h2>

      <ScoreRing score={finalScore} />

      <div className="result-summary">
        <div className="result-stat">
          <span className="result-stat-num">{correctCount}</span>
          <span className="result-stat-label">正解</span>
        </div>
        <div className="result-stat-sep">/</div>
        <div className="result-stat">
          <span className="result-stat-num">{answers.length}</span>
          <span className="result-stat-label">問</span>
        </div>
      </div>

      <div className="grade-badge" style={{ background: grade.color }}>
        {grade.label}
      </div>

      <div className="answer-review">
        <h3 className="review-title">解答一覧</h3>
        {answers.map((a, i) => (
          <div key={i} className={`review-item ${a.correct ? 'correct' : 'incorrect'}`}>
            <div className="review-item-header">
              <span className="review-num">Q{i + 1}</span>
              <span className="review-category">{a.question.category}</span>
              <span className={`review-mark ${a.correct ? 'correct' : 'incorrect'}`}>
                {a.correct ? '〇' : '×'}
              </span>
            </div>
            <p className="review-question">{a.question.question}</p>
            {!a.correct && (
              <p className="review-explanation">{a.question.explanation}</p>
            )}
          </div>
        ))}
      </div>

      <div className="result-actions">
        <button className="btn-primary" onClick={onRetry}>もう一度挑戦</button>
        <button className="btn-ghost" onClick={onHome}>ホームへ戻る</button>
      </div>
    </div>
  );
}
