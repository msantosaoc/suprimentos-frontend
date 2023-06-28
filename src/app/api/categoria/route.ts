import prisma from "@/lib/prisma";

interface RequestBody {
    name: string;
}

export async function POST (request:Request) {
    const body:RequestBody = await request.json();

    const alreadyExists = await prisma.categoria.findFirst({
        where: {
            name: body.name
        }
    });

    if(alreadyExists) {
        return new Response(JSON.stringify({error: "Categoria já existe."}))
    };

    const categoria = await prisma.categoria.create({
        data: {
            name: body.name,
        }
    });

    return new Response(JSON.stringify(categoria));
};

export async function GET (request:Request) {
    

    const categoria = await prisma.categoria.findMany({
        orderBy: {
            name: 'asc'
        }
    });

    return new Response(JSON.stringify(categoria))
};