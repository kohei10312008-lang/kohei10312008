const HISTORY_KEY = 'promotion_exam_history';

export function getHistory() {
  try {
    return JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
  } catch {
    return [];
  }
}

export function saveResult(result) {
  const history = getHistory();
  history.unshift({ ...result, id: Date.now() });
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history.slice(0, 50)));
}

export function clearHistory() {
  localStorage.removeItem(HISTORY_KEY);
}
