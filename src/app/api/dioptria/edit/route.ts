import prisma from "@/lib/prisma";

interface RequestBody {
    id: string;
    name: string;
}

export async function POST (request:Request) {
    const body:RequestBody = await request.json();

    const findDioptria = await prisma.dioptria.findFirst({
        where: {
            id: body.id
        }
    });

    if(findDioptria) {
        const editDioptria = await prisma.dioptria.update({
            where: {
                id: body.id
            },
            data: {
                name: body.name
            }
        });

        return new Response(JSON.stringify(editDioptria));

    } else {
        return new Response(JSON.stringify({error: 'Id não existe.'}));
    };


};