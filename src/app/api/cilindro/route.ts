import prisma from "@/lib/prisma";

interface RequestBody {
    name: string;
}

export async function POST (request:Request) {
    const body:RequestBody = await request.json();

    const alreadyExists = await prisma.cilindro.findFirst({
        where: {
            name: body.name
        }
    });

    if(alreadyExists) {
        return new Response(JSON.stringify({error: "Cilindro já existe."}));
    };

    const cilindro = await prisma.cilindro.create({
        data: {
            name: body.name,
        }
    });

    return new Response(JSON.stringify(cilindro));
};

export async function GET (request:Request) {
    

    const cilindro = await prisma.cilindro.findMany({
        orderBy: {
            name: 'asc'
        }
    });

    return new Response(JSON.stringify(cilindro))
};