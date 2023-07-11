import prisma from "@/lib/prisma";

export async function POST(req:Request) {
    const body:FormSolicitacaoProduto = await req.json();
    
    const solicita = await prisma.solicitacao.create({
                data: {
                    name: body.name,
                    status: 'Não visto',
                    userId: body.userId,
                    unidadeId: body.unidade,
                    categoriaId: body.categoria,
                    resposta: '',
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

            const solicitacaoInicial = await prisma.solicitacaoInicial.create({
                data: {
                    solicitacaoId: solicita.id,
                    userId: body.userId,
                    unidadeId: body.unidade,
                    status: 'Não visto',
                    categoriaId: body.categoria
                }
            });
            

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