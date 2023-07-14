import prisma from "@/lib/prisma";

interface RequestBody {
    id: string;
    resposta: string;
    status: string;
}

export async function PUT(req:Request) {
    const body:RequestBody = await req.json();

    const exists = await prisma.solicitacaoLio.findFirst({
        where: {
            id: body.id
        },
        select: {
            id: true
        }
    });

    if(!exists?.id) {
        return new Response(JSON.stringify({erro: 'Id não existe.'}))
    } else {
        const updateResposta = await prisma.solicitacaoLio.update({
            where: {
                id: body.id
            },
            data: {
                resposta: body.resposta,
                status: body.status,
            }
        });

        return new Response(JSON.stringify(updateResposta))

    }



}