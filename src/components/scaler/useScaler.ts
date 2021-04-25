import { useEffect, useState } from 'react';

export default function useScaler(initial: number) {
  const [scale, setScale] = useState(initial);

  useEffect(() => {
    window.document.addEventListener(
      'keydown',
      function (event) {
        if (
          (event.ctrlKey === true || event.metaKey === true) &&
          (event.which === 61 ||
            event.which === 107 ||
            event.which === 173 ||
            event.which === 109 ||
            event.which === 187 ||
            event.which === 189)
        ) {
          event.preventDefault();
        }
      },
      false,
    );
    // Chrome IE 360
    window.addEventListener(
      'mousewheel',
      (event: any) => {
        if (event.ctrlKey === true || event.metaKey) {
          event.preventDefault();
        }
      },
      { passive: false },
    );

    //firefox
    window.addEventListener(
      'DOMMouseScroll',
      (event: any) => {
        if (event.ctrlKey === true || event.metaKey) {
          event.preventDefault();
        }
      },
      { passive: false },
    );
  }, []);

  return [
    scale,
    {
      onZoomUp: () => setScale(scale + 10),
      onZoomDown: () => scale > 10 && setScale(scale - 10),
      onReset: () => setScale(initial),
      onWheel: (event: any) => {
        if (!event.ctrlKey) return;
        //event.deltaY > 0 ? onZoomDown() : onZoomUp();
      },
    },
  ];
}
