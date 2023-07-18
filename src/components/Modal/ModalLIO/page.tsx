'use client';
import CancelButton from "@/components/Button/CancelButton";
import SaveButton from "@/components/Button/SaveButton";
import UploadButton from "@/components/Button/UploadButton";
import { Modal } from "reactstrap";
import { ZodType, z } from "zod";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'
import SelectComponent from "@/components/Select/SelectComponent";
import { Categoria, FormData, Medico } from "@/lib/types/global";
import SelectComponentProdutos from "@/components/Select/Produtos/SelectComponentProdutos";
import { useEffect } from "react";
import { useSession } from 'next-auth/react';


interface Props {
    isOpen: boolean;
    toggle: () => void;
    unidades: Unidades[] | undefined;
    produtos: Produto[] | undefined;
    dioptrias: Dioptrias[] | undefined;
    cilindros: Cilindros[] | undefined;
    medicos: Medico[] | undefined;
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
    id: number;
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




export default function ModalLIO({ isOpen, toggle, unidades, produtos, dioptrias, cilindros, medicos, user, categorias, createSolicitacao }: Props) {

   

    const schema: ZodType<FormData> = z.object({
        paciente: z.string().nonempty('Nome do paciente é obrigatório'),
        dtCirurgia: z.string(),
        lentePrincipal: z.string().nonempty('Este campo é obrigatório'),
        dioptria: z.string().nonempty('Este campo é obrigatório'),
        cilindro: z.string().optional(),
        lenteReserva: z.string().optional(),
        dioptriaReserva: z.string().optional(),
        cilindroReserva: z.string().optional(),
        medico: z.string().nonempty('Este campo é obrigatório'),
        unidade: z.number(),
        solicitante: z.string(),
        injetorCartucho: z.string().optional(),
        dtPagamento: z.string().nonempty(), 
        comprovante: z.string().nonempty(),
        formCirurgico: z.string().nonempty(),
        categoria: z.object({
            id: z.coerce.number(),
            name: z.string()
        }),
        status: z.string().optional(),
        resposta: z.string().optional()
    }).refine(data=> {
        if(data.lentePrincipal.includes("Tóric")) {
            return data.cilindro !== undefined && data.cilindro !== '';
        }
        return true;
    }, {
        message: 'Cilindro é obrigatório quando lente é preenchido',
        path: ['cilindro']
    }).refine(data=> {
        if(data.lenteReserva?.includes("Tóric")) {
            return data.cilindroReserva !== undefined && data.cilindroReserva !== '';
        }
        return true;
    }, {
        message: 'Cilindro é obrigatório quando lente é preenchido',
        path: ['cilindroReserva']
    }).transform((fields) => ({
        ...fields,
        solicitante: user?.user?.id ? user.user.id : "Teste",
        // unidade: {id: fields.unidade.id, name: fields.unidade.name}
        categoria: {id: 6, name: 'Lio'}
    }))

    

    const { register, handleSubmit, formState: { errors }, control, watch, reset } = useForm<FormData>({
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
            solicitante: user?.user?.id ? user.user.name : "Teste",
            injetorCartucho: '',
            dtPagamento: '',
            comprovante: '',
            formCirurgico: '',
            status: 'Não visto',
            resposta: '',
        }
    });

    const arrayMedicos = medicos?.map(item=> ({name: item.name}));
   
console.log(errors)
useEffect(() => {

    reset({
        solicitante: user?.user?.id ? user.user.name : "Teste",
        categoria: {id: 2, name: 'Lio'},
        status: 'Não visto'
    });
}, [isOpen, reset]);

    const submitData = (data: FormData) => {
        createSolicitacao(data);
        console.log('lio',data)
    };

    console.log(watch('unidade'))
    
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
                                    <SelectComponent name="medico" control={control} options={arrayMedicos} />

                                </div>
                                <div className="md:w-1/4 w-full px-3">
                                    <label className="block tracking-wide text-subTitle text-xs font-semibold mb-2 " htmlFor="grid-name">
                                        Unidade <span className={`text-red-500 ${!errors.unidade?.message && 'hidden'}`}>*</span>
                                    </label>
                                    <SelectComponentProdutos name="unidade" control={control} options={unidades} placeholder="Selecione" />
                                </div>

                            </div>

                            <div className="md:flex mb-2">
                                <div className="md:w-2/4 w-full px-3">
                                    <label className="block tracking-wide text-subTitle text-xs font-semibold mb-2 " htmlFor="grid-name">
                                        Solicitante
                                    </label>
                                        <input {...register("solicitante")}  disabled className="appearance-none block  w-full bg-grey-lighter text-grey-darker text-sm border border-grey-lighter rounded-lg py-2 px-2 mb-3" id="grid-name" placeholder="Usuário solicitante" />
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