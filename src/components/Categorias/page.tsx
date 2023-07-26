'use client';
import { Categoria } from '@/lib/types/global';
import { Clipboard, Eye, Shirt, Stethoscope, Package, Printer, Paintbrush, Coffee, ShoppingCart, LucideIcon } from 'lucide-react'
import React, { Component, useEffect, useState } from 'react';
import { useSession } from "next-auth/react";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

interface Categorias {
    id: string;
    name: string;
    Icon: JSX.Element
}

interface CategoriasProps extends LucideIcon {
    id: string;
    name: string;
    Icon: JSX.Element;
    className?: React.HTMLAttributes<HTMLDivElement>
};



interface CategoriaProps {
    selectedCategory: Categoria;
    onCategoryChange: (category: Categoria) => void;
}

export default function Categorias({ selectedCategory, onCategoryChange }: CategoriaProps) {

    const { data: session } = useSession();

    const hasPermissionSupervisao = session?.user.role === 'SUPERVISAO' || session?.user.role === 'ESTOQUE' || session?.user.role === 'COMPRAS' || session?.user.role === 'DIRETORIA' || session?.user.role === 'CONSULTORIA' ? true : false; //esses perfis podem acessar as solicitacoes
    const hasPermissionEstoque = session?.user.role === 'ESTOQUE' || session?.user.role === 'DIRETORIA' ? true : false; //esses perfis podem acessar as solicitacoes
    const hasPermissionCompras = session?.user.role === 'COMPRAS' || session?.user.role === 'ESTOQUE' || session?.user.role === 'DIRETORIA' ? true : false; //esses perfis podem acessar as solicitacoes
    const hasPermissionDiretoria = session?.user.role === 'DIRETORIA' ? true : false;
    const hasPermissionConsultoria = session?.user.role === 'CONSULTORIA' ? true : false;

    const mock: any = [
        { id: 1, name: 'Todos', Icon: <Clipboard size={48} />, role: ['SUPERVISAO, CONSULTORIA'] },
        { id: 2, name: 'Lio', Icon: <Eye size={48} />, role: ['CONSULTORIA'] },
        { id: 3, name: 'Uniforme', Icon: <Shirt size={48} />, role: ['SUPERVISAO'] },
        { id: 4, name: 'Cirúrgico', Icon: <Stethoscope size={48} />, role: ['CONSULTORIA'] },
        { id: 5, name: 'Limpeza', Icon: <Paintbrush size={48} />, role: ['SUPERVISAO'] },
        { id: 6, name: 'Insumo', Icon: <Coffee size={48} />, role: ['SUPERVISAO'] },
        { id: 7, name: 'Escritório', Icon: <Printer size={48} />, role: ['SUPERVISAO'] },
    ];

    const userRole = session?.user.role;

   

    const [categories, setCategories] = useState<any[]>(mock);
    const [filtroCategoria, setFiltroCategoria] = useState<Categoria>(selectedCategory);

    async function Teste() {
        await new Promise((resolve) => setTimeout(resolve, 5000))
    }

    useEffect(() => {
        Teste()
        setFiltroCategoria({ id: 0, name: "Todos", categoriaOnSubCategoria: [{ SubCategoria: { id: 0, name: '', createdAt: '', updatedAt: '' } }] })
    }, [])

    const handleFilter = (category: Categoria) => {
        let all = { id: 0, name: '', categoriaOnSubCategoria: [{ SubCategoria: { id: 0, name: '', createdAt: '', updatedAt: '' } }] } as Categoria;
        let categoria = category.name === "Todos" ? all : category
        console.log(category)
        onCategoryChange(categoria);
        setFiltroCategoria(category);
    };

    
    

    return (
        <>
            <div className={`  h-20 w-20 flex flex-col justify-end items-center rounded-md relative pb-1 hover:scale-110 duration-200 cursor-pointer active:bg-light-blue active:text-white ${filtroCategoria.name === 'Todos' ? 'text-white bg-light-blue' : 'bg-light-gray text-gray-menu-icon'}`} onClick={() => handleFilter(categories.find(category=> category.name.includes("Todos")))}>
                <span><Clipboard size={48} /></span>
                <label >Todos</label>
            </div>
            

            <div className={`h-20 w-20 flex flex-col justify-end items-center overflow-hidden relative rounded-md  group active:bg-light-blue `}>
                <div className={`${!hasPermissionConsultoria ? 'w-full h-full bg-[#f2f2f2]/80  absolute z-50 ' : 'hidden'}`} />
                <div className={`h-20 w-20  flex flex-col justify-end items-center rounded-md relative pb-1  group-hover:cursor-pointer active:bg-light-blue ${hasPermissionSupervisao && filtroCategoria.name === 'Lio' ? 'text-white bg-light-blue' : 'bg-light-gray text-gray-menu-icon'} `} onClick={() => handleFilter(categories.find(category=> category.name.includes("Lio")))}>
                    <span><Eye size={48} className={`${!hasPermissionConsultoria && 'text-[#909090]'}`}/></span>
                    <label className={`${hasPermissionConsultoria && 'group-hover:cursor-pointer group-active:text-white'}`}>Lio</label>
                </div>
            </div>

            <div className={`h-20 w-20 flex flex-col justify-end items-center overflow-hidden relative rounded-md  group active:bg-light-blue  `}>
                <div className={`${!hasPermissionSupervisao ? 'w-full h-full bg-[#f2f2f2]/80  absolute z-50' : 'hidden'}`} />
                <div className={`h-20 w-20  flex flex-col justify-end items-center rounded-md relative pb-1  group-hover:cursor-pointer active:bg-light-blue active:text-white ${hasPermissionSupervisao && filtroCategoria.name === 'Uniforme' ? 'text-white bg-light-blue' : 'bg-light-gray text-gray-menu-icon'} `} onClick={() => handleFilter(categories.find(category=> category.name.includes("Uniforme")))}>
                    <span><Shirt size={48} className={`${!hasPermissionSupervisao && 'text-[#909090]'}`}/></span>
                    <label className={`${hasPermissionSupervisao && 'group-hover:cursor-pointer group-active:text-white'}`}>Uniforme</label>
                </div>
            </div>

            <div className={`h-20 w-20 flex flex-col justify-end items-center overflow-hidden relative rounded-md  group active:bg-light-blue `}>
                <div className={`${!hasPermissionConsultoria ? 'w-full h-full bg-[#f2f2f2]/80  absolute z-50' : 'hidden'}`} />
                <div className={`h-20 w-20  flex flex-col justify-end items-center rounded-md relative pb-1  group-hover:cursor-pointer active:bg-light-blue active:text-white ${hasPermissionSupervisao && filtroCategoria.name === 'Cirúrgico' ? 'text-white bg-light-blue' : 'bg-light-gray text-gray-menu-icon'}`} onClick={() => handleFilter(categories.find(category=> category.name.includes("Cirúrgico")))}>
                    <span><Stethoscope size={48} className={`${!hasPermissionConsultoria && 'text-[#909090]'}`}/></span>
                    <label className={`${hasPermissionConsultoria && 'group-hover:cursor-pointer group-active:text-white'}`}>Cirúrgico</label>
                </div>
            </div>

            <div className={`h-20 w-20 flex flex-col justify-end items-center overflow-hidden relative rounded-md  group active:bg-light-blue `}>
                <div className={`${!hasPermissionSupervisao ? 'w-full h-full bg-[#f2f2f2]/80  absolute z-50' : 'hidden'}`} />
                <div className={`h-20 w-20  flex flex-col justify-end items-center rounded-md relative pb-1  group-hover:cursor-pointer active:bg-light-blue active:text-white ${hasPermissionSupervisao && filtroCategoria.name === 'Limpeza' ? 'text-white bg-light-blue' : 'bg-light-gray text-gray-menu-icon'}`} onClick={() => handleFilter(categories.find(category=> category.name.includes("Limpeza")))}>
                    <span><Paintbrush size={48} className={`${!hasPermissionSupervisao && 'text-[#909090]'}`}/></span>
                    <label className={`${hasPermissionSupervisao && 'group-hover:cursor-pointer group-active:text-white'}`}>Limpeza</label>
                </div>
            </div>

            <div className={`h-20 w-20 flex flex-col justify-end items-center overflow-hidden relative rounded-md  group active:bg-light-blue `}>
                <div className={`${!hasPermissionSupervisao ? 'w-full h-full bg-[#f2f2f2]/80  absolute z-50' : 'hidden'}`} />
                <div className={`h-20 w-20  flex flex-col justify-end items-center rounded-md relative pb-1  group-hover:cursor-pointer active:bg-light-blue active:text-white ${hasPermissionSupervisao && filtroCategoria.name === 'Insumo' ? 'text-white bg-light-blue' : 'bg-light-gray text-gray-menu-icon'} `} onClick={() => handleFilter(categories.find(category=> category.name.includes("Insumo")))}>
                    <span><Coffee size={48} className={`${!hasPermissionSupervisao && 'text-[#909090]'}`}/></span>
                    <label className={`${hasPermissionSupervisao && 'group-hover:cursor-pointer group-active:text-white'}`} >Insumo</label>
                </div>
            </div>

            <div className={`h-20 w-20 flex flex-col justify-end items-center overflow-hidden relative rounded-md  group active:bg-light-blue `}>
                <div className={`${!hasPermissionSupervisao ? 'w-full h-full bg-[#f2f2f2]/80  absolute z-50' : 'hidden'}`} />
                <div className={`h-20 w-20  flex flex-col justify-end items-center rounded-md relative pb-1  group-hover:cursor-pointer active:bg-light-blue active:text-white ${hasPermissionSupervisao && filtroCategoria.name === 'Escritório' ? 'text-white bg-light-blue' : 'bg-light-gray text-gray-menu-icon'}`} onClick={() => handleFilter(categories.find(category=> category.name.includes("Escritório")))}>
                    <span><Printer size={48} className={`${!hasPermissionSupervisao  && 'text-[#909090]'}`}/></span>
                    <label className={`${hasPermissionSupervisao && 'group-hover:cursor-pointer group-active:text-white'}`}>Escritório</label>
                </div>
            </div>

        </>
    )
};

