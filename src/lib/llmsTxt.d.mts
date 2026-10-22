export function llmsTxt(args: {
  hubs: Record<string, { hasCutoffs: boolean; lastVerified: string }>;
  papers: { examId: string; displayName: string; date: string; shift: string; slug: string; questions: number }[];
  affairsCount: number;
  noticesCount: number;
  lessonCount: number;
  questionCount: number;
}): string;
