import { FC, useEffect, useMemo } from 'react';

import { useRouter } from 'next/router';
import dayjs from 'dayjs';

import InterviewProvider from 'providers/InterviewProvider';

import Layout from 'layout/Layout';

import InterviewHeader from 'components/interview/InterviewHeader';
import InterviewForm from 'components/interview/InterviewForm';

import {
  IntakeInterview,
  Interview,
  useInterviewQuery,
  useMarkInterviewAsOpenedMutation
} from 'generated/graphql';

const InterviewLayout: FC = () => {
  const { query } = useRouter();

  const { data } = useInterviewQuery({
    variables: { where: { token: query.token as string } },
    skip: !query.token
  });

  const [markInterviewAsOpened] = useMarkInterviewAsOpenedMutation({
    variables: { where: { token: query.token as string } }
  });

  useEffect(() => {
    if (data?.interview && data?.interview?.status === 'SENT') {
      void markInterviewAsOpened();
    }
  }, [data, markInterviewAsOpened]);

  const isTokenExpired = useMemo(
    () => dayjs().diff(dayjs(data?.interview?.tokenExpiresAt as string)) >= 0,
    [data?.interview?.tokenExpiresAt]
  );

  const showAlert = useMemo(
    () => !data?.interview || data?.interview?.status === 'COMPLETE' || isTokenExpired,
    [data?.interview, isTokenExpired]
  );

  const message = useMemo(() => {
    if (!data?.interview) return 'The interview was not found. It may have been deleted. ';

    if (data?.interview?.status === 'COMPLETE') {
      return 'The interview has already been sent and saved. You will no longer be able to update it. ';
    }

    if (isTokenExpired) {
      return 'The interview has been expired. You will no longer be able to update it. ';
    }
  }, [data?.interview, isTokenExpired]);

  return (
    <div className="interview-page">
      <InterviewHeader />
      {showAlert && (
        <div className="complete-warning">
          <p className="title">Intake interview</p>
          <p className="description">
            {message}
            Please contact your lawyer if you have any questions.
          </p>
        </div>
      )}
      <Layout title="Intake interview">
        <section className="interview-main-section">
          <InterviewProvider interview={data?.interview as Interview}>
            <InterviewForm interview={data?.interview?.intakeInterview as IntakeInterview} />
          </InterviewProvider>
        </section>
      </Layout>
    </div>
  );
};

export default InterviewLayout;
