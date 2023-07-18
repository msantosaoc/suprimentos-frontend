import prisma from "@/lib/prisma";

interface RequestBody {
    id: number;
    name: string;
}

export async function POST (request:Request) {
    const body:RequestBody = await request.json();

    const findUnidade = await prisma.unidade.findFirst({
        where: {
            id: body.id
        }
    });

    if(findUnidade) {
        const editUnidade = await prisma.unidade.update({
            where: {
                id: body.id
            },
            data: {
                name: body.name
            }
        });

        return new Response(JSON.stringify(editUnidade));

    } else {
        return new Response(JSON.stringify({error: 'Id não existe.'}))
    };


};