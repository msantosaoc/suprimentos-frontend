'use client';

import Sidebar from "@/components/Sidebar/Sidebar";
import Image from "next/image";

export default function Lobby() {
    return (
        <div className="h-screen w-screen flex absolute ">
        <Sidebar />
        <div className="h-screen w-screen flex flex-col bg-background">
            <div className="w-full h-1/3 flex ">

                <div className="h-24 w-10/12 bg-white m-auto rounded-xl shadow-xl flex items-center justify-center">
                    <h1 className="text-padrao text-3xl font-bold ">Selecione a Categoria que Deseja Acessar</h1>
                </div>

            </div>
            <div className="w-full h-2/3 ">

                <div className="w-10/12 mx-auto h-1/2 flex items-center justify-between">

                    <div className="w-80 h-full bg-white rounded-xl shadow-xl p-4 hover:bg-light-blue hover:cursor-pointer duration-300">
                        <div className="flex flex-col relative w-full h-full ">
                            
                        <Image alt='logo diretoria' src='/iconSolicita.svg' className=" " fill/>
                        </div>
                    </div>
                    <div className="w-80 h-full bg-white rounded-xl shadow-xl p-4 hover:bg-light-blue hover:cursor-pointer duration-300">
                        <div className="flex flex-col relative w-full h-full">
                            
                        <Image alt='logo diretoria' src='/iconEstoque.svg' className=" " fill/>
                        </div>
                    </div>
                    <div className="w-80 h-full bg-white rounded-xl shadow-xl p-4 hover:bg-light-blue hover:cursor-pointer duration-300">
                        <div className="flex flex-col relative w-full h-full">
                            
                        <Image alt='logo diretoria' src='/iconCompras.svg' className=" " fill/>
                        </div>
                    </div>
                    <div className="w-80 h-full bg-white rounded-xl shadow-xl p-4 hover:bg-light-blue hover:cursor-pointer duration-300">
                        <div className="flex flex-col relative w-full h-full">
                            
                        <Image alt='logo diretoria' src='/iconDiretoria.svg' className=" " fill/>
                        </div>
                    </div>
                </div>

                <div className="w-10/12 mx-auto h-1/2 pt-4 flex items-center justify-between">

                    <div className="w-80 h-full  rounded-xl p-4">
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