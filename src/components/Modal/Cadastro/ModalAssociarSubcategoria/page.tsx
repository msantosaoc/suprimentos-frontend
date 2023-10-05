'use client';

import SaveButton from "@/components/Button/SaveButton";
import { Categoria, CreateSubCategoria, SubCategoria } from "@/lib/types/global";
import { useEffect, useState } from "react";
import { Modal } from "reactstrap";
import CreatableSelect from 'react-select/creatable';
import Select from 'react-select';

interface Props {
    isOpen: boolean;
    toggle: () => void;
    subcategorias: SubCategoria[];
    categorias: Categoria[]
    btnLoading: boolean;
};

interface Option {
    readonly label: string;
    readonly value: number;
};

export default function ModalAssociarSubcategoria({ toggle, isOpen, categorias, subcategorias, btnLoading }: Props) {
    useEffect(() => {
    }, [isOpen]);

    const submitData = (data: any) => {
        // createSubcategoria(data);
    };
    console.log(subcategorias)

    const optionsCategorias = categorias.map((categoria) => ({
        value: categoria.id,
        label: categoria.name
    }));

    const optionsSubcategorias = subcategorias.map((subcategorias) => ({
        value: subcategorias.id,
        label: subcategorias.name
    }));

    // const createOptionSubcategoria = (label: string) => ({
    //     label,
    //     value: label.toLowerCase().replace(/\W/g, ''),
    // });

    // const defaultOptionsCategorias = [
    //     optionsCategorias
    // ];
    // const defaultOptionsSubcategorias = [
    //     createOptionSubcategoria('One'),
    //     createOptionSubcategoria('Two'),
    //     createOptionSubcategoria('Three'),
    // ];

    const [isLoadingCategoria, setIsLoadingCategoria] = useState(false);
    const [isLoadingSubcategoria, setIsLoadingSubcategoria] = useState(false);
    // const [optionsCategoria, setOptionsCategoria] = useState(defaultOptionsCategorias);
    // const [optionsSubcategoria, setOptionsSubcategoria] = useState(defaultOptionsSubcategorias);
    const [valueCategoria, setValueCategoria] = useState<Option | null>();
    const [valueSubcategoria, setValueSubcategoria] = useState<Option | null>();

    console.log(valueCategoria);
    console.log(valueSubcategoria)

    const handleCreateCategoria = (inputValue: string) => {
        // setIsLoadingCategoria(true);
        // setTimeout(() => {
        //     const newOption = createOptionCategorias(inputValue);
        //     setIsLoadingCategoria(false);
        //     setOptionsCategoria((prev) => [...prev, newOption]);
        //     setValueCategoria(newOption);
        // }, 1000);
    };

    const handleCreateSubcategoria = (inputValue: string) => {
        // setIsLoadingSubcategoria(true);
        // setTimeout(() => {
        //     const newOption = createOptionSubcategoria(inputValue);
        //     setIsLoadingSubcategoria(false);
        //     setOptionsSubcategoria((prev) => [...prev, newOption]);
        //     setValueSubcategoria(newOption);
        // }, 1000);
    };

    return (
        <Modal size='md' isOpen={isOpen} toggle={toggle} className="">
            <div className="md:w-full flex-col justify-between pb-2 pt-8 px-8 bg-white rounded-xl border-none shadow-xl">
                <div className="border-b w-full ">
                    <h1 className="text-2xl text-title font-semibold">Associar</h1>
                </div>
                <div>
                    <form onSubmit={() => { }}>
                        <div className="flex flex-col my-2 relative">

                            <div className="md:flex mb-2 ">
                                <div className="md:w-full w-full px-3 ">
                                    <label className="block tracking-wide text-subTitle text-xs font-semibold mb-2 " htmlFor="grid-name" >
                                        {/* Subcategoria <span className={`text-red-500 ${!errors.name && 'hidden'}`}>*</span> */}
                                    </label>

                                    <Select
                                        placeholder="buscar Categoria"
                                        isClearable
                                        isDisabled={isLoadingCategoria}
                                        isLoading={isLoadingCategoria}
                                        onChange={(newValue) => setValueCategoria(newValue)}
                                        // onCreateOption={handleCreateCategoria}
                                        options={optionsCategorias}
                                        value={valueCategoria}
                                        noOptionsMessage={() => "Não encontrado"}
                                        styles={{
                                            placeholder: (baseStyles, state) => ({
                                                ...baseStyles,
                                                fontSize: '0.9rem',
                                                color: '#a6a6a7',
                                            }),
                                            dropdownIndicator: (baseStyles, state) => ({
                                                ...baseStyles,
                                                color: '#505559',
                                                ":hover": {
                                                    cursor: 'pointer'
                                                }
                                            }),
                                            control: (baseStyles, state) => ({
                                                ...baseStyles,
                                                fontSize: '0.9rem',
                                                borderColor: '#e0e1e3',
                                                borderRadius: '0.35rem',
                                                ":hover": {
                                                    borderColor: '#aba6a7'
                                                },
                                            }),
                                            input: (baseStyles, state) => ({
                                                ...baseStyles,
                                            }),
                                            group: (baseStyles, state) => ({
                                                ...baseStyles,
                                            }),
                                            menuList: (baseStyles, state) => ({
                                                ...baseStyles,
                                                fontSize: '0.9rem',
                                            }),
                                            option: (baseStyles, state) => ({
                                                ...baseStyles,
                                                backgroundColor: state.isSelected ? '#5ea9d3' : '',
                                                ":hover": {
                                                    backgroundColor: 'RGBA(94,169,211, 0.3)' && state.isSelected ? '' : 'RGBA(94,169,211, 0.3)',
                                                    cursor: 'pointer'
                                                },

                                            }),

                                        }}
                                    />
                                    {/* <input  className="appearance-none block  w-full bg-grey-lighter text-grey-darker text-sm border border-grey-lighter rounded-lg py-2 px-2 mb-1 " id="grid-name" placeholder="Insira o nome da subcategoria" /> */}
                                    {/* <span className={`text-red-500 text-xs absolute ${!errors.name && 'hidden'}`}>{errors.name?.message}</span> */}

                                </div>
                            </div>

                            <div className="md:flex mb-2 ">
                                <div className="md:w-full w-full px-3 ">
                                    <label className="block tracking-wide text-subTitle text-xs font-semibold mb-2 " htmlFor="grid-name" >
                                        {/* Subcategoria <span className={`text-red-500 ${!errors.name && 'hidden'}`}>*</span> */}
                                    </label>
 
                                    <Select
                                        placeholder="buscar Subcategoria"
                                        isClearable
                                        isDisabled={isLoadingSubcategoria}
                                        isLoading={isLoadingSubcategoria}
                                        onChange={(newValue) => setValueSubcategoria(newValue)}
                                        // onCreateOption={handleCreateSubcategoria}
                                        options={optionsSubcategorias}
                                        value={valueSubcategoria}
                                        
                                        noOptionsMessage={() => "Não encontrado"}
                                        styles={{
                                            placeholder: (baseStyles, state) => ({
                                                ...baseStyles,
                                                fontSize: '0.9rem',
                                                color: '#a6a6a7',
                                            }),
                                            dropdownIndicator: (baseStyles, state) => ({
                                                ...baseStyles,
                                                color: '#505559',
                                                ":hover": {
                                                    cursor: 'pointer'
                                                }
                                            }),
                                            control: (baseStyles, state) => ({
                                                ...baseStyles,
                                                fontSize: '0.9rem',
                                                borderColor: '#e0e1e3',
                                                borderRadius: '0.35rem',
                                                ":hover": {
                                                    borderColor: '#aba6a7'
                                                },
                                            }),
                                            input: (baseStyles, state) => ({
                                                ...baseStyles,
                                            }),
                                            group: (baseStyles, state) => ({
                                                ...baseStyles,
                                            }),
                                            menuList: (baseStyles, state) => ({
                                                ...baseStyles,
                                                fontSize: '0.9rem',
                                            }),
                                            option: (baseStyles, state) => ({
                                                ...baseStyles,
                                                backgroundColor: state.isSelected ? '#5ea9d3' : '',
                                                ":hover": {
                                                    backgroundColor: 'RGBA(94,169,211, 0.3)' && state.isSelected ? '' : 'RGBA(94,169,211, 0.3)',
                                                    cursor: 'pointer'
                                                },

                                            }),

                                        }}
                                    />
                                    {/* <input  className="appearance-none block  w-full bg-grey-lighter text-grey-darker text-sm border border-grey-lighter rounded-lg py-2 px-2 mb-1 " id="grid-name" placeholder="Insira o nome da subcategoria" /> */}
                                    {/* <span className={`text-red-500 text-xs absolute ${!errors.name && 'hidden'}`}>{errors.name?.message}</span> */}

                                </div>
                            </div>


                            <div className="md:flex mb-2">

                                <div className="md:w-3/4 w-full px-3">

                                </div>
                                <div className="md:w-2/4 w-full px-3 flex  items-end">

                                    <SaveButton type="submit" loading={btnLoading}>Associar</SaveButton>

                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </Modal>
    )
}