import prisma from "@/lib/prisma";

interface RequestBody {
    id: string;
    name: string;
}

export async function POST (request:Request) {
    const body:RequestBody = await request.json();

    const findFirst = await prisma.medico.findFirst({
        where: {
            id: body.id
        }
    });

    if(findFirst) {
        const editMedico = await prisma.medico.update({
            where: {
                id: body.id
            },
            data: {
                name: body.name
            }
        });

        return new Response(JSON.stringify(editMedico));

    } else {
        return new Response(JSON.stringify({error: 'Id não existe.'}));
    };


};