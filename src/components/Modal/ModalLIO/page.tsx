'use client';
import CancelButton from "@/components/Button/CancelButton";
import SaveButton from "@/components/Button/SaveButton";
import UploadButton from "@/components/Button/UploadButton";
import { Modal } from "reactstrap";
import { ZodType, z } from "zod";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'
import SelectItems from "@/components/Select/SelectItems";
import { useEffect, useRef, useState } from "react";
import SelectComponent from "@/components/Select/SelectComponent";
import { useSession} from 'next-auth/react';


interface Props {
    isOpen: boolean;
    toggle: () => void;
    unidades: Unidades[] | undefined;
    produtos: Produto[] | undefined;
    dioptrias: Dioptrias[] | undefined;
    cilindros: Cilindros[] | undefined;
    medicos: Medicos[] | undefined;
    user: User | null;
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

interface User {
    expires?: string;
    user?: {
        id: string;
        name: string;
        email: string;
        accessToken: string;
    }
};

type FormData = {
    paciente: string;
    dtCirurgia: Date;
    lentePrincipal: string;
    dioptria: string;
    cilindro: string;
    lenteReserva?: string;
    dioptriaReserva?: string;
    cilindroReserva?: string;
    medico: string;
    unidade: string;
    solicitante: string;
    injetorCartucho?: string;
    dtPagamento: Date;
    status?: string;
}

export default function ModalLIO({ isOpen, toggle, unidades, produtos, dioptrias, cilindros, medicos, user }: Props) {

    

    const schema: ZodType<FormData> = z.object({
        paciente: z.string().min(1, "Nome completo do paciente"),
        dtCirurgia: z.coerce.date().refine((date) => date > new Date(), "Deve ser maior que hoje"),
        lentePrincipal: z.string().min(1),
        dioptria: z.string().min(1),
        cilindro: z.string().min(1),
        lenteReserva: z.string(),
        dioptriaReserva: z.string(),
        cilindroReserva: z.string(),
        medico: z.string().min(1),
        unidade: z.string().min(1),
        solicitante: z.string().min(1),
        injetorCartucho: z.string(),
        dtPagamento: z.coerce.date().refine((date) => date <= new Date(), "Deve ser maior que hoje")
    });
    // .transform((fields) => ({
        
    //     solicitante: fields.solicitante,
    //     injetorCartucho: fields.injetorCartucho
    // }))

    const [valorInputUnidade, setValorInputUnidade] = useState("");
    const [valorInputLentePrincipal, setValorInputLentePrincipal] = useState("");
    const [valorInputLenteReserva, setValorInputLenteReserva] = useState("");
    const [valorInputDioptria, setValorInputDioptria] = useState('');
    const [valorInputDioptriaReserva, setValorInputDioptriaReserva] = useState("");
    const [valorInputCilindro, setValorInputCilindro] = useState("");
    const [valorInputCilindroReserva, setValorInputCilindroReserva] = useState("");
    const [valorInputMedico, setValorInputMedico] = useState("");

    const { register, handleSubmit, formState: { errors }, control } = useForm<FormData>({
        resolver: zodResolver(schema), defaultValues: {
            paciente: '',
            dtCirurgia: undefined,
            lentePrincipal: '',
            dioptria: '',
            cilindro: '',
            lenteReserva: '',
            dioptriaReserva: '',
            cilindroReserva: '',
            medico: '',
            unidade: '',
            solicitante: user?.user?.name ? user.user.name : 'Teste',
            injetorCartucho: '',
            dtPagamento: undefined
        }
    });

    const submitData = (data: FormData) => {
        console.log(data)
        alert(data);
    };
    console.log(errors)

    const handleInputChangeUnidade = (valor: string) => {
        setValorInputUnidade(valor);
    };

    const handleInputChangeLentePrincipal = (valor: string) => {
        setValorInputLentePrincipal(valor);
    };
    const handleInputChangeLenteReserva = (valor: string) => {
        setValorInputLenteReserva(valor);
    };
    const handleInputChangeDioptria = (valor: string) => {
        setValorInputDioptria(valor);
    };
    const handleInputChangeDioptriaReserva = (valor: string) => {
        setValorInputDioptriaReserva(valor);
    };

    const handleInputChangeCilindro = (valor: string) => {
        setValorInputCilindro(valor);
    };
    const handleInputChangeCilindroReserva = (valor: string) => {
        setValorInputCilindroReserva(valor);
    };

    const handleInputChangeMedico = (valor: string) => {
        setValorInputMedico(valor);
    };

    

    
    
    return (
        <Modal size='lg' isOpen={isOpen} toggle={toggle} className="">
            <div className="md:w-full flex-col justify-between p-8 bg-white rounded-xl border-none shadow-xl">
                <div className="border-b w-full ">
                    <h1 className="text-2xl text-title font-semibold">Solicitar LIO</h1>
                    <label className="text-base text-subTitle pb-4">Acrescente no formulário os dados do(a) Paciente e a Lente vendida.</label>
                </div>
                <div>
                    <form onSubmit={handleSubmit(submitData)}>
                        <div className="flex flex-col my-2 relative">

                            <div className="md:flex mb-2 ">
                                <div className="md:w-3/4 w-full px-3 ">
                                    <label className="block tracking-wide text-subTitle text-xs font-semibold mb-2 " htmlFor="grid-name" >
                                        Nome do Paciente <span className={`text-red-500 ${!errors.paciente && 'hidden'}`}>*</span>
                                    </label>
                                    <input {...register("paciente", { required: true })} className="appearance-none block  w-full bg-grey-lighter text-grey-darker text-sm border border-grey-lighter rounded-lg py-2 px-2 mb-1 " id="grid-name" placeholder="Nome completo do paciente" />
                                    
                                </div>

                                <div className="md:w-1/4 w-full px-3 relative">
                                    <label className="block tracking-wide whitespace-nowrap text-subTitle text-xs font-semibold mb-2 " htmlFor="grid-name">
                                        Data da Cirurgia <span className={`text-red-500 ${!errors.dtCirurgia?.message && 'hidden'}`}>*</span>
                                    </label>
                                    <input {...register("dtCirurgia")} type="date" className="appearance-none block  w-full bg-grey-lighter text-grey-darker text-sm border border-grey-lighter rounded-lg py-2 px-2 mb-1" id="grid-name" placeholder="Selecione" />
                                    
                                </div>
                            </div>

                            <div className="md:flex mb-2 ">
                                <div className="md:w-2/4 w-full px-3 ">
                                    <label className="block tracking-wide text-subTitle text-xs font-semibold mb-2 " htmlFor="lentePrincipal">
                                        Lente Principal <span className={`text-red-500 ${!errors.lentePrincipal?.message && 'hidden'}`}>*</span>
                                    </label> {/* <SelectItems id="lentePrincipal" name="lentePrincipal" placeholder="Selecione" register={register} values={produtos} errors={errors.lentePrincipal?.message} onInputChange={handleInputChangeLentePrincipal} value={valorInputLentePrincipal} /> */}
                                    <SelectComponent name="lentePrincipal" control={control} options={produtos} />
                                </div>
                                <div className="md:w-1/4 w-full px-3">
                                    <label className="block tracking-wide text-subTitle text-xs font-semibold mb-2 " htmlFor="grid-name">
                                        Dioptria <span className={`text-red-500 ${!errors.dioptria?.message && 'hidden'}`}>*</span>
                                    </label>
                                    <SelectComponent name="dioptria" control={control} options={dioptrias} />

                                </div>
                                <div className="md:w-1/4 w-full px-3">
                                    <label className="block tracking-wide text-subTitle text-xs font-semibold mb-2 " htmlFor="grid-name">
                                        Cilindro <span className={`text-red-500 ${!errors.cilindro?.message && 'hidden'}`}>*</span>
                                    </label>
                                    <SelectComponent name="cilindro" control={control} options={cilindros} />

                                </div>

                            </div>

                            <div className="md:flex mb-2 ">
                                <div className="md:w-2/4 w-full px-3">
                                    <label className="block tracking-wide text-subTitle text-xs font-semibold mb-2 " htmlFor="grid-name">
                                        Lente Reserva <span className={`text-red-500 ${!errors.lenteReserva?.message && 'hidden'}`}>*</span>
                                    </label>
                                    <SelectComponent name="lenteReserva" control={control} options={produtos} />

                                </div>
                                <div className="md:w-1/4 w-full px-3">
                                    <label className="block tracking-wide text-subTitle text-xs font-semibold mb-2 " htmlFor="grid-name">
                                        Dioptria <span className={`text-red-500 ${!errors.dioptriaReserva?.message && 'hidden'}`}>*</span>
                                    </label>
                                    <SelectComponent name="dioptriaReserva" control={control} options={dioptrias} />

                                </div>
                                <div className="md:w-1/4 w-full px-3">
                                    <label className="block tracking-wide text-subTitle text-xs font-semibold mb-2 " htmlFor="grid-name">
                                        Cilindro <span className={`text-red-500 ${!errors.cilindroReserva?.message && 'hidden'}`}>*</span>
                                    </label>
                                    <SelectComponent name="cilindroReserva" control={control} options={cilindros} />

                                </div>

                            </div>

                            <div className="md:flex mb-2">
                                <div className="md:w-3/4 w-full px-3">
                                    <label className="block tracking-wide text-subTitle text-xs font-semibold mb-2 " htmlFor="grid-name">
                                        Médico(a) <span className={`text-red-500 ${!errors.medico?.message && 'hidden'}`}>*</span>
                                    </label>
                                    <SelectComponent name="medico" control={control} options={medicos} />

                                </div>
                                <div className="md:w-1/4 w-full px-3">
                                    <label className="block tracking-wide text-subTitle text-xs font-semibold mb-2 " htmlFor="grid-name">
                                        Unidade <span className={`text-red-500 ${!errors.unidade?.message && 'hidden'}`}>*</span>
                                    </label>
                                    <SelectComponent name="unidade" control={control} options={unidades} />
                                </div>

                            </div>

                            <div className="md:flex mb-2">
                                <div className="md:w-2/4 w-full px-3">
                                    <label className="block tracking-wide text-subTitle text-xs font-semibold mb-2 " htmlFor="grid-name">
                                        Solicitante
                                    </label>
                                        <input {...register("solicitante")} value={user?.user?.name} disabled className="appearance-none block  w-full bg-grey-lighter text-grey-darker text-sm border border-grey-lighter rounded-lg py-2 px-2 mb-3" id="grid-name" placeholder="Usuário solicitante" />
                                </div>

                                <div className="md:w-1/4 w-full px-3">
                                    <label className="block tracking-wide text-subTitle text-xs font-semibold mb-2 " htmlFor="grid-name">
                                        Injetor / Cartucho
                                    </label>
                                    <input {...register("injetorCartucho")} className="appearance-none block  w-full bg-grey-lighter text-grey-darker text-sm border border-grey-lighter rounded-lg py-2 px-2 mb-3" id="grid-name" placeholder="Escreva" />

                                </div>
                                <div className="md:w-1/4 w-full px-3">
                                    <label className="block tracking-wide text-subTitle text-xs font-semibold mb-2 " htmlFor="grid-name">
                                        Dt. Pagamento <span className={`text-red-500 ${!errors.dtPagamento?.message && 'hidden'}`}>*</span>
                                    </label>
                                    <input {...register("dtPagamento")} type="date" className="appearance-none block  w-full bg-grey-lighter text-grey-darker text-sm border border-grey-lighter rounded-lg py-2 px-2 mb-3" id="grid-name" placeholder="Selecione" />

                                </div>
                            </div>

                            <div className="md:flex mb-2">
                                <div className="md:w-1/4 w-full px-3">
                                    <label className="block tracking-wide text-subTitle text-xs font-semibold mb-2 " >
                                        Comprovante
                                    </label>
                                    <UploadButton>Anexar</UploadButton>

                                </div>
                                <div className="md:w-1/4 w-full px-3">
                                    <label className="block tracking-wide text-subTitle text-xs font-semibold mb-2 " >
                                        Form. Cirúrgico
                                    </label>
                                    <UploadButton>Anexar</UploadButton>

                                </div>
                                <div className="md:w-1/4 w-full px-3 flex mb-1 items-end">
                                    <CancelButton onClick={toggle}>Cancelar</CancelButton>

                                </div>
                                <div className="md:w-1/4 w-full px-3 flex mb-1 items-end">

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