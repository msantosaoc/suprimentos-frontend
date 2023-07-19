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
import { BuscaSolicitacaoInicial, Categoria, ListarProdutosSolicitados, Produtos, Unidades } from "@/lib/types/global";
import DropdownStatus from "@/components/Dropdown/DropdownStatus";

interface Props {
    isOpen: boolean;
    toggle: () => void;
    unidades: Unidades[] | undefined;
    formData: BuscaSolicitacaoInicial;
    medicos: Medicos[] | undefined;
    produtos: Produtos[] | undefined;
    categoria: Categoria;
    user: User | null;
    categorias: Categoria[] | undefined;
    updateSolicitacaoProduto: (solicitacao: ListarProdutosSolicitados) => void;
};

interface Medicos {
    name: string;
};




export default function ModalProdutoEdit({ isOpen, toggle, unidades, categoria, user, formData, produtos, categorias, medicos, updateSolicitacaoProduto }: Props) {

    const status = [
        { value: 'Em análise', label: 'Em análise' },
        { value: 'Recusado', label: 'Recusado' },
        { value: 'Em compra', label: 'Em compra' },
        { value: 'Disponível', label: 'Disponível' },
        { value: 'Finalizado', label: 'Finalizado' },
    ];

    

    // Verificar se os produtos do campo "ProdutosSolicitados" estão no array
    const produtosSolicitados = formData.Solicitacao?.ProdutosSolicitados;
    const produtosEncontrados = produtosSolicitados?.filter(
        produtoSolicitado => produtos?.some(produto => produto.id === produtoSolicitado.produtoId)
    );

    // Criar um novo array com os produtos encontrados e seus nomes correspondentes
    const produtosComNomes = produtosEncontrados?.map(produtoSolicitado => {
        const produtoEncontrado = produtos?.find(produto => produto.id === produtoSolicitado.produtoId);
        return {
            id: produtoSolicitado.id,
            produtoId: produtoSolicitado.produtoId,
            produto: produtoEncontrado?.name,
            SolicitacaoId: formData.Solicitacao?.id,
            qtde: produtoSolicitado.qtde
        };
    });

    

    const schema: ZodType<any> = z.object({
        id: z.string(),
        name: z.string().nonempty(),
        usuario: z.object({
            id: z.string(),
            name: z.string()
        }),
        unidade: z.object({
            id: z.string(),
            name: z.string()
        }),
        categoria: z.object({
            id: z.number(),
            name: z.string()
        }),
        status: z.string(),
        resposta: z.string(),
        createdAt: z.string(),
        ProdutosSolicitados: z.array(z.object({
            id: z.string(),
            produtoId: z.number(),
            produto: z.string().optional(),
            SolicitacaoId: z.number().optional(),
            qtde: z.coerce.number().min(1)
        })).nonempty()

    }).transform((fields) => ({
        // ...fields,
    }))

    const { register, handleSubmit, formState: { errors }, control, reset } = useForm<ListarProdutosSolicitados>({
        resolver: zodResolver(schema), defaultValues: {
            // name: formData.name,
            // userId: formData.usuario.name,
            // categoria: formData.categoria?.name,
            // resposta: formData.resposta,
            // unidade: formData.unidade?.name,
            // produto: formData.ProdutosSolicitados,

        }
    });

    

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'ProdutosSolicitados'
    });

    useEffect(() => {

        reset({
            // ...formData,
            name: formData.Solicitacao?.name,
            categoria: formData?.Categoria,
            unidade: formData.Unidade,
            usuario: formData.User,
            ProdutosSolicitados: produtosComNomes as any,
            status: formData.status,
            createdAt: moment(formData.createdAt).format('YYYY-MM-DD')

            // userId: user?.user?.name,
            // unidade: 'barra',
            // resposta: 'asdasd'
        });
    }, [isOpen, reset]);

    const submitData = (data: ListarProdutosSolicitados) => {
        
        updateSolicitacaoProduto(data);
    };

    function addNewProduto() {
        append({ id: '', produtoId: '', produto: '', solicitacaoId: '', qtde: 0 })
    };

   

    const arraySolicitaProdutos = fields.map((field, index) => {
        return (
            <div key={field.id} className="flex w-full gap-2">
                <div className="w-3/4">
                    {/* <input {...register(`ProdutosSolicitados.${index}.produto` as any)}
                    className="appearance-none w-full bg-grey-lighter text-grey-darker text-sm border border-grey-lighter rounded-lg py-2 px-2 mb-1 "
                    /> */}
                    {/* <SelectComponentProdutos name={`ProdutosSolicitados.${index}.produto` as any}  control={control} options={produtos} /> */}
                    <SelectComponent name={`ProdutosSolicitados.${index}.produto` as any} isDisabled={true} control={control} options={produtos} />
                </div>
                <input
                    type='number'
                    disabled
                    {...register(`ProdutosSolicitados.${index}.qtde` as any)}
                    className="appearance-none w-1/4 bg-grey-lighter text-grey-darker text-sm border border-grey-lighter rounded-lg py-2 px-2 mb-1 "
                    id="grid-name"
                    placeholder="Qtde" />
                <div className="flex gap-1 items-center">

                    {/* <Plus size={20} className="bg-light-gray rounded-full text-gray-menu-icon hover:cursor-pointer hover:scale-105 " onClick={addNewProduto} /> */}
                    {/* <Minus size={20} className={`bg-light-gray rounded-full text-gray-menu-icon ${fields.length === 1 ? 'hidden' : ''}`} onClick={() => remove(index)} /> */}

                </div>
            </div>
        )
    })

    return (
        <Modal size='lg' isOpen={isOpen} toggle={toggle} className="">
            <div className="md:w-full flex-col justify-between pb-2 pt-8 px-8 bg-white rounded-xl border-none shadow-xl">
                <div className="border-b w-full ">
                    <h1 className="text-2xl text-title font-semibold">Formulário de Solicitação de Produtos</h1>
                </div>
                <div>
                    <form onSubmit={handleSubmit(submitData)}>
                        <div className="flex flex-col my-2 relative">

                            <div className="md:flex mb-2 ">
                                <div className="md:w-3/4 w-full px-3 ">
                                    <label className="block tracking-wide text-subTitle text-xs font-semibold mb-2 " htmlFor="grid-name" >
                                        Descrição do pedido <span className={`text-red-500 ${!errors.name && 'hidden'}`}>*</span>
                                    </label>
                                    <input {...register("name")} disabled className="appearance-none block  w-full bg-grey-lighter text-grey-darker text-sm border border-grey-lighter rounded-lg py-2 px-2 mb-1 " id="grid-name" placeholder="" />

                                </div>
                                <div className="md:w-1/4 w-full px-3 relative">
                                    <label className="block tracking-wide whitespace-nowrap text-subTitle text-xs font-semibold mb-2 " htmlFor="grid-name">
                                        Data da Solicitação
                                    </label>
                                    <input type='date' {...register("createdAt")} disabled className="appearance-none block  w-full bg-grey-lighter text-grey-darker text-sm border border-grey-lighter rounded-lg py-2 px-2 mb-1" id="grid-name" placeholder="Selecione" />

                                </div>
                            </div>

                            <div className="md:flex mb-2 ">
                                <div className="md:w-2/4 w-full px-3">
                                    <label className="block tracking-wide text-subTitle text-xs font-semibold mb-2 " htmlFor="grid-name">
                                        Solicitante
                                    </label>
                                    <input {...register("usuario.name")} disabled className="appearance-none block  w-full bg-grey-lighter text-grey-darker text-sm border border-grey-lighter rounded-lg py-2 px-2 mb-3" id="grid-name" placeholder="Usuário solicitante" />
                                </div>

                                <div className="md:w-1/4 w-full px-3">
                                    <label className="block tracking-wide text-subTitle text-xs font-semibold mb-2 " htmlFor="grid-name">
                                        Categoria <span className={`text-red-500 ${!errors.categoria?.message && 'hidden'}`}>*</span>
                                    </label>
                                    {/* <input {...register("categoria.name")} disabled className="appearance-none block  w-full bg-grey-lighter text-grey-darker text-sm border border-grey-lighter rounded-lg py-2 px-2 mb-3" id="grid-name" placeholder="Usuário solicitante" /> */}
                                    <SelectComponent name="categoria.name" isDisabled={true} control={control} options={categorias} placeholder="Selecione" />
                                </div>

                                <div className="md:w-1/4 w-full px-3">
                                    <label className="block tracking-wide text-subTitle text-xs font-semibold mb-2 " htmlFor="grid-name">
                                        Unidade <span className={`text-red-500 ${!errors.unidade?.message && 'hidden'}`}>*</span>
                                    </label>
                                    <SelectComponent name="unidade.name" isDisabled={true} control={control} options={unidades} placeholder="Selecione" />
                                </div>


                            </div>

                            <div className="md:flex mb-4 ">
                                <div className="md:w-4/4 w-full px-3">
                                    <label className="block tracking-wide text-subTitle text-xs font-semibold mb-2 border-t border-l border-r rounded-t-lg p-2 " htmlFor="grid-name">
                                        Produtos <span className={`text-red-500 ${!errors.ProdutosSolicitados && 'hidden'}`}>*</span>
                                    </label>
                                    <div className="border rounded-b-lg p-2 -mt-2">

                                        {arraySolicitaProdutos}
                                    </div>
                                </div>


                            </div>


                            <div className="md:flex mb-2">

                                <div className="md:w-1/4 w-full px-3 flex mb-1 items-end">
                                    <DropdownStatus name="status" control={control} options={status} isDisabled={true} />

                                </div>
                                <div className="md:w-3/4 w-full px-3 flex justify-end items-center ">

                                    <label className="text-title hover:cursor-pointer" onClick={toggle}>Fechar</label>

                                </div>




                            </div>



                        </div>

                    </form>
                </div>
            </div>
        </Modal>
    )
}