'use client';
import ButtonCadastrar from "@/components/Button/ButtonCadastrar";
import SelectComponentProdutos from "@/components/Select/Produtos/SelectComponentProdutos";
import Sidebar from "@/components/Sidebar/Sidebar";
import { Marcas } from "@/lib/types/global";
import { api } from "@/services/api";
import { Pencil } from "lucide-react";
import moment from "moment";
import 'moment/locale/pt-br'
import { useEffect, useState } from "react";
import { BsPencilSquare } from "react-icons/bs";

export default function Marcas() {

    moment.locale('pt-br');
    const [marcas, setMarcas] = useState<Marcas[]>([{ id: 0, name: '', createdAt: '', updatedAt: '' }]);

    async function buscarMarcas() {
        const marcas = await api.get('/api/marca').then(response => setMarcas(response.data)).catch(error => console.log(error));

        return marcas;
    };

    useEffect(() => {
        buscarMarcas();
    }, [])

    const arrayListMarcas = marcas.map((marca, index) => {
        return (
            <tr className="bg-white border-b text-center text-subTitle dark:bg-gray-800 dark:border-gray-700 hover:cursor-pointer hover:bg-light-blue/20 duration-300" key={marca.id}>
                <td scope="row" className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {marca.id}
                </td>
                <td className="px-6 py-3">
                    {marca.name}
                </td>
                <td className="px-6 py-3">
                    {moment(marca.createdAt).format('DD/MM/YYYY HH:MM:SS')}
                </td>
                <td className="px-6 py-3">
                    {moment(marca.updatedAt).format('DD/MM/YYYY HH:MM:SS')}
                </td>
                <td className="px-6 py-3 text-center">
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
            <div className="grid grid-rows-[1fr_5fr] w-2/3 max-w-[1200px] h-screen mx-auto">
                <div className="flex flex-col justify-end  ">

                    <h1 className="font-semibold text-3xl">Marcas</h1>
                    <div className="w-full sm:h-2/6 sm:px-2 max-sm:py-1 grid grid-cols-[1fr_4fr_1fr] max-md:gap-2 max-sm:grid-cols-1  rounded-xl shadow-xl bg-white">
                        <div className="flex items-center justify-center ">
                            <ButtonCadastrar>Cadastrar</ButtonCadastrar>
                        </div>
                        <div className="flex items-center justify-center ">
                        </div>
                        <div></div>
                    </div>
                </div>
                <div className="flex flex-col">
                    <div className="w-full h-full rounded-xl shadow-xl my-4 bg-white">

                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead className="text-sm text-gray-700  dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-center">
                                            Id
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            <div className="flex items-center justify-center">
                                                Marca
                                            </div>
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            <div className="flex items-center justify-center">
                                                Criado em
                                            </div>
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            <div className="flex items-center justify-center">
                                                Atualizado em
                                            </div>
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            <BsPencilSquare size={15} className="hover:cursor-pointer" />
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {arrayListMarcas}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    )
}