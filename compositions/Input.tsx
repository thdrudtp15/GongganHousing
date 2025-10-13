import type { ChangeEvent } from "react"
import { KeyboardEvent } from "react"

type InputProps = {
    title? : string
    type?: string;
    name?: string;
    error?: string;
    placeholder?: string;
    value?: string;
    defaultValue?: string;
    onChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    onKeyDown?: (e: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    className?: string;
}

export const Input = ({title, type = "text", name, error, placeholder, value, onChange, onKeyDown, className}: InputProps) => {
    return <div className={`flex flex-col gap-2 ${className} relative`}>   
                {title && <span className="font-bold">{title}</span>}
                <input type={type} 
                       name={name} 
                       placeholder={placeholder} 
                       value={value} 
                       onKeyDown={onKeyDown} 
                       onChange={onChange} 
                       className={`border border-gray-300 p-2`} />
                {error && <span className="absolute top-[100%] text-red-500 text-sm">{error}</span>}
            </div>
    
    
 
}

export const Textarea = ({title, name, error, placeholder, value, onChange, onKeyDown, className}: InputProps) => {
    return <div className={`flex flex-col gap-2 ${className} relative`}>   
                {title && <span className="font-bold">{title}</span>}
                <textarea name={name} placeholder={placeholder} value={value} onKeyDown={onKeyDown} onChange={onChange} className={`border border-gray-300 p-2`} />
                {error && <span className="absolute top-[100%] text-red-500 text-sm">{error}</span>}
            </div>
}


