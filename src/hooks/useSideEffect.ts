import { useEffect, useRef } from 'react';

const useSideEffect = (callback: () => void, deps: React.DependencyList) => {
  const hasMounted = useRef(false);

  useEffect(() => {
    if (hasMounted.current) {
      callback();
    } else {
      hasMounted.current = true;
    }
  }, deps)
}

export default useSideEffect