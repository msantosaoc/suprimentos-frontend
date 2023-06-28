'use client';
import React, { InputHTMLAttributes, useEffect, useRef, useState } from "react";
import { FieldValues, UseFormRegister, FormProvider, FormProviderProps } from "react-hook-form";

interface Props extends React.InputHTMLAttributes<HTMLButtonElement> {
    values: valuesProps[] | undefined;
    placeholder: string;
    name: string;
    register: any;
    errors: any;
    onInputChange: (valor: string) => void;
}

interface valuesProps {
    name: string;
}


export default function SelectItems({ values, placeholder, name, register, errors, onInputChange, ...rest}: Props) {

    const [dropdown, setDropdown] = useState('hidden');
    const [selectItem, setSelectItem] = useState('');
    const [searchText, setSearcthText] = useState('');
    
    
    function toggle() {
        if(dropdown === 'hidden') {
            setDropdown('');
        };
        
        if(dropdown !== 'hidden') {
            setDropdown('hidden');
            setSearcthText('');
        };
        
    };
    
    const handleChange = (event: string) => {
        const valor = event;
        onInputChange(valor);
        toggle();
        setSearcthText('');
      };

    const filteredUnidade = values?.filter((unidade, index) => unidade.name.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()))

    const arrayListValues = filteredUnidade?.map((value, index) => {
        return (
            <div className="cursor-pointer w-full border-gray-100  border-b hover:bg-light-blue group" key={index}>
                <div className="flex w-full items-center p-2 pl-2 border-transparent border-l-2 relative hover:border-teal-100" onClick={() => handleChange(value.name)}>
                    <div className="w-full items-center flex" >
                        <div className="mx-2 -mt-1  text-sm group-hover:text-white" >{value.name}</div>
                    </div>
                </div>
            </div>
        )
    });

console.log(errors)
    return (
        <>
            <div className="flex flex-col items-center relative ">
                <div className="w-full">
                    <div className=" p-1 bg-white flex border border-gray-200 rounded">
                        <div className="flex flex-auto flex-wrap"></div>
                        <input placeholder={`${placeholder}`}  className="py-1 px-2  text-sm appearance-none outline-none w-full text-gray-800 disabled:bg-white "  type="text" {...register(name)} {...rest} disabled onClick={toggle} autoComplete="none"  onChange={handleChange}  />
                        <div className="text-gray-300 w-8 pl-2 pr-1 border-l flex items-center border-gray-200">
                            <button className="cursor-pointer w-6 h-6 text-gray-600 outline-none focus:outline-none" onClick={toggle}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className={`feather feather-chevron-up w-4 h-4 ${dropdown === 'hidden' ? 'rotate-180' : ''}`}>
                                    <polyline points="18 15 12 9 6 15"></polyline>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                <div className={`absolute shadow bg-white top-100 mt-2 z-40 w-full lef-0 rounded max-h-select overflow-y-auto pt-2 ${dropdown} max-h-80 `} >
                    <div className="flex flex-col w-full  ">
                        <input type="text" placeholder="pesquisar.."  className="w-[95%] h-8 border  border-gray-200 rounded-lg m-auto p-2 text-sm text-gray-800 mb-2" value={searchText} onChange={(e) => setSearcthText(e.currentTarget.value)}/>
                        {arrayListValues}
                    </div>
                </div>
            </div>
        </>
    )
}