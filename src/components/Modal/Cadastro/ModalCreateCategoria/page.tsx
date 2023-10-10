'use client';

import SaveButton from "@/components/Button/SaveButton";
import { Categoria, CreateCategoria } from "@/lib/types/global";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Modal } from "reactstrap";
import { ZodType, z } from "zod";

interface Props {
    isOpen: boolean;
    toggle: () => void;
    createCategoria: (categoria: CreateCategoria) => void;
    categorias: Categoria[]
    btnLoading: boolean;
}

export default function ModalCreateCategoria ({ toggle, isOpen, createCategoria, btnLoading }: Props) {

    const [categorias, setCategorias] = useState<Categoria[]>([{ id: 0, name: '', categoriaOnSubCategoria: [{SubCategoria: {id: 0, name: '', createdAt: '', updatedAt: ''}}] }]);

    const schema: ZodType<CreateCategoria> = z.object({
        name: z.string().nonempty('Este campo é obrigatório'),
    })

    const { register, handleSubmit, formState: { errors }, control, reset } = useForm<CreateCategoria>({
        resolver: zodResolver(schema), defaultValues: {
            name: ''
        }
    });

    useEffect(() => {

        reset({
            name: ''
        });
    }, [isOpen, reset]);

    // console.log(errors)

    const submitData = (data: CreateCategoria) => {
        createCategoria(data);
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
                                        Categoria <span className={`text-red-500 ${!errors.name && 'hidden'}`}>*</span>
                                    </label>
                                    <input {...register("name")}  className="appearance-none block  w-full bg-grey-lighter text-grey-darker text-sm border border-grey-lighter rounded-lg py-2 px-2 mb-1 " id="grid-name" placeholder="Insira o nome da categoria" />
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