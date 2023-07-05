'use client';

import Card from "@/components/Card/Card";
import Sidebar from "@/components/Sidebar/Sidebar";
import { Eye, Printer, Shirt, ShoppingCart, Stethoscope } from 'lucide-react'
import Categorias from "@/components/Categorias/page";
import ModalLIO from "@/components/Modal/ModalLIO/page";
import { useEffect, useState } from "react";
import { api } from "@/services/api";
import { useSession } from 'next-auth/react';
import ModalLioEdit from "@/components/Modal/ModalLioEdit/page";



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
    categoria: string;
    createdAt: string;
    updatedAt: string;
    resposta?: string;
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
    status?: string;
    comprovante: string;
    formCirurgico: string;
    resposta?: string;
};

interface UpdateSolicitacao {
    id: string;
    resposta?: string;
    status?: string;
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

    const { data: session } = useSession();




    const [modalSolicitaLio, setModalSolicitaLio] = useState(false);
    const [modalSolicitaLioEdit, setModalSolicitaLioEdit] = useState(false);
    const toggleModalSolicitaLio = () => setModalSolicitaLio(!modalSolicitaLio);
    const toggleModalSolicitaLioEdit = () => setModalSolicitaLioEdit(!modalSolicitaLioEdit);

    const [unidades, setUnidades] = useState<UnidadesProps[]>([{ name: "" }]);

    const [produtos, setProdutos] = useState<Produto[]>([{ name: "", categoriaId: "", dioprtiaId: "", cilindroId: "", marcaId: '', qtdeMax: 0, qtdeMin: 0, unidMedida: '' }]);

    const [dioptrias, setDioprias] = useState<Dioptria[]>([{ name: "" }]);

    const [cilindros, setCilindros] = useState<Cilindro[]>([{ name: "" }]);

    const [medicos, setMedicos] = useState<Medico[]>([{ name: '' }]);

    const [solicitacao, setSolicitacao] = useState<SolicitacaoProps>({ id: '', paciente: '', lentePrincipal: '', dioptria: '', cilindro: '', lenteReserva: '', dioptriaReserva: '', cilindroReserva: '', unidade: '', medico: '', categoria: '', dtCirurgia: '', dtPagamento: '', solicitante: '', status: '', comprovante: '', formCirurgico: '', injetorCartucho: '', createdAt: '', updatedAt: '', resposta: '' });



    const [solicitacoes, setSolicitacoes] = useState<SolicitacaoProps[]>();

    const [selectedCategory, setSelectedCategory] = useState("");

    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category);
    };

    const filteredRequests = solicitacoes?.filter((request) => request.categoria.includes(selectedCategory));
    console.log(selectedCategory);

    async function buscarSolicitacoes() {
        const solicitacoes = await api.get('/api/solicitacao/lio').then(response => setSolicitacoes(response.data)).catch(error => console.log(error));

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
        const solicitar = await api.post('/api/solicitacao/lio', solicitacao).then(response => {
            buscarSolicitacoes();
            toggleModalSolicitaLio();
        }).catch(error => console.log(error));

        return solicitar;
    };

    async function updateSolicitacao(solicitacao: UpdateSolicitacao) {
        console.log(solicitacao);
        const update = await api.put('/api/solicitacao/lio/edit', solicitacao).then(response => {
            buscarSolicitacoes();
            toggleModalSolicitaLioEdit();
        }).catch(error => console.log(error));

        return update;
    }

    function selectedSolicitacao(solicitacao: SolicitacaoProps) {
        console.log(solicitacao);
        setSolicitacao(solicitacao);
    };

    function toggleModalEdit() {
        toggleModalSolicitaLioEdit();
    };

    const [menuOptions, setMenuOptions] = useState(false);

    return (
        <div>
            <ModalLIO
                isOpen={modalSolicitaLio}
                toggle={toggleModalSolicitaLio}
                unidades={unidades}
                produtos={produtos}
                dioptrias={dioptrias}
                cilindros={cilindros}
                medicos={medicos}
                user={session}
                createSolicitacao={createSolicitacao}
            />
            <ModalLioEdit
                isOpen={modalSolicitaLioEdit}
                toggle={toggleModalSolicitaLioEdit}
                formData={solicitacao}
                unidades={unidades}
                produtos={produtos}
                dioptrias={dioptrias}
                cilindros={cilindros}
                medicos={medicos}
                updateSolicitacao={updateSolicitacao}

            />
            {/* <div className={`w-screen h-screen bg-black/30 z-10 absolute ${!menuOptions && 'hidden'}`} /> */}
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
                            <Categorias selectedCategory={selectedCategory} onCategoryChange={handleCategoryChange} />

                        </div>
                        <div className="h-full w-1/2 flex items-center justify-end z-20 gap-3 relative ">
                            <div className="h-20 w-20 bg-white border border-gray-menu-icon shadow-sm flex flex-col justify-end items-center rounded-md relative pb-1  duration-200 group"  >
                                <ShoppingCart className="text-gray-menu-icon  " size={48}  />
                                <label className="text-center font-semibold text-gray-menu-icon text-sm hover:cursor-pointer">Solicitar</label>

                                <div className={` flex  bg-transparent absolute -bottom-14 -translate-x-4 group-hover:visible invisible transition-all `} >
                                    <div className="flex mt-4 rounded-lg shadow-lg p-2 bg-white gap-1">
                                        <Eye size={34} className="text-gray-menu-icon  rounded-md p-1 hover:bg-light-blue hover:text-white hover:cursor-pointer" onClick={toggleModalSolicitaLio}/>
                                        <div className="h-full border border-gray-menu-icon"/>
                                        <Shirt size={34} className="text-gray-menu-icon  rounded-md p-1 hover:bg-light-blue hover:text-white hover:cursor-pointer"/>
                                        <div className="h-full border border-gray-menu-icon"/>
                                        <Stethoscope size={34} className="text-gray-menu-icon  rounded-md p-1 hover:bg-light-blue hover:text-white hover:cursor-pointer" />
                                        <div className="h-full border border-gray-menu-icon"/>
                                        <Printer size={34} className="text-gray-menu-icon  rounded-md p-1 hover:bg-light-blue hover:text-white hover:cursor-pointer" />
                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>

                </div>
                <div className="w-full h-[82%] px-10 py-3  ">
                    <div className="w-full h-full m-auto rounded-xl shadow-xl flex flex-col bg-white px-3 pt-2 overflow-auto">
                        <div className="grid grid-cols-9 py-2 ">
                            <label className="text-base font-semibold flex items-center justify-center  ">Item</label>
                            <label className="text-base font-semibold flex items-center justify-center col-span-2 ">Solicitante</label>
                            <label className="text-base font-semibold flex items-center justify-center col-span-2">Detalhes</label>
                            <label className="text-base font-semibold flex items-center justify-center ">Unidade</label>
                            <label className="text-base font-semibold flex items-center justify-center text-center">Dt. Solicitação</label>
                            <label className="text-base font-semibold flex items-center justify-center ">Status</label>
                            <label className="text-base font-semibold flex items-center justify-center ">Resposta</label>
                        </div>
                        <Card solicitacoesList={filteredRequests} selectedSolicitacao={selectedSolicitacao} toggleModalSolicitacaoLioEdit={toggleModalEdit} />
                    </div>

                </div>
            </div>

        </div>
    )
}
