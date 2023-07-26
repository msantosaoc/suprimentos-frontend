import prisma from "@/lib/prisma";
import * as bcrypt from 'bcrypt';

interface RequestBody {
    name: string;
    email: string;
    password: string;
}

export async function POST (request:Request) {
    const body:RequestBody = await request.json();

    const user = await prisma.user.create({
        data: {
            name: body.name,
            email: body.email,
            password: await bcrypt.hash(body.password, 10)
        }
    });

    const { password, ...result} = user;
    return new Response(JSON.stringify(result));
};

export async function GET() {
    const usuarios = await prisma.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
        }
    });

    return new Response(JSON.stringify(usuarios));
}