'use client';
import { ReactNode } from 'react';
import { MouseEventHandler } from 'react';

import styles from './Button.module.css';

type Props = {
  handleClick?: MouseEventHandler<HTMLButtonElement>;
  children?: ReactNode;
  selected?: boolean;
};

const Button = ({ handleClick, children, selected }: Props) => {
  return (
    <button
      className={`${styles.button} ${selected ? styles.selected : null}`}
      type="button"
      onClick={handleClick}
    >
      {children}
    </button>
  );
};

export default Button;
