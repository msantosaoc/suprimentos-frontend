'use client';

import Card from "@/components/Card/Card";
import Categorias from "@/components/Categorias/page";
import ModalLioEdit from "@/components/Modal/ModalLioEdit/page";
import ModalProdutoEdit from "@/components/Modal/ModalProdutoEdit/page";
import Sidebar from "@/components/Sidebar/Sidebar";
import { BuscaSolicitacaoInicial, Categoria, Cilindro, Dioptria, ListarProdutosSolicitados, Medico, Produtos, SolicitacaoProps, SolicitacaolioEdit, Unidades } from "@/lib/types/global";
import { api } from "@/services/api";
import { PlusCircle, ShoppingCart, Eye, Shirt, Stethoscope, Printer } from "lucide-react";
import Link from 'next/link'
import { useEffect, useState } from "react";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useSession } from 'next-auth/react';
import ModalEstoqueProdutoEdit from "@/components/Modal/ModalEstoqueProdutoEdit/ModalEstoqueProdutoEdit";

interface UpdateSolicitacao {
    id: string;
    resposta?: string;
    status?: string;
};


export default function Estoque() {

    const {data: session} = useSession();

    const [modalSolicitaLio, setModalSolicitaLio] = useState(false);
    const [modalSolicitaLioEdit, setModalSolicitaLioEdit] = useState(false);
    const [modalSolicitaProduto, setModalSolicitaProduto] = useState(false);
    const [modalSolicitaProdutoEdit, setModalSolicitaProdutoEdit] = useState(false);
    const toggleModalSolicitaLio = () => setModalSolicitaLio(!modalSolicitaLio);
    const toggleModalSolicitaLioEdit = () => setModalSolicitaLioEdit(!modalSolicitaLioEdit);
    const toggleModalSolicitaProduto = () => setModalSolicitaProduto(!modalSolicitaProduto);
    const toggleModalSolicitaProdutoEdit = () => setModalSolicitaProdutoEdit(!modalSolicitaProdutoEdit);

    const [isLoading, setIsLoading] = useState(false);

    const [btnLoadingLio, setBtnLoadingLio] = useState(false);

    const [btnLoadingLioEdit, setBtnLoadingLioEdit] = useState(false);

    const [btnLoadingProduto, setBtnLoadingProduto] = useState(false);

    const [unidades, setUnidades] = useState<Unidades[]>([{ id: 0, name: "" }]);

    const [produtos, setProdutos] = useState<Produtos[]>([{ id: 0, name: "", categoriaId: 0, dioptriaId: "", cilindroId: "", marcaId: 0, qtdeMax: 0, qtdeMin: 0, unidMedida: '', Categoria: { id: 0, name: '' }, createdAt: '', Marca: { id: 0, name: '' }, SubCategoria: { id: 0, name: '' }, updatedAt: '' }]);

    const [dioptrias, setDioprias] = useState<Dioptria[]>([{ id: '', name: "" }]);

    const [cilindros, setCilindros] = useState<Cilindro[]>([{ id: '', name: "" }]);

    const [medicos, setMedicos] = useState<Medico[]>([{ id: '', name: '', crm: '', created_at: '', email: '', image: '', rqe: '', trabalhos: '', updated_at: '', especialidadeonmedico: [{ created_at: '', especialidadeId: '', id: '', medicoId: '', updated_at: '', especialidades: { especialidade: '' } }] }]);

    const [solicitacao, setSolicitacao] = useState<BuscaSolicitacaoInicial>({ id: 0, User: { name: '' }, Categoria: { id: 0, name: '' }, solicitacaoId: 0, solicitacaoLioId: '', status: '', Unidade: { name: '' }, createdAt: '', Solicitacao: { id: 0, name: '', resposta: '', status: '', createdAt: '', updatedAt: '', categoriaId: 0, unidadeId: 0, userId: '', ProdutosSolicitados: [{ id: '', produto: '', produtoId: 0, solicitacaoId: 0, qtde: 0 }] }, SolicitacaoLio: { id: '', paciente: '', dtCirurgia: '', lentePrincipal: '', dioptria: '', cilindro: '', lenteReserva: '', dioptriaReserva: '', cilindroReserva: '', medico: '', unidade: '', solicitante: '', injetorCartucho: '', dtPagamento: '', comprovante: '', formCirurgico: '', resposta: '', status: '', categoriaId: 0, createdAt: '', updatedAt: '', unidadeId: 0 } });

    const [solicitacaoProdutos, setSolicitacaoProdutos] = useState<BuscaSolicitacaoInicial>({ id: 0, User: { name: '' }, Categoria: { id: 0, name: '' }, solicitacaoId: 0, solicitacaoLioId: '', status: '', Unidade: { name: '' }, createdAt: '', Solicitacao: { id: 0, name: '', resposta: '', status: '', createdAt: '', updatedAt: '', categoriaId: 0, unidadeId: 0, userId: '', ProdutosSolicitados: [{ id: '', produto: '', produtoId: 0, solicitacaoId: 0, qtde: 0 }] }, SolicitacaoLio: { id: '', paciente: '', dtCirurgia: '', lentePrincipal: '', dioptria: '', cilindro: '', lenteReserva: '', dioptriaReserva: '', cilindroReserva: '', medico: '', unidade: '', solicitante: '', injetorCartucho: '', dtPagamento: '', comprovante: '', formCirurgico: '', resposta: '', status: '', categoriaId: 0, createdAt: '', updatedAt: '', unidadeId: 0 } });

    const [categorias, setCategorias] = useState<Categoria[]>([{ id: 0, name: '', categoriaOnSubCategoria: [{ SubCategoria: { id: 0, name: '', createdAt: '', updatedAt: '' } }] }]);

    const [solicitacoes, setSolicitacoes] = useState<SolicitacaoProps[]>([{ id: '', paciente: '', categoria: '', cilindro: '', dioptria: '', dtCirurgia: '', dtPagamento: '', lentePrincipal: '', medico: '', solicitante: '', status: '', unidade: '', cilindroReserva: '', comprovante: '', dioptriaReserva: '', formCirurgico: '', injetorCartucho: '', lenteReserva: '', resposta: '', createdAt: '', updatedAt: '' }]);

    const [solicitacoesProdutos, setSolicitacoesProdutos] = useState<ListarProdutosSolicitados[]>([{ id: '', name: '', resposta: '', status: '', usuario: { id: '', name: '' }, createdAt: '', categoria: { id: 0, name: '', }, unidade: { id: '', name: '' }, ProdutosSolicitados: [{ id: '', produtoId: '', solicitacaoId: '', produto: '', qtde: 0 }] }]);

    const [selectedCategory, setSelectedCategory] = useState<Categoria>({ id: 0, name: '', categoriaOnSubCategoria: [{ SubCategoria: { id: 0, name: '', createdAt: '', updatedAt: '' } }] });

    const [categoria, setCategoria] = useState<Categoria>({ id: 0, name: '', categoriaOnSubCategoria: [{ SubCategoria: { id: 0, name: '', createdAt: '', updatedAt: '' } }] });

    const [solicitacoesIniciais, setSolicitacoesIniciais] = useState<BuscaSolicitacaoInicial[]>([{ id: 0, User: { name: '' }, Categoria: { id: 0, name: '' }, solicitacaoId: 0, solicitacaoLioId: '', status: '', Unidade: { name: '' }, createdAt: '', Solicitacao: { id: 0, name: '', resposta: '', status: '', createdAt: '', updatedAt: '', categoriaId: 0, unidadeId: 0, userId: '', ProdutosSolicitados: [{ id: '', produto: '', produtoId: 0, solicitacaoId: 0, qtde: 0 }] }, SolicitacaoLio: { id: '', paciente: '', dtCirurgia: '', lentePrincipal: '', dioptria: '', cilindro: '', lenteReserva: '', dioptriaReserva: '', cilindroReserva: '', medico: '', unidade: '', solicitante: '', injetorCartucho: '', dtPagamento: '', comprovante: '', formCirurgico: '', resposta: '', status: '', categoriaId: 0, createdAt: '', updatedAt: '', unidadeId: 0 } }])

    const handleCategoryChange = (category: Categoria) => {
        setSelectedCategory(category);
    };

    const filterSolicitacoesIniciais = solicitacoesIniciais.filter((item, index) => item.Categoria.name.includes(selectedCategory.name));

    const categoriaLio = categorias.find(categoria => categoria.name.includes("Lio"));
    const categoriaUniforme = categorias.find(categoria => categoria.name.includes("Uniforme"));
    const categoriaEscritorio = categorias.find(categoria => categoria.name.includes("Escritório"));
    const categoriaInsumo = categorias.find(categoria => categoria.name.includes("Insumo"));
    const categoriaCirurgico = categorias.find(categoria => categoria.name.includes("Cirúrgico"));

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

        return response;
    };

    async function buscarCartegorias() {
        const categorias = await api.get('/api/categoria').then(response => setCategorias(response.data)).catch(error => console.log(error));

        return categorias;
    };

    async function buscarSolicitacoesInciais() {
        setIsLoading(true)
        const buscar = await api.get('/api/solicitacao').then(response => {
            setSolicitacoesIniciais(response.data);
            setIsLoading(false)
        });
        return buscar;
    }




    useEffect(() => {
        buscarSolicitacoes();
        buscarUnidades();
        buscarDioptrias();
        buscarCilindros();
        buscarProdutos();
        buscarMedicos();
        buscarCartegorias();
        buscarSolicitacoesProdutos();
        buscarSolicitacoesInciais();
    }, []);

    async function updateSolicitacao(solicitacao: SolicitacaolioEdit) {
        setBtnLoadingLioEdit(true);
        const update = await api.put('/api/solicitacao/lio/edit', solicitacao).then(response => {
            buscarSolicitacoesInciais();
            toggleModalSolicitaLioEdit();
            setBtnLoadingLioEdit(false);
        }).catch(error => console.log(error));

        return update;
    };

    async function updateSolicitacaoProduto(solicitacao: ListarProdutosSolicitados) {
        
        const update = await api.put('', solicitacao).then(response => {
            // buscarSolicitacoes();
            // toggleModalSolicitaLioEdit();
        }).catch(error => console.log(error));

        return update;
    };

    function selectedSolicitacao(solicitacao: BuscaSolicitacaoInicial) {

        setSolicitacao(solicitacao);
    };

    function selectedSolicitacaoProdutos(solicitacao: BuscaSolicitacaoInicial) {

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
                user={session}
                btnLoadingLioEdit={btnLoadingLioEdit}
            />

            {/* <ModalProdutoEdit
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
            /> */}

            <ModalEstoqueProdutoEdit
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
                    <h1 className="font-semibold text-3xl">Estoque</h1>
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
                                        <Eye size={34} className="text-gray-menu-icon  rounded-md p-1 hover:bg-light-blue hover:text-white hover:cursor-pointer" onClick={() => { setCategoria(categoriaLio!); toggleModalSolicitaLio(); }} />
                                        <div className="h-full border border-gray-menu-icon" />
                                        <Shirt size={34} className="text-gray-menu-icon  rounded-md p-1 hover:bg-light-blue hover:text-white hover:cursor-pointer" onClick={() => { setCategoria(categoriaUniforme!); toggleModalSolicitaProduto(); }} />
                                        <div className="h-full border border-gray-menu-icon" />
                                        <Stethoscope size={34} className="text-gray-menu-icon  rounded-md p-1 hover:bg-light-blue hover:text-white hover:cursor-pointer" onClick={() => { setCategoria(categoriaCirurgico!); toggleModalSolicitaProduto(); }} />
                                        <div className="h-full border border-gray-menu-icon" />
                                        <Printer size={34} className="text-gray-menu-icon  rounded-md p-1 hover:bg-light-blue hover:text-white hover:cursor-pointer" onClick={() => { setCategoria(categoriaEscritorio!); toggleModalSolicitaProduto(); }} />
                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>

                </div>
                <div className="w-full h-[82%] px-10 py-3  ">
                    <div className="w-full h-full m-auto rounded-xl shadow-xl flex flex-col bg-white px-3 pt-2 overflow-auto">
                        <div className="grid grid-cols-10 py-2 ">
                            <label className="text-base font-semibold flex items-center justify-center  ">Item</label>
                            <label className="text-base font-semibold flex items-center justify-center  ">Solicitação</label>
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
                                <Card solicitacoesIniciais={filterSolicitacoesIniciais} selectedSolicitacao={selectedSolicitacao} selectedSolicitacaoProdutos={selectedSolicitacaoProdutos} toggleModalSolicitacaoLioEdit={toggleModaLioEdit} toggleModalSolicitacaoProdutoEdit={toggleModaLioEditProdutos} selectedCategoria={selectedCategory} />
                        }

                    </div>

                </div>
            </div>

        </div>
    )
}