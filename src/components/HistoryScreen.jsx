import { useState, useEffect } from 'react';
import { getHistory, clearHistory } from '../utils/storage';

function formatDate(iso) {
  const d = new Date(iso);
  return `${d.getFullYear()}/${String(d.getMonth() + 1).padStart(2, '0')}/${String(d.getDate()).padStart(2, '0')} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
}

function ScoreBar({ score }) {
  const color = score >= 80 ? '#22c55e' : score >= 60 ? '#f59e0b' : '#ef4444';
  return (
    <div className="history-score-bar-track">
      <div
        className="history-score-bar-fill"
        style={{ width: `${score}%`, background: color }}
      />
    </div>
  );
}

export default function HistoryScreen({ onHome }) {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    setHistory(getHistory());
  }, []);

  const handleClear = () => {
    if (window.confirm('履歴をすべて削除しますか？')) {
      clearHistory();
      setHistory([]);
    }
  };

  return (
    <div className="screen history-screen">
      <div className="history-header">
        <button className="btn-back" onClick={onHome}>←</button>
        <h2 className="history-title">受験履歴</h2>
        {history.length > 0 && (
          <button className="btn-clear" onClick={handleClear}>削除</button>
        )}
      </div>

      {history.length === 0 ? (
        <div className="history-empty">
          <p>まだ受験履歴がありません。</p>
          <button className="btn-primary" onClick={onHome}>試験に挑戦する</button>
        </div>
      ) : (
        <>
          <div className="history-stats">
            <div className="history-stat">
              <span className="history-stat-num">{history.length}</span>
              <span className="history-stat-label">受験回数</span>
            </div>
            <div className="history-stat">
              <span className="history-stat-num">
                {Math.round(history.reduce((s, h) => s + h.score, 0) / history.length)}
              </span>
              <span className="history-stat-label">平均スコア</span>
            </div>
            <div className="history-stat">
              <span className="history-stat-num">
                {Math.max(...history.map(h => h.score))}
              </span>
              <span className="history-stat-label">最高スコア</span>
            </div>
          </div>

          <div className="history-list">
            {history.map(h => (
              <div key={h.id} className="history-item">
                <div className="history-item-top">
                  <span className="history-date">{formatDate(h.date)}</span>
                  <span className={`history-score ${h.score >= 80 ? 'good' : h.score >= 60 ? 'mid' : 'bad'}`}>
                    {h.score}点
                  </span>
                </div>
                <ScoreBar score={h.score} />
                <div className="history-detail">
                  {h.subject && h.subject !== 'all' ? `【${h.subject}】` : '【全科目】'}{h.correct}問正解 / {h.total}問中
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
