'use client';

import { Modal } from "reactstrap";
import { ZodType, z } from "zod";
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateMarca } from "@/lib/types/global";
import SaveButton from "@/components/Button/SaveButton";
import { useEffect } from "react";

interface Props {
    isOpen: boolean;
    toggle: () => void;
    createMarca: (marca: CreateMarca) => void;
    btnLoading: boolean;
}

export default function ModalCreateMarca({ toggle, isOpen, createMarca, btnLoading }: Props) {

    const schema: ZodType<CreateMarca> = z.object({
        name: z.string().nonempty('Este campo é obrigatório'),
    })

    const { register, handleSubmit, formState: { errors }, control, reset } = useForm<CreateMarca>({
        resolver: zodResolver(schema), defaultValues: {
            name: ''
        }
    });

    useEffect(() => {

        reset({
            name: ''
        });
    }, [isOpen, reset]);

    const submitData = (data: CreateMarca) => {
        createMarca(data);
    };


    return (
        <Modal size='md' isOpen={isOpen} toggle={toggle} className="">
            <div className="md:w-full flex-col justify-between pb-2 pt-8 px-8 bg-white rounded-xl border-none shadow-xl">
                <div className="border-b w-full ">
                    <h1 className="text-2xl text-title font-semibold">Cadastrar Marca</h1>
                </div>
                <div>
                    <form onSubmit={handleSubmit(submitData)}>
                        <div className="flex flex-col my-2 relative">

                            <div className="md:flex mb-2 ">
                                <div className="md:w-full w-full px-3 ">
                                    <label className="block tracking-wide text-subTitle text-xs font-semibold mb-2 " htmlFor="grid-name" >
                                        Marca <span className={`text-red-500 ${!errors.name && 'hidden'}`}>*</span>
                                    </label>
                                    <input {...register("name")}  className="appearance-none block  w-full bg-grey-lighter text-grey-darker text-sm border border-grey-lighter rounded-lg py-2 px-2 mb-1 " id="grid-name" placeholder="Insira o nome da marca" />
                                    <span className={`text-red-500 text-xs absolute ${!errors.name && 'hidden'}`}>{errors.name?.message}</span>

                                </div>
                            </div>

                            <div className="md:flex mb-2">

                                <div className="md:w-3/4 w-full px-3">

                                </div>
                                <div className="md:w-2/4 w-full px-3 flex  items-end">

                                    <SaveButton type="submit" loading={btnLoading}>Enviar</SaveButton>

                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </Modal>
    )
}