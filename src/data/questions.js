// 昇任試験問題データ

export const QUESTION_TYPES = {
  MULTIPLE_CHOICE: 'multiple_choice', // 4択
  TRUE_FALSE: 'true_false',           // 〇×
};

export const CATEGORIES = {
  MANAGEMENT: '管理・マネジメント',
  LABOR: '労働法規',
  ADMIN: '行政・法令',
  ETHICS: '職業倫理',
  COMMUNICATION: 'コミュニケーション',
};

/** @type {Array<{
 *   id: number,
 *   type: 'multiple_choice'|'true_false',
 *   category: string,
 *   question: string,
 *   choices?: string[],
 *   correctIndex?: number,
 *   correct?: boolean,
 *   explanation: string
 * }>} */
const questions = [
  // ── 管理・マネジメント ──
  {
    id: 1,
    type: QUESTION_TYPES.MULTIPLE_CHOICE,
    category: CATEGORIES.MANAGEMENT,
    question: 'PDCAサイクルの正しい順序はどれか。',
    choices: [
      'Plan → Check → Do → Act',
      'Plan → Do → Check → Act',
      'Do → Plan → Act → Check',
      'Check → Plan → Do → Act',
    ],
    correctIndex: 1,
    explanation: 'PDCAサイクルは「Plan（計画）→ Do（実行）→ Check（評価）→ Act（改善）」の順に繰り返すマネジメント手法です。',
  },
  {
    id: 2,
    type: QUESTION_TYPES.MULTIPLE_CHOICE,
    category: CATEGORIES.MANAGEMENT,
    question: 'マズローの欲求段階説において、最上位に位置する欲求はどれか。',
    choices: [
      '安全の欲求',
      '承認の欲求',
      '自己実現の欲求',
      '所属と愛情の欲求',
    ],
    correctIndex: 2,
    explanation: 'マズローの欲求段階説では、低次から「生理的欲求→安全の欲求→所属と愛情の欲求→承認の欲求→自己実現の欲求」の順に並び、自己実現の欲求が最上位です。',
  },
  {
    id: 3,
    type: QUESTION_TYPES.MULTIPLE_CHOICE,
    category: CATEGORIES.MANAGEMENT,
    question: '目標管理制度（MBO）を提唱したのは誰か。',
    choices: [
      'ピーター・ドラッカー',
      'フレデリック・テイラー',
      'エルトン・メイヨー',
      'ダグラス・マクレガー',
    ],
    correctIndex: 0,
    explanation: '目標管理制度（Management by Objectives）はピーター・ドラッカーが1954年の著書『現代の経営』で提唱したマネジメント手法です。',
  },
  {
    id: 4,
    type: QUESTION_TYPES.TRUE_FALSE,
    category: CATEGORIES.MANAGEMENT,
    question: 'OJT（On-the-Job Training）とは、職場外で行う研修・教育訓練のことをいう。',
    correct: false,
    explanation: 'OJTは職場内で実際の業務を通じて行う教育訓練です。職場外で行う研修はOff-JT（Off-the-Job Training）といいます。',
  },
  {
    id: 5,
    type: QUESTION_TYPES.TRUE_FALSE,
    category: CATEGORIES.MANAGEMENT,
    question: 'リーダーシップにおける「PM理論」のP機能とは、集団の目標達成（Performance）に関わる機能のことである。',
    correct: true,
    explanation: 'PM理論（三隅二不二提唱）では、P機能（Performance：目標達成機能）とM機能（Maintenance：集団維持機能）の2軸でリーダーシップを分類します。',
  },
  {
    id: 6,
    type: QUESTION_TYPES.MULTIPLE_CHOICE,
    category: CATEGORIES.MANAGEMENT,
    question: 'ハーズバーグの二要因理論における「衛生要因」に該当するものはどれか。',
    choices: [
      '仕事の達成感',
      '給与・労働条件',
      '責任の拡大',
      '昇進・昇格',
    ],
    correctIndex: 1,
    explanation: '衛生要因は不満足を防ぐ要因で、給与・労働条件・会社の方針などが該当します。達成感・責任・昇進は満足感を高める「動機付け要因」です。',
  },

  // ── 労働法規 ──
  {
    id: 7,
    type: QUESTION_TYPES.MULTIPLE_CHOICE,
    category: CATEGORIES.LABOR,
    question: '労働基準法に定める法定労働時間として正しいものはどれか。',
    choices: [
      '1日7時間、1週35時間',
      '1日8時間、1週40時間',
      '1日8時間、1週44時間',
      '1日9時間、1週45時間',
    ],
    correctIndex: 1,
    explanation: '労働基準法第32条では、法定労働時間を「1日8時間、1週40時間」と定めています。これを超える場合は時間外労働（残業）として割増賃金の支払いが必要です。',
  },
  {
    id: 8,
    type: QUESTION_TYPES.TRUE_FALSE,
    category: CATEGORIES.LABOR,
    question: '労働基準法では、使用者は労働者に対して毎週少なくとも2日の休日を与えなければならないと定めている。',
    correct: false,
    explanation: '労働基準法第35条では、毎週少なくとも「1回」の休日を与えることを義務付けています。4週4日の変形休日制も認められています。',
  },
  {
    id: 9,
    type: QUESTION_TYPES.MULTIPLE_CHOICE,
    category: CATEGORIES.LABOR,
    question: '年次有給休暇の付与について、入社後6か月継続勤務し全労働日の8割以上出勤した労働者に付与される日数はどれか。',
    choices: [
      '5日',
      '8日',
      '10日',
      '12日',
    ],
    correctIndex: 2,
    explanation: '労働基準法第39条により、入社後6か月で全労働日の8割以上出勤した場合、10日の年次有給休暇が付与されます。',
  },
  {
    id: 10,
    type: QUESTION_TYPES.TRUE_FALSE,
    category: CATEGORIES.LABOR,
    question: 'パワーハラスメントの防止措置は、労働施策総合推進法により大企業のみに義務付けられている。',
    correct: false,
    explanation: '2022年4月の改正により、パワーハラスメント防止措置はすべての事業主（大企業・中小企業を問わず）に義務付けられています。',
  },

  // ── 行政・法令 ──
  {
    id: 11,
    type: QUESTION_TYPES.MULTIPLE_CHOICE,
    category: CATEGORIES.ADMIN,
    question: '行政手続法における「申請に対する処分」について、標準処理期間を定めた場合に公にする義務があるのはどれか。',
    choices: [
      '処分を行う前',
      '処分と同時',
      'あらかじめ（事前に）',
      '処分の後',
    ],
    correctIndex: 2,
    explanation: '行政手続法第6条により、標準処理期間を定めたときは「あらかじめ公にしておかなければならない」と定められています。',
  },
  {
    id: 12,
    type: QUESTION_TYPES.TRUE_FALSE,
    category: CATEGORIES.ADMIN,
    question: '行政不服申立ての手続きにおいて、審査請求は原則として処分があったことを知った日の翌日から起算して3か月以内に行わなければならない。',
    correct: true,
    explanation: '行政不服申立法第18条により、審査請求は処分があったことを知った日の翌日から起算して3か月以内（不服申立期間）に行うことが原則です。',
  },
  {
    id: 13,
    type: QUESTION_TYPES.MULTIPLE_CHOICE,
    category: CATEGORIES.ADMIN,
    question: '個人情報保護法における「要配慮個人情報」に含まれないものはどれか。',
    choices: [
      '人種・民族',
      '病歴・健康診断の結果',
      '犯罪の経歴',
      '氏名・住所',
    ],
    correctIndex: 3,
    explanation: '氏名・住所は「個人情報」に該当しますが、「要配慮個人情報」ではありません。要配慮個人情報は、不当な差別や偏見が生じる可能性がある人種・病歴・犯罪歴などが該当します。',
  },

  // ── 職業倫理 ──
  {
    id: 14,
    type: QUESTION_TYPES.TRUE_FALSE,
    category: CATEGORIES.ETHICS,
    question: 'コンプライアンスとは、法令遵守のみを指し、社内規則や倫理・社会規範は含まない。',
    correct: false,
    explanation: 'コンプライアンスは法令遵守にとどまらず、社内規則・倫理規範・社会的な規範・慣習なども含む、広義の「法的・社会的ルールへの適合」を意味します。',
  },
  {
    id: 15,
    type: QUESTION_TYPES.MULTIPLE_CHOICE,
    category: CATEGORIES.ETHICS,
    question: '内部通報制度（公益通報者保護法）において、保護される通報先として適切でないものはどれか。',
    choices: [
      '事業者内部（上司・内部通報窓口）',
      '権限ある行政機関',
      '報道機関・マスコミ（一定の条件下）',
      '通報内容と無関係の第三者',
    ],
    correctIndex: 3,
    explanation: '公益通報者保護法では、通報先として①事業者内部、②権限ある行政機関、③その他外部（報道機関等・一定条件あり）が認められています。無関係の第三者への通報は保護の対象外です。',
  },
  {
    id: 16,
    type: QUESTION_TYPES.TRUE_FALSE,
    category: CATEGORIES.ETHICS,
    question: '利益相反とは、職務上の立場と個人的利益が相反する状況であり、管理職はこれを適切に開示・回避する責任がある。',
    correct: true,
    explanation: '利益相反（conflict of interest）は、組織への忠実義務と個人的利益が対立する状況です。管理職は利益相反を適切に開示し、公正な職務執行を確保する責任があります。',
  },

  // ── コミュニケーション ──
  {
    id: 17,
    type: QUESTION_TYPES.MULTIPLE_CHOICE,
    category: CATEGORIES.COMMUNICATION,
    question: '「アサーティブコミュニケーション」の説明として最も適切なものはどれか。',
    choices: [
      '自分の意見を一切主張せず、相手に従う姿勢',
      '自分の意見を攻撃的・一方的に押し付ける姿勢',
      '自分の権利を尊重しつつ、相手の権利も尊重して率直に伝える姿勢',
      '感情を抑制し、常に中立的な立場を保つ姿勢',
    ],
    correctIndex: 2,
    explanation: 'アサーティブコミュニケーションとは、自分の意見・感情・権利を率直に、しかし相手を尊重しながら表現するコミュニケーションスタイルです。',
  },
  {
    id: 18,
    type: QUESTION_TYPES.TRUE_FALSE,
    category: CATEGORIES.COMMUNICATION,
    question: '積極的傾聴（アクティブリスニング）では、相手の話を途中で要約・言い換えることは避けるべきである。',
    correct: false,
    explanation: '積極的傾聴では、相手の話を要約・言い換え（パラフレーズ）することで理解を確認し、話し手に「きちんと聞かれている」という安心感を与えることが重要です。',
  },
  {
    id: 19,
    type: QUESTION_TYPES.MULTIPLE_CHOICE,
    category: CATEGORIES.COMMUNICATION,
    question: '報告・連絡・相談（報連相）において、「連絡」の説明として正しいものはどれか。',
    choices: [
      '業務の結果や経過を上位者に知らせること',
      '関係者に必要な情報を周知・共有すること',
      '判断に迷ったとき上位者や関係者に意見を求めること',
      '課題を整理して会議で議論すること',
    ],
    correctIndex: 1,
    explanation: '報連相の「連絡」は、関係者へ必要な情報を周知・共有することです。「報告」は業務結果を上位者へ伝えること、「相談」は判断を仰いだり意見を求めることです。',
  },
  {
    id: 20,
    type: QUESTION_TYPES.TRUE_FALSE,
    category: CATEGORIES.COMMUNICATION,
    question: 'メラビアンの法則によると、コミュニケーションにおいて言語情報（話の内容）が相手に与える影響は55%である。',
    correct: false,
    explanation: 'メラビアンの法則では、視覚情報（表情・見た目）55%、聴覚情報（声のトーン・速さ）38%、言語情報（言葉の内容）7%とされています。言語情報の影響は7%にすぎません。',
  },
];

export default questions;
