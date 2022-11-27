import { omit } from 'lodash';

import { IntakeInterview, UpdateIntakeInterviewInput } from 'generated/graphql';

const prepareValuesForUpdate = (
  values: IntakeInterview,
  oldValues = {} as IntakeInterview
): UpdateIntakeInterviewInput => {
  const { legalIssues, profile, exProfile, address, exAddress, children, relationship } = values;

  const childrenForCreate = children
    .filter(child => !child.id)
    .map(child => ({
      ...omit(child, 'id', '__typename')
    }));

  const childrenForUpdate = children
    .filter(child => child.id)
    .map(child => ({
      where: { id: child.id },
      data: {
        ...omit(child, 'id', '__typename')
      }
    }));

  const legalIssuesForDisconnect =
    legalIssues.length < oldValues?.legalIssues?.length &&
    oldValues.legalIssues.find(l => !legalIssues.map(li => li.id).includes(l.id))?.id;

  const variables: UpdateIntakeInterviewInput = {
    legalIssues: {
      connect: legalIssues.map(issue => ({ id: issue.id })),
      disconnect: legalIssuesForDisconnect ? [{ id: legalIssuesForDisconnect }] : undefined
    },
    profile: omit(profile, 'id', '__typename'),
    exProfile: omit(exProfile, 'id', '__typename'),
    relationship: omit(relationship, '__typename'),
    address: omit(address, '__typename'),
    exAddress: omit(exAddress, '__typename'),
    children: {
      create: childrenForCreate.length ? childrenForCreate : undefined,
      update: childrenForUpdate.length ? childrenForUpdate : undefined
    },
    exLawyer: values.exLawyer,
    exLawyerCompanyName: values.exLawyerCompanyName,
    exLawyerName: values.exLawyerName,
    story: values.story
  };

  return variables;
};

export default prepareValuesForUpdate;
