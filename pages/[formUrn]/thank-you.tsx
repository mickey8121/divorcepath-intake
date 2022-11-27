import { FC, Fragment } from 'react';

import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { createGlobalStyle } from 'styled-components';

import IntakeProvider, { OrganizationPublicInfo } from 'providers/IntakeProvider';

import IntakeLayoutThankYou from 'layout/IntakeLayout/IntakeLayoutThankYou';

import useGlobalStyles from 'hooks/intake/useGlobalStyles';

import { addApolloState, initializeApollo } from 'startup/apollo/apollo';

import ORGANIZATION_PUBLIC_INFO_INTAKE from 'graphql/queries/intake/organizationPublicInfoIntake';

export const getServerSideProps: GetServerSideProps = async context => {
  const apolloClient = initializeApollo();

  const { params } = context;

  if (!params) return;

  const { data } = await apolloClient.query({
    query: ORGANIZATION_PUBLIC_INFO_INTAKE,
    variables: { where: { formUrn: params.formUrn } }
  });

  return addApolloState(apolloClient, {
    props: { ...data }
  });
};

const ThankYouPage: FC<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
  organizationPublicInfo
}) => {
  const { primaryColor, backgroundColor } = organizationPublicInfo as OrganizationPublicInfo;

  const globalStyles = useGlobalStyles(primaryColor, backgroundColor);

  const GlobalStyle = createGlobalStyle`${globalStyles}`;

  return (
    <Fragment>
      <IntakeProvider {...(organizationPublicInfo as OrganizationPublicInfo)}>
        <IntakeLayoutThankYou />
      </IntakeProvider>
      <GlobalStyle />
    </Fragment>
  );
};

export default ThankYouPage;
