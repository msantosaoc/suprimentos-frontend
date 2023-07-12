import prisma from "@/lib/prisma";
import { CreateProduto } from "@/lib/types/global";

interface RequestBody {
    name: string;
    categoriaId: string;
    marcaId: string;
    dioprtiaId?: string;
    cilindroId?: string;
    qtdeMin: number;
    qtdeMax?: number;
    unidMedida?: string;
    qtde: number;
}

export async function POST (request:Request) {
    const body:CreateProduto = await request.json();

    const alreadyExists = await prisma.produto.findFirst({
        where: {
            name: body.name
        }
    });

    if(alreadyExists) {
        return new Response(JSON.stringify({error: "Produto já existe."}))
    };

    const produto = await prisma.produto.create({
        data: {
            name: body.name,
            categoriaId: body.categoriaId,
            marcaId: body.marcaId,
            dioptriaId: body.dioptriaId,
            cilindroId: body.cilindroId,
            qtdeMax: body.qtdeMax,
            qtdeMin: body.qtdeMin,
            qtde: body.qtde,
            unidMedida: body.unidMedida
        }
    });

    return new Response(JSON.stringify(produto));
};

export async function GET (request:Request) {
    

    const produto = await prisma.produto.findMany({
        orderBy: {
            name: 'asc'
        },
        select: {
            id: true,
            name: true,
            categoriaId: true,
            Categoria: {
                select: {
                    name: true
                }
            },
            marcaId: true,
            Marca: {
                select: {
                    name: true
                }
            },
            dioptriaId: true,
            cilindroId: true,
            qtdeMin: true,
            qtdeMax: true,
            unidMedida: true
        }
    });

    return new Response(JSON.stringify(produto))
};