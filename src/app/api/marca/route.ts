import prisma from "@/lib/prisma";
import { CreateMarca } from "@/lib/types/global";


export async function POST (request:Request) {
    const body:CreateMarca = await request.json();
    const alreadyExists = await prisma.marca.findFirst({
        where: {
            name: body.name
        }
    });

    if(alreadyExists) {
        return new Response(JSON.stringify({error: "Marca já existe."}))
    };

    const marca = await prisma.marca.create({
        data: {
            name: body.name,
        },
    });

    return new Response(JSON.stringify(marca));
};

export async function GET (request:Request) {
    

    const marca = await prisma.marca.findMany({
        orderBy: {
            name: 'asc'
        }
    });

    return new Response(JSON.stringify(marca))
};