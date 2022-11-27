import { FC } from 'react';

import { ApolloProvider } from '@apollo/client';
import { AppProps } from 'next/app';

import ToasterNotifications from 'components/common/ToasterNotifications';

import { useApollo } from 'startup/apollo/apollo';

import { config, library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-svg-core/styles.css';

import 'styles/index.scss';

config.autoAddCss = false;

library.add(fas);

const App: FC<AppProps> = ({ Component, pageProps }) => {
  const apolloClient = useApollo(pageProps);

  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
      <ToasterNotifications />
    </ApolloProvider>
  );
};

export default App;
