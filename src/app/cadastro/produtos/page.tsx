'use client';
import ButtonCadastrar from "@/components/Button/ButtonCadastrar";
import SelectComponentProdutos from "@/components/Select/Produtos/SelectComponentProdutos";
import Sidebar from "@/components/Sidebar/Sidebar";
import { Produtos } from "@/lib/types/global";
import { api } from "@/services/api";
import moment from "moment";
import { useEffect, useState } from "react";
import { BsPencilSquare } from "react-icons/bs";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';

export default function Produtos() {

    const [produtos, setProdutos] = useState<Produtos[]>([{ id: 0, name: '', createdAt: '', updatedAt: '', Categoria: { name: '' }, categoriaId: '', Marca: { name: '' }, marcaId: '', cilindroId: '', dioptriaId: '', qtdeMax: '', qtdeMin: '', unidMedida: '' }]);
    const [isLoading, setIsLoading] = useState(false);

    async function buscarProdutos() {
        setIsLoading(true);
        const marcas = await api.get('/api/produto').then(response => setProdutos(response.data)).catch(error => console.log(error));
        setIsLoading(false);
        return marcas;
    };

    useEffect(() => {
        buscarProdutos()
    }, [])

    const arrayListProdutos = produtos.map((produto, index) => {
        return (
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={produto.id}>
                <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {produto.id}
                </td>
                <td className="px-6 py-4">
                    {produto.name}
                </td>
                <td className="px-6 py-4">
                    {produto.Categoria?.name}
                </td>
                <td className="px-6 py-4">
                    {produto.Marca?.name}
                </td>
                <td className="px-6 py-4">
                    {'Última compra'}
                </td>
                <td className="px-6 py-4">
                    {produto.unidMedida}
                </td>
                <td className="px-6 py-4">
                    {moment(produto.createdAt).format('DD/MM/YYYY HH:MM:SS')}
                </td>
                <td className="px-6 py-4 text-center">
                    <BsPencilSquare size={15} className="hover:cursor-pointer" />
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

                    <h1 className="font-semibold text-3xl">Produtos</h1>
                    <div className="w-full sm:h-2/6 sm:px-2 max-sm:py-1 grid grid-cols-[1fr_4fr_1fr] max-md:gap-2 max-sm:grid-cols-1  rounded-xl shadow-xl bg-white">
                        <div className="flex items-center justify-center">
                            <ButtonCadastrar>Cadastrar</ButtonCadastrar>
                        </div>
                        <div className="flex items-center justify-center ">
                        </div>
                        <div></div>
                    </div>
                </div>
                <div className="flex flex-col overflow-hidden">
                    <div className="w-full h-full rounded-xl shadow-xl my-4 bg-white overflow-auto">

                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg overflow-hidden" >
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
                                <thead className="text-sm text-gray-700  dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-center">
                                            Id
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            <div className="flex items-center justify-center">
                                                Produto
                                            </div>
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            <div className="flex items-center justify-center">
                                                Categoria
                                            </div>
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            <div className="flex items-center justify-center">
                                                Marca
                                            </div>
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            <div className="flex items-center justify-center">
                                                Última Compra
                                            </div>
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            <div className="flex items-center justify-center">
                                                Unid. Medida
                                            </div>
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            <div className="flex items-center justify-center">
                                                Criado em
                                            </div>
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            <BsPencilSquare size={15} className="hover:cursor-pointer" />
                                        </th>
                                    </tr>
                                </thead>
                                <tbody >
                                    { arrayListProdutos}
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
            </div>

        </div>

    )
}