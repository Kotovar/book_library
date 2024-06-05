import { useState, useEffect } from 'react';

import type { Theme, ThemeInstall } from '../types/types';

export const useLocalStorage = (key: string, defaultValue: Theme) => {
  const [value, setValue] = useState(() => {
    let currentValue: Theme;

    try {
      currentValue = JSON.parse(
        localStorage.getItem(key) || String(defaultValue)
      );
    } catch (error) {
      currentValue = defaultValue;
    }

    return currentValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue] as ThemeInstall;
};
