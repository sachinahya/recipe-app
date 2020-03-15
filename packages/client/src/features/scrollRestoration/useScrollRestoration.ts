import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useScrollRestorationContext } from './ScrollRestorationProvider';

const useScrollRestoration = <T extends Element = Element>() => {
  const { scrollHistory, addScrollHistory } = useScrollRestorationContext();
  const location = useLocation();
  const history = useHistory();

  const ref = React.useRef<T | null>(null);

  React.useEffect(() => {
    const { current: element } = ref;
    const { action } = history;
    const key = location.key || '';

    // Restore scrolling position if we arrived via back/forward
    if (action === 'POP' && element) {
      const coords = scrollHistory?.[key];
      // Ensure the scroll is adjusted once rendering is finished
      coords && window.setTimeout(() => element.scrollTo(...coords), 0);
    }

    return () => {
      if (/* action === 'PUSH' && */ element) {
        // Save the last scroll position
        addScrollHistory(key, element.scrollLeft, element.scrollTop);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history.action, location.key /* , scrollHistory, addScrollHistory */]);

  return ref;
};

export default useScrollRestoration;
