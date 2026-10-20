export const SITE_URL: string;
export const SITE_NAME: string;
export const SITE_DESCRIPTION: string;
export function websiteJsonLd(): Record<string, unknown>;
export function organizationJsonLd(): Record<string, unknown>;
export function mobileAppJsonLd(): Record<string, unknown> | null;
export function homeEntityJsonLd(): Record<string, unknown>[];
