import { FC, Fragment, useCallback, useMemo } from 'react';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useFormikContext } from 'formik';

import InterviewSidebarItem from 'components/interview/InterviewSidebar/InterviewSidebarItem';
import ChildInfo from 'components/interview/InterviewSidebar/ChildInfo';

import useShortUserInfo from 'hooks/interview/useShortUserInfo';
import useInterviewOptions from 'hooks/interview/useInterviewOptions';

import regionNames from 'utils/regionNames';

import { InputMaybe, UpdateIntakeInterviewAddressInput, IntakeInterview } from 'generated/graphql';

dayjs.extend(relativeTime);

const getAddressInfo = (
  address?: InputMaybe<UpdateIntakeInterviewAddressInput> | undefined
): JSX.Element | null => {
  const { street1, city, country, residence, postal } = address || {};

  const residenceInfo = regionNames[residence as string];

  const addressInfo = [street1, residenceInfo, city, country, postal].filter(Boolean).join(', ');

  if (!addressInfo) return null;

  return <span className="sidebar-text text-muted">{addressInfo}</span>;
};

const InterviewSidebar: FC = () => {
  const { isSaving, updatedAt, askStory } = useInterviewOptions();

  const { values } = useFormikContext<IntakeInterview>();

  const { legalIssues, profile, exProfile, children, address, exAddress, relationship } = values;

  const lastSaved = useMemo(() => {
    const dateFormNow = updatedAt && dayjs(updatedAt).fromNow();

    if (isSaving) return 'Saving...';

    return dateFormNow ? `Last saved ${dateFormNow}` : 'Not saved';
  }, [updatedAt, isSaving]);

  const issues = useMemo(() => {
    if (!legalIssues?.length) return null;

    return (
      <span className="sidebar-text text-muted">{legalIssues.map(l => l.name).join(', ')}</span>
    );
  }, [legalIssues]);

  const backgroundTitle = useMemo(
    () => (
      <span className="sidebar-text text-muted">
        {profile?.firstName || 'Client'} & {exProfile?.firstName || 'Ex'}
      </span>
    ),
    [profile, exProfile]
  );

  const { subtitle: clientShortInfo } = useShortUserInfo('profile');
  const { subtitle: exShortInfo } = useShortUserInfo('exProfile');

  const clientAddressInfo = useMemo(() => getAddressInfo(address), [address]);
  const exAddressInfo = useMemo(() => getAddressInfo(exAddress), [exAddress]);

  const clientContacts = useMemo(() => {
    if (!profile?.email && !profile?.phone) return null;

    return `${profile.email || ''}
    ${profile.phone || ''}`;
  }, [profile?.email, profile?.phone]);

  const exContacts = useMemo(() => {
    if (!exProfile?.email && !exProfile?.phone) return null;

    return `${exProfile.email || ''}
    ${exProfile.phone || ''}`;
  }, [exProfile?.email, exProfile?.phone]);

  const subtitle = useMemo(() => {
    const cohabitationDateString = dayjs(relationship?.cohabitationDate as string).format(
      'YYYY-MM-DD'
    );
    const separationDateString = dayjs(relationship?.separationDate as string).format('YYYY-MM-DD');

    return `${cohabitationDateString.includes('Invalid Date') ? '-' : cohabitationDateString} to ${
      separationDateString === 'Invalid Date' ? '-' : separationDateString
    }`;
  }, [relationship]);

  const getSectionNumber = useCallback(
    (number: number) => {
      if (askStory) return number;

      return number - 1;
    },
    [askStory]
  );

  return (
    <aside className="interview-sidebar">
      <p className="sidebar-hint">{lastSaved}</p>
      {askStory && (
        <InterviewSidebarItem title="Your Legal Problem" step={1}>
          {issues}
        </InterviewSidebarItem>
      )}
      <InterviewSidebarItem title="Background" step={getSectionNumber(2)}>
        <Fragment>
          {backgroundTitle}
          <span className="sidebar-text text-muted">{clientShortInfo}</span>
          <span className="sidebar-text text-muted">{exShortInfo}</span>
        </Fragment>
      </InterviewSidebarItem>

      <InterviewSidebarItem title="Relationship" step={getSectionNumber(3)}>
        <span className="sidebar-text text-muted">{subtitle}</span>
      </InterviewSidebarItem>

      <InterviewSidebarItem title="Children" step={getSectionNumber(4)}>
        {!!children?.length &&
          children.map((child, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <ChildInfo child={child} index={index} key={`${child.firstName}${index}`} />
          ))}
      </InterviewSidebarItem>

      <InterviewSidebarItem title="Address" step={getSectionNumber(5)}>
        {exAddressInfo || clientAddressInfo ? (
          <Fragment>
            {clientAddressInfo}
            {exAddressInfo}
          </Fragment>
        ) : null}
      </InterviewSidebarItem>

      <InterviewSidebarItem title="Contact" step={getSectionNumber(6)}>
        {clientContacts || exContacts ? (
          <Fragment>
            {clientContacts && <span className="sidebar-text text-muted">{clientContacts}</span>}
            {exContacts && <span className="sidebar-text text-muted">{exContacts}</span>}
          </Fragment>
        ) : null}
      </InterviewSidebarItem>

      <InterviewSidebarItem title="Submit Interview" step={getSectionNumber(7)}>
        <span className="sidebar-text text-muted">
          Complete the required fields and click 'Save and Submit'.
        </span>
      </InterviewSidebarItem>
    </aside>
  );
};

export default InterviewSidebar;
