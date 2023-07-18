import prisma from "@/lib/prisma";

interface RequestBody {
    id: number;
    name: string;
}

export async function POST (request:Request) {
    const body:RequestBody = await request.json();

    const findCategoria = await prisma.categoria.findFirst({
        where: {
            id: body.id
        }
    });

    if(findCategoria) {
        const editCategoria = await prisma.categoria.update({
            where: {
                id: body.id
            },
            data: {
                name: body.name
            }
        });

        return new Response(JSON.stringify(editCategoria));

    } else {
        return new Response(JSON.stringify({error: 'Id não existe.'}))
    };


};