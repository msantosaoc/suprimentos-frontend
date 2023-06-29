'use client';
import React, { useState } from "react";
import { JsxElement } from "typescript";
import { useController, Controller, UseFormRegister, FieldValues } from 'react-hook-form';

interface UploadProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children?: React.ReactNode;
    loading?: boolean;
    Icon?: JsxElement;
    name: string;
    control: any;
}

const UploadButton: React.FC<UploadProps> = ({ children, Icon, loading, name, control, ...rest }) => {
    const { field: { value, onChange, onBlur }, fieldState: { error } } = useController({ name, control });

    const [fileName, setFileName] = useState<string>("ANEXAR");

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        onChange(files);

        if (files && files.length > 0) {
            const fileName = files[0].name;
            const extractedFileName = fileName.split("\\").pop() || "";
            // console.log(extractedFileName);
            setFileName(extractedFileName);
          };

    };

    return (

        <div className="flex items-center flex-col justify-center w-full relative">
            <label  className="flex flex-col items-center justify-center  w-full h-10 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                <div className="flex items-center justify-center max-w-[150px] ">
                    <span className="text-xs uppercase truncate max-w-[120px] ">{ fileName }</span>
                </div>
                <Controller
                    name={name}
                    control={control}
                    {...rest}
                    render={({ field: { onChange, value } }) => (
                        <input id="dropzone-file" type="file" onChange={handleFileChange}  multiple={false} accept="application/pdf,image/*" className="hidden" />
                        )}
                />

            </label>
                        {/* <span className="text-xs pt-2 absolute top-10">{ fileName !== "ANEXAR" && fileName}</span> */}


        </div>

    )
}


export default UploadButton;