import { FC, memo } from 'react';

import formatPhone from 'utils/formatPhone';

interface Contact {
  id?: string;
  type: string;
  name: string;
  url: string;
}

const ContactsList: FC<{ contacts: Contact[] }> = ({ contacts }) => (
  <div className="contacts-list">
    {contacts.map(({ id, type, name, url }) => (
      <a
        key={id || url}
        href={url}
        target={type === 'phone' || type === 'email' ? undefined : '_blank'}
        rel="noopener noreferrer"
        className={type.toLowerCase()}
      >
        {type === 'phone' ? formatPhone(name, true) : name}
      </a>
    ))}
  </div>
);

export default memo(ContactsList);
