import prisma from "@/lib/prisma";

interface RequestBody {
    name: string;
}

export async function POST (request:Request) {
    const body:RequestBody = await request.json();

    const alreadyExists = await prisma.medico.findFirst({
        where: {
            name: body.name
        }
    });

    if(alreadyExists) {
        return new Response(JSON.stringify({error: "Medico já existe."}))
    };

    const medico = await prisma.medico.create({
        data: {
            name: body.name,
        }
    });

    return new Response(JSON.stringify(medico));
};

export async function GET (request:Request) {
    

    const medico = await prisma.medico.findMany({
        orderBy: {
            name: 'asc'
        }
    });

    return new Response(JSON.stringify(medico))
};