import { useEffect, useRef } from 'react';

const usePrevValue = <T>(value: T): T | undefined => {
  const ref = useRef<T>(value);

  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
};

export default usePrevValue;
