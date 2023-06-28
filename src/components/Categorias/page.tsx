'use client';
import { Clipboard, Eye, Shirt, Stethoscope, Package, Printer, Paintbrush, Coffee, ShoppingCart, LucideIcon } from 'lucide-react'
import React, { Component, useState } from 'react';

interface Categorias {
    id: number;
    name: string;
    Icon: JSX.Element
}

interface CategoriasProps extends LucideIcon {
    id: number;
    name: string;
    Icon: JSX.Element;
    className?: React.HTMLAttributes<HTMLDivElement>
}



export default function Categorias() {

    const mock:any = [
        {id: 1, name: 'Todos', Icon: <Clipboard  size={48}/>},
        {id: 2, name: 'LIO', Icon: <Eye size={48}/>},
        {id: 3, name: 'Uniforme', Icon: <Shirt  size={48}/>},
        {id: 4, name: 'Cirúrgico', Icon: <Stethoscope  size={48}/>},
        {id: 5, name: 'Limpeza', Icon: <Paintbrush  size={48}/>},
        {id: 6, name: 'Insumo', Icon: <Coffee  size={48}/>},
        {id: 7, name: 'Escritório', Icon: <Printer  size={48}/>},
    ]

    const [categories, setCategories] = useState<CategoriasProps[]>(mock)

    const arrayCategorias: any = categories.map(categoria => {
        return (
            <div key={categoria.id} className={`h-20 w-20 group bg-light-gray flex flex-col justify-end items-center rounded-md relative pb-1 hover:scale-110 duration-200 cursor-pointer active:bg-light-blue`}>
                <span className="text-gray-menu-icon group-active:text-white group-hover:cursor-pointer">{categoria.Icon}</span>
                <label className={`text-center font-semibold text-gray-menu-icon text-sm  group-active:text-white group-hover:cursor-pointer`}>{categoria.name}</label>
            </div>
        )
    })

    return arrayCategorias
}