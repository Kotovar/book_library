import type { ReactElement } from 'react';

import style from './ToolTip.module.css';

type Props = {
  children: ReactElement;
  visible: boolean;
};

const ToolTip = ({ children, visible = false }: Props) => {
  return (
    <div className={style['tooltip-container']}>
      {children}

      <div hidden={visible} className={style.tooltip}>
        You need to sign in!
      </div>
    </div>
  );
};

export default ToolTip;
