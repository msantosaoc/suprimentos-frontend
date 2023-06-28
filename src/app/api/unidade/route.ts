import prisma from "@/lib/prisma";

interface RequestBody {
    name: string;
}

export async function POST (request:Request) {
    const body:RequestBody = await request.json();

    const alreadyExists = await prisma.unidade.findFirst({
        where: {
            name: body.name
        }
    });

    if(alreadyExists) {
        return new Response(JSON.stringify({error: "Unidade já existe."}))
    };

    const unidade = await prisma.unidade.create({
        data: {
            name: body.name,
        }
    });

    // const { password, ...result} = user;
    return new Response(JSON.stringify(unidade));
}

export async function GET (request:Request) {
    

    const unidades = await prisma.unidade.findMany({
        orderBy: {
            name: 'asc'
        }
    });

    return new Response(JSON.stringify(unidades))
}