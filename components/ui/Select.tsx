import type { ChangeEvent } from "react"



type SelectProps = {
    title?: string
    value? : string
    options: string[],
    name?: string
    onChange?: (e: ChangeEvent<HTMLSelectElement>) => void,
    className?: string
    error? : string 
}


const Select = ({title, options, name, onChange, className, error}: SelectProps) => {
    return <div className={`flex flex-col gap-2 ${className}`}>
        {title && <span className="font-bold">{title}</span>}
        <select onChange={onChange} name={name} className={`border border-gray-300 p-2 ${className}`}>
            {options.map((option) => (
                <option key={option} value={option}>{option}</option>
            ))}
        </select>
        {error && <span className="text-red-500">{error}</span>}
    </div>
}

export default Select