import { useEffect, useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';

export const useVisibilityTimer = (
  initialVisibility = true,
  timeout = 3000
): [boolean, Dispatch<SetStateAction<boolean>>] => {
  const [visible, setVisible] = useState<boolean>(initialVisibility);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (!visible) {
      timer = setTimeout(() => {
        setVisible(true);
      }, timeout);
    }
    return () => clearTimeout(timer);
  }, [visible, timeout]);

  return [visible, setVisible];
};
