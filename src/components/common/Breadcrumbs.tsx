import { FC, useMemo } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';
import startCase from 'lodash/startCase';

import useProfileFromProvider from 'hooks/useProfileFromProvider';

import { decodeValueFromLink } from 'utils/prepareLinkValue';

interface BreadcrumbNode {
  name: string;
  isHidden: boolean;
  link: string;
}

const hiddenPaths = ['family-lawyers', 'professionals', 'organizations'];
const profilePaths = ['[formUrn]', '[professionalId]'];

const Breadcrumbs: FC = () => {
  const { pathname, asPath } = useRouter();
  const { profile } = useProfileFromProvider();

  const [, ...pathNames] = pathname.split('/');
  const [, ...pathValues] = asPath.split('/');

  const nodes = useMemo(
    () =>
      pathNames.reduce((acc, path, index) => {
        const pathValue = decodeValueFromLink(pathValues[index]);

        const node: BreadcrumbNode = {
          name: startCase(pathValue),
          isHidden: hiddenPaths.includes(path),
          link: `${acc[acc.length - 1]?.link || ''}/${pathValues[index]}`
        };

        if (profilePaths.includes(path) && profile?.name) node.name = profile.name;

        acc.push(node);

        return acc;
      }, [] as BreadcrumbNode[]),
    [pathNames, pathValues, profile]
  );

  if (!nodes.length) return null;

  return (
    <div className="breadcrumb">
      {nodes.map(
        ({ name, link, isHidden }) =>
          !isHidden && (
            <div key={link} className="breadcrumb-item">
              <Link href={link}>
                <a>{name}</a>
              </Link>
            </div>
          )
      )}
    </div>
  );
};

export default Breadcrumbs;
