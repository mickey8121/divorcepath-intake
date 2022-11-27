/* eslint-disable camelcase */
import { FC, Fragment, useEffect, useState } from 'react';

import { createGlobalStyle } from 'styled-components';
import { GetServerSideProps } from 'next';

import AllProvincesProvider from 'providers/AllProvincesProvider';

import DirectoryHeader from 'layout/DirectoryHeader';
import Header from 'layout/Header';
import Footer from 'layout/Footer';

import DirectoryPage from 'components/directory/DirectoryPage';

import { addApolloState, initializeApollo } from 'startup/apollo/apollo';

import ALL_PROVINCE from 'graphql/sanity/allProvince';
import { Sanity_AllProvinceQuery, Maybe, Sanity_Province } from 'generated/sanity_graphql';

const GlobalStyle = createGlobalStyle`
body {
  background-color: #EFF2F7;
}
`;

export const getServerSideProps: GetServerSideProps = async () => {
  const apolloClient = initializeApollo();

  const { data } = await apolloClient.query<Sanity_AllProvinceQuery>({ query: ALL_PROVINCE });

  return addApolloState(apolloClient, {
    props: { ...data }
  });
};

const CityPage: FC<{ allProvince?: Maybe<Sanity_Province[]> }> = ({ allProvince }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);

  if (!isMounted) return null;

  return (
    <Fragment>
      <AllProvincesProvider value={allProvince}>
        <Header>
          <DirectoryHeader />
        </Header>
        <DirectoryPage />
      </AllProvincesProvider>

      <Footer />
      <GlobalStyle />
    </Fragment>
  );
};

export default CityPage;
