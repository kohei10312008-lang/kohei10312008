import { useState } from 'react';
import { SUBJECTS, SUBJECT_CATEGORIES } from '../data/questions';

const COUNT_OPTIONS = [5, 10, 15, 20];

export default function HomeScreen({ onStart, onHistory }) {
  const [subject, setSubject] = useState('all');
  const [category, setCategory] = useState('all');
  const [count, setCount] = useState(10);

  const handleSubjectChange = (s) => {
    setSubject(s);
    setCategory('all');
  };

  const categoryOptions = subject === 'all'
    ? [{ value: 'all', label: '全カテゴリ' }]
    : [
        { value: 'all', label: `${subject}・全カテゴリ` },
        ...SUBJECT_CATEGORIES[subject].map(c => ({ value: c, label: c })),
      ];

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
        <h1 className="home-title">消防司令補<br/>昇任試験対策</h1>
        <p className="home-subtitle">総務実務・警防実務の2科目に対応</p>
      </div>

      <div className="settings-card">
        <div className="setting-group">
          <label className="setting-label">科目</label>
          <div className="subject-tabs">
            {[
              { value: 'all', label: '全科目' },
              { value: SUBJECTS.SOMU, label: '総務実務' },
              { value: SUBJECTS.KEIBO, label: '警防実務' },
            ].map(s => (
              <button
                key={s.value}
                className={`subject-tab ${subject === s.value ? 'active' : ''}`}
                onClick={() => handleSubjectChange(s.value)}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        <div className="setting-group">
          <label className="setting-label">カテゴリ</label>
          <select
            className="setting-select"
            value={category}
            onChange={e => setCategory(e.target.value)}
          >
            {categoryOptions.map(opt => (
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

        <button className="btn-primary" onClick={() => onStart(subject, category, count)}>
          試験を開始する
        </button>
      </div>

      <button className="btn-ghost" onClick={onHistory}>
        受験履歴を見る
      </button>
    </div>
  );
}
