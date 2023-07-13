'use client';
import { ZodType, z } from "zod";
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Modal } from "reactstrap";
import moment from "moment";
import SelectComponent from "@/components/Select/SelectComponent";
import SaveButton from "@/components/Button/SaveButton";
import { useEffect } from "react";
import { Minus, Plus } from "lucide-react";
import SelectComponentProdutos from "@/components/Select/Produtos/SelectComponentProdutos";

interface Props {
    isOpen: boolean;
    toggle: () => void;
    unidades: Unidades[] | undefined;
    produtos: Produto[] | undefined;
    categorias: Categoria[] | undefined;
    categoria: Categoria;
    user: User | null;
    createSolicitacaoProduto: (solicitacao: FormSolicitacaoProduto) => void;
};

interface Unidades {
    id: string;
    name: string;
};

interface Categoria {
    id: string;
    name: string;
};


interface Produto {
    id: string;
    name: string;
    categoriaId: string | null;
    marcaId: string | null;
    dioprtiaId: string | null;
    cilindroId: string | null;
    qtdeMin: number | null;
    qtdeMax: number | null;
    unidMedida: string | null;
};

export default function ModalProduto({ isOpen, toggle, produtos, unidades, categorias, categoria, user, createSolicitacaoProduto }: Props) {


    const schema: ZodType<any> = z.object({
        name: z.string().nonempty(),
        userId: z.string(),
        unidade: z.string(),
        categoria: z.string(),
        resposta: z.string(),
        produto: z.array(z.object({
            id: z.string(),
            qtde: z.coerce.number().min(1)
        }))

    }).transform((fields) => ({
        ...fields,
        userId: user?.user?.id,
        categoria: categoria.id,
    }))

    const { register, handleSubmit, formState: { errors }, control, reset } = useForm<FormSolicitacaoProduto>({
        resolver: zodResolver(schema), defaultValues: {
            name: '',
            userId: user?.user?.id ? user.user.name : 'Teste',
            categoria: categoria.name,
            resposta: '',
            produto: [{  id: '', qtde: 0 }],

        }
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'produto'
    });

    useEffect(() => {

        reset({
            categoria: categoria.name,
            userId: user?.user ? user.user.name : 'Teste',
            resposta: ''
        });
    }, [isOpen, reset]);

    const submitData = (data: FormSolicitacaoProduto) => {
        console.log(data);
        // createSolicitacaoProduto(data);
    };

    function addNewProduto() {
        append({ id: '',  qtde: 0 })
    };

    console.log(errors)


    const arraySolicitaProdutos = fields.map((field, index) => {
        return (
            <div key={field.id} className="flex w-full gap-2">
                <div className="w-3/4">
                    <SelectComponentProdutos name={`produto.${index}.id` as any} control={control} options={produtos} />
                </div>
                <input
                    type='number'
                    {...register(`produto.${index}.qtde` as any)}
                    className="appearance-none w-1/4 bg-grey-lighter text-grey-darker text-sm border border-grey-lighter rounded-lg py-2 px-2 mb-1 "
                    id="grid-name"
                    placeholder="Qtde" />
                <div className="flex gap-1 items-center">

                    <Plus size={20} className="bg-light-gray rounded-full text-gray-menu-icon hover:cursor-pointer hover:scale-105 " onClick={addNewProduto} />
                    <Minus size={20} className={`bg-light-gray rounded-full text-gray-menu-icon ${fields.length === 1 ? 'hidden' : ''}`} onClick={() => remove(index)} />

                </div>
            </div>
        )
    })

    return (
        <Modal size='lg' isOpen={isOpen} toggle={toggle} className="">
            <div className="md:w-full flex-col justify-between pb-2 pt-8 px-8 bg-white rounded-xl border-none shadow-xl">
                <div className="border-b w-full ">
                    <h1 className="text-2xl text-title font-semibold">Solicitar Produtos</h1>
                </div>
                <div>
                    <form onSubmit={handleSubmit(submitData)}>
                        <div className="flex flex-col my-2 relative">

                            <div className="md:flex mb-2 ">
                                <div className="md:w-3/4 w-full px-3 ">
                                    <label className="block tracking-wide text-subTitle text-xs font-semibold mb-2 " htmlFor="grid-name" >
                                        Descrição <span className={`text-red-500 ${!errors.name && 'hidden'}`}>*</span>
                                    </label>
                                    <input {...register("name")} disabled value={'Número aleatório'} className="appearance-none block  w-full bg-grey-lighter text-grey-darker text-sm border border-grey-lighter rounded-lg py-2 px-2 mb-1 " id="grid-name" placeholder="" />

                                </div>
                                <div className="md:w-1/4 w-full px-3 relative">
                                    <label className="block tracking-wide whitespace-nowrap text-subTitle text-xs font-semibold mb-2 " htmlFor="grid-name">
                                        Data da Solicitação
                                    </label>
                                    <input type='date' disabled value={moment(new Date()).format("YYYY-MM-DD")} className="appearance-none block  w-full bg-grey-lighter text-grey-darker text-sm border border-grey-lighter rounded-lg py-2 px-2 mb-1" id="grid-name" placeholder="Selecione" />

                                </div>
                            </div>

                            <div className="md:flex mb-2 ">
                                <div className="md:w-2/4 w-full px-3">
                                    <label className="block tracking-wide text-subTitle text-xs font-semibold mb-2 " htmlFor="grid-name">
                                        Solicitante
                                    </label>
                                    <input {...register("userId")} disabled className="appearance-none block  w-full bg-grey-lighter text-grey-darker text-sm border border-grey-lighter rounded-lg py-2 px-2 mb-3" id="grid-name" placeholder="Usuário solicitante" />
                                </div>

                                <div className="md:w-1/4 w-full px-3">
                                    <label className="block tracking-wide text-subTitle text-xs font-semibold mb-2 " htmlFor="grid-name">
                                        Categoria <span className={`text-red-500 ${!errors.categoria?.message && 'hidden'}`}>*</span>
                                    </label>
                                    {/* <input {...register("categoria")} disabled  className="appearance-none block  w-full bg-grey-lighter text-grey-darker text-sm border border-grey-lighter rounded-lg py-2 px-2 mb-3" id="grid-name" placeholder="Usuário solicitante" /> */}
                                    <SelectComponent name="categoria" isDisabled={true} control={control} options={categorias} placeholder="Selecione" />
                                </div>

                                <div className="md:w-1/4 w-full px-3">
                                    <label className="block tracking-wide text-subTitle text-xs font-semibold mb-2 " htmlFor="grid-name">
                                        Unidade <span className={`text-red-500 ${!errors.unidade?.message && 'hidden'}`}>*</span>
                                    </label>
                                    <SelectComponentProdutos name="unidade" control={control} options={unidades} placeholder="Selecione" />
                                </div>


                            </div>

                            <div className="md:flex mb-4 ">
                                <div className="md:w-4/4 w-full px-3">
                                    <label className="block tracking-wide text-subTitle text-xs font-semibold mb-2 border-t border-l border-r rounded-t-lg p-2 " htmlFor="grid-name">
                                        Produtos <span className={`text-red-500 ${!errors.produto && 'hidden'}`}>*</span>
                                    </label>
                                    <div className="border rounded-b-lg p-2 -mt-2">

                                        {arraySolicitaProdutos}
                                    </div>
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