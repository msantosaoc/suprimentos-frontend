import prisma from "@/lib/prisma";
import { CreateCategoria } from "@/lib/types/global";


export async function POST (request:Request) {
    const body:CreateCategoria = await request.json();

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
                categoriaOnSubCategoria: {
                    create: body.subCategorias?.map(item=> ({
                        subCategoriaId: item.id
                    }))
                }
            }
        });

    


    return new Response(JSON.stringify(categoria));
};

export async function GET (request:Request) {
    

    const categoria = await prisma.categoria.findMany({
        orderBy: {
            name: 'asc'
        },
        select: {
            id: true,
            name: true,
            categoriaOnSubCategoria: {
                select: {
                    SubCategoria: true
                }
            }
        }
    });

    return new Response(JSON.stringify(categoria))
};