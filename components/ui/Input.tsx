import { useRef } from "react"

import Button from '@/components/ui/Button';
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
    labelClassName?: string;
    inputClassName?: string;
}

export const Input = ({title, type = "text", name, error, placeholder, value, onChange, onKeyDown, labelClassName, inputClassName, required}: InputProps) => {
    return <label className={`flex flex-col gap-2 ${labelClassName} relative`}>   
                {title && <span className="font-bold">{title}{required && <span className="text-red-500">*</span>}</span>}
                <input type={type} 
                       name={name} 
                       placeholder={placeholder} 
                       value={value} 
                       onKeyDown={onKeyDown} 
                       onChange={onChange} 
                       className={`border border-gray-300 p-2 ${inputClassName}`} />
                {error && <span className="absolute top-[100%] text-red-500 text-sm">{error}</span>}
            </label>
}


export const File = ({title, name, error, labelClassName, required, files, addFile, removeFile}: InputProps & {files : File[], addFile : (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void, removeFile : (file: File) => void}) => {
    const ref = useRef<HTMLInputElement>(null);

    return <div className={`flex flex-col gap-2 ${labelClassName} relative`}>   
                {title && <span className="font-bold">{title}{required && <span className="text-red-500">*</span>}</span>}
                <div className="flex gap-2 items-center">
                   <Button type="button" className="w-fit text-sm" onClick={() => ref.current?.click()}>파일 추가</Button>
                   <div className="flex flex-col">
                        <span className="text-sm text-gray-500">최대 5개의 파일을 첨부할 수 있습니다.</span>
                        <span className="text-sm text-gray-500">첨부된 파일: {files.length}개</span>
                   </div>
                </div>
                <input type="file" multiple className="hidden" name={name} onChange={(e) => {
                    addFile(e)
                }} ref={ref}/>
                {files.map((file : File) => 
                        <div key={file.name} className="flex justify-between">
                            <span>{file.name}</span>
                          <div className="flex gap-2 items-center">
                                <span className="text-sm text-gray-500">{(file.size / 1024 / 1024).toFixed(2)}MB</span>
                                <button type="button" className="rounded-full cursor-pointer px-2 py-1 text-md text-gray-500" onClick={() => removeFile(file)}>삭제</button> 
                          </div>
                        </div>)}
                {error && <span className="absolute top-[100%] text-red-500 text-sm">{error}</span>}
            </div>
}


export const Textarea = ({title, name, error, placeholder, value, onChange, onKeyDown, inputClassName , required}: InputProps) => {

    return <label className={`flex flex-col gap-2 relative`}>   
                {title && <span className="font-bold">{title}{required && <span className="text-red-500">*</span>}</span>}
                <textarea name={name} placeholder={placeholder} value={value} onKeyDown={onKeyDown} onChange={onChange} className={`border border-gray-300 p-2 ${inputClassName}`} />
                {error && <span className="absolute top-[100%] text-red-500 text-sm">{error}</span>}
            </label>
}


export const Checkbox = ({title, name, error, onChange, labelClassName}: InputProps) => {
    return <div>
            <label className={`flex gap-2 items-center ${labelClassName} relative`}>   
                <input type="checkbox" name={name} onChange={onChange} className={`border border-gray-300 p-2 h-5 w-5`} />
                {title && <span className="font-bold">{title}</span>}
                </label>
                {error && <span className="text-red-500 text-sm">{error}</span>}
            </div>
}
