'use client';

import { ZodType, z } from "zod";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'
import CancelButton from "@/components/Button/CancelButton";
import SaveButton from "@/components/Button/SaveButton";
import UploadButton from "@/components/Button/UploadButton";
import SelectComponent from "@/components/Select/SelectComponent";
import { Modal } from "reactstrap";
import { useEffect } from "react";
import moment from 'moment';
import ViewFileButton from "@/components/Button/ViewFileButton";
import DropdownStatus from "@/components/Dropdown/DropdownStatus";
import { BuscaSolicitacaoInicial, Produtos, SolicitacaolioEdit, Unidades } from "@/lib/types/global";

interface Props {
    formData: BuscaSolicitacaoInicial;
    isOpen: boolean;
    toggle: () => void;
    updateSolicitacao: (solicitacao: SolicitacaolioEdit) => void;
    unidades: Unidades[] | undefined;
    produtos: Produtos[] | undefined;
    dioptrias: Dioptrias[] | undefined;
    cilindros: Cilindros[] | undefined;
    medicos: Medicos[] | undefined;
    user?: User | null;
    btnLoadingLioEdit?: boolean;
};

interface UpdateSolicitacao {
    id: string;
    idSolicitacaoInicial: number;
    resposta?: string;
    status?: string;
};

type FormData = {
    id: string;
    paciente?: string;
    dtCirurgia?: string;
    lentePrincipal?: string;
    dioptria?: string;
    cilindro?: string;
    lenteReserva?: string;
    dioptriaReserva?: string;
    cilindroReserva?: string;
    medico?: string;
    unidade?: string;
    solicitante?: string;
    injetorCartucho?: string;
    dtPagamento?: string;
    comprovante?: string;
    formCirurgico?: string;
    status?: string;
    resposta?: string;
    categoria?: string;
    createdAt?: string;
    updatedAt?: string;
};



interface Dioptrias {
    name: string;
};

interface Cilindros {
    name: string;
}





interface Medicos {
    name: string;
};

