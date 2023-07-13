import SaveButton from "@/components/Button/SaveButton";
import SelectComponentProdutos from "@/components/Select/Produtos/SelectComponentProdutos";
import { Categoria, EditarProduto, Marcas, Produtos } from "@/lib/types/global";
import { errors } from "formidable";
import { watch } from "fs";
import { Modal } from "reactstrap";
import { ZodType, z } from "zod";
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from "react";
import SelectComponent from "@/components/Select/SelectComponent";

interface Props {
    isOpen: boolean;
    toggle: () => void;
    formData: Produtos;
    editarProduto: (marca: Produtos) => void;
    categorias: Categoria[];
    marcas: Marcas[];
};

export default function ModalCreateProdutoEdit({toggle, isOpen, marcas, categorias, editarProduto, formData}: Props) {

    const subCategorias = categorias.filter(item => item.name === 'Lio').map(item => item.categoriaOnSubCategoria.map(subCategoria => ({ id: subCategoria.SubCategoria.id, name: subCategoria.SubCategoria.name })));

    const schema: ZodType<Produtos> = z.object({
        id: z.number(),
        name: z.string().nonempty(),
        categoriaId: z.number(),
        Categoria: z.object({
            id: z.number(),
            name: z.string()
        }),
        marcaId: z.number(),
        Marca: z.object({
            id: z.number(),
            name: z.string()
        }),
        SubCategoria: z.object({
            id: z.number(),
            name: z.string()
        }),
        dioptria: z.string(),
        cilindro: z.string(),
        createdAt: z.string(),
        updatedAt: z.string()
    })
    
    const { register, handleSubmit, formState: { errors }, control, reset, watch } = useForm<Produtos>({
        resolver: zodResolver(schema), defaultValues: {}
    });
    
    
    useEffect(() => {
        if(isOpen) {

            reset({
                id: formData.id,
                name: formData.name,
                Categoria: formData.Categoria,
                Marca: formData.Marca,
                unidMedida: formData.unidMedida,
                SubCategoria: formData.SubCategoria
            });
        }
    }, [isOpen, reset]);

    const submitData = (data: Produtos) => {
        // editarProduto(data);
        console.log(data)
    };

console.log(formData)
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
                                    <SelectComponent name="Categoria.name" control={control} options={categorias} placeholder="Selecione" />

                                </div>
                                <div className="md:w-1/4 w-full px-3 ">
                                    <label className="block tracking-wide text-subTitle text-xs font-semibold mb-2 " htmlFor="grid-name">
                                        Subcategoria <span className={`text-red-500 ${!errors.SubCategoria?.message && 'hidden'}`}>*</span>
                                    </label>
                                    <SelectComponent name="SubCategoria.name" isDisabled={!watch("Categoria.name")?.includes("Lio")} control={control} options={subCategorias[0]} placeholder="Selecione" />

                                </div>
                            </div>

                            <div className="md:flex mb-2 ">
                                <div className="md:w-1/3 w-full px-3 ">
                                    <label className="block tracking-wide text-subTitle text-xs font-semibold mb-2 " htmlFor="grid-name" >
                                        Marca <span className={`text-red-500 ${!errors.marcaId?.message && 'hidden'}`}>*</span>
                                    </label>
                                    <SelectComponent name="Marca.name" control={control}  options={marcas} placeholder="Selecione" />

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