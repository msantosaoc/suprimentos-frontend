import prisma from "@/lib/prisma";

export async function GET(req:Request) {
    // const body = await req.json();

    const buscar = await prisma.solicitacaoInicial.findMany({
        orderBy: {
            createdAt: 'desc'
        },
        select: {
            id: true,
            User: {
                select: {
                    name: true,
                } 
            },
            Categoria: {
                select: {
                    id: true,
                    name: true
                }
            },
            
            solicitacaoId: true,
            solicitacaoLioId: true,
            status: true,
            Unidade: {
                select: {
                    name: true,
                }
            },
            createdAt: true,
            Solicitacao: {
                select: {
                    id: true,
                    name: true,
                    resposta: true,
                    status: true,
                    createdAt: true,
                    updatedAt: true,
                    categoriaId: true,
                    unidadeId: true,
                    userId: true,
                    ProdutosSolicitados: true
                }
            },
            SolicitacaoLio: true
        }
        
    });

    return new Response(JSON.stringify(buscar))
}

export const revalidate = 0