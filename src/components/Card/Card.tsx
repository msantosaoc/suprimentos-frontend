'use client';

import Image from "next/image";
import { ReactNode, useState } from "react";

interface CardProps {
    // children: ReactNode;
    solicitacao: SolicitacaoProps[]
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
    status: string;
}

export default function Card() {


    const mock: SolicitacaoProps[] = [{
        id: '1',
        paciente: 'Maria Tereza Cristina',
        lentePrincipal: "ASPHINA +20.0D",
        dioptria: '',
        cilindro: '',
        lenteReserva: 'Sansar AR40e',
        dioptriaReserva: '',
        cilindroReserva: '',
        medico: "Ana Paula Gonçalves",
        unidade: "Barra",
        solicitante: 'Bruna Eduarda',
        injetorCartucho: '',
        dtCirurgia: '04/08/2023',
        dtPagamento: '22/05/2023',
        status: "Não visto"
    }, {
        id: '2',
        paciente: 'Maria Tereza Cristina',
        lentePrincipal: "ASPHINA +20.0D",
        dioptria: '',
        cilindro: '',
        lenteReserva: 'Sansar AR40e',
        dioptriaReserva: '',
        cilindroReserva: '',
        medico: "Ana Paula Gonçalves",
        unidade: "Barra",
        solicitante: 'Bruna Eduarda',
        injetorCartucho: '',
        dtCirurgia: '04/08/2023',
        dtPagamento: '22/05/2023',
        status: "Não visto"
    }]

    const [solicitacoes, setSolicitacoes] = useState<SolicitacaoProps[]>(mock)

    const arraySolicitacoes = solicitacoes?.map(solicitacao => {
        return (
            <div key={solicitacao.id} className="w-full h-16 rounded-lg shadow-md border border-[#d3d3d3] flex my-2 hover:bg-light-blue">
                <div className="w-full h-full grid grid-cols-9 ">
                    <label className="text-base font-semibold flex items-center justify-center  bg-black">{solicitacao.paciente}</label>
                    <label className="text-base font-semibold flex items-center justify-center ">{solicitacao.lentePrincipal}</label>
                    <label className="text-base font-semibold flex items-center justify-center ">{solicitacao.lenteReserva}</label>
                    <label className="text-base font-semibold flex items-center justify-center ">{solicitacao.dtCirurgia}</label>
                    <label className="text-base font-semibold flex items-center justify-center ">{solicitacao.medico}</label>
                    <label className="text-base font-semibold flex items-center justify-center ">{solicitacao.unidade}</label>
                    <label className="text-base font-semibold flex items-center justify-center ">{solicitacao.injetorCartucho ? solicitacao.injetorCartucho : '--'}</label>
                    <label className="text-base font-semibold flex items-center justify-center ">{solicitacao.status}</label>
                    <Image alt='resposta' src='/iconMessage.svg' width={25} height={25} priority={false} className="m-auto hover:scale-110"/>
                </div>
            </div>

        )
    })

    return arraySolicitacoes
}