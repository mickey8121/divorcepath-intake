/* eslint-disable @typescript-eslint/restrict-plus-operands */
import { FC, useMemo } from 'react';

import dayjs from 'dayjs';

import { Children } from 'generated/graphql';

interface Props {
  child: Children;
  index: number;
}

const ChildInfo: FC<Props> = ({ child: { birthDate, firstName, gender, supportType }, index }) => {
  const childInfo = useMemo(() => {
    const age = dayjs().diff(birthDate as string, 'years') || 0;
    let info = `${firstName || `Child ${index + 1}`} / Age ${age}`;

    if (gender) info = `${info} / ${gender.charAt(0)}`;
    if (supportType) info = `${info} / ${supportType.slice(0, 1).toUpperCase()}`;

    return info;
  }, [firstName, index, birthDate, gender, supportType]);

  return <span className="sidebar-text text-muted">{childInfo}</span>;
};

export default ChildInfo;
