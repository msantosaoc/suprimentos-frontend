'use client';

import { MenuContext } from "@/contexts/menu";
import { ThemeContext } from "@/contexts/theme";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { Collapse } from "reactstrap";
import BiBuildings, { BiLibrary } from 'react-icons/bi'
import { BsCloudSun, BsFillFilePlusFill, BsFillGearFill, BsMoonStars, BsPersonPlusFill } from 'react-icons/bs'
import { IoExit, IoExitOutline, IoHome } from 'react-icons/io5'
import { HiLockClosed, HiLockOpen } from 'react-icons/hi2'
import { FaList } from "react-icons/fa";
import { FiMenu } from 'react-icons/fi';
import { AiOutlineRight } from 'react-icons/ai'
import { NewThemeToggle } from "../ThemeToggle";
import { useSession, signOut } from 'next-auth/react';
import { FilePlus, FolderPlus, ListPlus, PlusSquare } from "lucide-react";


export default function Sidebar() {

    const { globalTheme } = useContext(ThemeContext);
    const { globalMenu, setGlobalMenu, globalSubmenu, setGlobalSubmenu, globalSubmenuCadastrar, setGlobalSubmenuCadastrar } = useContext(MenuContext);

    const { data: session } = useSession();





    const toggleCollapse = () => {
        if (globalSubmenu === false) {
            setGlobalSubmenu(true);
            setGlobalMenu(true)
        } else {
            setGlobalSubmenu(false)
        }
    };

    const toggleCollapseCadastrar = () => {
        if (globalSubmenuCadastrar === false) {
            setGlobalSubmenuCadastrar(true);
            setGlobalMenu(true);
        } else {
            setGlobalSubmenuCadastrar(false);
        }
    }


    const toggleMenu = () => { setGlobalMenu(!globalMenu); setGlobalSubmenu(false); setGlobalSubmenuCadastrar(false) }



    useEffect(() => {
        const root = window.document.documentElement;

        if (globalTheme === 'dark') {
            root.classList.add('dark');

        } else {
            root.classList.remove('dark')
            root.classList.remove('light')
        }

    }, [globalTheme])

    return (
        <div className="w-screen h-screen flex">
            <aside
                className={`relative top-0 left-0 z-50  drop-shadow-lg dark:drop-shadow-3xl ${globalMenu ? 'w-64' : 'w-[4.3rem]'} h-screen duration-500  -translate-x-0
            max-sm:absolute max-sm:w-full max-sm:h-6`} aria-label="Sidebar">
                

                <button type="button" onClick={toggleMenu} data-drawer-hide="drawer-navigation" aria-controls="drawer-navigation"
                    className={`text-base p-0 absolute top-10 -right-3 z-10 text-white dark:text-black dark:bg-gray-50  
                border-2 border-[#4d4c4c] duration-300 dark:border-black bg-[#4d4c4c] rounded-full  ${globalMenu ? 'rotate-180 ' : ''} max-sm:hidden`} >

                    <AiOutlineRight />
                    <span className="sr-only">Close menu</span>
                </button>

                <div className={`h-full py-4 overflow-y-auto bg-[#f9fafc] overflow-hidden dark:bg-[#262626] flex flex-col justify-between border border-gray-900 dark:border-gray-900 duration-300 `}>

                    <ul className="space-y-2 -ml-[1.6rem] overflow-collapse max-sm:invisible ">
                        <Link href="/lobby" className={`flex items-center mb-5 dark:bg-[#363636] duration-300 ${globalMenu ? 'bg-transparent  border-[#cecece] rounded-xl dark:bg-transparent' : 'bg-gray-300 rounded-xl '} duration-300 mr-[0.45rem]
                         max-sm:absolute max-sm:top-0 max-sm:flex max-sm:w-full max-sm:h-12 max-sm:left-0 max-sm:bg-transparent max-sm:justify-between max-sm:visible`}>

                            <Image src='/logoEye.png' priority alt='' className="flex-shrink-0 mr-4 h-10 w-10 ml-2 max-sm:visible max-sm:p-1" width={45} height={45} />
                            <span className='text-[#16618b] font-medium text-lg sm:hidden'>Wiki Americas Oftalmocenter</span>
                            <FiMenu className="flex-shrink-0 mr-4 h-10 w-10 ml-2 max-sm:visible max-sm:p-1 max-sm:text-[#16618b] sm:hidden" />
                            <span className="self-center text-xl font-semibold whitespace-nowrap text-[#333] dark:text-white max-sm:hidden">Americas <br />Oftalmocenter</span>
                        </Link>



                        <li>
                            <Link href="/lobby" shallow className={`flex items-center mr-[0.45rem] p-2 text-base font-normal text-gray-900 rounded-lg transition transform hover:-translate-y-1 dark:hover:bg-[#363636]  hover:bg-gray-100 `}>

                                <IoHome className={`flex-shrink-0 w-8 h-8 ml-1 text-gray-500 transition duration-75  group-hover:text-gray-900 dark:group-hover:text-white `} />

                                <span className={`flex-1 ml-5 whitespace-nowrap text-gray-900 dark:text-gray-400 `}>Home</span>
                            </Link>
                        </li>
                        <li>
                            <button type="button" onClick={toggleCollapse} className=" flex items-center w-[calc(100%-0.45rem)] p-2  text-base font-normal duration-300 text-gray-900 transition transform hover:-translate-y-1 rounded-lg group dark:hover:bg-[#363636] hover:bg-gray-300 " aria-expanded="false">

                                <FaList className="flex-shrink-0 w-8 h-8 ml-1 p-1 text-gray-500   group-hover:text-gray-900  " />
                                <span className="flex-1 ml-5 text-left whitespace-nowrap dark:text-gray-400" sidebar-toggle-item='true'>Módulos</span>
                                <svg sidebar-toggle-item='true' className={`w-8 h-8 ml-1 ${globalSubmenu && 'rotate-180'} dark:text-gray-500`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                            </button>

                            <Collapse isOpen={globalSubmenu} >

                                <ul className={` visible py-1 ml-8 mr-4 flex flex-col gap-2 `} >
                                    <li>
                                        <Link href="/solicitacoes" shallow className={`flex items-center w-full p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg pl-11 group hover:-translate-y-1 dark:hover:bg-[#363636] dark:text-gray-400 hover:bg-gray-300  `}>Solicitar</Link>
                                    </li>
                                    <li>
                                        <Link href="#" shallow className={`flex items-center w-full p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg pl-11 group  hover:-translate-y-1 dark:hover:bg-[#363636] hover:bg-gray-300 dark:text-gray-400  `}>Estoque</Link>
                                    </li>
                                    <li>
                                        <Link href="#" shallow className={`flex items-center w-full p-2 text-base font-normal transition duration-75 rounded-lg pl-11 hover:bg-gray-300  hover:-translate-y-1dark:hover:bg-[#363636] text-gray-900 dark:text-gray-400 `}>Compras</Link>
                                    </li>
                                    <li>
                                        <Link href="#" shallow className={`flex items-center w-full p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg pl-11 group hover:-translate-y-1 dark:hover:bg-[#363636] hover:bg-gray-300 dark:text-gray-400 `}>Diretoria</Link>
                                    </li>
                                </ul>

                            </Collapse>
                        </li>
                        <li>
                            <button type="button" onClick={toggleCollapseCadastrar} className=" flex items-center w-[calc(100%-0.45rem)] p-2  text-base font-normal duration-300 text-gray-900 transition transform hover:-translate-y-1 rounded-lg group dark:hover:bg-[#363636] hover:bg-gray-300 " aria-expanded="false">

                                <FilePlus className="flex-shrink-0 w-8 h-8 ml-1 p-1 text-gray-500 group-hover:text-gray-900  " />
                                <span className="flex-1 ml-5 text-left whitespace-nowrap dark:text-gray-400" sidebar-toggle-item='true'>Cadastro</span>
                                <svg sidebar-toggle-item='true' className={`w-8 h-8 ml-1 ${globalSubmenuCadastrar && 'rotate-180'} dark:text-gray-500`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                            </button>
                            <Collapse isOpen={globalSubmenuCadastrar} >

                                <ul className={` visible py-1 ml-8 mr-4 flex flex-col gap-2 `} >
                                    <li>
                                        <Link href="/cadastro/produtos" shallow className={`flex items-center w-full p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg pl-11 group hover:-translate-y-1 dark:hover:bg-[#363636] dark:text-gray-400 hover:bg-gray-300  `}>Produtos</Link>
                                    </li>
                                    <li>
                                        <Link href="/cadastro/usuarios" shallow className={`flex items-center w-full p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg pl-11 group  hover:-translate-y-1 dark:hover:bg-[#363636] hover:bg-gray-300 dark:text-gray-400  `}>Usuários</Link>
                                    </li>
                                    <li>
                                        <Link href="/cadastro/autorizadores" shallow className={`flex items-center w-full p-2 text-base font-normal transition duration-75 rounded-lg pl-11 hover:bg-gray-300  hover:-translate-y-1dark:hover:bg-[#363636] text-gray-900 dark:text-gray-400 `}>Autorizadores</Link>
                                    </li>
                                    <li>
                                        <Link href="/cadastro/marcas" shallow className={`flex items-center w-full p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg pl-11 group hover:-translate-y-1 dark:hover:bg-[#363636] hover:bg-gray-300 dark:text-gray-400 `}>Marcas/Fornec.</Link>
                                    </li>
                                </ul>

                            </Collapse>

                        </li>
                        <li>
                            <a href="#" className={`flex items-center mr-[0.45rem] p-2 text-base font-normal text-gray-900 rounded-lg duration-300 hover:bg-gray-300 transition transform hover:-translate-y-1 dark:hover:bg-[#363636] `}>

                                <BsFillGearFill className="flex-shrink-0 w-8 h-8 ml-1 text-gray-500 transition duration-75  group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" />
                                <span className="flex-1 ml-5 whitespace-nowrap dark:text-gray-400">Configurações</span>
                                <span className="inline-flex items-center justify-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-300">
                                    {
                                        // user?.email === 'msantos@americasoftalmocenter.com' ?
                                        // <HiLockOpen className="my-[2px]" />
                                        // :
                                        <HiLockClosed />

                                    }
                                </span>
                            </a>
                        </li>
                        {/* <li>
                            <Link href="#" className={`flex items-center mr-[0.45rem] p-2 text-base font-normal text-gray-900 duration-300 rounded-lg transition transform hover:-translate-y-1 dark:hover:bg-[#363636]  hover:bg-gray-300 `}>


                                <BiLibrary className={`flex-shrink-0 w-8 h-8 ml-2 text-gray-500 transition duration-75  group-hover:text-gray-900 dark:group-hover:text-white `} />
                                <span className={`flex-1 ml-5 whitespace-nowrap `}>Wiki</span>
                            </Link>
                        </li> */}

                    </ul>
                    <div>
                        <button onClick={() => signOut()} className={`flex items-center w-[calc(100%-1rem)] mx-auto p-2 text-base font-normal text-gray-900 transition dark:hover:bg-[#363636]  rounded-lg group hover:bg-gray-300 `}>

                            <IoExitOutline className='w-8 h-8 ml-[0.40rem] flex-shrink-0 text-gray-600 dark:text-gray-400 hover:text-red-800 dark:hover:text-red-800' />
                            <span className="flex-1 ml-4 whitespace-nowrap text-left dark:text-gray-400 ">{
                                session?.user ? "Sair" : "Login"
                            }</span>

                        </button>
                        <button type="button" onClick={() => setGlobalMenu(true)} className=" flex items-center w-[calc(100%-1rem)] mx-auto p-2 text-base font-normal text-gray-900 transition dark:hover:bg-[#363636]  rounded-lg group hover:bg-gray-300 " aria-expanded="false">

                            {
                                globalTheme === 'dark' ?
                                    <BsCloudSun className='w-8 h-8 ml-1 flex-shrink-0 text-gray-600 dark:text-gray-400 ' />
                                    :
                                    <BsMoonStars className='w-8 h-8 ml-1 p-1 flex-shrink-0 text-gray-600 ' />

                            }
                            <span className="flex-1 ml-5 text-left whitespace-nowrap dark:text-gray-400 " sidebar-toggle-item='true'>{globalTheme === 'dark' ? 'Light' : 'Dark'}</span>
                            <NewThemeToggle />
                        </button>
                    </div>
                </div>

            </aside>
            <div className={`${globalMenu === true ? 'w-full h-full bg-black/20 absolute z-10 transition-all ease-in-out duration-300 ' : ''} `} onClick={toggleMenu}>
                    
                </div>
            
        </div>
    )
}