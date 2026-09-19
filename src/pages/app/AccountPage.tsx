import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useLanguage } from '../../state/LanguageContext';
import { useExamSelection } from '../../state/ExamSelectionContext';
import { useAuth } from '../../state/AuthContext';
import { getOrCreateDeviceId } from '../../storage/deviceId';
import { syncPendingProgress } from '../../storage/syncQueue';
import * as authApi from '../../api/auth';
import { ApiError } from '../../api/client';
import { Button, Card, Note } from '../../components/ui/Primitives';
import './AccountPage.css';

function errorMessage(err: unknown): string {
  if (err instanceof ApiError) return err.message;
  return 'Something went wrong — check your connection and try again.';
}

function SignedOutPanel() {
  const { setSession } = useAuth();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [forgotOpen, setForgotOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSent, setForgotSent] = useState(false);
  const [forgotBusy, setForgotBusy] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const deviceId = getOrCreateDeviceId();
      const result =
        mode === 'register'
          ? await authApi.register(email, password, deviceId)
          : await authApi.login(email, password, deviceId);
      setSession(result.token, result.email);
      syncPendingProgress(result.token);
    } catch (err) {
      setError(errorMessage(err));
    } finally {
      setBusy(false);
    }
  }

  async function handleForgotSubmit(e: FormEvent) {
    e.preventDefault();
    setForgotBusy(true);
    try {
      await authApi.requestPasswordReset(forgotEmail);
    } catch {
      // deliberately shown regardless of outcome - see note below
    } finally {
      setForgotBusy(false);
      setForgotSent(true);
    }
  }

  return (
    <Card className="account-card">
      <h2>{mode === 'register' ? 'Create an account' : 'Sign in'}</h2>
      <p className="account-body">
        {mode === 'register'
          ? "Signing up will save this device's quiz history, lesson progress, and bookmarks to your new account."
          : "Signing in will save this device's quiz history, lesson progress, and bookmarks to your account."}
      </p>

      <form className="account-form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password (8+ characters)"
          required
          minLength={8}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <Note>{error}</Note>}
        <Button disabled={busy}>
          {busy ? 'Please wait…' : mode === 'register' ? 'Create account' : 'Sign in'}
        </Button>
      </form>

      <button
        className="account-link account-mode-toggle"
        onClick={() => {
          setMode(mode === 'register' ? 'login' : 'register');
          setError(null);
        }}
      >
        {mode === 'register' ? 'Already have an account? Sign in' : 'New here? Create an account'}
      </button>

      {mode === 'login' && (
        <div className="account-forgot">
          {!forgotOpen ? (
            <button className="account-link" onClick={() => setForgotOpen(true)}>
              Forgot password?
            </button>
          ) : forgotSent ? (
            <p className="account-body">
              If an account exists for that email, we've sent a link to reset the password. Open it
              from your email to finish.
            </p>
          ) : (
            <form className="account-form" onSubmit={handleForgotSubmit}>
              <input
                type="email"
                placeholder="Email"
                required
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
              />
              <Button variant="outline" size="sm" disabled={forgotBusy}>
                {forgotBusy ? 'Sending…' : 'Send reset link'}
              </Button>
            </form>
          )}
        </div>
      )}
    </Card>
  );
}

