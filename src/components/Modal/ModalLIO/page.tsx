'use client';
import CancelButton from "@/components/Button/CancelButton";
import SaveButton from "@/components/Button/SaveButton";
import UploadButton from "@/components/Button/UploadButton";
import { Modal } from "reactstrap";
import { ZodType, z } from "zod";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'
import SelectComponent from "@/components/Select/SelectComponent";
        


interface Props {
    isOpen: boolean;
    toggle: () => void;
    unidades: Unidades[] | undefined;
    produtos: Produto[] | undefined;
    dioptrias: Dioptrias[] | undefined;
    cilindros: Cilindros[] | undefined;
    medicos: Medicos[] | undefined;
    user: User | null;
    categorias: Categoria[] | undefined;
    createSolicitacao: (solicitcao: FormData) => void;
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

interface Categoria {
    id: string;
    name: string;
}

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
    dtCirurgia: string;
    lentePrincipal: string;
    dioptria: string;
    cilindro?: string;
    lenteReserva?: string;
    dioptriaReserva?: string;
    cilindroReserva?: string;
    medico: string;
    unidade: string;
    categoria: {
        id: string;
        name: string;
    };
    solicitante: string;
    injetorCartucho?: string;
    dtPagamento: string;
    comprovante: string;
    formCirurgico: string;
    status?: string;
    resposta?: string;
}

export default function ModalLIO({ isOpen, toggle, unidades, produtos, dioptrias, cilindros, medicos, user, categorias, createSolicitacao }: Props) {

    

    const schema: ZodType<FormData> = z.object({
        paciente: z.string().nonempty('Nome do paciente é obrigatório'),
        dtCirurgia: z.string(),
        lentePrincipal: z.string().nonempty('Este campo é obrigatório'),
        dioptria: z.string().nonempty('Este campo é obrigatório'),
        cilindro: z.string().optional(),
        lenteReserva: z.string(),
        dioptriaReserva: z.string(),
        cilindroReserva: z.string().optional(),
        medico: z.string().nonempty('Este campo é obrigatório'),
        unidade: z.string().nonempty('Este campo é obrigatório'),
        solicitante: z.string().nonempty('Este campo é obrigatório'),
        injetorCartucho: z.string(),
        dtPagamento: z.string().nonempty(),
        comprovante: z.string().nonempty(),
        formCirurgico: z.string().nonempty(),
        categoria: z.object({
            id: z.string(),
            name: z.string()
        }),
        status: z.string()
    }).refine(data=> {
        if(data.lentePrincipal.includes("Tóric")) {
            return data.cilindro !== undefined && data.cilindro !== '';
        }
        return true;
    }, {
        message: 'Cilindro é obrigatório quando lente é preenchido',
        path: ['cilindro']
    }).refine(data=> {
        if(data.lenteReserva.includes("Tóric")) {
            return data.cilindroReserva !== undefined && data.cilindroReserva !== '';
        }
        return true;
    }, {
        message: 'Cilindro é obrigatório quando lente é preenchido',
        path: ['cilindroReserva']
    })

    

    const { register, handleSubmit, formState: { errors }, control, watch } = useForm<FormData>({
        resolver: zodResolver(schema), defaultValues: {
            paciente: '',
            dtCirurgia: '',
            lentePrincipal: '',
            dioptria: '',
            cilindro: '',
            lenteReserva: '',
            dioptriaReserva: '',
            cilindroReserva: '',
            medico: '',
            unidade: '',
            solicitante: user?.user?.id ? user.user.id : 'Teste',
            injetorCartucho: '',
            dtPagamento: '',
            comprovante: '',
            formCirurgico: '',
            status: 'Não visto',
            resposta: '',
            categoria: {id: 'cljhn5we20002vvmcpxedty2c', name: 'Lio'}
        }
    });

    const submitData = (data: FormData) => {
        // createSolicitacao(data);
        console.log('lio',data)
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
                                    </label> 
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
                                    <SelectComponent name="cilindro" control={control} isDisabled={!watch('lentePrincipal')?.includes("Tórica")} options={cilindros} />

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
                                    <SelectComponent name="cilindroReserva" control={control} isDisabled={!watch('lenteReserva')?.includes("Tórica")} options={cilindros} />

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
                                    <SelectComponent name="unidade" control={control} options={unidades} placeholder="Selecione" />
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
                                    <label className="block tracking-wide text-subTitle text-center text-xs font-semibold mb-2 " >
                                        Comprovante <span className={`text-red-500 ${!errors.comprovante && 'hidden'}`}>*</span>
                                    </label>
                                    <UploadButton name="comprovante" control={control} />
                                   


                                </div>
                                <div className="md:w-1/4 w-full px-3">
                                    <label className="block tracking-wide text-subTitle text-center text-xs font-semibold mb-2 " >
                                        Form. Cirúrgico <span className={`text-red-500 ${!errors.formCirurgico && 'hidden'}`}>*</span>
                                    </label>
                                    <UploadButton name="formCirurgico" control={control} />
                                    

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