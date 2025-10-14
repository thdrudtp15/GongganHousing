'use client';

import { useEffect } from "react";
import type { MouseEvent } from "react";

import { MdClear } from "react-icons/md";

type ModalProps =  {
    handleClose: () => void;
    children: React.ReactNode;
}


const Modal = ({ handleClose, children }: ModalProps) => {


    const handleOverlayClick = (e: MouseEvent) => {
        const { id } = e.target as HTMLElement;
        if (id === 'overlay') handleClose();
      };

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        
        return () => {
            document.body.style.overflow = 'auto';
        }
    },[])

    return (
        <div
            className="fixed left-0 top-0 w-screen h-screen bg-[rgba(0,0,0,0.9)] z-[10] flex flex-col justify-center items-center p-10"
            id="overlay"
            onClick={(e : MouseEvent) => handleOverlayClick(e)}
        >
            <MdClear fontSize={36} color='white' className='absolute top-5 cursor-pointer right-15' onClick={() => handleClose()} />
            {children}
        </div>
    )
}

export default Modal;