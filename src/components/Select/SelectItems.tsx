'use client';
import React, { HTMLAttributes, InputHTMLAttributes, forwardRef, useEffect, useRef, useState } from "react";
import { FieldValues, UseFormRegister, FormProvider, FormProviderProps } from "react-hook-form";

// interface Props {
//     values: valuesProps[]
// }

// type InputProps = InputHTMLAttributes<HTMLInputElement> 

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    values: valuesProps[] | undefined;
}

interface valuesProps {
    name: string;
}


  




const SelectItems = React.forwardRef<HTMLInputElement, InputProps>(({placeholder, name, values, ...props}, ref) => {

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
    
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const valor = event.currentTarget.value;
        setSelectItem(valor);
        toggle();
        setSearcthText('');
      };

    const filteredUnidade = values?.filter((unidade, index) => unidade.name.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()))

    const arrayListValues = filteredUnidade?.map((value, index) => {
        return (
            <div className="cursor-pointer w-full border-gray-100  border-b hover:bg-light-blue group" key={index}>
                <div className="flex w-full items-center p-2 pl-2 border-transparent border-l-2 relative hover:border-teal-100" onClick={() => setSelectItem(value.name)}>
                    <div className="w-full items-center flex" >
                        <div className="mx-2 -mt-1  text-sm group-hover:text-white" >{value.name}</div>
                    </div>
                </div>
            </div>
        )
    });

    return (
        <>
            <div className="flex flex-col items-center relative ">
                <div className="w-full">
                    <div className=" p-1 bg-white flex border border-gray-200 rounded">
                        <div className="flex flex-auto flex-wrap"></div>
                        <input placeholder={`${placeholder}`}  className="py-1 px-2  text-sm appearance-none outline-none w-full text-gray-800 disabled:bg-white " onChange={(e) => setSelectItem(e.target.value)} value={selectItem} name={name} type="text" ref={ref} {...props} disabled onClick={toggle} autoComplete="none"   />
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


});

SelectItems.displayName = "SelectItems";

export { SelectItems }