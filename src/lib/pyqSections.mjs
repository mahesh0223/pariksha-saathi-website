// A paper whose sheet prints sections a candidate chooses between (SSC GD: Part-D English or Part-D Hindi) names them in
// `alternativeSections` (from the server's seed file). The first of each group is the one the paper's counts are made
// against - "N of the paper's 80 questions" counts one Part-D - and the others are its optional sections.

/** Names of the sections that are another choice for a part already counted (Part-D Hindi). */
export function optionalSectionNames(paper) {
  return new Set((paper.alternativeSections ?? []).flatMap((group) => group.slice(1)));
}

/** The questions a candidate sitting the paper's first choices answers: every question outside the optional sections. */
export function satQuestions(paper) {
  const optional = optionalSectionNames(paper);
  return paper.questions.filter((q) => !optional.has(q.section));
}

/** The questions in the optional sections, e.g. the Hindi option of Part-D. */
export function optionalQuestions(paper) {
  const optional = optionalSectionNames(paper);
  return paper.questions.filter((q) => optional.has(q.section));
}

/** The section that `name` is the alternative to (Part-D Hindi -> Part-D-English), or null. */
export function alternativeTo(paper, name) {
  const group = (paper.alternativeSections ?? []).find((g) => g.slice(1).includes(name));
  return group ? group[0] : null;
}
