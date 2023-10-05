'use client';

import ButtonCadastrar from "@/components/Button/ButtonCadastrar";
import ModalAssociarSubcategoria from "@/components/Modal/Cadastro/ModalAssociarSubcategoria/page";
import ModalCreateCategoria from "@/components/Modal/Cadastro/ModalCreateCategoria/page";
import ModalCreateSubcategoria from "@/components/Modal/Cadastro/ModalCreateSubcategoria/page";
import Sidebar from "@/components/Sidebar/Sidebar";
import { Categoria, CreateCategoria, CreateSubCategoria, SubCategoria } from "@/lib/types/global";
import { api } from "@/services/api";
import moment from "moment";
import { useEffect, useState } from "react";
import { BsPencilSquare } from "react-icons/bs";
import Skeleton from "react-loading-skeleton";

export default function Categorias() {

    const [isLoading, setIsLoading] = useState(false);
    const [categorias, setCategorias] = useState<Categoria[]>([{ id: 0, name: '', categoriaOnSubCategoria: [{SubCategoria: {id: 0, name: '', createdAt: '', updatedAt: ''}}] }]);
    const [subcategorias, setSubcategorias] = useState<SubCategoria[]>([{id: 0, name: '', createdAt: '', updatedAt: ''}]);
    const [selectedProduto, setSelectedProduto] = useState<Categoria>({ id: 0, name: '', categoriaOnSubCategoria: [{SubCategoria: {id: 0, name: '', createdAt: '', updatedAt: ''}}] });

    const [modal, setModal] = useState(false);
    const [modalEdit, setModalEdit] = useState(false);
    const [modalSubcategoria, setModalSubcategoria] = useState(false);
    const [modalAssociar, setModalAssociar] = useState(false);
    const toggle = () => setModal(!modal);
    const toggleModalSubcategoria = () => setModalSubcategoria(!modalSubcategoria);
    const toggleEdit = () => setModalEdit(!modalEdit);
    const toggleModalAssociar = () => setModalAssociar(!modalAssociar);

    const [btnLoading, setBtnLoading] = useState(false);

    async function buscarCartegorias() {
        const categorias = await api.get('/api/categoria').then(response => setCategorias(response.data)).catch(error => console.log(error));

        return categorias;
    };

    async function buscarSubCartegorias() {
        const subcategorias = await api.get('/api/subcategoria').then(response => setSubcategorias(response.data)).catch(error => console.log(error));

        return subcategorias;
    };

    async function createCategoria(data: CreateCategoria) {
        setBtnLoading(true);
        const categoria = await api.post('/api/categoria', data).then(response => {
            buscarCartegorias();
            toggle();
            setBtnLoading(false)
        }).catch(error => console.log(error));

        return categoria;
    };

    async function createSubcategoria(data: CreateSubCategoria) {
        setBtnLoading(true);
        const subcategoria = await api.post('/api/subcategoria', data).then(response => {
            buscarSubCartegorias();
            toggleModalSubcategoria();
            setBtnLoading(false);
        }).catch(error => console.log(error));

        return subcategoria;
    }

    useEffect(() => {
        buscarCartegorias();
        buscarSubCartegorias();
    }, []);

    function handleSelectCategoria(produto: Categoria) {
        setSelectedProduto(produto);
        toggleEdit()
    }

    const arrayListCategorias = categorias.map((categoria, index) => {
        return (
            <tr  className="bg-white border-b text-center text-subTitle dark:bg-gray-800 dark:border-gray-700 hover:cursor-pointer hover:bg-light-blue/20 duration-300" key={categoria.id} >
                <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {categoria.id}
                </td>
                <td className="px-6 py-4">
                    {categoria.name}
                </td>
                <td className="px-6 py-4">
                    {categoria.categoriaOnSubCategoria[0]?.SubCategoria.name}
                </td>
                {/* <td className="px-6 py-4">
                    {moment(categoria.).format('DD/MM/YYYY HH:MM:SS')}
                </td> */}
                <td className="px-6 py-4 text-center">
                    <BsPencilSquare size={15} className="hover:cursor-pointer" onClick={()=> handleSelectCategoria(categoria)}/>
                </td>
            </tr>
        )
    })

    return (
        <div className="h-screen w-screen flex flex-col bg-background pl-[4.3rem]">
            <div className="absolute top-0 left-0 w-screen h-sreen overflow-hidden">
                <Sidebar />

            </div>
            <div className="grid grid-rows-[1fr_5fr] w-2/3 max-w-[1200px] h-screen mx-auto ">
                <div className="flex flex-col justify-end ">

                    <h1 className="font-semibold text-3xl">Categorias</h1>
                    <div className="w-full sm:h-2/6 sm:px-2 max-sm:py-1 grid grid-cols-[5fr_4fr_1fr] max-md:gap-2 max-sm:grid-cols-1  rounded-xl shadow-xl bg-white">
                        <ModalCreateCategoria isOpen={modal} toggle={toggle} createCategoria={createCategoria} categorias={categorias} btnLoading={btnLoading}/>
                        <ModalCreateSubcategoria isOpen={modalSubcategoria} categorias={categorias} toggle={toggleModalSubcategoria} createSubcategoria={createSubcategoria} btnLoading={btnLoading} />
                        <ModalAssociarSubcategoria isOpen={modalAssociar} categorias={categorias} toggle={toggleModalAssociar} subcategorias={subcategorias} btnLoading={btnLoading}/>
                        {/* <ModalCreatecategoriaEdit formData={selectedcategoria} isOpen={modalEdit} toggle={toggleEdit} categorias={categorias} marcas={marcas} editarcategoria={editarcategoria}/> */}
                        <div className="flex items-center justify-center gap-2 px-2 ">
                            <ButtonCadastrar onClick={toggle}>Cadastrar Categoria</ButtonCadastrar>
                            <ButtonCadastrar onClick={toggleModalSubcategoria}>Cadastrar Subcategoria</ButtonCadastrar>
                            <ButtonCadastrar onClick={toggleModalAssociar}>Associar</ButtonCadastrar>
                        </div>
                        <div className="flex items-center justify-center ">

                        </div>
                        <div></div>
                    </div>
                </div>
                <div className="flex flex-col">
                    <div className="w-full h-full rounded-xl shadow-xl my-4 bg-white overflow-auto">

                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg " >
                        {
                            isLoading
                                ?
                                <Skeleton count={10} className="h-16 overflow-hidden" />
                                :


                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
                                <thead className="text-sm text-gray-700  dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-center">
                                            Id
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            <div className="flex items-center justify-center">
                                                Categoria
                                            </div>
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            <div className="flex items-center justify-center">
                                                Subcategoria
                                            </div>
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            <BsPencilSquare size={15} className="hover:cursor-pointer" />
                                        </th>
                                    </tr>
                                </thead>
                                <tbody >
                                    { arrayListCategorias}
                                </tbody>
                            </table>
}
                        </div>

                    </div>
                </div>
            </div>

        </div>

    )
}