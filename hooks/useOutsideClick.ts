import { useEffect } from 'react';

type Props = {
  ref: React.RefObject<HTMLElement | null>;
  onClickOutside: () => void;
};

const useOnClickOutside = ({ ref, onClickOutside }: Props) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      console.log(ref.current);
      console.log(event.target);
      console.log(ref.current?.contains(event.target as Node));
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClickOutside();
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);
};

export default useOnClickOutside;
