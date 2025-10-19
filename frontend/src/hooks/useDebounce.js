import { useEffect } from 'react';
import { useState } from 'react';

export default function useDebounce(query, delay = 500) {
  const [state, setState] = useState(query);
  useEffect(
    function () {
      const handler = setTimeout(function () {
        setState(query);
      }, delay);

      return function () {
        clearTimeout(handler);
      };
    },
    [query, delay]
  );

  return state;
}
