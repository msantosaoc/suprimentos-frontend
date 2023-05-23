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
        status: "Disponível"
    }]

    const [solicitacoes, setSolicitacoes] = useState<SolicitacaoProps[]>(mock)

    const arraySolicitacoes = solicitacoes?.map(solicitacao => {
        return (
            <div key={solicitacao.id} className="w-full h-16 rounded-lg shadow-md border border-[#d3d3d3] flex my-1 relative hover:scale-[101%] duration-200 z-40 hover:cursor-pointer"><label className={`${ solicitacao.status === "Não visto" ? "visible px-2 rounded-xl absolute left-4 -top-2 bg-light-blue text-white text-xs" : "invisilbe"}  `}>{ solicitacao.status === "Não visto" ? "Novo" : undefined}</label>
                <div className="w-full h-full grid grid-cols-9 group">
                    <label className="text-base font-semibold flex items-center justify-center group-hover:cursor-pointer group-hover relative"><div className="h-full w-1.5 bg-light-blue absolute top-0 left-0 invisible group-hover:visible rounded-s-lg" />{solicitacao.paciente}</label>
                    <label className="text-base font-semibold flex items-center justify-center group-hover:cursor-pointer group-hover">{solicitacao.lentePrincipal}</label>
                    <label className="text-base font-semibold flex items-center justify-center group-hover:cursor-pointer group-hover">{solicitacao.lenteReserva}</label>
                    <label className="text-base font-semibold flex items-center justify-center group-hover:cursor-pointer group-hover">{solicitacao.dtCirurgia}</label>
                    <label className="text-base font-semibold flex items-center justify-center group-hover:cursor-pointer group-hover">{solicitacao.medico}</label>
                    <label className="text-base font-semibold flex items-center justify-center group-hover:cursor-pointer group-hover">{solicitacao.unidade}</label>
                    <label className="text-base font-semibold flex items-center justify-center group-hover:cursor-pointer group-hover">{solicitacao.injetorCartucho ? solicitacao.injetorCartucho : '--'}</label>
                    <label className="text-base font-semibold flex items-center justify-center group-hover:cursor-pointer group-hover">{solicitacao.status}</label>
                    <Image alt='resposta' src='/iconMessage.svg' width={25} height={25} priority={false} className="m-auto hover:scale-110"/>
                </div>
            </div>

        )
    })

    return arraySolicitacoes
}