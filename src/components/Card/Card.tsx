'use client';

import Image from "next/image";
import { Clipboard, Eye, Shirt, Stethoscope, Package, Printer, Paintbrush, Coffee, ShoppingCart, LucideIcon } from 'lucide-react'
import { useState } from "react";
import { BuscaSolicitacaoInicial, ListarProdutosSolicitados } from "@/lib/types/global";


interface CardProps {
    // children: ReactNode;
    solicitacoesList?: SolicitacaoProps[];
    selectedSolicitacao: (solicitacao: BuscaSolicitacaoInicial) => void;
    selectedSolicitacaoProdutos: (solicitacao: BuscaSolicitacaoInicial) => void;
    toggleModalSolicitacaoLioEdit: () => void;
    toggleModalSolicitacaoProdutoEdit: () => void;
    solicitacaoesProdutosList?: ListarProdutosSolicitados[];
    selectedCategoria: Categoria;
    solicitacoesIniciais: BuscaSolicitacaoInicial[];
};

interface Categoria {
    id: string;
    name: string;
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

export default function Card({solicitacoesList, selectedSolicitacao, selectedSolicitacaoProdutos, toggleModalSolicitacaoLioEdit,toggleModalSolicitacaoProdutoEdit, solicitacaoesProdutosList, selectedCategoria, solicitacoesIniciais}: CardProps) {
  

    function handleSelectSolicitacao(solicitacao: BuscaSolicitacaoInicial) {
        selectedSolicitacao(solicitacao);
        console.log(solicitacao)
        toggleModalSolicitacaoLioEdit();
    };

    function handleSelectSolicitacaoProdutos(solicitacao: BuscaSolicitacaoInicial) {
        selectedSolicitacaoProdutos(solicitacao);
        console.log(solicitacao)
        toggleModalSolicitacaoProdutoEdit();
    };
    
    


    // const arraySolicitacoes: any = solicitacoesList?.map((solicitacao, index) => {
    //     return (
    //         <div key={solicitacao.id} className="w-full h-16 rounded-lg shadow-md border border-[#d3d3d3] flex my-1 relative hover:scale-[101%] duration-200 hover:cursor-pointer" onClick={() => handleSelectSolicitacao(solicitacao)}><label className={`${ solicitacao.status === "Não visto" ? "visible px-2 rounded-xl absolute left-4 -top-2 bg-light-blue text-white text-xs" : "invisilbe"}  `}>{ solicitacao.status === "Não visto" ? "Novo" : undefined}</label>
    //             <div className="w-full h-full grid grid-cols-9 group ">
    //                 <label className="text-base flex items-center justify-center group-hover:cursor-pointer group-hover relative text-gray-menu-icon  "><div className="h-full w-1.5  bg-light-blue absolute top-0 left-0 invisible group-hover:visible rounded-s-lg" /><div className="relative"><Eye size={48} />
                        
    //                     </div></label>
    //                 <label className="text-base flex items-center justify-center group-hover:cursor-pointer group-hover col-span-2 text-center px-2">{solicitacao.solicitante}</label>
    //                 <label className="text-base flex items-center justify-center group-hover:cursor-pointer group-hover col-span-2 text-center px-2">{solicitacao.paciente}</label>
    //                 <label className="text-base flex items-center justify-center group-hover:cursor-pointer group-hover text-center px-2">{solicitacao.unidade}</label>
    //                 <label className="text-base flex items-center justify-center group-hover:cursor-pointer group-hover text-center px-2">{"29/06/2023"}</label>
    //                 <label className="text-base flex items-center justify-center group-hover:cursor-pointer group-hover text-center px-2">
    //                     { solicitacao.status === "Não visto" ?
    //                             <span className="text-base text-[#B0B0B0]">{solicitacao.status}</span>
    //                             :
    //                             solicitacao.status === "Em compra" ?
    //                             <span className="text-base bg-light-blue py-1 px-3 rounded-3xl text-white">{solicitacao.status}</span>
    //                             :
    //                             solicitacao.status === "Em análise" ?
    //                             <span className="text-base bg-[#B0B0B0] py-1 px-3 rounded-3xl text-white">{solicitacao.status}</span>
    //                             :
    //                             solicitacao.status === "Disponível" ?
    //                             <span className="text-base bg-[#79B987] py-1 px-3 rounded-3xl text-white">{solicitacao.status}</span>
    //                             :
    //                             solicitacao.status === "Finalizado" ?
    //                             <span className="text-base bg-[#79B987] py-1 px-3 rounded-3xl text-white">{solicitacao.status}</span>
    //                             :
    //                             solicitacao.status === "Recusado" ?
    //                             <span className="text-base bg-[#FF7070] py-1 px-3 rounded-3xl text-white">{solicitacao.status}</span>
    //                             :
    //                             undefined
    //                 }
    //                 </label>
    //                 {
    //                     solicitacao.resposta
    //                     ?
    //                     <Image alt='resposta' src='/iconMessage.svg' width={25} height={25} priority={false} className={`m-auto hover:scale-110`} />
    //                     :
    //                     undefined
    //                 }
    //             </div>
    //         </div>

    //     )
    // });

    // const arraySolicitacoesProdutos: any = solicitacaoesProdutosList?.map((solicitacao, index) => {
    //     return (
    //         <div key={solicitacao.id} className="w-full h-16 rounded-lg shadow-md border border-[#d3d3d3] flex my-1 relative hover:scale-[101%] duration-200 hover:cursor-pointer" onClick={() => handleSelectSolicitacaoProdutos(solicitacao)}><label className={`${ solicitacao.status === "Não visto" ? "visible px-2 rounded-xl absolute left-4 -top-2 bg-light-blue text-white text-xs" : "invisilbe"}  `}>{ solicitacao.status === "Não visto" ? "Novo" : undefined}</label>
    //             <div className="w-full h-full grid grid-cols-9 group ">
    //                 <label className="text-base flex items-center justify-center group-hover:cursor-pointer group-hover relative text-gray-menu-icon  "><div className="h-full w-1.5  bg-light-blue absolute top-0 left-0 invisible group-hover:visible rounded-s-lg" /><div className="relative">
    //                     {
    //                         solicitacao.categoria?.name === 'Escritório'
    //                         ?
    //                         <Printer size={48} />
    //                         :
    //                         solicitacao.categoria?.name === 'Uniforme'
    //                         ?
    //                         <Shirt size={48} />
    //                         :
    //                         solicitacao.categoria?.name === 'Cirúrgico'
    //                         ?
    //                         <Stethoscope size={48} />
    //                         :
    //                         solicitacao.categoria?.name === 'Limpeza'
    //                         ?
    //                         <Paintbrush size={48} />
    //                         :
    //                         solicitacao.categoria?.name === 'Insumo'
    //                         ?
    //                         <Coffee size={48} />
    //                         :
    //                         undefined
    //                     }
                        
                        
    //                     </div></label>
    //                 <label className="text-base flex items-center justify-center group-hover:cursor-pointer group-hover col-span-2 text-center px-2">{solicitacao.usuario.name}</label>
    //                 <label className="text-base flex items-center justify-center group-hover:cursor-pointer group-hover col-span-2 text-center px-2">{solicitacao.id}</label>
    //                 <label className="text-base flex items-center justify-center group-hover:cursor-pointer group-hover text-center px-2">{solicitacao.unidade?.name}</label>
    //                 <label className="text-base flex items-center justify-center group-hover:cursor-pointer group-hover text-center px-2">{"29/06/2023"}</label>
    //                 <label className="text-base flex items-center justify-center group-hover:cursor-pointer group-hover text-center px-2">
    //                     { solicitacao.status === "Não visto" ?
    //                             <span className="text-base text-[#B0B0B0]">{solicitacao.status}</span>
    //                             :
    //                             solicitacao.status === "Em compra" ?
    //                             <span className="text-base bg-light-blue py-1 px-3 rounded-3xl text-white">{solicitacao.status}</span>
    //                             :
    //                             solicitacao.status === "Em análise" ?
    //                             <span className="text-base bg-[#B0B0B0] py-1 px-3 rounded-3xl text-white">{solicitacao.status}</span>
    //                             :
    //                             solicitacao.status === "Disponível" ?
    //                             <span className="text-base bg-[#79B987] py-1 px-3 rounded-3xl text-white">{solicitacao.status}</span>
    //                             :
    //                             solicitacao.status === "Finalizado" ?
    //                             <span className="text-base bg-[#79B987] py-1 px-3 rounded-3xl text-white">{solicitacao.status}</span>
    //                             :
    //                             solicitacao.status === "Recusado" ?
    //                             <span className="text-base bg-[#FF7070] py-1 px-3 rounded-3xl text-white">{solicitacao.status}</span>
    //                             :
    //                             undefined
    //                 }
    //                 </label>
    //                 {
    //                     solicitacao.resposta
    //                     ?
    //                     <Image alt='resposta' src='/iconMessage.svg' width={25} height={25} priority={false} className={`m-auto hover:scale-110`} />
    //                     :
    //                     undefined
    //                 }
    //             </div>
    //         </div>

    //     )
    // });

    const arraySolicitacoesIniciais: any = solicitacoesIniciais?.map((solicitacao, index) => {
        return (
            <div key={solicitacao.id} className="w-full h-16 rounded-lg shadow-md border border-[#d3d3d3] flex my-1 relative hover:scale-[101%] duration-200 hover:cursor-pointer" ><label className={`${ solicitacao.status === "Não visto" ? "visible px-2 rounded-xl absolute left-4 -top-2 bg-light-blue text-white text-xs" : "invisilbe"}  `}>{ solicitacao.status === "Não visto" ? "Novo" : undefined}</label>
                
                
                <div className="w-full h-full grid grid-cols-9 group ">
                    <label className="text-base flex items-center justify-center group-hover:cursor-pointer group-hover relative text-gray-menu-icon  "><div className="h-full w-1.5  bg-light-blue absolute top-0 left-0 invisible group-hover:visible rounded-s-lg" /><div className="relative">
                        {
                            
                            solicitacao.Solicitacao?.categoriaId === 'cljhn61rz0004vvmcmqo4qmbt'
                            ?
                            <Printer size={48} />
                            :
                            solicitacao.Solicitacao?.categoriaId  === 'cljszugu1000svvgkyw4lxze1' 
                            ?
                            <Shirt size={48} />
                            :
                            solicitacao.Solicitacao?.categoriaId  === 'cljszujtz000uvvgk46gobtav' 
                            ?
                            <Stethoscope size={48} />
                            :
                            solicitacao.Solicitacao?.categoriaId  === 'Limpeza'
                            ?
                            <Paintbrush size={48} />
                            :
                            solicitacao.Solicitacao?.categoriaId === 'Insumo'
                            ?
                            <Coffee size={48} />
                            :
                            <Eye size={48} /> 
                        }
                        
                        
                        </div></label>
                    <label className="text-base flex items-center justify-center group-hover:cursor-pointer group-hover col-span-2 text-center px-2">{solicitacao.User.name}</label>
                    <label className="text-base flex items-center justify-center group-hover:cursor-pointer group-hover col-span-2 text-center px-2">{solicitacao.SolicitacaoLio ? solicitacao.SolicitacaoLio.paciente : solicitacao.Solicitacao?.id}</label>
                    <label className="text-base flex items-center justify-center group-hover:cursor-pointer group-hover text-center px-2">{solicitacao.Unidade.name}</label>
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
                    {
                        solicitacao.Solicitacao?.resposta || solicitacao.SolicitacaoLio?.resposta
                        ?
                        <Image alt='resposta' src='/iconMessage.svg' width={25} height={25} priority={false} className={`m-auto hover:scale-110`} />
                        :
                        undefined
                    }
                </div>
            </div>

        )
    });


   
    return arraySolicitacoesIniciais
    
    
    



      

    
    
}