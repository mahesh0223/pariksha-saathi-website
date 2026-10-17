// Scores a typing / data-entry practice attempt the way SSC's "Revised guidelines for evaluation of typing
// test/DEST scripts (English/Hindi)" (June 2022) classify mistakes:
//   full mistakes - omission, substitution, addition or repetition of a word, a spelling error, an incomplete word;
//   half mistakes - spacing ("Ihope", "h ave"), wrong capitalisation (not for Hindi), a punctuation mark omitted,
//                   added or substituted, two words transposed.
// (The guidelines' paragraph-indent rule never applies here: practice passages are single paragraphs.)
//
// What the guidelines do NOT publish is how mistakes become an error percentage, so this module does not
// pretend to: it reports full and half mistakes, and an error rate computed one stated way - mistakes (a half
// mistake counting half) divided by the passage words the candidate reached - which the page labels as ours.
//
// Speeds follow the notices: key depressions are counted as characters typed, spaces included; a "word" is
// 5 key depressions (CHSL 2026 notice para 13.9.13.7: 35 w.p.m. "correspond to about 10500 key depressions per
// hour"). Net speed counts only the key depressions of words typed with no mistake ("adjudged on the basis of
// the correct entry of words/key depressions", para 13.9.13.6).

const KD_PER_WORD = 5;

export function tokens(text) {
  return String(text ?? '').normalize('NFC').split(/\s+/u).filter(Boolean);
}

const stripPunct = (w) => w.replace(/[\p{P}\p{S}]/gu, '');
const norm = (w) => stripPunct(w).toLowerCase();

/** Half-mistake kinds between two tokens that are the same word (equal after normalising). */
function halfKinds(typed, expected, lang) {
  const kinds = [];
  if (typed === expected) return kinds;
  const punctOf = (w) => w.replace(/[^\p{P}\p{S}]/gu, '');
  if (punctOf(typed) !== punctOf(expected)) kinds.push('punctuation');
  if (lang !== 'hi' && stripPunct(typed) !== stripPunct(expected) && stripPunct(typed).toLowerCase() === stripPunct(expected).toLowerCase()) {
    kinds.push('capitalisation');
  }
  return kinds;
}

function levenshtein(a, b) {
  const row = Array.from({ length: b.length + 1 }, (_, j) => j);
  for (let i = 1; i <= a.length; i++) {
    let prev = row[0];
    row[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const cur = row[j];
      row[j] = Math.min(row[j] + 1, row[j - 1] + 1, prev + (a[i - 1] === b[j - 1] ? 0 : 1));
      prev = cur;
    }
  }
  return row[b.length];
}

/**
 * Aligns the typed words against the passage (word-level edit distance whose costs are SSC's: 1 per full
 * mistake, 0.5 per half mistake, with spacing merges/splits and transpositions as half-mistake moves) and
 * returns every mistake with its category. Passage words after the last aligned one count as "not reached",
 * not as omissions - a timed test usually ends before the passage does.
 */
