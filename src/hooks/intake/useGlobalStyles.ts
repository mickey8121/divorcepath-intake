import { useMemo } from 'react';

import getCorrectTextColor from 'utils/getCorrectTextColor';

import { Maybe } from 'generated/graphql';

type UseGlobalStyles = (primaryColor: Maybe<string>, backgroundColor: Maybe<string>) => string;

const useGlobalStyles: UseGlobalStyles = (primaryColor, backgroundColor) => {
  const primary = useMemo(() => primaryColor || '#6E00FF', [primaryColor]);
  const background = useMemo(() => backgroundColor || '#21282F', [backgroundColor]);

  const invertedPrimaryColor = useMemo(() => getCorrectTextColor(primary), [primary]);
  const invertedTextColor = useMemo(() => getCorrectTextColor(background), [background]);

  const primaryShadowColorXs = useMemo(() => `${primary}50`, [primary]);
  const primaryShadowColorS = useMemo(() => `${primary}70`, [primary]);

  return `
    :root {
      --primary: ${primary};
      --primary-shadow-color-xs: ${primaryShadowColorXs};
      --primary-shadow-color-s: ${primaryShadowColorS};
      --background-color: ${background};
      --inverted-btn-color: ${invertedPrimaryColor};
      --inverted-text-color: ${invertedTextColor};
    }
  `;
};

export default useGlobalStyles;
