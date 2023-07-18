'use client';

import Card from "@/components/Card/Card";
import Sidebar from "@/components/Sidebar/Sidebar";
import { Eye, PlusCircle, Printer, Shirt, ShoppingCart, Stethoscope } from 'lucide-react'
import Categorias from "@/components/Categorias/page";
import ModalLIO from "@/components/Modal/ModalLIO/page";
import { Suspense, useEffect, useState } from "react";
import { api } from "@/services/api";
import { useSession } from 'next-auth/react';
import ModalLioEdit from "@/components/Modal/ModalLioEdit/page";
import ModalProduto from "@/components/Modal/ModalProduto/page";
import { BuscaSolicitacaoInicial, FormData, ListarProdutosSolicitados, Medico, Unidades } from "@/lib/types/global";
import ModalProdutoEdit from "@/components/Modal/ModalProdutoEdit/page";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import Link from "next/link";


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



interface Dioptria {
    name: string;
};

interface Cilindro {
    name: string;
};


interface Categoria {
    id: string;
    name: string;
}



export default function Solicitacoes() {

    const { data: session } = useSession();

    const [modalSolicitaLio, setModalSolicitaLio] = useState(false);
    const [modalSolicitaLioEdit, setModalSolicitaLioEdit] = useState(false);
    const [modalSolicitaProduto, setModalSolicitaProduto] = useState(false);
    const [modalSolicitaProdutoEdit, setModalSolicitaProdutoEdit] = useState(false);
    const toggleModalSolicitaLio = () => setModalSolicitaLio(!modalSolicitaLio);
    const toggleModalSolicitaLioEdit = () => setModalSolicitaLioEdit(!modalSolicitaLioEdit);
    const toggleModalSolicitaProduto = () => setModalSolicitaProduto(!modalSolicitaProduto);
    const toggleModalSolicitaProdutoEdit = () => setModalSolicitaProdutoEdit(!modalSolicitaProdutoEdit);

    const [isLoading, setIsLoading] = useState(false);

    const [unidades, setUnidades] = useState<Unidades[]>([{ id: 0, name: "" }]);

    const [produtos, setProdutos] = useState<Produto[]>([{ id: '', name: "", categoriaId: "", dioprtiaId: "", cilindroId: "", marcaId: '', qtdeMax: 0, qtdeMin: 0, unidMedida: '' }]);

    const [dioptrias, setDioprias] = useState<Dioptria[]>([{ name: "" }]);

    const [cilindros, setCilindros] = useState<Cilindro[]>([{ name: "" }]);

    const [medicos, setMedicos] = useState<Medico[]>([{id: '', name: '', crm: '', created_at: '', email: '', image: '', rqe: '', trabalhos: '', updated_at: '', especialidadeonmedico: [{created_at: '', especialidadeId: '', id: '', medicoId: '', updated_at: '', especialidades: {especialidade: ''}}]}]);

    const [solicitacao, setSolicitacao] = useState<BuscaSolicitacaoInicial>({ id: 0, User: { name: '' }, Categoria: { id: '', name: '' }, solicitacaoId: '', solicitacaoLioId: '', status: '', Unidade: { name: '' }, createdAt: '', Solicitacao: { id: '', name: '', resposta: '', status: '', createdAt: '', updatedAt: '', categoriaId: '', unidadeId: '', userId: '', ProdutosSolicitados: [{ id: '', produto: '', produtoId: '', SolicitacaoId: '', qtde: 0}] }, SolicitacaoLio: { id: '', paciente: '', dtCirurgia: '', lentePrincipal: '', dioptria: '', cilindro: '', lenteReserva: '', dioptriaReserva: '', cilindroReserva: '', medico: '', unidade: '', solicitante: '', injetorCartucho: '', dtPagamento: '', comprovante: '', formCirurgico: '', resposta: '', status: '', categoria: '', createdAt: '', updatedAt: '' } });

    const [solicitacaoProdutos, setSolicitacaoProdutos] = useState<BuscaSolicitacaoInicial>({ id: 0, User: { name: '' }, Categoria: { id: '', name: '' }, solicitacaoId: '', solicitacaoLioId: '', status: '', Unidade: { name: '' }, createdAt: '', Solicitacao: { id: '', name: '', resposta: '', status: '', createdAt: '', updatedAt: '', categoriaId: '', unidadeId: '', userId: '', ProdutosSolicitados: [{ id: '', produto: '', produtoId: '', SolicitacaoId: '', qtde: 0}] }, SolicitacaoLio: { id: '', paciente: '', dtCirurgia: '', lentePrincipal: '', dioptria: '', cilindro: '', lenteReserva: '', dioptriaReserva: '', cilindroReserva: '', medico: '', unidade: '', solicitante: '', injetorCartucho: '', dtPagamento: '', comprovante: '', formCirurgico: '', resposta: '', status: '', categoria: '', createdAt: '', updatedAt: '' } });

    const [categorias, setCategorias] = useState<Categoria[]>([{ id: '', name: '' }])

    const [solicitacoes, setSolicitacoes] = useState<SolicitacaoProps[]>([{ id: '', paciente: '', categoria: '', cilindro: '', dioptria: '', dtCirurgia: '', dtPagamento: '', lentePrincipal: '', medico: '', solicitante: '', status: '', unidade: '', cilindroReserva: '', comprovante: '', dioptriaReserva: '', formCirurgico: '', injetorCartucho: '', lenteReserva: '', resposta: '', createdAt: '', updatedAt: '' }]);

    const [solicitacoesProdutos, setSolicitacoesProdutos] = useState<ListarProdutosSolicitados[]>([{ id: '', name: '', resposta: '', status: '', usuario: { id: '', name: '' }, createdAt: '', categoria: { id: '', name: '', }, unidade: { id: '', name: '' }, ProdutosSolicitados: [{ id: '', produtoId: '', solicitacaoId: '', produto: '', qtde: 0 }] }]);

    const [selectedCategory, setSelectedCategory] = useState<Categoria>({ id: '', name: '' });

    const [categoria, setCategoria] = useState<Categoria>({ id: '', name: '' });

    const [solicitacoesIniciais, setSolicitacoesIniciais] = useState<BuscaSolicitacaoInicial[]>([{ id: 0, User: { name: '' }, Categoria: { id: '', name: '' }, solicitacaoId: '', solicitacaoLioId: '', status: '', Unidade: { name: '' }, createdAt: '', Solicitacao: { id: '', name: '', resposta: '', status: '', createdAt: '', updatedAt: '', categoriaId: '', unidadeId: '', userId: '', ProdutosSolicitados: [{ id: '', produto: '', produtoId: '', SolicitacaoId: '', qtde: 0}] }, SolicitacaoLio: { id: '', paciente: '', dtCirurgia: '', lentePrincipal: '', dioptria: '', cilindro: '', lenteReserva: '', dioptriaReserva: '', cilindroReserva: '', medico: '', unidade: '', solicitante: '', injetorCartucho: '', dtPagamento: '', comprovante: '', formCirurgico: '', resposta: '', status: '', categoria: '', createdAt: '', updatedAt: '' } }])

    const handleCategoryChange = (category: Categoria) => {
        setSelectedCategory(category);
    };


    const filteredRequests = solicitacoes?.filter((request, index) => request.categoria?.includes(selectedCategory.name));
    const filteredRequestsProdutos = solicitacoesProdutos?.filter((request) => request.categoria?.name?.includes(selectedCategory.name));

    const filterSolicitacoesIniciais = solicitacoesIniciais.filter((item, index) => item.Categoria.name.includes(selectedCategory.name))

    async function buscarSolicitacoes() {
        const solicitacoes = await api.get('/api/solicitacao/lio').then(response => setSolicitacoes(response.data)).catch(error => console.log(error));

        return solicitacoes
    };

    async function buscarSolicitacoesProdutos() {
        const solicitacoesProdutos = await api.get('/api/solicitacao/produto').then(response => setSolicitacoesProdutos(response.data)).catch(error => console.log(error));

        return solicitacoesProdutos
    };

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
        const response = await fetch('https://grade-backend.vercel.app/medico');

        const medicosResponse = await response.json();
        setMedicos(medicosResponse);

        return medicos;
    };

    async function buscarCartegorias() {
        const categorias = await api.get('/api/categoria').then(response => setCategorias(response.data)).catch(error => console.log(error));

        return categorias;
    };

    async function buscarSolicitacoesIniciais() {
        setIsLoading(true);
        const solicitacoesIniciais = await api.get('/api/solicitacao').then(response => setSolicitacoesIniciais(response.data)).catch(error => console.log(error));
        setIsLoading(false);
        return solicitacoesIniciais;
    };



    useEffect(() => {
        buscarSolicitacoes();
        buscarUnidades();
        buscarDioptrias();
        buscarCilindros();
        buscarProdutos();
        buscarMedicos();
        buscarCartegorias();
        buscarSolicitacoesProdutos();
        buscarSolicitacoesIniciais();
    }, []);

    async function createSolicitacao(solicitacao: FormData) {
        const solicitar = await api.post('/api/solicitacao/lio', solicitacao).then(response => {
            buscarSolicitacoes();
            toggleModalSolicitaLio();
            buscarSolicitacoesIniciais()
        }).catch(error => console.log(error));

        return solicitar;
    };

    async function createSolicitacaoProduto(solicitacao: FormSolicitacaoProduto) {
        const solicitar = await api.post('/api/solicitacao/produto', solicitacao).then(response => {
            buscarSolicitacoes();
            toggleModalSolicitaProduto();
            buscarSolicitacoesIniciais()
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
    };

    async function updateSolicitacaoProduto(solicitacao: ListarProdutosSolicitados) {
        console.log(solicitacao);
        const update = await api.put('', solicitacao).then(response => {
            // buscarSolicitacoes();
            // toggleModalSolicitaLioEdit();
        }).catch(error => console.log(error));

        return update;
    };


    function selectedSolicitacao(solicitacao: BuscaSolicitacaoInicial) {
        console.log(solicitacao);
        setSolicitacao(solicitacao);
    };

    function selectedSolicitacaoProdutos(solicitacao: BuscaSolicitacaoInicial) {
        console.log(solicitacao);
        setSolicitacaoProdutos(solicitacao);
    };

    function toggleModaLioEdit() {
        toggleModalSolicitaLioEdit();
    };

    function toggleModaLioEditProdutos() {
        toggleModalSolicitaProdutoEdit();
    };

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
                categorias={categorias}
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
            <ModalProduto
                isOpen={modalSolicitaProduto}
                toggle={toggleModalSolicitaProduto}
                unidades={unidades}
                produtos={produtos}
                categorias={categorias}
                categoria={categoria}
                user={session}
                createSolicitacaoProduto={createSolicitacaoProduto}
            />

            <ModalProdutoEdit 
            isOpen={modalSolicitaProdutoEdit}
            toggle={toggleModalSolicitaProdutoEdit}
            categoria={categoria}
            categorias={categorias}
            user={session}
            unidades={unidades}
            medicos={medicos}
            formData={solicitacaoProdutos}
            updateSolicitacaoProduto={updateSolicitacaoProduto}
            produtos={produtos}
            />

            <div className="h-screen w-screen flex flex-col bg-background pl-[4.3rem]">
                <div className="absolute top-0 left-0 w-screen h-sreen overflow-hidden">
                    <Sidebar />

                </div>
                <div className="w-full h-[8%] flex  items-end pl-20 relative ">
                    <h1 className="font-semibold text-3xl">Solicitações | </h1><Link href='/sugestoes' shallow className="flex absolute left-72 top-1/2 mr-2">Sugerir item<PlusCircle  /></Link>
                </div>

                <div className="w-full h-[10%] px-10 flex  ">

                    <div className="w-full h-full m-auto rounded-xl shadow-xl bg-white flex items-center px-3">

                        <div className="h-full w-1/2  flex items-center gap-3">
                            
                            <Categorias selectedCategory={selectedCategory} onCategoryChange={handleCategoryChange} />

                            

                        </div>
                        <div className="h-full w-1/2 flex items-center justify-end z-20 gap-3 relative ">
                            <div className="h-20 w-20 bg-white border border-gray-menu-icon shadow-sm flex flex-col justify-end items-center rounded-md relative pb-1  duration-200 group hover:cursor-pointer"  >
                                <ShoppingCart className="text-gray-menu-icon  group-hover:cursor-pointer" size={48} />
                                <label className="text-center font-semibold text-gray-menu-icon text-sm group-hover:cursor-pointer">Solicitar</label>

                                <div className={` flex  bg-transparent absolute -bottom-14 -translate-x-4 group-hover:visible invisible transition-all `} >
                                    <div className="flex mt-4 rounded-lg shadow-lg p-2 bg-white gap-1">
                                        <Eye size={34} className="text-gray-menu-icon  rounded-md p-1 hover:bg-light-blue hover:text-white hover:cursor-pointer" onClick={() => { setCategoria({ id: 'cljhn5we20002vvmcpxedty2c', name: 'Lio' }); toggleModalSolicitaLio(); }} />
                                        <div className="h-full border border-gray-menu-icon" />
                                        <Shirt size={34} className="text-gray-menu-icon  rounded-md p-1 hover:bg-light-blue hover:text-white hover:cursor-pointer" onClick={() => { setCategoria({ id: 'cljszugu1000svvgkyw4lxze1', name: 'Uniforme' }); toggleModalSolicitaProduto(); }} />
                                        <div className="h-full border border-gray-menu-icon" />
                                        <Stethoscope size={34} className="text-gray-menu-icon  rounded-md p-1 hover:bg-light-blue hover:text-white hover:cursor-pointer" onClick={() => { setCategoria({ id: 'cljszujtz000uvvgk46gobtav', name: 'Cirúrgico' }); toggleModalSolicitaProduto(); }} />
                                        <div className="h-full border border-gray-menu-icon" />
                                        <Printer size={34} className="text-gray-menu-icon  rounded-md p-1 hover:bg-light-blue hover:text-white hover:cursor-pointer" onClick={() => { setCategoria({ id: 'cljhn61rz0004vvmcmqo4qmbt', name: 'Escritório' }); toggleModalSolicitaProduto(); }} />
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
                        {
                            isLoading
                                ?
                                <Skeleton count={10} className="h-16 overflow-hidden" />
                                :
                                <Card  solicitacoesIniciais={filterSolicitacoesIniciais} selectedSolicitacao={selectedSolicitacao} selectedSolicitacaoProdutos={selectedSolicitacaoProdutos} toggleModalSolicitacaoLioEdit={toggleModaLioEdit} toggleModalSolicitacaoProdutoEdit={toggleModaLioEditProdutos} selectedCategoria={selectedCategory} />
                        }

                    </div>

                </div>
            </div>

        </div>
    )
}
