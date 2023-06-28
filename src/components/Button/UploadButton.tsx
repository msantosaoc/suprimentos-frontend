'use client';
import React from "react";
import { JsxElement } from "typescript";

interface UploadProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
    children: React.ReactNode;
    loading?: boolean;
    Icon?: JsxElement   
}

export default function UploadButton({children, Icon, loading, ...rest}: UploadProps) {
    return (

        <div className="flex items-center justify-center w-full">
            <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-10 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                <div className="flex flex-col items-center justify-center ">
                    {/* <svg aria-hidden="true" className="w-8 h-8 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg> */}
                    <span className="text-sm uppercase">{children}</span>
                </div>
                <input id="dropzone-file" type="file" className="hidden" />
            </label>


        </div>

    )
}