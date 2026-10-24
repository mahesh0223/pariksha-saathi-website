export const PYQ_WITHDRAWN: boolean;
export function isWithdrawnPath(path: string): boolean;
export function withdrawnResponse(): Response;
export function withdrawnOrNext(context: { request: Request; next: () => Promise<Response> | Response }): Promise<Response> | Response;
