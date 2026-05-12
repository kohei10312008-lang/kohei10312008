import { useState } from 'react';
import { CATEGORIES } from '../data/questions';

const CATEGORY_OPTIONS = [
  { value: 'all', label: '全カテゴリ' },
  ...Object.values(CATEGORIES).map(c => ({ value: c, label: c })),
];

const COUNT_OPTIONS = [5, 10, 15, 20];

export default function HomeScreen({ onStart, onHistory }) {
  const [category, setCategory] = useState('all');
  const [count, setCount] = useState(10);

  return (
    <div className="screen home-screen">
      <div className="home-hero">
        <div className="home-icon">
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
            <rect width="64" height="64" rx="16" fill="#4f46e5"/>
            <path d="M20 44V22a2 2 0 012-2h20a2 2 0 012 2v22M16 44h32" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
            <path d="M27 32h10M27 38h6" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
            <circle cx="27" cy="26" r="2" fill="white"/>
          </svg>
        </div>
        <h1 className="home-title">昇任試験<br/>対策アプリ</h1>
        <p className="home-subtitle">管理・法規・倫理など幅広い分野を演習できます</p>
      </div>

      <div className="settings-card">
        <div className="setting-group">
          <label className="setting-label">カテゴリ</label>
          <select
            className="setting-select"
            value={category}
            onChange={e => setCategory(e.target.value)}
          >
            {CATEGORY_OPTIONS.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>

        <div className="setting-group">
          <label className="setting-label">出題数</label>
          <div className="count-options">
            {COUNT_OPTIONS.map(n => (
              <button
                key={n}
                className={`count-btn ${count === n ? 'active' : ''}`}
                onClick={() => setCount(n)}
              >
                {n}問
              </button>
            ))}
          </div>
        </div>

        <button className="btn-primary" onClick={() => onStart(category, count)}>
          試験を開始する
        </button>
      </div>

      <button className="btn-ghost" onClick={onHistory}>
        受験履歴を見る
      </button>
    </div>
  );
}
