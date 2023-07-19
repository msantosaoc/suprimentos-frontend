'use client';

import { BuscaSolicitacaoInicial } from "@/lib/types/global";
import { api } from "@/services/api";
import { useEffect, useState } from "react";

export default function Teste() {

    const [solicitacoesIniciais, setSolicitacoesIniciais] = useState<BuscaSolicitacaoInicial[]>();


    async function buscarSolicitacoesInciais() {
        const buscar = await api.get('/api/solicitacao').then(response => setSolicitacoesIniciais(response.data));

        return buscar;
    }

    useEffect(() => {
        buscarSolicitacoesInciais()
    }, []);

    const array = solicitacoesIniciais?.map(item => {
        return (
            <ul key={item.id} className="flex gap-4">
                <li>{item.id}</li>
                <li>{item.Solicitacao && item.Solicitacao.name}</li>
            </ul>
        )
    })

    return (
        <div className="w-screen h-screen">

{array}

        </div>
    )
}

export const revalidate = 0