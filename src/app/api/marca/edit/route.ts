import prisma from "@/lib/prisma";

interface RequestBody {
    id: string;
    name: string;
}

export async function POST (request:Request) {
    const body:RequestBody = await request.json();

    const findMarca = await prisma.marca.findFirst({
        where: {
            id: body.id
        }
    });

    if(findMarca) {
        const editMarca = await prisma.marca.update({
            where: {
                id: body.id
            },
            data: {
                name: body.name
            }
        });

        return new Response(JSON.stringify(editMarca));

    } else {
        return new Response(JSON.stringify({error: 'Id não existe.'}))
    };


};