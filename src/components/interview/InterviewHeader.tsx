import { FC } from 'react';

import useIntakeFromProvider from 'hooks/intake/useIntakeFromProvider';

const InterviewHeader: FC = () => {
  const { name } = useIntakeFromProvider();

  return (
    <header className="interview-header">
      <h1 className="interview-title">Intake Interview</h1>
      <div className="interview-header-container">
        <p className="interview-header-description">
          <span className="org-name">{name || "lawyer's organization"}</span> has asked you to
          complete this interview. Your answers will be saved automatically. You can leave this page
          and return at any time to complete the interview.
        </p>
        <p className="interview-header-description">
          Your answers will automatically be provided to{' '}
          <span className="org-name">{name || "lawyer's organization"}</span>. By entering your
          information you confirm that you have reviewed and accepted the{' '}
          <a
            className="link"
            href="https://www.divorcepath.com/terms"
            target="_blank"
            rel="noreferrer"
          >
            terms of use
          </a>{' '}
          and{' '}
          <a
            className="link"
            href="https://www.divorcepath.com/privacy"
            target="_blank"
            rel="noreferrer"
          >
            privacy policy
          </a>
          .
        </p>
      </div>
    </header>
  );
};

export default InterviewHeader;