export function scoreTyping({ passage, typed, lang = 'en' }) {
  const P = tokens(passage);
  const T = tokens(typed);
  const n = T.length;
  const m = P.length;
  const nP = P.map(norm);
  const nT = T.map(norm);
  const INF = Number.POSITIVE_INFINITY;
  // cost[i][j]: least mistake weight aligning T[0..i) with P[0..j); back[i][j]: the move that got there.
  const cost = Array.from({ length: n + 1 }, () => new Float64Array(m + 1).fill(INF));
  const back = Array.from({ length: n + 1 }, () => Array.from({ length: m + 1 }));
  cost[0][0] = 0;
  const relax = (i, j, c, move) => {
    if (c < cost[i][j] - 1e-9) {
      cost[i][j] = c;
      back[i][j] = move;
    }
  };
  for (let i = 0; i <= n; i++) {
    for (let j = 0; j <= m; j++) {
      const c = cost[i][j];
      if (c === INF) continue;
      if (i < n && j < m) {
        if (nT[i] === nP[j] && nT[i] !== '') relax(i + 1, j + 1, c + 0.5 * halfKinds(T[i], P[j], lang).length, { op: 'match', i, j });
        else relax(i + 1, j + 1, c + 1, { op: 'sub', i, j });
      }
      if (i < n) relax(i + 1, j, c + 1, { op: 'add', i, j });
      if (j < m) relax(i, j + 1, c + 1, { op: 'omit', i, j });
      // spacing: one typed token is two passage words run together ("Ihope")
      if (i < n && j + 1 < m && nT[i] !== '' && nT[i] === nP[j] + nP[j + 1]) relax(i + 1, j + 2, c + 0.5, { op: 'merge', i, j });
      // spacing: two typed tokens are one passage word split ("h ave")
      if (i + 1 < n && j < m && nP[j] !== '' && nT[i] + nT[i + 1] === nP[j]) relax(i + 2, j + 1, c + 0.5, { op: 'split', i, j });
      // transposition: "hope I" for "I hope"
      if (i + 1 < n && j + 1 < m && nT[i] === nP[j + 1] && nT[i + 1] === nP[j] && nT[i] !== nT[i + 1]) relax(i + 2, j + 2, c + 0.5, { op: 'transpose', i, j });
    }
  }
  // Free trailing passage: end at the best reached position (ties: the furthest).
  let end = 0;
  for (let j = 0; j <= m; j++) if (cost[n][j] <= cost[n][end] + 1e-9) end = j;

  const moves = [];
  for (let i = n, j = end; i > 0 || j > 0; ) {
    const move = back[i][j];
    if (!move) break;
    moves.push(move);
    i = move.i;
    j = move.j;
  }
  moves.reverse();

  const mistakes = [];
  let correctKd = 0;
  for (const mv of moves) {
    const { op, i, j } = mv;
    if (op === 'match') {
      const kinds = halfKinds(T[i], P[j], lang);
      if (kinds.length === 0) correctKd += T[i].length + 1;
      for (const kind of kinds) mistakes.push({ weight: 'half', kind, expected: P[j], typed: T[i] });
    } else if (op === 'sub') {
      const isLast = i === n - 1;
      let kind;
      if (isLast && nP[j].startsWith(nT[i]) && nT[i].length < nP[j].length) kind = 'incomplete';
      else if (levenshtein(nT[i], nP[j]) <= Math.max(1, Math.floor(nP[j].length * 0.4))) kind = 'spelling';
      else kind = 'substitution';
      mistakes.push({ weight: 'full', kind, expected: P[j], typed: T[i] });
    } else if (op === 'add') {
      // Either copy of a doubled word can be the one the alignment calls extra, so look both ways.
      const repeated = nT[i] !== '' && ((i > 0 && nT[i] === nT[i - 1]) || (i + 1 < n && nT[i] === nT[i + 1]));
      mistakes.push({ weight: 'full', kind: repeated ? 'repetition' : 'addition', expected: null, typed: T[i] });
    } else if (op === 'omit') {
      mistakes.push({ weight: 'full', kind: 'omission', expected: P[j], typed: null });
    } else if (op === 'merge') {
      mistakes.push({ weight: 'half', kind: 'spacing', expected: `${P[j]} ${P[j + 1]}`, typed: T[i] });
    } else if (op === 'split') {
      mistakes.push({ weight: 'half', kind: 'spacing', expected: P[j], typed: `${T[i]} ${T[i + 1]}` });
    } else if (op === 'transpose') {
      mistakes.push({ weight: 'half', kind: 'transposition', expected: `${P[j]} ${P[j + 1]}`, typed: `${T[i]} ${T[i + 1]}` });
    }
  }

  const full = mistakes.filter((x) => x.weight === 'full').length;
  const half = mistakes.filter((x) => x.weight === 'half').length;
  const byKind = {};
  for (const x of mistakes) byKind[x.kind] = (byKind[x.kind] ?? 0) + 1;
  const wordsReached = end;
  const errorPercent = wordsReached === 0 ? 0 : Math.round(((full + half / 2) / wordsReached) * 10000) / 100;
  return {
    mistakes,
    full,
    half,
    byKind,
    wordsReached,
    passageWords: m,
    typedWords: n,
    errorPercent,
    typedKd: String(typed ?? '').normalize('NFC').replace(/\s+/gu, ' ').trim().length,
    correctKd: Math.max(0, correctKd - (correctKd > 0 && moves.at(-1)?.op === 'match' ? 1 : 0)),
  };
}

/** Gross and net speeds for `minutes` of typing - key depressions per hour and words (5 key depressions) per minute. */
export function typingSpeeds({ typedKd, correctKd }, minutes) {
  if (!(minutes > 0)) return { grossKdph: 0, netKdph: 0, grossWpm: 0, netWpm: 0 };
  return {
    grossKdph: Math.round((typedKd / minutes) * 60),
    netKdph: Math.round((correctKd / minutes) * 60),
    grossWpm: Math.round((typedKd / KD_PER_WORD / minutes) * 10) / 10,
    netWpm: Math.round((correctKd / KD_PER_WORD / minutes) * 10) / 10,
  };
}
