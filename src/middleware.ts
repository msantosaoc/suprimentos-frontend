export { default } from 'next-auth/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { useSession} from 'next-auth/react';
import { verifyJwt } from './lib/jwt';
import { getServerSession } from "next-auth";

export async function middleware(request:NextRequest) {
    const session = await getToken({
        req: request,
        secret: process.env.NEXT_SECRET
    });

    // const { data:session } = useSession();
    const url = request.nextUrl.clone();
    url.pathname = "/";
    
    if(session?.sub) {
        return NextResponse.next();

    }

    
        return NextResponse.redirect(url)
    

    
}

export const config = {
    matcher: ['/lobby/:path*']
}