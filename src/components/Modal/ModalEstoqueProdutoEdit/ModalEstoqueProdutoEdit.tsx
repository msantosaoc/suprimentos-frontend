'use client';
import { ZodType, z } from "zod";
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input, Modal } from "reactstrap";
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




export default function ModalEstoqueProdutoEdit({ isOpen, toggle, unidades, categoria, user, formData, produtos, categorias, medicos, updateSolicitacaoProduto }: Props) {

    const status = [
        { value: 'Recusado', label: 'Recusado' },
        { value: 'Em análise', label: 'Em análise' },
        { value: 'Em compra', label: 'Em compra' },
        { value: 'Disponível', label: 'Disponível' },
        { value: 'Finalizado', label: 'Finalizado' },
        { value: 'Disp. Parcial', label: 'Disp. Parcial' },
    ];

    const role = user?.user?.role;
    const hasPermissionEstoque = role === "ESTOQUE" ? true : false;

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
            qtdeLiberada: produtoSolicitado.qtde,
            SolicitacaoId: formData.Solicitacao?.id,
            qtde: produtoSolicitado.qtde,
            checked: true
        };
    });



    const schema: ZodType<any> = z.object({
        id: z.string(),
        idSolicitacaoInicial: z.number(),
        resposta: z.string(),
        status: z.string(),
        ProdutosSolicitados: z.array(z.object({
            id: z.string(),
            produtoId: z.number(),
            produto: z.string().optional(),
            qtdeLiberada: z.coerce.number().nullable(),
            SolicitacaoId: z.number().optional(),
            qtde: z.coerce.number().min(1),
            checked: z.boolean().optional()
        })).nonempty()

    })

    const { register, handleSubmit, formState: { errors }, control, reset, watch } = useForm<any>({
        resolver: zodResolver(schema), defaultValues: {
            

        }
    });



    const { fields, append, remove } = useFieldArray({
        control,
        name: 'ProdutosSolicitados'
    });

    useEffect(() => {

        reset({
            name: formData.Solicitacao?.name,
            categoria: formData?.Categoria,
            unidade: formData.Unidade,
            usuario: formData.User,
            ProdutosSolicitados: produtosComNomes as any,
            status: formData.status,
            createdAt: moment(formData.createdAt).format('YYYY-MM-DD')

        });
    }, [isOpen, reset]);

    const submitData = (data: ListarProdutosSolicitados) => {

        updateSolicitacaoProduto(data);
    };

    
    const arraySolicitaProdutos = fields.map((field, index) => {
        return (
            <div key={field.id} className="flex w-full gap-2 mb-1 items-center ">
                <div className="w-3/4">
                    <SelectComponent name={`ProdutosSolicitados.${index}.produto` as any} isDisabled={true} control={control} options={produtos} />
                </div>
                <div className="w-1/4 flex gap-2 ">
                    <input
                        type='number'
                        disabled={true}
                        {...register(`ProdutosSolicitados.${index}.qtde` as any)}
                        className="appearance-none w-2/4 bg-grey-lighter text-grey-darker text-sm border border-grey-lighter rounded-lg py-2 px-2  "
                        id="grid-name"
                        placeholder="Qtde" 
                    />

                    <input
                        type='number'
                        disabled={!hasPermissionEstoque}
                        {...register(`ProdutosSolicitados.${index}.qtdeLiberada` as any)}
                        className="appearance-none w-2/4 bg-grey-lighter text-grey-darker text-sm border border-grey-lighter rounded-lg py-2 px-2  "
                        id="grid-name"
                        placeholder="Qtde" 
                    />

                </div>
                        <input type='checkbox' className=" h-6 w-6  accent-blue-300 text-white cursor-pointer" checked={watch(`ProdutosSolicitados.${index}.qtdeLiberada`) == watch(`ProdutosSolicitados.${index}.qtde`)} {...register(`ProdutosSolicitados.${index}.checked` as any)} />
                <div className="flex gap-1 items-center">


                </div>
            </div>
        )
    })

    return (
        <Modal size='lg' isOpen={isOpen} toggle={toggle} className="">
            <div className="md:w-full flex-col justify-between pb-2 pt-8 px-8 bg-white rounded-xl border-none shadow-xl">
                <div className="border-b w-full flex justify-between">
                    <h1 className="text-2xl text-title font-semibold">Formulário de Solicitação de Produtos</h1>
                    <div className=" w-1/4 flex flex-col px-3 mb-2">
                        <label className="block tracking-wide text-subTitle text-xs font-semibold mb-2 " htmlFor="solicitacao-id">Número da Solicitação</label>
                        <input value={`Nº: ${formData.id}`} disabled className="appearance-none block  w-full bg-grey-lighter text-grey-darker text-sm border border-grey-lighter rounded-lg py-2 px-2 mb-1 font-semibold" />
                    </div>
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

                                    <label className="flex tracking-wide text-subTitle text-xs font-semibold mb-2 border-t border-l border-r rounded-t-lg p-2 w-full " htmlFor="grid-name">
                                        
                                        <label className="w-3/4 ">Produtos</label>
                                        <div className="w-1/4 flex ">
                                            <label className="w-2/4">Qtde. Solic.</label>
                                            <label className="w-2/4">Qtde. Liber.</label>
                                        </div>
                                            <Input type='checkbox' className="h-2 w-6 mx-1 invisible" />
                                    </label>
                                    <div className="border rounded-b-lg p-2 -mt-2">

                                        {arraySolicitaProdutos}
                                    </div>
                                </div>


                            </div>


                            <div className="md:flex mb-2">

                                <div className="md:w-2/4 w-full px-3 flex mb-1 items-end">
                                    <DropdownStatus name="status" control={control} options={status} isDisabled={!hasPermissionEstoque} />

                                </div>
                                <div className="md:w-1/4 w-full px-3 flex justify-end items-center ">

                                    <label className="text-title hover:cursor-pointer" onClick={toggle}>Cancelar</label>

                                </div>
                                <div className="md:w-1/4 w-full px-3 flex mb-1 items-end">

                                    <SaveButton type="submit" loading={false}>Salvar</SaveButton>

                                </div>




                            </div>



                        </div>

                    </form>
                </div>
            </div>
        </Modal>
    )
}