export default function ModalLioEdit({ formData, cilindros, dioptrias, medicos, produtos, unidades, isOpen, user, toggle, updateSolicitacao, btnLoadingLioEdit }: Props) {

    const status = [
        { value: 'Em análise', label: 'Em análise' },
        { value: 'Recusado', label: 'Recusado' },
        { value: 'Em compra', label: 'Em compra' },
        { value: 'Disponível', label: 'Disponível' },
        { value: 'Finalizado', label: 'Finalizado' },
    ];

    const role = user?.user?.role;
    const hasPermissionEstoque = role === "ESTOQUE" ? true : false;

    const schema: ZodType<SolicitacaolioEdit> = z.object({
        id: z.string(),
        idSolicitacaoInicial: z.number(),
        resposta: z.string(),
        status: z.string(),
    }).transform((fields) => ({
        ...fields,
        idSolicitacaoInicial: formData.id
    }))

    const { register, handleSubmit, formState: { errors }, control, reset } = useForm<any>({
        resolver: zodResolver(schema), defaultValues: {
            id: formData.SolicitacaoLio?.id,
            paciente: formData.SolicitacaoLio?.paciente,
            dtCirurgia: formData.SolicitacaoLio?.dtCirurgia,
            lentePrincipal: formData.SolicitacaoLio?.lentePrincipal,
            dioptria: formData.SolicitacaoLio?.dioptria,
            cilindro: formData.SolicitacaoLio?.cilindro,
            lenteReserva: formData.SolicitacaoLio?.lenteReserva,
            dioptriaReserva: formData.SolicitacaoLio?.dioptriaReserva,
            cilindroReserva: formData.SolicitacaoLio?.cilindroReserva,
            medico: formData.SolicitacaoLio?.medico,
            unidade: formData.Unidade.name,
            solicitante: '',
            injetorCartucho: formData.SolicitacaoLio?.injetorCartucho,
            dtPagamento: formData.SolicitacaoLio?.dtPagamento,
            comprovante: formData.SolicitacaoLio?.comprovante,
            formCirurgico: formData.SolicitacaoLio?.formCirurgico,
            status: formData.SolicitacaoLio?.status,
            resposta: formData.SolicitacaoLio?.resposta,
            idSolicitacaoInicial: formData.id
        }
    })


    
    
    const submitData = (data: any) => {
        // const idSolicitacaoInicial = formData?.id;
        console.log(errors)
        let { id, resposta, status, idSolicitacaoInicial } = data;
        let values = {
            id,
            idSolicitacaoInicial,
            resposta,
            status
        };
        updateSolicitacao(values);
    };
    useEffect(() => {

        reset({
            ...formData.SolicitacaoLio,
            idSolicitacaoInicial: formData.id,
            unidade: formData.Unidade.name,
            solicitante: formData.User.name,
            dtCirurgia: moment(formData.SolicitacaoLio?.dtCirurgia).format('YYYY-MM-DD'),
            dtPagamento: moment(formData.SolicitacaoLio?.dtPagamento).format('YYYY-MM-DD')
        })
    }, [isOpen, reset])

    return (
        <Modal size='lg' isOpen={isOpen} toggle={toggle} className="">
            <div className="md:w-full flex-col justify-between p-8 bg-white rounded-xl border-none shadow-xl">
                <div className="border-b w-full flex justify-between">
                    <h1 className="text-2xl text-title font-semibold ">Formulário de Solicitação de LIO</h1>
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
                                        Nome do Paciente
                                    </label>
                                    <input {...register("paciente", { required: true })} disabled className="appearance-none block  w-full bg-grey-lighter text-grey-darker text-sm border border-grey-lighter rounded-lg py-2 px-2 mb-1 " id="grid-name" placeholder="Nome completo do paciente" />

                                </div>

                                <div className="md:w-1/4 w-full px-3 relative">
                                    <label className="block tracking-wide whitespace-nowrap text-subTitle text-xs font-semibold mb-2 " htmlFor="grid-name">
                                        Data da Cirurgia
                                    </label>
                                    <input {...register("dtCirurgia")} type="date" disabled className="appearance-none block  w-full bg-grey-lighter text-grey-darker text-sm border border-grey-lighter rounded-lg py-2 px-2 mb-1" id="grid-name" placeholder="Selecione" />

                                </div>
                            </div>

                            <div className="md:flex mb-2 ">
                                <div className="md:w-2/4 w-full px-3 ">
                                    <label className="block tracking-wide text-subTitle text-xs font-semibold mb-2 " htmlFor="lentePrincipal">
                                        Lente Principal
                                    </label>
                                    <SelectComponent name="lentePrincipal" isDisabled={true} control={control} options={produtos} />
                                </div>
                                <div className="md:w-1/4 w-full px-3">
                                    <label className="block tracking-wide text-subTitle text-xs font-semibold mb-2 " htmlFor="grid-name">
                                        Dioptria
                                    </label>
                                    <SelectComponent name="dioptria" isDisabled={true} control={control} options={dioptrias} />

                                </div>
                                <div className="md:w-1/4 w-full px-3">
                                    <label className="block tracking-wide text-subTitle text-xs font-semibold mb-2 " htmlFor="grid-name">
                                        Cilindro
                                    </label>
                                    <SelectComponent name="cilindro" isDisabled={true} control={control} options={cilindros} />

                                </div>

                            </div>

                            <div className="md:flex mb-2 ">
                                <div className="md:w-2/4 w-full px-3">
                                    <label className="block tracking-wide text-subTitle text-xs font-semibold mb-2 " htmlFor="grid-name">
                                        Lente Reserva
                                    </label>
                                    <SelectComponent name="lenteReserva" isDisabled={true} control={control} options={produtos} />

                                </div>
                                <div className="md:w-1/4 w-full px-3">
                                    <label className="block tracking-wide text-subTitle text-xs font-semibold mb-2 " htmlFor="grid-name">
                                        Dioptria
                                    </label>
                                    <SelectComponent name="dioptriaReserva" isDisabled={true} control={control} options={dioptrias} />

                                </div>
                                <div className="md:w-1/4 w-full px-3">
                                    <label className="block tracking-wide text-subTitle text-xs font-semibold mb-2 " htmlFor="grid-name">
                                        Cilindro
                                    </label>
                                    <SelectComponent name="cilindroReserva" isDisabled={true} control={control} options={cilindros} />

                                </div>

                            </div>

                            <div className="md:flex mb-2">
                                <div className="md:w-3/4 w-full px-3">
                                    <label className="block tracking-wide text-subTitle text-xs font-semibold mb-2 " htmlFor="grid-name">
                                        Médico(a)
                                    </label>
                                    <SelectComponent name="medico" isDisabled={true} control={control} options={medicos} />

                                </div>
                                <div className="md:w-1/4 w-full px-3">
                                    <label className="block tracking-wide text-subTitle text-xs font-semibold mb-2 " htmlFor="grid-name">
                                        Unidade
                                    </label>
                                    <SelectComponent name="unidade" isDisabled={true} control={control} options={unidades} placeholder="Selecione" />
                                </div>

                            </div>

                            <div className="md:flex mb-2">
                                <div className="md:w-2/4 w-full px-3">
                                    <label className="block tracking-wide text-subTitle text-xs font-semibold mb-2 " htmlFor="grid-name">
                                        Solicitante
                                    </label>
                                    <input {...register("solicitante")} disabled className="appearance-none block  w-full bg-grey-lighter text-grey-darker text-sm border border-grey-lighter rounded-lg py-2 px-2 mb-3" id="grid-name" placeholder="Usuário solicitante" />
                                </div>

                                <div className="md:w-1/4 w-full px-3">
                                    <label className="block tracking-wide text-subTitle text-xs font-semibold mb-2 " htmlFor="grid-name">
                                        Injetor / Cartucho
                                    </label>
                                    <input {...register("injetorCartucho")} disabled className="appearance-none block  w-full bg-grey-lighter text-grey-darker text-sm border border-grey-lighter rounded-lg py-2 px-2 mb-3" id="grid-name" />

                                </div>
                                <div className="md:w-1/4 w-full px-3">
                                    <label className="block tracking-wide text-subTitle text-xs font-semibold mb-2 " htmlFor="grid-name">
                                        Dt. Pagamento
                                    </label>
                                    <input {...register("dtPagamento")} type="date" disabled className="appearance-none block  w-full bg-grey-lighter text-grey-darker text-sm border border-grey-lighter rounded-lg py-2 px-2 mb-3" id="grid-name" placeholder="Selecione" />

                                </div>
                            </div>

                            <div className="md:flex mb-2">
                                <div className="md:w-3/4 w-full px-3">
                                    <label className="block tracking-wide text-subTitle text-xs font-semibold mb-2 " htmlFor="grid-name">
                                        Resposta
                                    </label>
                                    <textarea {...register("resposta")} disabled={!hasPermissionEstoque} placeholder="Insira uma resposta para o soclicitante" rows={4} className="appearance-none block min-h-[105px]  w-full bg-grey-lighter text-grey-darker text-sm border border-grey-lighter rounded-lg py-2 px-2 mb-1 " id="grid-name" />
                                </div>

                                <div className="md:w-1/4 w-full px-3 flex-col ">
                                    <div className=" w-full">
                                        <label className="block tracking-wide text-subTitle text-center text-xs font-semibold mb-2 " >
                                            Comprovante
                                        </label>

                                        <ViewFileButton name="comprovante" control={control} />



                                    </div>
                                    <div className=" w-full">
                                        <label className="block tracking-wide text-subTitle text-center text-xs font-semibold mb-2 " >
                                            Form. Cirúrgico
                                        </label>
                                        <ViewFileButton name="formCirurgico" control={control} />


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

                                    <SaveButton type="submit" loading={btnLoadingLioEdit}>Salvar</SaveButton>

                                </div>



                            </div>

                        </div>
                    </form>
                </div>
            </div>
        </Modal>
    )
}