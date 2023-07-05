'use client';
import React, { useState } from "react";
import { JsxElement } from "typescript";
import { useController, Controller, UseFormRegister, FieldValues } from 'react-hook-form';
import { api } from "@/services/api";
import axios from "axios";
import { ArrowDown, Download } from "lucide-react";

interface UploadProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children?: React.ReactNode;
    loading?: boolean;
    Icon?: JsxElement;
    name: string;
    control: any;
}

const ViewFileButton: React.FC<UploadProps> = ({ children, Icon, loading, name, control, ...rest }) => {
    const { field: { value, onChange, onBlur }, fieldState: { error } } = useController({ name, control });

    const [fileName, setFileName] = useState<string>("ANEXAR");
    const [file, setFile] = useState<any>()

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setFile(e.target.files?.item(0));
        

            const data = new FormData()
            data.append('file', e.target.files![0])
            
            await axios.post('http://localhost:5000/file/aws', data, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }).then(response => {
                console.log(response.data)
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
                <div className="flex items-center gap-1 justify-center max-w-[150px] ">
                    <span className="text-xs uppercase truncate max-w-[120px] "><a href={value} target="_blank"  className="text-inherit" >{value ? value?.slice(-15) : "Sem anexo"}</a></span>
                    <Download className={`text-gray-menu-icon ${!value && 'hidden'}`} width={15} height={15}  />
                </div>
            </label>


        </div>

    )
}


export default ViewFileButton;