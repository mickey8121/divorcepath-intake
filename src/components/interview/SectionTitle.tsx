import { FC } from 'react';

import Image from 'next/image';

interface Props {
  src: string;
  title: string;
  subtitle?: string;
}

const SectionTitle: FC<Props> = ({ src, title, subtitle }) => (
  <div className="section-title-with-avatar">
    <span className="avatar">
      <Image
        src={src}
        layout="fixed"
        width={40}
        height={40}
        className="img-saturate"
        alt="placeholder"
      />
    </span>
    <div className="avatar-content">
      <h5 className="title">{title}</h5>
      <small className="subtitle">{subtitle}</small>
    </div>
  </div>
);

export default SectionTitle;
