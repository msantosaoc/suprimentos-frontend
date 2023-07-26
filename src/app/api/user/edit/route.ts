import prisma from "@/lib/prisma";
import { Usuarios } from "@/lib/types/global";

export async function PUT(request: Request) {
    const body: Usuarios = await request.json();

    const editar = await prisma.user.update({
        where: {
            id: body.id,
        },
        data: {
            name: body.name,
            email: body.email,
            role: body.role as any
        }
    });

    return new Response(JSON.stringify(editar));
}