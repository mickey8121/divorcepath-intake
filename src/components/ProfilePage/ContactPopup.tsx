import { FC, memo } from 'react';

import Image from 'next/image';

import Button from 'components/common/Button';

const ContactPopup: FC<{ name: string; email: string }> = ({ name, email }) => (
  <div className="contact-popup">
    <div className="contact-popup-content">
      <span className="contact-popup-title">Get legal help now</span>

      <div className="contact-popup-description">
        <span>
          If <b>{name.split(' ')[0]}</b> accepts your inquiry, you can share your Divorcepath
          profile in just one click.
        </span>

        <span>Click “Contact” to seek professional legal advice now.</span>
      </div>

      <Button onClick={() => (window.location.href = `mailto:${email}`)}>Contact {name}</Button>
    </div>

    <div className="contact-popup-image-wrapper">
      <Image
        width={239}
        height={185}
        layout="responsive"
        src="/intake/images/contact-popup-illustration.svg"
        className="contact-popup-image"
      />
    </div>
  </div>
);

export default memo(ContactPopup);
