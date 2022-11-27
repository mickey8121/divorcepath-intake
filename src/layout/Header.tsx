import { FC } from 'react';

import Image from 'next/image';

import Icon from 'components/common/Icon';

const Header: FC = ({ children }) => (
  <div className="header-container">
    <header className="header-main" id="header-main">
      <nav className="header-navbar">
        <div className="navbar-container">
          <div className="navbar-left-content">
            <div className="navbar-brand-link">
              <a href="https://www.divorcepath.com">Divorcepath.com - online divorce</a>
            </div>
            <div className="locale-selector">
              <Image
                alt="Canadian Flag"
                height={14}
                width={20}
                src="/intake/images/header/ca.svg"
              />
              <span className="d-none d-lg-inline-block">Canada - English</span>
              <span className="d-lg-none">EN</span>
            </div>
          </div>
          <div className="help-centre">
            <a href="https://www.divorcepath.com/help">Help Centre</a>
          </div>
        </div>
      </nav>
      <div className="header-main-content">
        <a href="https://www.divorcepath.com" target="_blank" rel="noreferrer">
          <Image
            alt="Divorcepath.com - online divorce"
            src="/intake/images/header/divorcepath-white.svg"
            width={174}
            height={33}
          />
        </a>
        <div className="login-buttons">
          <a href="https://www.divorcepath.com/app/sign-in" target="_blank" rel="noreferrer">
            Log In
          </a>
          <a href="https://www.divorcepath.com/app/sign-up" target="_blank" rel="noreferrer">
            <Icon name="add-person" />
            <span className="btn-inner--text">Sign Up</span>
          </a>
        </div>
      </div>
    </header>
    {children}
  </div>
);

export default Header;
