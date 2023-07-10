import prisma from "@/lib/prisma";

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
    const body:RequestBody = await request.json();

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
            dioptriaId: body.dioprtiaId,
            cilindroId: body.cilindroId,
            qtdeMin: body.qtdeMin,
            qtdeMax: body.qtdeMax,
            unidMedida: body.unidMedida,
            qtde: body.qtde
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
            dioptriaId: true,
            cilindroId: true,
            qtdeMin: true,
            qtdeMax: true,
            unidMedida: true
        }
    });

    return new Response(JSON.stringify(produto))
};