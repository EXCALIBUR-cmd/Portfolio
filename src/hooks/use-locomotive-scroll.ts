import { useEffect } from 'react';

interface UseLocomotiveScrollOptions {
  smooth?: boolean;
  
}

const useLocomotiveScroll = (
  scrollRef: React.RefObject<HTMLElement>,
  options: UseLocomotiveScrollOptions = {}
) => {
  useEffect(() => {
    let locomotiveScroll: any; // Use 'any' for now as we're dynamically importing

    // Dynamically import LocomotiveScroll inside useEffect
    import('locomotive-scroll')
      .then((LocomotiveScroll) => {
        if (scrollRef.current) {
          locomotiveScroll = new LocomotiveScroll.default({ // Access the default export
            el: scrollRef.current,
            smooth: true,
            ...options,
          });

          // Optional: Update scroll on window resize
          const handleResize = () => {
            locomotiveScroll?.update();
          };

          window.addEventListener('resize', handleResize);

          return () => {
            window.removeEventListener('resize', handleResize);
            locomotiveScroll?.destroy();
          };
        }
      })
      .catch((error) => {
        console.error('Error importing Locomotive Scroll:', error);
      });


    return () => {
      locomotiveScroll?.destroy();
    };
  }, [scrollRef, options]);
};

export default useLocomotiveScroll;
