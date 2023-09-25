'use client';
import React, { useState } from "react";
import { JsxElement } from "typescript";
import { useController, Controller, UseFormRegister, FieldValues } from 'react-hook-form';
import { api } from "@/services/api";
import axios from "axios";

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
    const [file, setFile] = useState<any>();
    const [isLoading, setIsLoading] = useState(false);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setFile(e.target.files?.item(0));


        const data = new FormData()
        data.append('file', e.target.files![0])
        setIsLoading(true);
        await axios.post('https://suprimentos-backend.vercel.app/file/aws', data, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }).then(response => {
            setIsLoading(false)
            setFileName(response.data.originalname);
            onChange(response.data.location)
        }).catch(error => console.log(error));





    };

    //     const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    //         const file = e.target.files?.[0]!
    //         onChange(file)
    //         const filename = encodeURIComponent(file.name)
    //         const fileType = encodeURIComponent(file.type)
    // console.log('foi')
    //         const res = await fetch(`/api/aws/uploadUrl?file=${filename}&fileType=${fileType}`, { method: "POST"});
    //         const { url, fields } = await res.json();

    //         const formData = new FormData()

    //         Object.entries({ ...fields, file }).forEach(([key, value]) => {
    //             formData.append(key, value as string)
    //         });

    //         const upload = await fetch(url, {
    //             method: 'POST',
    //             body: formData,
    //           });
    // console.log(upload)
    //           if (upload.ok) {
    //             console.log('Uploaded successfully!')
    //           } else {
    //             console.error('Upload failed.')
    //           }
    //     }

    return (

        <div className="flex items-center flex-col justify-center w-full relative">
            <label className="flex flex-col items-center justify-center  w-full h-10 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                <div className="flex items-center justify-center max-w-[150px] ">
                    <span className="text-xs uppercase truncate max-w-[120px] ">{!isLoading && fileName}</span>
                </div>
                <Controller
                    name={name}
                    control={control}
                    {...rest}
                    render={({ field: { onChange, value, onBlur } }) =>  isLoading ? (
                        <svg className="animate-spin m-auto h-5 w-5 absolute text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>) :
                       ( <input id="dropzone-file" type="file" onChange={handleFileChange} multiple={false} accept="application/pdf,image/*" className="hidden" />
                    )}
                />

            </label>
            {/* <span className="text-xs pt-2 absolute top-10">{ fileName !== "ANEXAR" && fileName}</span> */}


        </div>

    )
}


export default UploadButton;