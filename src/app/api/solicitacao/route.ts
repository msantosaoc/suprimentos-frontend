import prisma from "@/lib/prisma";

interface RequestBody {
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
    status?: string;
}


export async function POST (request:Request) {
    const body:RequestBody = await request.json();

    const produto = await prisma.solicitacao.create({
        data: {
            paciente: body.paciente,
            dtCirurgia: body.dtCirurgia,
            lentePrincipal: body.lentePrincipal,
            dioptria: body.dioptria,
            cilindro: body.cilindro,
            lenteReserva: body.lenteReserva,
            dioptriaReserva: body.dioptriaReserva,
            cilindroReserva: body.cilindroReserva,
            medico: body.medico,
            unidade: body.unidade,
            solicitante: body.solicitante,
            injetorCartucho: body.injetorCartucho,
            dtPagamento: body.dtPagamento,
            status: body.status
        }
    });

    return new Response(JSON.stringify(produto));
};

export async function GET (request:Request) {
    

    const produto = await prisma.solicitacao.findMany();

    return new Response(JSON.stringify(produto))
};