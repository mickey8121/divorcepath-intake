import { FC } from 'react';

import Header from 'layout/Header';
import Footer from 'layout/Footer';

const PageLayout: FC = ({ children }) => (
  <div className="page">
    <Header />

    <div className="page-content m-a">{children}</div>

    <Footer />
  </div>
);

export default PageLayout;
