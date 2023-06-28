import prisma from "@/lib/prisma";

interface RequestBody {
    id: string;
    name: string;
    categoriaId?: string;
    marcaId?: string;
    dioptriaId?: string;
    cilindroId?: string;
    unidMedida?: string;
    qtdeMin?: number;
    qtdeMax?: number;
}

export async function POST(request: Request) {
    const body: RequestBody = await request.json();

    const findFirst = await prisma.produto.findFirst({
        where: {
            id: body.id
        }
    });

    if (findFirst) {
        const editProduto = await prisma.produto.update({
            where: {
                id: body.id
            },
            data: {
                name: body.name,
                categoriaId: body.categoriaId,
                marcaId: body.marcaId,
                dioptriaId: body.dioptriaId,
                cilindroId: body.cilindroId,
                unidMedida: body.unidMedida,
                qtdeMin: body.qtdeMin,
                qtdeMax: body.qtdeMax
            }
        });

        return new Response(JSON.stringify(editProduto));

    } else {
        return new Response(JSON.stringify({ error: 'Id não existe.' }))
    };

};