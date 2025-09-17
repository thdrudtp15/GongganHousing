'use client';

import {
  Children,
  Dispatch,
  MouseEventHandler,
  ReactNode,
  SetStateAction,
  useRef,
  useState,
} from 'react';
import Button from './Button';

import useOnClickOutside from '@/hooks/useOutsideClick';

import styles from './Dropdown.module.css';

type HandleClick = { handleClick?: MouseEventHandler<HTMLButtonElement> };
type Children = { children: ReactNode };
type Title = { title: string | ReactNode };
type Selected = { selected: boolean };

type DropdownProps = Children & Title & Selected;

const Dropdown = ({ children, title, selected }: DropdownProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const ref = useRef(null);
  useOnClickOutside({ ref, onClickOutside: () => setOpen(false) });
  return (
    <div ref={ref} className={styles.dropdown}>
      <Button
        selected={selected}
        handleClick={() => {
          setOpen((prev: boolean) => !prev);
        }}
      >
        {title}
      </Button>
      {open && <div className={styles.dropdownItems}>{children}</div>}
    </div>
  );
};

export default Dropdown;

type DropdownItemProps = HandleClick & Children;
const DropdownItem = ({ children, handleClick }: DropdownItemProps) => {
  return <Button handleClick={handleClick}>{children}</Button>;
};
Dropdown.DropdownItem = DropdownItem;
