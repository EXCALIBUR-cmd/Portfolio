import { useEffect } from 'react';

const useCustomCursor = () => {
  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    document.body.style.cursor = 'none';

    let customCursor = document.querySelector('.custom-cursor') as HTMLElement;

    if (!customCursor) {
      customCursor = document.createElement('div');
      customCursor.classList.add('custom-cursor');
      document.body.appendChild(customCursor);
    }

    const moveCursor = (e: MouseEvent) => {
      customCursor.style.left = `${e.clientX}px`;
      customCursor.style.top = `${e.clientY}px`;
    };

    window.addEventListener('mousemove', moveCursor);

    return () => {
      document.body.style.cursor = 'auto';
      window.removeEventListener('mousemove', moveCursor);
      if (customCursor && customCursor.parentNode) {
        customCursor.parentNode.removeChild(customCursor);
      }
    };
  }, []);
};

export default useCustomCursor;