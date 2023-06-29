'use client';

import Card from "@/components/Card/Card";
import Sidebar from "@/components/Sidebar/Sidebar";
import {  ShoppingCart } from 'lucide-react'
import Categorias from "@/components/Categorias/page";
import ModalLIO from "@/components/Modal/ModalLIO/page";
import { useEffect, useState } from "react";
import { api } from "@/services/api";
import { useSession} from 'next-auth/react';



interface SolicitacaoProps {
    id: string;
    paciente: string;
    dtCirurgia: string;
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
    dtPagamento: string;
    comprovante?: string;
    formCirurgico?: string;
    status: string;
};

interface CreateSolicitacaoProps {
    paciente: string;
    dtCirurgia: string;
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
    dtPagamento: string;
    comprovante: string;
    formCirurgico: string;
    status: string;
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

interface UnidadesProps {
    name: string;
};

interface Dioptria {
    name: string;
};

interface Cilindro {
    name: string;
};

interface Medico {
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
}

export default function Solicitacoes() {
    
    const { data:session } = useSession();

    const mock: SolicitacaoProps[] = [{
        id: '1',
        paciente: 'Maria Tereza Cristina',
        lentePrincipal: "ASPHINA +20.0D",
        dioptria: '',
        cilindro: '',
        lenteReserva: 'Sansar AR40e',
        dioptriaReserva: '',
        cilindroReserva: '',
        medico: "Ana Paula Gonçalves",
        unidade: "Barra",
        solicitante: 'Bruna Eduarda',
        injetorCartucho: '',
        dtCirurgia: '04/08/2023',
        dtPagamento: '22/05/2023',
        status: "Não visto"
    }, {
        id: '2',
        paciente: 'Maria Tereza Cristina',
        lentePrincipal: "ASPHINA +20.0D",
        dioptria: '',
        cilindro: '',
        lenteReserva: 'Sansar AR40e',
        dioptriaReserva: '',
        cilindroReserva: '',
        medico: "Ana Paula Gonçalves",
        unidade: "Barra",
        solicitante: 'Bruna Eduarda',
        injetorCartucho: '',
        dtCirurgia: '04/08/2023',
        dtPagamento: '22/05/2023',
        status: "Disponível"
    }];


    const [modalSolicitaLio, setModalSolicitaLio] = useState(false);
    const toggleModalSolicitaLio = () => setModalSolicitaLio(!modalSolicitaLio);

    const [unidades, setUnidades] = useState<UnidadesProps[]>();

    const [produtos, setProdutos] = useState<Produto[]>();

    const [dioptrias, setDioprias] = useState<Dioptria[]>();

    const [cilindros, setCilindros] = useState<Cilindro[]>();

    const [medicos, setMedicos] = useState<Medico[]>();

    const [solicitacoes, setSolicitacoes] = useState<SolicitacaoProps[]>();

    async function buscarSolicitacoes() {
        const solicitacoes = await api.get('/api/solicitacao').then(response => setSolicitacoes(response.data)).catch(error => console.log(error));

        return solicitacoes
    }

    async function buscarUnidades() {
        const unidades = await api.get('api/unidade').then(response => setUnidades(response.data)).catch(error => console.log(error));

        return unidades;

    };

    async function buscarDioptrias() {
        const dioptrias = await api.get('/api/dioptria').then(response => setDioprias(response.data)).catch(error => console.log(error));

        return dioptrias;
    };

    async function buscarCilindros() {
        const cilindros = await api.get('/api/cilindro').then(response => setCilindros(response.data)).catch(error => console.log(error));

        return cilindros;
    };
    
    async function buscarProdutos() {
        const produtos = await api.get('/api/produto').then(response => setProdutos(response.data)).catch(error => console.log(error));

        return produtos;
    };

    async function buscarMedicos() {
        const medicos = await api.get('/api/medico').then(response => setMedicos(response.data)).catch(error => console.log(error));

        return medicos;
    };

    

    useEffect(() => {
        buscarSolicitacoes();
        buscarUnidades();
        buscarDioptrias();
        buscarCilindros();
        buscarProdutos();
        buscarMedicos();
    }, []);

    async function createSolicitacao(solicitacao: CreateSolicitacaoProps) {
        await api.post('/api/solicitacao', solicitacao).then(response => mock.push(response.data)).catch(error => console.log(error))
    }

    return (
        <div>
            <ModalLIO isOpen={modalSolicitaLio} toggle={toggleModalSolicitaLio } unidades={unidades} produtos={produtos} dioptrias={dioptrias} cilindros={cilindros} medicos={medicos} user={session}/>
            <div className="h-screen w-screen flex flex-col bg-background pl-[4.3rem]">
                <div className="absolute top-0 left-0 w-screen h-sreen overflow-hidden">
                    <Sidebar />

                </div>
                <div className="w-full h-[8%] flex  items-end pl-20 ">
                    <h1 className="font-semibold text-3xl">Dashboard - Solicitações</h1>
                </div>

                <div className="w-full h-[10%] px-10 flex  ">

                    <div className="w-full h-full m-auto rounded-xl shadow-xl bg-white flex items-center px-3">

                        <div className="h-full w-1/2  flex items-center gap-3">
                            <Categorias />

                        </div>
                        <div className="h-full w-1/2 flex items-center justify-end  gap-3">
                            <div className="h-20 w-20 bg-light-gray flex flex-col justify-end items-center rounded-md relative pb-1 hover:scale-110 hover:cursor-pointer duration-200  ">
                                <ShoppingCart className="text-gray-menu-icon " size={48} onClick={toggleModalSolicitaLio} />
                                <label className="text-center font-semibold text-gray-menu-icon text-sm hover:cursor-pointer">Solicitar</label>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="w-full h-[82%] px-10 py-3  ">
                    <div className="w-full h-full m-auto rounded-xl shadow-xl flex flex-col bg-white px-3 pt-2">
                        <div className="grid grid-cols-9 py-2 ">
                            <label className="text-base font-semibold flex items-center justify-center  ">Item</label>
                            <label className="text-base font-semibold flex items-center justify-center col-span-2 ">Solicitante</label>
                            <label className="text-base font-semibold flex items-center justify-center col-span-2">Detalhes</label>
                            <label className="text-base font-semibold flex items-center justify-center ">Unidade</label>
                            <label className="text-base font-semibold flex items-center justify-center text-center">Dt. Solicitação</label>
                            <label className="text-base font-semibold flex items-center justify-center ">Status</label>
                            <label className="text-base font-semibold flex items-center justify-center ">Resposta</label>
                            {/* <label className="text-base font-semibold flex items-center justify-center ">Status</label>
                            <label className="text-base font-semibold flex items-center justify-center "></label> */}
                        </div>
                        <Card solicitacoesList={solicitacoes} />
                    </div>

                </div>
            </div>
        </div>
    )
}
