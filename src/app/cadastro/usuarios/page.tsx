'use client';
import ButtonCadastrar from "@/components/Button/ButtonCadastrar";
import ModalCreateUsuarioEdit from "@/components/Modal/Cadastro/ModalCreateUsuarioEdit/page";
import Sidebar from "@/components/Sidebar/Sidebar";
import { Usuarios } from "@/lib/types/global";
import { api } from "@/services/api";
import { Key } from "lucide-react";
import moment from "moment";
import { useEffect, useState } from "react";
import { BsKey, BsKeyFill, BsPencilSquare } from "react-icons/bs";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';

export default function Usuarios() {

    const [usuarios, setUsuarios] = useState<Usuarios[]>([{id: '', name: '', email: '', role: ''}]);
    const [selectedUsuario, setSelectedUsuario] = useState<Usuarios>({id: '', name: '', email: '', role: ''})
    const [isLoading, setIsLoading] = useState(false);
    const [btnIsLoading, setBtnIsLoading] = useState(false);
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    async function buscarUsuarios() {
        setIsLoading(true);
        const usuarios = await api.get('/api/user').then(response=> {
            setUsuarios(response.data);
            setIsLoading(false);
        }).catch(error=> console.log(error));

        return usuarios;
    };

    useEffect(()=> {
        buscarUsuarios();
    }, []);

    async function editarUsuario(usuario: Usuarios) {
        setBtnIsLoading(true)
        const editar = await api.put('/api/user/edit', usuario).then(response=> {
            buscarUsuarios();
            toggle();
            setBtnIsLoading(false);
        });

        return editar;
    };

    function handleSelectedUsuario(usuario: Usuarios) {
        setSelectedUsuario(usuario);
        toggle();
    };

    const arrayListUsuarios = usuarios?.map((usuario, index) => {
        return (
            <tr  className="bg-white border-b text-center text-subTitle dark:bg-gray-800 dark:border-gray-700 hover:cursor-pointer hover:bg-light-blue/20 duration-300" key={usuario.id} >
                <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {usuario.id}
                </td>
                <td className="px-6 py-4">
                    {usuario.name}
                </td>
                <td className="px-6 py-4">
                    {usuario.email}
                </td>
                <td className="px-6 py-4">
                    {usuario.role}
                </td>
                <td className="px-6 py-4 text-center flex items-center gap-2">
                    <BsPencilSquare size={15} className="hover:cursor-pointer" onClick={()=> handleSelectedUsuario(usuario)} />
                    <BsKey size={18} className="-rotate-45 hover:cursor-pointer hover:text-light-blue"/>
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

                    <h1 className="font-semibold text-3xl">Usuários</h1>
                    <div className="w-full sm:h-2/6 sm:px-2 max-sm:py-1 grid grid-cols-[1fr_4fr_1fr] max-md:gap-2 max-sm:grid-cols-1  rounded-xl shadow-xl bg-white">
                        <ModalCreateUsuarioEdit isOpen={modal} toggle={toggle} formData={selectedUsuario} editarUsuario={editarUsuario} btnIsLoading={btnIsLoading}/>
                        <div className="flex items-center justify-center ">
                            <ButtonCadastrar>Cadastrar</ButtonCadastrar>
                        </div>
                        <div className="flex items-center justify-center ">
                            {/* <ButtonCadastrar>Cadastrar</ButtonCadastrar> */}
                            
                            {/* <SelectComponentusuarios /> */}
                        </div>
                        <div></div>
                    </div>
                </div>
                <div className="flex flex-col">
                    <div className="w-full h-full rounded-xl shadow-xl my-4 bg-white">
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
                                                Nome
                                            </div>
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            <div className="flex items-center justify-center">
                                                E-mail
                                            </div>
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            <div className="flex items-center justify-center">
                                                Permissão
                                            </div>
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            <BsPencilSquare size={15} className="hover:cursor-pointer" />
                                        </th>
                                    </tr>
                                </thead>
                                <tbody >
                                    { arrayListUsuarios}
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