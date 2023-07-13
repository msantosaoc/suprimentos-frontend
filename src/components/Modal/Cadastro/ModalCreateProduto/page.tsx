'use client';

import { Modal } from "reactstrap";
import { ZodType, z } from "zod";
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Categoria, CreateProduto, Marcas } from "@/lib/types/global";
import SaveButton from "@/components/Button/SaveButton";
import { useEffect } from "react";
import SelectComponent from "@/components/Select/SelectComponent";
import SelectComponentProdutos from "@/components/Select/Produtos/SelectComponentProdutos";

interface Props {
    isOpen: boolean;
    toggle: () => void;
    createProduto: (marca: CreateProduto) => void;
    categorias: Categoria[];
    marcas: Marcas[];
};

export default function ModalCreateProduto({ toggle, isOpen, createProduto, categorias, marcas }: Props) {

    
    const subCategorias = categorias.filter(item => item.name === 'Lio').map(item => item.categoriaOnSubCategoria.map(subCategoria => ({ id: subCategoria.SubCategoria.id, name: subCategoria.SubCategoria.name })));

    
    
    const schema: ZodType<CreateProduto> = z.object({
        name: z.string().nonempty(),
        categoriaId: z.number(),
        marcaId: z.number(),
        subCategoriaId: z.number().optional(),
        dioptriaId: z.string(),
        cilindroId: z.string(),
        qtdeMin: z.number(),
        qtdeMax: z.number(),
        unidMedida: z.string(),
        qtde: z.number()
    }).transform((fields) => ({
        ...fields,
        dioptriaId: '',
        cilindroId: '',
        qtdeMax: 0,
        qtdeMin: 0,
        qtde: 0
    }))
    
    const { register, handleSubmit, formState: { errors }, control, reset, watch } = useForm<CreateProduto>({
        resolver: zodResolver(schema), defaultValues: {
            name: '',
            dioptriaId: '',
            cilindroId: '',
            unidMedida: '',
            qtde: 0,
            qtdeMax: 0,
            qtdeMin: 0
        }
    });
    
    
    useEffect(() => {

        reset();
    }, [isOpen, reset]);

    const submitData = (data: CreateProduto) => {
        createProduto(data);
        // console.log(data)
    };



    return (
        <Modal size='lg' isOpen={isOpen} toggle={toggle} className="">
            <div className="md:w-full flex-col justify-between pb-2 pt-8 px-8 bg-white rounded-xl border-none shadow-xl">
                <div className="border-b w-full ">
                    <h1 className="text-2xl text-title font-semibold">Cadastrar Produto</h1>
                </div>
                <div>
                    <form onSubmit={handleSubmit(submitData)}>
                        <div className="flex flex-col my-2 relative">

                            <div className="md:flex mb-2 ">
                                <div className="md:w-2/4 w-full px-3 ">
                                    <label className="block tracking-wide text-subTitle text-xs font-semibold mb-2 " htmlFor="grid-name" >
                                        Produto <span className={`text-red-500 ${!errors.name && 'hidden'}`}>*</span>
                                    </label>
                                    <input {...register("name")} className="appearance-none block  w-full bg-grey-lighter text-grey-darker text-sm border border-grey-lighter rounded-lg py-2 px-2 mb-1 " id="grid-name" placeholder="Insira o nome do produto" />

                                </div>
                                <div className="md:w-1/4 w-full px-3 ">
                                    <label className="block tracking-wide text-subTitle text-xs font-semibold mb-2 " htmlFor="grid-name">
                                        Categoria <span className={`text-red-500 ${!errors.categoriaId?.message && 'hidden'}`}>*</span>
                                    </label>
                                    <SelectComponentProdutos name="categoriaId" control={control} options={categorias} placeholder="Selecione" />

                                </div>
                                <div className="md:w-1/4 w-full px-3 ">
                                    <label className="block tracking-wide text-subTitle text-xs font-semibold mb-2 " htmlFor="grid-name">
                                        Subcategoria <span className={`text-red-500 ${!errors.subCategoriaId?.message && 'hidden'}`}>*</span>
                                    </label>
                                    <SelectComponentProdutos name="subCategoriaId" isDisabled={watch('categoriaId') !== 3} control={control} options={subCategorias[0]} placeholder="Selecione" />

                                </div>
                            </div>

                            <div className="md:flex mb-2 ">
                                <div className="md:w-1/3 w-full px-3 ">
                                    <label className="block tracking-wide text-subTitle text-xs font-semibold mb-2 " htmlFor="grid-name" >
                                        Marca <span className={`text-red-500 ${!errors.marcaId?.message && 'hidden'}`}>*</span>
                                    </label>
                                    <SelectComponentProdutos name="marcaId" control={control} options={marcas} placeholder="Selecione" />

                                </div>
                                <div className="md:w-1/3 w-full px-3 ">
                                    <label className="block tracking-wide text-subTitle text-xs font-semibold mb-2" htmlFor="grid-name">
                                        Fornecedor
                                    </label>
                                    <input disabled className="appearance-none block  w-full bg-grey-lighter text-grey-darker text-sm border border-grey-lighter rounded-lg py-2 px-2 mb-1 " id="grid-name" placeholder="Insira o fornecedor" />

                                </div>
                                <div className="md:w-1/3 w-full px-3 ">
                                    <label className="block tracking-wide text-subTitle text-xs font-semibold mb-2 " htmlFor="grid-name">
                                        Unidade de Medida <span className={`text-red-500 ${!errors.unidMedida?.message && 'hidden'}`}>*</span>
                                    </label>
                                    <input {...register("unidMedida")} className="appearance-none block  w-full bg-grey-lighter text-grey-darker text-sm border border-grey-lighter rounded-lg py-2 px-2 mb-1 " id="grid-name" placeholder="Cx. c/100" />

                                </div>
                            </div>

                            <div className="md:flex mb-2">

                                <div className="md:w-3/4 w-full px-3">

                                </div>
                                <div className="md:w-1/4 w-full px-3 flex  items-end">

                                    <SaveButton type="submit">Enviar</SaveButton>

                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </Modal>
    )
}