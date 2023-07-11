'use client';
import { Clipboard, Eye, Shirt, Stethoscope, Package, Printer, Paintbrush, Coffee, ShoppingCart, LucideIcon } from 'lucide-react'
import React, { Component, useEffect, useState } from 'react';
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

interface SelectedCategoria {
    id: string;
    name: string;
}

interface Categoria {
    selectedCategory: SelectedCategoria;
  onCategoryChange: (category: SelectedCategoria) => void;
}

export default function Categorias({ selectedCategory, onCategoryChange }: Categoria) {
    
    const mock:any = [
        {id: '1', name: 'Todos', Icon: <Clipboard  size={48}/>},
        {id: '2', name: 'Lio', Icon: <Eye size={48}/>},
        {id: '3', name: 'Uniforme', Icon: <Shirt  size={48}/>},
        {id: '4', name: 'Cirúrgico', Icon: <Stethoscope  size={48}/>},
        {id: '5', name: 'Limpeza', Icon: <Paintbrush  size={48}/>},
        {id: '6', name: 'Insumo', Icon: <Coffee  size={48}/>},
        {id: '7', name: 'Escritório', Icon: <Printer  size={48}/>},
    ]

    const [categories, setCategories] = useState<CategoriasProps[]>(mock);
    const [filtroCategoria, setFiltroCategoria] = useState<SelectedCategoria>(selectedCategory);

    async function Teste() {
        await new Promise((resolve) => setTimeout(resolve, 5000))
    }

    useEffect(()=> {
        Teste()
        setFiltroCategoria({id: '', name:"Todos"})
    }, [])

    const handleFilter = (category: SelectedCategoria) => {
        let all = {id: '', name: ''}
        let categoria  = category.name === "Todos" ? all : category 
        console.log(categoria)
        onCategoryChange(categoria);
        setFiltroCategoria(category);
      };

    const arrayCategorias: any = categories.map(categoria => {
        return (
            <div key={categoria.id} className={`h-20 w-20 group  flex flex-col justify-end items-center rounded-md relative pb-1 hover:scale-110 duration-200 cursor-pointer active:bg-light-blue ${filtroCategoria.name === categoria.name ? 'bg-light-blue' : 'bg-light-gray'}`} onClick={() => handleFilter(categoria)}>
                <span className={`  group-hover:cursor-pointer group-active:text-white ${filtroCategoria.name === categoria.name ? 'text-white' : 'text-gray-menu-icon'}`}>{categoria.Icon || <Skeleton />}</span>
                <label className={`text-center font-semibold text-sm  group-active:text-white group-hover:cursor-pointer ${filtroCategoria.name === categoria.name ? 'text-white' : 'text-gray-menu-icon'}`}>{categoria.name || <Skeleton />}</label>
            </div>
        )
    })

    return arrayCategorias
}