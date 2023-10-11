'use client';

import SaveButton from "@/components/Button/SaveButton";
import { Categoria, CreateCategoria, CreateSubCategoria, SubCategoria } from "@/lib/types/global";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Modal } from "reactstrap";
import { ZodType, z } from "zod";
import Select from 'react-select';
import SelectComponent from "@/components/Select/SelectComponent";
import { watch } from "fs";
import SelectComponentProdutos from "@/components/Select/Produtos/SelectComponentProdutos";

interface Props {
    isOpen: boolean;
    toggle: () => void;
    createSubcategoria: (categoria: CreateSubCategoria) => void;
    categorias: Categoria[]
    btnLoading: boolean;
};

interface Option {
    readonly label: string;
    readonly value: number;
};

export default function ModalCreateSubcategoria({ toggle, isOpen, categorias, createSubcategoria, btnLoading }: Props) {

    

    const optionsCategorias = categorias.map((categoria) => ({
        value: categoria.id,
        label: categoria.name
    }));


    const schema: ZodType<CreateSubCategoria> = z.object({
        id: z.coerce.number(),
        name: z.string().nonempty('Este campo é obrigatório'),
    })

    const { register, handleSubmit, formState: { errors }, control, reset, watch, } = useForm<CreateSubCategoria>({
        resolver: zodResolver(schema), defaultValues: {
            name: ''
        },
    });

    useEffect(() => {

        reset({
            name: ''
        });

    }, [isOpen, reset]);

    const [valueCategoria, setValueCategoria] = useState<Option | null>();
    
    const submitData = (data: CreateSubCategoria) => {

        createSubcategoria(data);
        // console.log(data)
    };

    

    return (
        <Modal size='md' isOpen={isOpen} toggle={toggle} className="">
            <div className="md:w-full flex-col justify-between pb-2 pt-8 px-8 bg-white rounded-xl border-none shadow-xl">
                <div className="border-b w-full ">
                    <h1 className="text-2xl text-title font-semibold">Cadastrar</h1>
                </div>
                <div>
                    <form onSubmit={handleSubmit(submitData)}>
                        <div className="flex flex-col my-2 relative">

                            <div className="md:flex mb-2 ">
                                <div className="md:w-full w-full px-3 ">
                                    <label className="block tracking-wide text-subTitle text-xs font-semibold mb-2 " htmlFor="grid-name" >
                                        Subcategoria <span className={`text-red-500 ${!errors.name && 'hidden'}`}>*</span>
                                    </label>
                                    <input {...register("name")} autoComplete="no" className="appearance-none block  w-full bg-grey-lighter text-grey-darker text-sm border border-grey-lighter rounded-lg py-2 px-2 mb-1 " id="grid-name" placeholder="Insira o nome da subcategoria" />
                                    <span className={`text-red-500 text-xs absolute ${!errors.name && 'hidden'}`}>{errors.name?.message}</span>

                                </div>
                            </div>

                            <div className="md:flex mb-2 ">
                                <div className="md:w-full w-full px-3 ">
                                    <label className="block tracking-wide text-subTitle text-xs font-semibold mb-2 " htmlFor="grid-name" >
                                        Categoria <span className={`text-red-500 ${!errors.name && 'hidden'}`}>*</span>
                                    </label>
                                    <SelectComponentProdutos isClearable={true} name="id" control={control} options={categorias} placeholder="Selecione" />
                                    {/* <Select
                                        placeholder="Selecione uma categoria"
                                        isClearable
                                        // isDisabled={isLoadingCategoria}
                                        // isLoading={isLoadingCategoria}
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
                                    /> */}
                                    <span className={`text-red-500 text-xs absolute ${!errors.name && 'hidden'}`}>{errors.name?.message}</span>

                                </div>
                            </div>
                            

                            <div className="md:flex mb-2">

                                <div className="md:w-3/4 w-full px-3">

                                </div>
                                <div className="md:w-2/4 w-full px-3 flex  items-end">

                                    <SaveButton type="submit" loading={btnLoading}>Salvar</SaveButton>

                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </Modal>
    )
}