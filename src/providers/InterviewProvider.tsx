import { FC, memo, useMemo, useState } from 'react';

import dayjs from 'dayjs';

import { InterviewOptionsContext } from 'hooks/interview/useInterviewOptions';
import useIntakeFromProvider from 'hooks/intake/useIntakeFromProvider';

import { Interview } from 'generated/graphql';

interface Props {
  interview?: Interview;
}

const InterviewProvider: FC<Props> = ({ children, interview }) => {
  const [isSaving, setIsSaving] = useState(false);

  const { askStory, shortInterview } = interview?.intakeInterview || {};

  const isTokenExpired = useMemo(
    () => dayjs().diff(dayjs(interview?.tokenExpiresAt as string)) >= 0,
    [interview?.tokenExpiresAt]
  );

  const { name } = useIntakeFromProvider();

  return (
    <InterviewOptionsContext.Provider
      value={{
        askStory,
        shortInterview,
        orgName: name || "lawyer's organization",
        isSaving,
        setIsSaving,
        isCompleted: interview?.status === 'COMPLETE' || isTokenExpired,
        updatedAt: interview?.updatedAt
      }}
    >
      {children}
    </InterviewOptionsContext.Provider>
  );
};

export default memo<FC<Props>>(InterviewProvider);
