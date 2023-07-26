'use client';

import { Session } from "next-auth";
import Image, { ImageProps } from "next/image";
import { useRouter } from "next/navigation";
import { ReactElement, ReactNode, useState } from "react";

interface Props {
    userRole: Session | null;

}

interface Mock {
    name: string;
    Image: ReactElement;
    DisabledImage: ReactElement;
    link: string;
    route: Function;
}

export default function Modulos({userRole}: Props) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingEstoque, setIsLoadingEstoque] = useState(false);
    const [isLoadingCompras, setIsLoadingCompras] = useState(false);
    const [isLoadingDiretoria, setIsLoadingDiretoria] = useState(false);

    const role = userRole?.user.role

    function LoadingSolicitar(link: string) {
       
            setIsLoading(true);
            router.push(link);
    }
    function LoadingEstoque(link: string) {
        setIsLoadingEstoque(true);
        router.push(link)
    }
    function LoadingCompras(link: string) {
        setIsLoadingCompras(true);
        router.push(link)
    }
    function LoadingDiretoria(link: string) {
        setIsLoadingDiretoria(true);
        router.push(link)
    }

    const mock: Mock[] = [
        {name: 'Solicitar', Image: <Image alt='logo solicitações' src='/iconSolicita.svg'  className=" " fill loading="lazy" />, DisabledImage: <Image alt='logo solicitações' src='/iconSolicitaDisabled.svg'  className=" " fill loading="lazy" />, link: '/solicitacoes', route: LoadingSolicitar},
        {name: 'Estoque', Image: <Image alt='logo estoque' src='/iconEstoque.svg'  className=" " fill loading="lazy" />, DisabledImage: <Image alt='logo solicitações' src='/iconEstoqueDisabled.svg'  className=" " fill loading="lazy" />, link: '/estoque', route: LoadingEstoque},
        {name: 'Compras', Image: <Image alt='logo compras' src='/iconCompras.svg'  className=" " fill loading="lazy" />, DisabledImage: <Image alt='logo solicitações' src='/iconComprasDisabled.svg'  className=" " fill loading="lazy" />, link: '/#', route: LoadingCompras},
        {name: 'Diretoria', Image: <Image alt='logo diretoria' src='/iconDiretoria.svg'  className=" " fill loading="lazy" />, DisabledImage: <Image alt='logo solicitações' src='/iconDiretoriaDisabled.svg'  className=" " fill loading="lazy" />,link: '/#', route: LoadingDiretoria},
    ];
    const hasPermissionSupervisao = role === 'SUPERVISAO' || role === 'ESTOQUE' || role === 'COMPRAS' || role === 'DIRETORIA' || role === 'CONSULTORIA' ? true : false; //esses perfis podem acessar as solicitacoes
    const hasPermissionEstoque = role === 'ESTOQUE' || role === 'DIRETORIA' ? true : false; //esses perfis podem acessar as solicitacoes
    const hasPermissionCompras = role === 'COMPRAS' || role === 'ESTOQUE' || role === 'DIRETORIA' ? true : false; //esses perfis podem acessar as solicitacoes
    const hasPermissionDiretoria = role === 'DIRETORIA' ? true : false;

    

    return (
        <div className="w-full h-2/3 ">

            <div className="w-10/12 mx-auto h-1/2 flex items-center justify-between">

                <div onClick={() => !hasPermissionSupervisao ? '' : LoadingSolicitar('/solicitacoes')} className={`w-80 h-full  ${!hasPermissionSupervisao ? `bg-[#f2f2f2] backdrop-blur-xl  ${!isLoading && ''}` : `bg-white backdrop-blur-sm hover:bg-light-blue hover:cursor-pointer duration-300 ${!isLoading && 'p-4'}`}  rounded-xl shadow-xl  `}>
                    <div className="flex flex-col relative w-full h-full ">
                        {
                            isLoading
                            &&
                            <div className=" w-full h-full backdrop-blur-sm flex z-50">
                                <svg className="animate-spin m-auto h-8 w-8  text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>

                            </div>
                        }
                        <div className={`w-full h-full absolute z-50  rounded-xl ${!hasPermissionSupervisao ? '' : 'hidden' }`}></div>
                        {
                            hasPermissionSupervisao
                            ?
                            <Image alt='logo diretoria' src='/iconSolicita.svg'  className=" " fill loading="lazy" />
                            :
                            <Image alt='logo solicitações' src='/iconSolicitaDisabled.svg'  className=" " fill loading="lazy" />
                        }
                    </div>
                </div>

                <div onClick={() => !hasPermissionEstoque ? '' : LoadingEstoque('/estoque')} className={`w-80 h-full  ${!hasPermissionEstoque ? `bg-[#f2f2f2] backdrop-blur-xl  ${!isLoadingEstoque && ''}` : `bg-white backdrop-blur-sm hover:bg-light-blue hover:cursor-pointer duration-300 ${!isLoadingEstoque && 'p-4'}`}  rounded-xl shadow-xl  `}>
                    <div className="flex flex-col relative w-full h-full ">
                        {
                            isLoadingEstoque
                            &&
                            <div className=" w-full h-full backdrop-blur-sm flex z-50">
                                <svg className="animate-spin m-auto h-8 w-8  text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>

                            </div>
                        }
                        <div className={`w-full h-full absolute z-50  rounded-xl  ${!hasPermissionEstoque ? '' : 'hidden' }`}></div>
                        {
                            hasPermissionEstoque
                            ?
                            <Image alt='logo diretoria' src='/iconEstoque.svg'  className=" " fill loading="lazy" />
                            :
                            <Image alt='logo solicitações' src='/iconEstoqueDisabled.svg'  className=" " fill loading="lazy" />
                        }
                    </div>
                </div>

                <div onClick={() => !hasPermissionCompras ? '' : LoadingCompras('/compras')} className={`w-80 h-full  ${!hasPermissionCompras ? `bg-[#f2f2f2] backdrop-blur-xl  ${!isLoadingCompras && ''}` : `bg-white backdrop-blur-sm hover:bg-light-blue hover:cursor-pointer duration-300 ${!isLoadingCompras && 'p-4'}`}  rounded-xl shadow-xl  `}>
                    <div className="flex flex-col relative w-full h-full ">
                        {
                            isLoadingCompras
                            &&
                            <div className=" w-full h-full backdrop-blur-sm flex z-50">
                                <svg className="animate-spin m-auto h-8 w-8  text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>

                            </div>
                        }
                        <div className={`w-full h-full absolute z-50  rounded-xl  ${!hasPermissionCompras ? '' : 'hidden' }`}></div>
                        {
                            hasPermissionCompras
                            ?
                            <Image alt='logo diretoria' src='/iconCompras.svg'  className=" " fill loading="lazy" />
                            :
                            <Image alt='logo solicitações' src='/iconComprasDisabled.svg'  className=" " fill loading="lazy" />
                        }
                    </div>
                </div>

                <div onClick={() => !hasPermissionDiretoria ? '' : LoadingDiretoria('/diretoria')} className={`w-80 h-full  ${!hasPermissionDiretoria ? `bg-[#f2f2f2] backdrop-blur-xl  ${!isLoadingDiretoria && ''}` : `bg-white backdrop-blur-sm hover:bg-light-blue hover:cursor-pointer duration-300 ${!isLoadingDiretoria && 'p-4'}`}  rounded-xl shadow-xl  `}>
                    <div className="flex flex-col relative w-full h-full ">
                        {
                            isLoadingDiretoria
                            &&
                            <div className=" w-full h-full backdrop-blur-sm flex z-50">
                                <svg className="animate-spin m-auto h-8 w-8  text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>

                            </div>
                        }
                        <div className={`w-full h-full absolute z-50  rounded-xl  ${!hasPermissionDiretoria ? '' : 'hidden' }`}></div>
                        {
                            hasPermissionDiretoria
                            ?
                            <Image alt='logo diretoria' src='/iconDiretoria.svg'  className=" " fill loading="lazy" />
                            :
                            <Image alt='logo solicitações' src='/iconDiretoriaDisabled.svg'  className=" " fill loading="lazy" />
                        }
                    </div>
                </div>


                        
                
            </div>

            <div className="w-10/12 mx-auto h-1/2 pt-4 flex items-center justify-between">

                <div className="w-80 h-full  rounded-xl p-4" >
                    <div className="flex flex-col relative w-full h-full">

                        <h1 className={`${hasPermissionSupervisao ? 'text-padrao' : 'text-[#cecece]' }  font-semibold text-2xl mx-auto`}>Solicitar</h1>
                    </div>
                </div>
                <div className={`w-80 h-full  rounded-xl  p-4`}>
                    <div className="flex flex-col relative w-full h-full">

                        <h1 className={`${hasPermissionEstoque ? 'text-padrao' : 'text-[#cecece]' }  font-semibold text-2xl mx-auto`}>Estoque</h1>
                    </div>
                </div>
                <div className="w-80 h-full  rounded-xl p-4">
                    <div className="flex flex-col relative w-full h-full">

                        <h1 className={`${hasPermissionCompras ? 'text-padrao' : 'text-[#cecece]' }  font-semibold text-2xl mx-auto`}>Compras</h1>
                    </div>
                </div>
                <div className="w-80 h-full transparent  rounded-xl p-4">
                    <div className="flex flex-col relative w-full h-full">

                        <h1 className={`${hasPermissionDiretoria ? 'text-padrao' : 'text-[#cecece]' }  font-semibold text-2xl mx-auto`}>Diretoria</h1>
                    </div>
                </div>
            </div>

        </div>
    )
}