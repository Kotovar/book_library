import { useState, useEffect } from 'react';

import type { Theme, ThemeInstall } from '../types/types';

export const useLocalStorage = (key: string, defaultValue: Theme) => {
  const readValue = () => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : defaultValue;
  };

  const [value, setValue] = useState(readValue);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue] as ThemeInstall;
};
