import { useRef } from "react"

import type { ChangeEvent, KeyboardEvent } from "react"



type InputProps = {
    title? : string
    type?: string;
    name?: string;
    error?: string;
    placeholder?: string;
    value?: string;
    defaultValue?: string;
    required? : boolean;
    onChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    onKeyDown?: (e: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    className?: string;
}

export const Input = ({title, type = "text", name, error, placeholder, value, onChange, onKeyDown, className, required}: InputProps) => {
    return <label className={`flex flex-col gap-2 ${className} relative`}>   
                {title && <span className="font-bold">{title}{required && <span className="text-red-500">*</span>}</span>}
                <input type={type} 
                       name={name} 
                       placeholder={placeholder} 
                       value={value} 
                       onKeyDown={onKeyDown} 
                       onChange={onChange} 
                       className={`border border-gray-300 p-2`} />
                {error && <span className="absolute top-[100%] text-red-500 text-sm">{error}</span>}
            </label>
}


export const File = ({title, name, error, onChange, className, required}: InputProps) => {
    const ref = useRef<HTMLInputElement>(null);

    return <label className={`flex flex-col gap-2 ${className} relative`}>   
                {title && <span className="font-bold">{title}{required && <span className="text-red-500">*</span>}</span>}
                <input type="file" multiple name={name} onChange={onChange} ref={ref}/>
                {error && <span className="absolute top-[100%] text-red-500 text-sm">{error}</span>}
            </label>
}


export const Textarea = ({title, name, error, placeholder, value, onChange, onKeyDown, className , required}: InputProps) => {

    return <label className={`flex flex-col gap-2 ${className} relative`}>   
                {title && <span className="font-bold">{title}{required && <span className="text-red-500">*</span>}</span>}
                <textarea name={name} placeholder={placeholder} value={value} onKeyDown={onKeyDown} onChange={onChange} className={`border border-gray-300 p-2`} />
                {error && <span className="absolute top-[100%] text-red-500 text-sm">{error}</span>}
            </label>
}


export const Checkbox = ({title, name, error, onChange, className}: InputProps) => {
    return <div>
            <label className={`flex gap-2 items-center ${className} relative`}>   
                <input type="checkbox" name={name} onChange={onChange} className={`border border-gray-300 p-2 h-5 w-5`} />
                {title && <span className="font-bold">{title}</span>}
                </label>
                {error && <span className="text-red-500 text-sm">{error}</span>}
            </div>
}
