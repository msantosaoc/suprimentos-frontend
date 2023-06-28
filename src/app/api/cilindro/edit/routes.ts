import prisma from "@/lib/prisma";

interface RequestBody {
    id: string;
    name: string;
}

export async function POST (request:Request) {
    const body:RequestBody = await request.json();

    const findCilindro = await prisma.cilindro.findFirst({
        where: {
            id: body.id
        }
    });

    if(findCilindro) {
        const editCilindro = await prisma.cilindro.update({
            where: {
                id: body.id
            },
            data: {
                name: body.name
            }
        });

        return new Response(JSON.stringify(editCilindro));

    } else {
        return new Response(JSON.stringify({error: 'Id não existe.'}));
    };


};