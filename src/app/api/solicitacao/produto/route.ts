import prisma from "@/lib/prisma";

export async function POST(req:Request) {
    const body:FormSolicitacaoProduto = await req.json();

    const solicitaProduto = await prisma.solicitacao.create({
        data: {
            name: body.name,
            userId: body.userId,
            unidadeId: body.unidade,
            categoriaId: body.categoria,
            resposta: body.resposta,
            status: 'Não visto',
            produtos: {
                connect: body.produto
            }
        },
        include: {
            produtos: true
        }
    });
    
    return new Response(JSON.stringify(solicitaProduto))
}