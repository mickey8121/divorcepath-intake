import { FC } from 'react';

import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

import PageLayout from 'components/PageLayout';
import Profile from 'components/ProfilePage/Profile';

import { addApolloState, initializeApollo } from 'startup/apollo/apollo';

import ORGANIZATION_PUBLIC_INFO from 'graphql/queries/organizations/organizationPublicInfo';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const apolloClient = initializeApollo();

  if (!params) return;

  const { data } = await apolloClient.query({
    query: ORGANIZATION_PUBLIC_INFO,
    variables: { where: { formUrn: params.formUrn } }
  });

  return addApolloState(apolloClient, {
    props: { ...data, formUrn: params.formUrn }
  });
};

const OrganizationPage: FC<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
  organizationPublicInfo: organization
}: any) => (
  <PageLayout>
    <Profile organization={organization} />
  </PageLayout>
);

export default OrganizationPage;
