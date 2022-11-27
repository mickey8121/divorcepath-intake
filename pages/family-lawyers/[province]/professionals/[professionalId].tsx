import { FC } from 'react';

import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

import PageLayout from 'components/PageLayout';
import Profile from 'components/ProfilePage/Profile';

import { addApolloState, initializeApollo } from 'startup/apollo/apollo';

import PROFESSIONAL_PUBLIC_INFO from 'graphql/queries/professionals/professionalPublicInfo';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const apolloClient = initializeApollo();

  if (!params) return;

  const { data } = await apolloClient.query({
    query: PROFESSIONAL_PUBLIC_INFO,
    variables: { where: { id: params.professionalId } }
  });

  return addApolloState(apolloClient, {
    props: { ...data }
  });
};

const ProfessionalPage: FC<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
  professionalPublicInfo: professional
}) => (
  <PageLayout>
    <Profile professional={professional} />
  </PageLayout>
);

export default ProfessionalPage;
