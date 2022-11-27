/* eslint-disable jsx-a11y/alt-text */
import { useState, useCallback, useEffect, useMemo } from 'react';

import classnames from 'classnames';
import Image from 'next/image';

import usePrevValue from 'hooks/interview/usePrevValue';

interface Props {
  active?: boolean;
  scrollIntoViewOnActive?: boolean;
  src?: string;
  width?: number;
  height?: number;
  className?: string;
  placeholder?: JSX.Element;
  handleClick?: () => void;
  onError?: (event: React.SyntheticEvent<HTMLImageElement, Event>) => void;
}

const ImageWithErrorHandler: React.FC<Props> = ({
  src,
  width,
  height,
  onError,
  className,
  placeholder,
  handleClick
}) => {
  const [isError, setError] = useState(false);
  const [ratio, setRatio] = useState(16 / 9);

  const handleError = useCallback(
    (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
      if (onError) onError(e);
      setError(true);
    },
    [onError]
  );

  const handleLoadingComplete = useCallback(({ naturalHeight, naturalWidth }) => {
    setRatio(naturalWidth / naturalHeight);
  }, []);

  const prevSrc = usePrevValue(src);

  useEffect(() => {
    if (prevSrc !== src) setError(false);
  }, [prevSrc, src]);

  const props = useMemo(
    () => ({
      src,
      width,
      height,
      className: classnames(className),
      onClick: handleClick,
      alt: ''
    }),
    [handleClick, height, src, width, className]
  );

  if ((isError || !src) && placeholder) return placeholder;
  if (isError || !src)
    return (
      <Image
        src="/intake/images/header/divorcepath-white.svg"
        width={129}
        height={29}
        alt="prof-url"
      />
    );

  return (
    <Image
      {...props}
      onLoadingComplete={handleLoadingComplete}
      layout="fill"
      objectFit={ratio > 3 ? 'contain' : 'cover'}
      src={src}
      onError={handleError}
    />
  );
};

export default ImageWithErrorHandler;
