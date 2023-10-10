import prisma from "@/lib/prisma";
import { CreateSubCategoria } from "@/lib/types/global";



export async function POST(req:Request) {
    const body:CreateSubCategoria = await req.json();



    const alreadyExists = await prisma.subCategoria.findFirst({
        where: {
            name: body.name
        }
    });

    if(alreadyExists) {
        return new Response(JSON.stringify({error: "Sub-categoria já existe."}))
    };

    const subCategoria = await prisma.subCategoria.create({
        data: {
            name: body.name
        },
    });

    const associar = await prisma.categoriaOnSubCategoria.create({
        data: {
            categoriaId: body.id,
            subCategoriaId: subCategoria.id
        }
    })

    return new Response(JSON.stringify(associar));
};

export async function GET (request:Request) {
    

    const subCategoria = await prisma.subCategoria.findMany({
        orderBy: {
            name: 'asc'
        }
    });

    return new Response(JSON.stringify(subCategoria))
};