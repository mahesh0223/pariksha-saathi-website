export const TELEGRAM_PAGE_PATH: string;
export function telegramPageMeta(): { title: string; description: string };
export function telegramPageBody(latest?: { id: string; title: string; editionDate: string }[]): string;
