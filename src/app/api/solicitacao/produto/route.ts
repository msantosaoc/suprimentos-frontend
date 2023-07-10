import prisma from "@/lib/prisma";

export async function POST(req:Request) {
    const body:FormSolicitacaoProduto = await req.json();

    const solicita = await prisma.solicitacao.create({
                data: {
                    name: body.name,
                    userId: body.userId,
                    unidadeId: body.unidade,
                    categoriaId: body.categoria,
                    resposta: body.resposta,
                    status: 'Não visto',
                },
                select: {
                    id: true
                }
            });

            
            const solicitaProduto = body.produto.map(async produto => await prisma.produtosSolicitados.create({
                data: {
                    produtoId: produto.id,
                    solicitacaoId: solicita.id,
                    qtde: produto.qtde,
                }
            }));
            
            console.log(solicitaProduto)
    return new Response(JSON.stringify(solicitaProduto))
};

export async function GET(req:Request) {
    

    

    const solicitaProduto = await prisma.solicitacao.findMany({
        orderBy: {
            createdAt: 'desc'
        },
        select: {
            id: true,
            name: true,
            categoria: {
                select: {
                    id: true,
                    name: true
                }
            },
            status: true,
            resposta: true,
            unidade: {
                select: {
                    id: true,
                    name: true
                }
            },
            usuario: {
                select: {
                    id: true,
                    name: true
                }
            },
            ProdutosSolicitados: true,
            createdAt: true,
            updatedAt: true
        }
    });
    
    
    return new Response(JSON.stringify(solicitaProduto))
};