import SaveButton from "@/components/Button/SaveButton";
import SelectComponentProdutos from "@/components/Select/Produtos/SelectComponentProdutos";
import { Usuarios } from "@/lib/types/global";
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
    formData: Usuarios;
    editarUsuario: (usuario: Usuarios) => void;
    btnIsLoading: boolean;
};

export default function ModalCreateUsuarioEdit({ toggle, isOpen, editarUsuario, formData, btnIsLoading }: Props) {

    const permissions = [
        { id: 1, name: 'SUPERVISAO' },
        { id: 2, name: 'ESTOQUE' },
        { id: 3, name: 'COMPRAS' },
        { id: 4, name: 'DIRETORIA' },
    ]

    const schema: ZodType<Usuarios> = z.object({
        id: z.string(),
        name: z.string().nonempty(),
        email: z.string().email().nonempty(),
        role: z.string().nonempty()
    })
    // .transform((fields)=> ({
    //     ...fields
    // }))

    const { register, handleSubmit, formState: { errors }, control, reset, watch } = useForm<Usuarios>({
        resolver: zodResolver(schema), defaultValues: {
            // ...formData
        }
    });


    useEffect(() => {
        if (isOpen) {

            reset({
                id: formData.id,
                name: formData.name,
                email: formData.email,
                role: formData.role,
            });
        }
    }, [isOpen, reset]);

    const submitData = (data: Usuarios) => {
        console.log('esse', data)
        editarUsuario(data);
    };


    return (
        <Modal size='md' isOpen={isOpen} toggle={toggle} className="">
            <div className="md:w-full flex-col justify-between pb-2 pt-8 px-8 bg-white rounded-xl border-none shadow-xl">
                <div className="border-b w-full ">
                    <h1 className="text-2xl text-title font-semibold">Editar Usuário</h1>
                </div>
                <div>
                    <form onSubmit={handleSubmit(submitData)}>
                        <div className="flex flex-col my-2 relative">

                            <div className="md:flex mb-2 ">
                                <div className="w-full px-3 ">
                                    <label className="block tracking-wide text-subTitle text-xs font-semibold mb-2 " htmlFor="grid-name" >
                                        Nome <span className={`text-red-500 ${!errors.name && 'hidden'}`}>*</span>
                                    </label>
                                    <input {...register("name")} className="appearance-none block  w-full bg-grey-lighter text-grey-darker text-sm border border-grey-lighter rounded-lg py-2 px-2 mb-1 " id="grid-name" placeholder="Nome e sobrenome" />

                                </div>
                            </div>

                            <div className="md:flex mb-2 ">
                                <div className="w-full px-3 ">
                                    <label className="block tracking-wide text-subTitle text-xs font-semibold mb-2 " htmlFor="grid-name">
                                        E-mail <span className={`text-red-500 ${!errors.email?.message && 'hidden'}`}>*</span>
                                    </label>
                                    <input {...register("email")} className="appearance-none block  w-full bg-grey-lighter text-grey-darker text-sm border border-grey-lighter rounded-lg py-2 px-2 mb-1 " id="grid-name" placeholder="E-mail empresarial" />
                                </div>
                            </div>


                            <div className="md:flex mb-2 ">

                                <div className="w-full px-3 ">
                                    <label className="block tracking-wide text-subTitle text-xs font-semibold mb-2 " htmlFor="grid-name">
                                        Perfil <span className={`text-red-500 ${!errors.role?.message && 'hidden'}`}>*</span>
                                    </label>
                                    <SelectComponent name="role" control={control} options={permissions} placeholder="Selecione" />

                                </div>
                            </div>

                            <div className="md:flex mb-2">

                                <div className="md:w-3/4 w-full px-3">

                                </div>
                                <div className="md:w-1/4 w-full px-3 flex  items-end">

                                    <SaveButton type="submit" loading={btnIsLoading}>Enviar</SaveButton>

                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </Modal>
    )
}