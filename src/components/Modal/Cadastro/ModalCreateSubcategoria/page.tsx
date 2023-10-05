'use client';

import SaveButton from "@/components/Button/SaveButton";
import { Categoria, CreateCategoria, CreateSubCategoria, SubCategoria } from "@/lib/types/global";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Modal } from "reactstrap";
import { ZodType, z } from "zod";

interface Props {
    isOpen: boolean;
    toggle: () => void;
    createSubcategoria: (categoria: CreateSubCategoria) => void;
    categorias: Categoria[]
    btnLoading: boolean;
}

export default function ModalCreateSubcategoria({ toggle, isOpen, categorias, createSubcategoria, btnLoading }: Props) {

    // const [categorias, setCategorias] = useState<Categoria[]>([{ id: 0, name: '', categoriaOnSubCategoria: [{SubCategoria: {id: 0, name: '', createdAt: '', updatedAt: ''}}] }]);

    // const [subcategorias, setSubcategorias] = useState<SubCategoria[]>([{id: 0, name: '', createdAt: '', updatedAt: ''}]);

    const schema: ZodType<any> = z.object({
        name: z.string().nonempty('Este campo é obrigatório'),
    })

    const { register, handleSubmit, formState: { errors }, control, reset } = useForm<CreateSubCategoria>({
        resolver: zodResolver(schema), defaultValues: {
            name: ''
        }
    });

    useEffect(() => {

        reset({
            name: ''
        });
    }, [isOpen, reset]);

    const submitData = (data: CreateSubCategoria) => {
        createSubcategoria(data);
    };

    const arrayListCategorias = categorias?.map((categoria, index) => {
        return (
            <tr  className="bg-white border-b text-center text-subTitle dark:bg-gray-800 dark:border-gray-700 hover:cursor-pointer hover:bg-light-blue/20 duration-300" key={categoria.id} >
                <td scope="row" className=" py-2 text-xs text-gray-900 whitespace-nowrap dark:text-white ">
                <input type="checkbox" id='selectAll' className=''  />
                </td>
                <td className="px-6 py-2 text-xs">
                    {categoria.name}
                </td>
            </tr>
        )
    })

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
                                    <input {...register("name")} className="appearance-none block  w-full bg-grey-lighter text-grey-darker text-sm border border-grey-lighter rounded-lg py-2 px-2 mb-1 " id="grid-name" placeholder="Insira o nome da subcategoria" />
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