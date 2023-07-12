'use client';

import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar/Sidebar";
import Image from "next/image";
import Skeleton from "react-loading-skeleton";
import { useEffect, useState } from "react";


export default function Lobby() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    function LoadingSolicitar(link: string) {
        setIsLoading(true);
        router.push('/solicitacoes')
    }
    function LoadingEstoque(link: string) {
        setIsLoading(true);
        router.push('/estoque')
    }
    function LoadingCompras(link: string) {
        setIsLoading(true);
        router.push('/compras')
    }
    function LoadingDiretoria(link: string) {
        setIsLoading(true);
        router.push('/diretoria')
    }


    return (
        <div>

            <div className="h-screen w-screen flex flex-col bg-background pl-8">
                <div className="absolute top-0 left-0 w-screen h-sreen overflow-hidden">
                    <Sidebar />

                </div>
                <div className="w-full h-1/3 flex ">

                    <div className="h-20 w-10/12 bg-white m-auto rounded-xl shadow-xl flex items-center justify-center">
                        <h1 className="text-padrao text-3xl font-bold ">Selecione o Módulo que Deseja Acessar</h1>
                    </div>

                </div>
                <div className="w-full h-2/3 ">

                    <div className="w-10/12 mx-auto h-1/2 flex items-center justify-between">

                        <div onClick={() => LoadingSolicitar('/solicitacoes')} className={`w-80 h-full backdrop-blur-sm  bg-white rounded-xl shadow-xl  hover:bg-light-blue hover:cursor-pointer duration-300 ${!isLoading && 'p-4'}`}>
                            <div className="flex flex-col relative w-full h-full ">
                                {
                                    isLoading
                                    &&
                                    <div className=" w-full h-full backdrop-blur-sm  flex z-50">
                                        <svg className="animate-spin m-auto h-8 w-8  text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>

                                    </div>
                                }
                                <Image alt='logo diretoria' src='/iconSolicita.svg' className=" " fill loading="lazy" />
                            </div>
                        </div>
                        <div className="w-80 h-full bg-white rounded-xl shadow-xl p-4 hover:bg-light-blue hover:cursor-pointer duration-300">
                            <div className="flex flex-col relative w-full h-full">

                                <Image alt='logo diretoria' src='/iconEstoque.svg' className=" " fill loading="lazy" />
                            </div>
                        </div>
                        <div className="w-80 h-full bg-white rounded-xl shadow-xl p-4 hover:bg-light-blue hover:cursor-pointer duration-300">
                            <div className="flex flex-col relative w-full h-full">

                                <Image alt='logo diretoria' src='/iconCompras.svg' className=" " fill loading="lazy" />
                            </div>
                        </div>
                        <div className="w-80 h-full bg-white rounded-xl shadow-xl p-4 hover:bg-light-blue hover:cursor-pointer duration-300">
                            <div className="flex flex-col relative w-full h-full">

                                <Image alt='logo diretoria' src='/iconDiretoria.svg' className=" " fill loading="lazy" />
                            </div>
                        </div>
                    </div>

                    <div className="w-10/12 mx-auto h-1/2 pt-4 flex items-center justify-between">

                        <div className="w-80 h-full  rounded-xl p-4" >
                            <div className="flex flex-col relative w-full h-full">

                                <h1 className="text-padrao font-semibold text-2xl mx-auto">Solicitar</h1>
                            </div>
                        </div>
                        <div className="w-80 h-full  rounded-xl  p-4">
                            <div className="flex flex-col relative w-full h-full">

                                <h1 className="text-padrao font-semibold text-2xl mx-auto">Estoque</h1>
                            </div>
                        </div>
                        <div className="w-80 h-full  rounded-xl p-4">
                            <div className="flex flex-col relative w-full h-full">

                                <h1 className="text-padrao font-semibold text-2xl mx-auto">Compras</h1>
                            </div>
                        </div>
                        <div className="w-80 h-full transparent  rounded-xl p-4">
                            <div className="flex flex-col relative w-full h-full">

                                <h1 className="text-padrao font-semibold text-2xl mx-auto">Diretoria</h1>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
