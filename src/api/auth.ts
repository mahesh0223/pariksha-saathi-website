import { apiRequest } from './client';
import type { AuthResponse, MeResponse } from '../types/api';

export function register(
  email: string,
  password: string,
  deviceId: string,
): Promise<AuthResponse> {
  return apiRequest<AuthResponse>('/v1/auth/register', {
    method: 'POST',
    body: { email, password, deviceId },
  });
}

export function login(email: string, password: string, deviceId: string): Promise<AuthResponse> {
  return apiRequest<AuthResponse>('/v1/auth/login', {
    method: 'POST',
    body: { email, password, deviceId },
  });
}

export function me(token: string): Promise<MeResponse> {
  return apiRequest<MeResponse>('/v1/auth/me', { token });
}

export function changePassword(
  currentPassword: string,
  newPassword: string,
  token: string,
): Promise<{ success: true; token: string }> {
  return apiRequest('/v1/auth/change-password', {
    method: 'POST',
    body: { currentPassword, newPassword },
    token,
  });
}

export function deleteAccount(currentPassword: string, token: string): Promise<{ success: true }> {
  return apiRequest('/v1/auth/me', { method: 'DELETE', body: { currentPassword }, token });
}

export function requestPasswordReset(email: string): Promise<{ success: true }> {
  return apiRequest('/v1/auth/password-reset/request', { method: 'POST', body: { email } });
}
