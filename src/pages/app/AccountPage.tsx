import { Link } from 'react-router-dom';
import { useLanguage } from '../../state/LanguageContext';
import { useExamSelection } from '../../state/ExamSelectionContext';
import { Card } from '../../components/ui/Primitives';
import './AccountPage.css';

export function AccountPage() {
  const { language, setLanguage } = useLanguage();
  const { selectedExamIds } = useExamSelection();

  return (
    <div>
      <h1 className="review-title">Account</h1>

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

      <Card className="account-card">
        <h2>Guest mode</h2>
        <p className="account-body">
          Your progress is saved on this browser only. Sign-in and cross-device account sync are
          coming soon — nothing you've done will be lost when that ships.
        </p>
      </Card>
    </div>
  );
}
