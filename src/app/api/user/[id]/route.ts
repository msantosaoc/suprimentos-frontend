import { verifyJwt } from "@/lib/jwt";
import prisma from "@/lib/prisma";

export async function GET(request:Request, {params}: {params: {id:string}}) {
    const accessToken = request.headers.get("Authorization")
    if(!accessToken || !verifyJwt(accessToken)) {
        return new Response(JSON.stringify({
            error: "Não autorizado."
        }),
        {
            status: 401
        })
    }

    const userData = await prisma.user.findFirst({
        where: {
            id: params.id
        }
    });

    return new Response(JSON.stringify(userData))
}