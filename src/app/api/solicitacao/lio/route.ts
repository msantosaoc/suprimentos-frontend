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
    categoria: {
        id: string;
        name: string;
    };
    comprovante?: string;
    formCirurgico?: string;
    resposta?:string;
    
}


export async function POST (request:Request) {
    const body:RequestBody = await request.json();
    // console.log(body)

        const solicitacaoLio = await prisma.solicitacaoLio.create({
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
                status: body.status,
                comprovante: body.comprovante,
                formCirurgico: body.formCirurgico,
                categoriaId: body.categoria.id
            },
            select: {
                id: true
            }
        });

        const solicitacaoInicial = await prisma.solicitacaoInicial.create({
            data: {
                solicitacaoLioId: solicitacaoLio.id,
                userId: body.solicitante,
                unidadeId: "cljhnk9bj003pvvmccqos7kmk",
                status: 'Não visto',
                categoriaId: body.categoria.id
            }
        });
        
        return new Response(JSON.stringify(solicitacaoLio));
    
};

export async function GET (request:Request) {
    

    const solicitacoesLio = await prisma.solicitacaoLio.findMany({
        select: {
            id: true,
            paciente: true,
            dtCirurgia: true,
            lentePrincipal: true,
            dioptria: true,
            cilindro: true,
            lenteReserva: true,
            dioptriaReserva: true,
            cilindroReserva: true,
            medico: true,
            unidade: true,
            solicitante: true,
            injetorCartucho: true,
            dtPagamento: true,
            status: true,
             Categoria: true,
             createdAt: true,
             updatedAt:true,
             comprovante: true,
             formCirurgico: true,
             resposta: true
        }
    });

    return new Response(JSON.stringify(solicitacoesLio))
};