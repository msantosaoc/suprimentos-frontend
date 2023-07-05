'use client';

import Image from "next/image";
import { Clipboard, Eye, Shirt, Stethoscope, Package, Printer, Paintbrush, Coffee, ShoppingCart, LucideIcon } from 'lucide-react'
import { useState } from "react";

interface CardProps {
    // children: ReactNode;
    solicitacoesList?: SolicitacaoProps[];
    selectedSolicitacao: (solicitacao: SolicitacaoProps) => void;
    toggleModalSolicitacaoLioEdit: () => void;
}

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
}

export default function Card({solicitacoesList, selectedSolicitacao, toggleModalSolicitacaoLioEdit}: CardProps) {
  

    function handleSelectSolicitacao(solicitacao: SolicitacaoProps) {
        selectedSolicitacao(solicitacao);
        console.log(solicitacao)
        toggleModalSolicitacaoLioEdit();
    }
    

    const arraySolicitacoes: any = solicitacoesList?.map((solicitacao, index) => {
        return (
            <div key={solicitacao.id} className="w-full h-16 rounded-lg shadow-md border border-[#d3d3d3] flex my-1 relative hover:scale-[101%] duration-200 hover:cursor-pointer" onClick={() => handleSelectSolicitacao(solicitacao)}><label className={`${ solicitacao.status === "Não visto" ? "visible px-2 rounded-xl absolute left-4 -top-2 bg-light-blue text-white text-xs" : "invisilbe"}  `}>{ solicitacao.status === "Não visto" ? "Novo" : undefined}</label>
                <div className="w-full h-full grid grid-cols-9 group ">
                    <label className="text-base flex items-center justify-center group-hover:cursor-pointer group-hover relative text-gray-menu-icon  "><div className="h-full w-1.5  bg-light-blue absolute top-0 left-0 invisible group-hover:visible rounded-s-lg" /><div className="relative"><Eye size={48} />
                        
                        </div></label>
                    <label className="text-base flex items-center justify-center group-hover:cursor-pointer group-hover col-span-2 text-center px-2">{solicitacao.solicitante}</label>
                    <label className="text-base flex items-center justify-center group-hover:cursor-pointer group-hover col-span-2 text-center px-2">{solicitacao.lentePrincipal}</label>
                    <label className="text-base flex items-center justify-center group-hover:cursor-pointer group-hover text-center px-2">{solicitacao.unidade}</label>
                    <label className="text-base flex items-center justify-center group-hover:cursor-pointer group-hover text-center px-2">{"29/06/2023"}</label>
                    <label className="text-base flex items-center justify-center group-hover:cursor-pointer group-hover text-center px-2">
                        { solicitacao.status === "Não visto" ?
                                <span className="text-base text-[#B0B0B0]">{solicitacao.status}</span>
                                :
                                solicitacao.status === "Em compra" ?
                                <span className="text-base bg-light-blue py-1 px-3 rounded-3xl text-white">{solicitacao.status}</span>
                                :
                                solicitacao.status === "Em análise" ?
                                <span className="text-base bg-[#B0B0B0] py-1 px-3 rounded-3xl text-white">{solicitacao.status}</span>
                                :
                                solicitacao.status === "Disponível" ?
                                <span className="text-base bg-[#79B987] py-1 px-3 rounded-3xl text-white">{solicitacao.status}</span>
                                :
                                solicitacao.status === "Finalizado" ?
                                <span className="text-base bg-[#79B987] py-1 px-3 rounded-3xl text-white">{solicitacao.status}</span>
                                :
                                solicitacao.status === "Recusado" ?
                                <span className="text-base bg-[#FF7070] py-1 px-3 rounded-3xl text-white">{solicitacao.status}</span>
                                :
                                undefined
                    }
                    </label>
                    <Image alt='resposta' src='/iconMessage.svg' width={25} height={25} priority={false} className="m-auto hover:scale-110"/>
                </div>
            </div>

        )
    })

    return arraySolicitacoes
}