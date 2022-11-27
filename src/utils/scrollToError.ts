import isNull from 'lodash/isNull';

const scrollToError = (): void | null => {
  if (typeof window !== 'object') return null;

  setTimeout(() => {
    const elements = document.querySelectorAll('.invalid-feedback');

    let currentElement: Element | null = null;

    elements.forEach(element => {
      if (!currentElement && element.innerHTML) currentElement = element;
    });

    if (!currentElement) return null;

    if (!isNull(currentElement)) {
      const elem = (currentElement as HTMLDivElement)!.previousSibling;

      (elem as HTMLDivElement).scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }, 10);
};

export default scrollToError;
