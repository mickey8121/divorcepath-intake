import { useEffect, useState } from 'react';

import throttle from 'lodash/throttle';

interface ExtendedHTMLLinkElement extends HTMLLinkElement {
  name?: string;
}

const useCurrentItemInView = (): string => {
  const [current, setCurrent] = useState<string>('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mainNavLinks: NodeListOf<HTMLLinkElement> =
        document.querySelectorAll('.sidebar-item a');

      const height = document.documentElement.clientHeight;

      const handleScroll = throttle(() => {
        if (window.scrollY === 0) {
          setCurrent('#legalIssues');
        } else {
          const currentLink = [...mainNavLinks].find(link => {
            if ((link as ExtendedHTMLLinkElement).name) {
              const section = document.getElementById((link as ExtendedHTMLLinkElement).name || '');

              if (section) {
                const { top, bottom } = section.getBoundingClientRect();

                return (top >= 0 && top < height / 3) || bottom > height / 2;
              }
            }

            return false;
          });

          if (currentLink) {
            setCurrent((currentLink as ExtendedHTMLLinkElement).name || '');
          }
        }
      }, 100);

      window.addEventListener('scroll', handleScroll);
      handleScroll();

      return () => window.removeEventListener('scroll', handleScroll);
    }

    return () => {};
  }, []);

  return current;
};

export default useCurrentItemInView;
