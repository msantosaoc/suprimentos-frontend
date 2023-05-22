'use client';

import Card from "@/components/Card/Card";
import Sidebar from "@/components/Sidebar/Sidebar";
import Image from "next/image";

export default function Solicitacoes() {
    return (
        <div>
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

                            <div className="h-20 w-20 bg-light-blue flex flex-col justify-end rounded-md relative pb-1">
                                <Image alt='LIO' src='/iconTodos.svg' fill className="px-2 pt-1 pb-4 " />
                                <label className="text-center font-semibold text-gray-menu-icon text-sm">Todos</label>
                            </div>
                            <div className="h-20 w-20 bg-light-gray flex flex-col justify-end rounded-md relative pb-1">
                                <Image alt='LIO' src='/iconLIO.svg' fill className="px-2 pt-2 pb-4" />
                                <label className="text-center font-semibold text-gray-menu-icon text-sm">LIO</label>
                            </div>
                            <div className="h-20 w-20 bg-light-gray flex flex-col justify-end rounded-md relative pb-1">
                                <Image alt='LIO' src='/iconUniforme.svg' fill className="px-2 pt-2 pb-4" />
                                <label className="text-center font-semibold text-gray-menu-icon text-sm">Uniforme</label>
                            </div>
                            <div className="h-20 w-20 bg-light-gray flex flex-col justify-end rounded-md relative pb-1">
                                <Image alt='LIO' src='/iconCirurgico.svg' fill className="px-2 pt-2 pb-4" />
                                <label className="text-center font-semibold text-gray-menu-icon text-sm">Cirúrgico</label>
                            </div>
                            <div className="h-20 w-20 bg-light-gray flex flex-col justify-end rounded-md relative pb-1">
                                <Image alt='LIO' src='/iconEscritorio.svg' fill className="px-2 pt-2 pb-4" />
                                <label className="text-center font-semibold text-gray-menu-icon text-sm">Escritório</label>
                            </div>


                        </div>
                        <div className="h-full w-1/2 flex items-center justify-end gap-3">
                        <div className="h-20 w-20 bg-light-gray flex flex-col justify-end rounded-md relative pb-1">
                                <Image alt='LIO' src='/iconCarrinho.svg' fill className="px-3 pt-2 pb-4" />
                                <label className="text-center font-semibold text-gray-menu-icon text-sm">Comprar</label>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="w-full h-[82%] px-10 py-3  ">
                    <div className="w-full h-full m-auto rounded-xl shadow-xl flex flex-col bg-white px-3 pt-2">
                        <div className="grid grid-cols-9 py-2">
                        <label className="text-base font-semibold flex items-center justify-center ">Paciente</label>
                        <label className="text-base font-semibold flex items-center justify-center ">Lente Principal</label>
                        <label className="text-base font-semibold flex items-center justify-center ">Lente Reserva</label>
                        <label className="text-base font-semibold flex items-center justify-center ">Dt. Crirugia</label>
                        <label className="text-base font-semibold flex items-center justify-center ">Médico</label>
                        <label className="text-base font-semibold flex items-center justify-center ">Unidade</label>
                        <label className="text-base font-semibold flex items-center justify-center ">Injetor/Cartucho</label>
                        <label className="text-base font-semibold flex items-center justify-center ">Status</label>
                        <label className="text-base font-semibold flex items-center justify-center "></label>
                        </div>
                        <Card />
                    </div>

                </div>
            </div>
        </div>
    )
}