function SignedInPanel() {
  const { token, email, clearSession } = useAuth();

  const meQuery = useQuery({
    queryKey: ['me', token],
    queryFn: () => authApi.me(token!),
    enabled: Boolean(token),
  });

  const [changeOpen, setChangeOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [changeBusy, setChangeBusy] = useState(false);
  const [changeError, setChangeError] = useState<string | null>(null);
  const [changeDone, setChangeDone] = useState(false);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deletePassword, setDeletePassword] = useState('');
  const [deleteBusy, setDeleteBusy] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  async function handleChangePassword(e: FormEvent) {
    e.preventDefault();
    if (!token) return;
    setChangeBusy(true);
    setChangeError(null);
    try {
      await authApi.changePassword(currentPassword, newPassword, token);
      setChangeDone(true);
      setCurrentPassword('');
      setNewPassword('');
    } catch (err) {
      setChangeError(errorMessage(err));
    } finally {
      setChangeBusy(false);
    }
  }

  async function handleDeleteAccount(e: FormEvent) {
    e.preventDefault();
    if (!token) return;
    setDeleteBusy(true);
    setDeleteError(null);
    try {
      await authApi.deleteAccount(deletePassword, token);
      clearSession();
    } catch (err) {
      setDeleteError(errorMessage(err));
      setDeleteBusy(false);
    }
  }

  return (
    <>
      <Card className="account-card">
        <h2>Signed in</h2>
        <p className="account-body">{email}</p>
        {meQuery.data && (
          <div className="account-me-stats">
            <div>
              <strong>{meQuery.data.quizAttemptCount}</strong> quiz attempts synced
            </div>
            <div>
              <strong>{meQuery.data.lessonCompletionCount}</strong> lessons synced
            </div>
            <div>
              <strong>{meQuery.data.bookmarkCount}</strong> bookmarks synced
            </div>
          </div>
        )}
        <Button variant="outline" size="sm" onClick={clearSession}>
          Log out
        </Button>
      </Card>

      <Card className="account-card">
        <h2>Change password</h2>
        {!changeOpen ? (
          <button className="account-link" onClick={() => setChangeOpen(true)}>
            Change password &rarr;
          </button>
        ) : changeDone ? (
          <p className="account-body">Password changed.</p>
        ) : (
          <form className="account-form" onSubmit={handleChangePassword}>
            <input
              type="password"
              placeholder="Current password"
              required
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="New password (8+ characters)"
              required
              minLength={8}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            {changeError && <Note>{changeError}</Note>}
            <Button size="sm" disabled={changeBusy}>
              {changeBusy ? 'Please wait…' : 'Update password'}
            </Button>
          </form>
        )}
      </Card>

      <Card className="account-card">
        <h2>Delete account</h2>
        {!deleteOpen ? (
          <button className="account-link account-danger-link" onClick={() => setDeleteOpen(true)}>
            Delete my account &rarr;
          </button>
        ) : (
          <form className="account-form" onSubmit={handleDeleteAccount}>
            <p className="account-body">
              This deletes your account and signs you out. Your quiz history, lessons, and
              bookmarks on this device stay as guest data — they aren't deleted, they just revert
              to anonymous.
            </p>
            <input
              type="password"
              placeholder="Current password"
              required
              value={deletePassword}
              onChange={(e) => setDeletePassword(e.target.value)}
            />
            {deleteError && <Note>{deleteError}</Note>}
            <Button variant="danger" size="sm" disabled={deleteBusy}>
              {deleteBusy ? 'Please wait…' : 'Delete my account'}
            </Button>
          </form>
        )}
      </Card>
    </>
  );
}

export function AccountPage() {
  const { language, setLanguage } = useLanguage();
  const { selectedExamIds } = useExamSelection();
  const { token } = useAuth();

  return (
    <div>
      <h1 className="review-title">Account</h1>

      {token ? <SignedInPanel /> : <SignedOutPanel />}

      <Card className="account-card">
        <h2>Language</h2>
        <div className="account-lang-row">
          <button
            className={`account-lang-chip${language === 'en' ? ' selected' : ''}`}
            onClick={() => setLanguage('en')}
          >
            English
          </button>
          <button
            className={`account-lang-chip${language === 'hi' ? ' selected' : ''}`}
            onClick={() => setLanguage('hi')}
          >
            हिन्दी
          </button>
        </div>
      </Card>

      <Card className="account-card">
        <h2>Your exams</h2>
        <p className="account-body">{selectedExamIds.length} exam(s) selected.</p>
        <Link to="/onboarding" className="account-link">
          Change exams &rarr;
        </Link>
      </Card>

      {!token && (
        <Card className="account-card">
          <h2>Guest mode</h2>
          <p className="account-body">
            Your progress is saved on this browser only until you sign in above.
          </p>
        </Card>
      )}
    </div>
  );
}
