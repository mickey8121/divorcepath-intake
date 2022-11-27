import { FC, Fragment } from 'react';

import Head from 'next/head';

interface Props {
  title: string;
}

const Layout: FC<Props> = ({ children, title }) => (
  <Fragment>
    <Head>
      <title>{title}</title>
      <link rel="shortcut icon" href="/intake/images/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/intake/images/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/intake/images/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/intake/images/favicon-16x16.png" />
      <link
        rel="preload"
        href="/intake/fonts/Roboto/Roboto-Bold.ttf"
        as="font"
        crossOrigin="anonymous"
        type="font/ttf"
      />
      <link
        rel="preload"
        href="/intake/fonts/Roboto/Roboto-Medium.ttf"
        as="font"
        crossOrigin="anonymous"
        type="font/ttf"
      />
      <link
        rel="preload"
        href="/intake/fonts/Roboto/Roboto-Regular.ttf"
        as="font"
        crossOrigin="anonymous"
        type="font/ttf"
      />

      <link
        rel="preload"
        href="/intake/fonts/DMSans/DMSans-Regular.ttf"
        as="font"
        crossOrigin="anonymous"
        type="font/ttf"
      />
      <link
        rel="preload"
        href="/intake/fonts/DMSans/DMSans-Medium.ttf"
        as="font"
        crossOrigin="anonymous"
        type="font/ttf"
      />
      <link
        rel="preload"
        href="/intake/fonts/DMSans/DMSans-Bold.ttf"
        as="font"
        crossOrigin="anonymous"
        type="font/ttf"
      />
    </Head>
    <main>{children}</main>
  </Fragment>
);

export default Layout;
