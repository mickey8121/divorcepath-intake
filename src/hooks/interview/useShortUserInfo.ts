import { useMemo } from 'react';

import dayjs from 'dayjs';
import { useFormikContext } from 'formik';

import regionNames from 'utils/regionNames';

import { IntakeInterview, UpdateIntakeInterviewProfileInput } from 'generated/graphql';

interface TitleInfoResult {
  avatar: string;
  title: string;
  subtitle: string;
}

const useShortUserInfo = (partyType: 'profile' | 'exProfile'): TitleInfoResult => {
  const { values } = useFormikContext<IntakeInterview>();

  const { gender, birthDate, hasNewPartner, firstName, lastName, residence } = useMemo(
    () => (values?.[partyType] || {}) as UpdateIntakeInterviewProfileInput,
    [partyType, values]
  );

  const personAge = useMemo(
    () => dayjs().diff(birthDate as Date | null, 'years') || 0,
    [birthDate]
  );

  const subtitle = useMemo(() => {
    let info = `Age ${personAge}`;

    if (gender) info = `${info} / ${gender.charAt(0)}`;
    if (residence) info = `${info} / ${regionNames[residence]}`;

    return `${info} / ${hasNewPartner ? 'R' : 'S'}`;
  }, [personAge, gender, hasNewPartner, residence]);

  const name = useMemo(() => {
    if (!firstName && !lastName) return 'Enter name';

    return `${firstName || ''} ${lastName || ''}`;
  }, [firstName, lastName]);

  const avatar = useMemo(
    () =>
      gender === 'FEMALE'
        ? '/intake/images/interview/user-female.png'
        : '/intake/images/interview/account.png',
    [gender]
  );

  return {
    avatar,
    subtitle,
    title: name
  };
};

export default useShortUserInfo;
