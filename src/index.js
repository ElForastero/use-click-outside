import React from 'react';

const useClickOutside = (ref, callback, { eventType = 'click' }) => {
  const handlerRef = React.useRef(callback);

  /**
   * Update callback if it changes
   */
  React.useEffect(() => {
    handlerRef.current = callback;
  });

  /**
   * Add and remove event listeners
   */
  React.useEffect(() => {
    const listener = event => {
      if (ref && ref.current) {
        if (event.target.shadowRoot) {
          if (!event.target.shadowRoot.contains(ref.current)) {
            handlerRef.current(event);
          }
        } else {
          if (!event.target.contains(ref.current)) {
            handlerRef.current(event);
          }
        }
      }
    };

    document.addEventListener(eventType, listener);
    document.addEventListener('touch', listener);

    return () => {
      document.removeEventListener(eventType, listener);
      document.removeEventListener('touch', listener);
    };
  });
};

export default useClickOutside;
