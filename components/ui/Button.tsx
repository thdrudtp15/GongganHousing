'use client'

type ButtonProps = {
    type?: 'button' | 'submit' | 'reset';
    children: React.ReactNode;
    disabled?: boolean;
    className?: string;
    onClick?: () => void;
}

const Button = ({children, disabled, className, onClick, type}: ButtonProps) => {
    return (
        <button type={type} disabled={disabled} onClick={() => onClick?.()} 
                className={`bg-(--identity) text-white  py-2 px-4 rounded text-lg disabled:opacity-70 transition-colors font-medium cursor-pointer ${className}`}>
            {children}          
        </button>
    )
}

export default Button;