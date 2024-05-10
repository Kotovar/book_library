import { useEffect, useState } from 'react';

export const useVisibilityTimer = (
  initialVisibility = true,
  timeout = 3000
) => {
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

  return [visible, setVisible] as const;
};
