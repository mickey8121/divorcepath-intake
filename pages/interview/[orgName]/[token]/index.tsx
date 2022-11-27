import { FC, Fragment, useEffect, useState } from 'react';

import { createGlobalStyle } from 'styled-components';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { ToastContainer, Slide } from 'react-toastify';

import IntakeProvider from 'providers/IntakeProvider';

import InterviewLayout from 'layout/InterviewLayout';

import { addApolloState, initializeApollo } from 'startup/apollo/apollo';

import ORGANIZATION_PUBLIC_INFO_INTAKE from 'graphql/queries/intake/organizationPublicInfoIntake';
import { Maybe } from 'generated/graphql';

export interface Issue {
  id?: Maybe<string>;
  name?: Maybe<string>;
  description?: Maybe<string>;
}
export interface OrganizationPublicInfo {
  backgroundColor: Maybe<string>;
  description: Maybe<string>;
  intakeSubmittedMessage?: Maybe<string>;
  intakeSubmittedTitle?: Maybe<string>;
  logo?: Maybe<string>;
  name: Maybe<string>;
  primaryColor: Maybe<string>;
  url?: Maybe<string>;
  email?: Maybe<string>;
  phone?: Maybe<string>;
  issues?: Maybe<Issue>;
}

const GlobalStyle = createGlobalStyle`
body {
  background-color: #EFF2F7;
}
`;

export const getServerSideProps: GetServerSideProps = async context => {
  const apolloClient = initializeApollo();

  const { params } = context;

  if (!params) return;

  const { data } = await apolloClient.query({
    query: ORGANIZATION_PUBLIC_INFO_INTAKE,
    variables: { where: { formUrn: params.orgName } }
  });

  return addApolloState(apolloClient, {
    props: { ...data }
  });
};

const InterviewPage: FC<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
  organizationPublicInfo
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);

  if (!isMounted) return null;

  return (
    <Fragment>
      <IntakeProvider {...organizationPublicInfo}>
        <InterviewLayout />
      </IntakeProvider>
      <ToastContainer
        position="top-right"
        transition={Slide}
        autoClose={10000}
        newestOnTop={false}
        rtl={false}
        limit={1}
        hideProgressBar
        closeOnClick
        draggable
        pauseOnHover
      />
      <GlobalStyle />
    </Fragment>
  );
};

export default InterviewPage;
