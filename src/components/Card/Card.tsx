'use client';

import Image from "next/image";
import { Clipboard, Eye, Shirt, Stethoscope, Package, Printer, Paintbrush, Coffee, ShoppingCart, LucideIcon } from 'lucide-react'
import { useState } from "react";
import { BuscaSolicitacaoInicial, Categoria, ListarProdutosSolicitados } from "@/lib/types/global";


interface CardProps {
    // children: ReactNode;
    // solicitacoesList?: SolicitacaoProps[];
    selectedSolicitacao: (solicitacao: BuscaSolicitacaoInicial) => void;
    selectedSolicitacaoProdutos: (solicitacao: BuscaSolicitacaoInicial) => void;
    toggleModalSolicitacaoLioEdit: () => void;
    toggleModalSolicitacaoProdutoEdit: () => void;
    // solicitacaoesProdutosList?: ListarProdutosSolicitados[];
    selectedCategoria: Categoria;
    solicitacoesIniciais: BuscaSolicitacaoInicial[];
};





export default function Card({ selectedSolicitacao, selectedSolicitacaoProdutos, toggleModalSolicitacaoLioEdit,toggleModalSolicitacaoProdutoEdit, selectedCategoria, solicitacoesIniciais}: CardProps) {
  

    function handleSelectSolicitacao(solicitacao: BuscaSolicitacaoInicial) {

        if(solicitacao.Categoria.name === "Lio") {
            selectedSolicitacao(solicitacao);
            toggleModalSolicitacaoLioEdit();

        }else {
        handleSelectSolicitacaoProdutos(solicitacao);  
        }
        
        
    };
    
    function handleSelectSolicitacaoProdutos(solicitacao: BuscaSolicitacaoInicial) {
        selectedSolicitacaoProdutos(solicitacao);
      
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
            <div key={solicitacao.id} className="w-full  rounded-lg shadow-md border border-[#d3d3d3] flex my-1 relative hover:scale-[101%] duration-200 hover:cursor-pointer" onClick={() => handleSelectSolicitacao(solicitacao)}><label className={`${ solicitacao.status === "Não visto" ? "visible px-2 rounded-xl absolute left-4 -top-2 bg-light-blue text-white text-xs" : "invisilbe"}  `} >{ solicitacao.status === "Não visto" ? "Novo" : undefined}</label>
                
                
                <div className="w-full h-full grid grid-cols-10 group ">
                    <label className="text-base flex items-center justify-center group-hover:cursor-pointer group-hover relative text-gray-menu-icon  "><div className="h-full w-1.5  bg-light-blue absolute top-0 left-0 invisible group-hover:visible rounded-s-lg" /><div className="relative py-2">
                        {
                            solicitacao.Categoria.name === 'Escritório'
                            ?
                            <Printer size={48} />
                            :
                            solicitacao.Categoria.name === 'Uniforme'
                            ?
                            <Shirt size={48} />
                            :
                            solicitacao.Categoria.name === 'Cirúrgico'
                            ?
                            <Stethoscope size={48} />
                            :
                            solicitacao.Categoria.name === 'Limpeza'
                            ?
                            <Paintbrush size={48} />
                            :
                            solicitacao.Categoria.name === 'Insumo'
                            ?
                            <Coffee size={48} />
                            :
                            <Eye size={48} /> 
                        }
                        
                        
                        </div></label>
                    <label className="text-base flex items-center justify-center group-hover:cursor-pointer group-hover text-center px-2">{solicitacao.id}</label>
                    <label className="text-base flex items-center justify-center group-hover:cursor-pointer group-hover col-span-2 text-center px-2">{solicitacao.User.name}</label>
                    <label className="text-base flex items-center justify-center group-hover:cursor-pointer group-hover col-span-2 text-center px-2">{solicitacao.SolicitacaoLio ? solicitacao.SolicitacaoLio.paciente : solicitacao.Solicitacao?.name}</label>
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


   
    return arraySolicitacoesIniciais;
    
    
    



      

    
    
}