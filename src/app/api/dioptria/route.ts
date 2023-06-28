import prisma from "@/lib/prisma";

interface RequestBody {
    name: string;
}

export async function POST (request:Request) {
    const body:RequestBody = await request.json();

    const alreadyExists = await prisma.dioptria.findFirst({
        where: {
            name: body.name
        }
    });

    if(alreadyExists) {
        return new Response(JSON.stringify({error: "Dioptria já existe."}));
    };

    const dioptria = await prisma.dioptria.create({
        data: {
            name: body.name,
        }
    });

    return new Response(JSON.stringify(dioptria));
};

export async function GET (request:Request) {
    

    const dioptria = await prisma.dioptria.findMany({
        orderBy: {
            name: 'asc'
        }
    });

    return new Response(JSON.stringify(dioptria))
};