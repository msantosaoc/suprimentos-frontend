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

interface Props {
    formData: FormData;
    isOpen: boolean;
    toggle: () => void;
    updateSolicitacao: (solicitacao: UpdateSolicitacao) => void;
    unidades: Unidades[] | undefined;
    produtos: Produto[] | undefined;
    dioptrias: Dioptrias[] | undefined;
    cilindros: Cilindros[] | undefined;
    medicos: Medicos[] | undefined;
};

interface UpdateSolicitacao {
    id: string;
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

interface Unidades {
    name: string;
};

interface Produto {
    name: string;
    categoriaId: string | null;
    marcaId: string | null;
    dioprtiaId: string | null;
    cilindroId: string | null;
    qtdeMin: number | null;
    qtdeMax: number | null;
    unidMedida: string | null;
};

interface Medicos {
    name: string;
};

export default function ModalLioEdit({ formData, cilindros, dioptrias, medicos, produtos, unidades, isOpen, toggle, updateSolicitacao }: Props) {

    const status = [
        {value: 'Em análise', label: 'Em análise'},
        {value: 'Recusado', label: 'Recusado'},
        {value: 'Em compra', label: 'Em compra'},
        {value: 'Disponível', label: 'Disponível'},
        {value: 'Finalizado', label: 'Finalizado'},
    ]

    const schema: ZodType<FormData> = z.object({
        paciente: z.string(),
        dtCirurgia: z.string(),
        lentePrincipal: z.string(),
        dioptria: z.string(),
        cilindro: z.string(),
        lenteReserva: z.string(),
        dioptriaReserva: z.string(),
        cilindroReserva: z.string(),
        medico: z.string(),
        unidade: z.string(),
        solicitante: z.string(),
        injetorCartucho: z.string(),
        dtPagamento: z.string(),
        comprovante: z.string(),
        formCirurgico: z.string(),
        status: z.string(),
        categoria: z.string(),
        id: z.string(),
        resposta: z.string()
    });

    const { register, handleSubmit, formState: { errors }, control, reset } = useForm<FormData>({
        resolver: zodResolver(schema), defaultValues: {
            id: formData.id,
            paciente: formData.paciente,
            dtCirurgia: formData.dtCirurgia,
            lentePrincipal: formData.lentePrincipal,
            dioptria: formData.dioptria,
            cilindro: formData.cilindro,
            lenteReserva: formData.lenteReserva,
            dioptriaReserva: formData.dioptriaReserva,
            cilindroReserva: formData.cilindroReserva,
            medico: formData.medico,
            unidade: formData.unidade,
            solicitante: formData.solicitante,
            injetorCartucho: formData.injetorCartucho,
            dtPagamento: formData.dtPagamento,
            comprovante: formData.comprovante,
            formCirurgico: formData.formCirurgico,
            status: formData.status,
            resposta: formData.resposta
        }
    })


    console.log(formData)
    console.log(errors)

    const submitData = (data: FormData) => {
        let {id, resposta, status } = data;
        let values = {
            id,
            resposta,
            status
        };
        updateSolicitacao(values);
    };
    useEffect(() => {

        reset({
            ...formData,
            dtCirurgia: moment(formData.dtCirurgia).format('YYYY-MM-DD'),
            dtPagamento: moment(formData.dtPagamento).format('YYYY-MM-DD')
        })
    }, [isOpen, reset])

    return (
        <Modal size='lg' isOpen={isOpen} toggle={toggle} className="">
            <div className="md:w-full flex-col justify-between p-8 bg-white rounded-xl border-none shadow-xl">
                <div className="border-b w-full ">
                    <h1 className="text-2xl text-title font-semibold pb-4">Formulário de Solicitação de LIO</h1>
                    {/* <label className="text-base text-subTitle pb-4">Acrescente no formulário os dados do(a) Paciente e a Lente vendida.</label> */}
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
                                    <input {...register("injetorCartucho")} disabled className="appearance-none block  w-full bg-grey-lighter text-grey-darker text-sm border border-grey-lighter rounded-lg py-2 px-2 mb-3" id="grid-name" placeholder="Escreva" />

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
                                    <textarea {...register("resposta")} disabled rows={4} className="appearance-none block min-h-[105px]  w-full bg-grey-lighter text-grey-darker text-sm border border-grey-lighter rounded-lg py-2 px-2 mb-1 " id="grid-name" placeholder="Insira uma resposta para o solicitante" />                                </div>

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
                                        <ViewFileButton name="formCirurgico" control={control}  />


                                    </div>

                                </div>
                            </div>

                            <div className="md:flex mb-2">

                                <div className="md:w-1/4 w-full px-3 flex mb-1 items-end">
                                    {/* <CancelButton onClick={toggle}>Cancelar</CancelButton> */}
                                    <DropdownStatus name="status" control={control} options={status} isDisabled={true} />

                                </div>
                                <div className="md:w-3/4 w-full px-3 flex justify-end items-center ">

                                    {/* <SaveButton type="submit">Enviar</SaveButton> */}
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