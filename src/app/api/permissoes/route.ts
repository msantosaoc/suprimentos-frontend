import prisma from "@/lib/prisma";

interface Props {
    perfil: any;
}

export async function POST(request: Request) {
    const body:Props = await request.json();

console.log(body)

    const buscar = await prisma.userRole.findMany({
        where: {
            perfil: body.perfil
        },
        select: {
            id: true,
            name: true,
            perfil: true
        }
    })

    return new Response(JSON.stringify(buscar))
}