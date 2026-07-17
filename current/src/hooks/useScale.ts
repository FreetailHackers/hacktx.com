import { useState, useEffect } from 'react';

export function useScale(baseWidth: number) {
  const [scale, setScale] = useState(() =>
    typeof window !== 'undefined' ? Math.min(1, window.innerWidth / baseWidth) : 1
  );
  useEffect(() => {
    const update = () => setScale(Math.min(1, window.innerWidth / baseWidth));
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [baseWidth]);
  return scale;
}
