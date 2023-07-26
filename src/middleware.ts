// export { default } from 'next-auth/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";

import { withAuth, NextRequestWithAuth } from 'next-auth/middleware';

export default withAuth(
    function middleware(request: NextRequestWithAuth) {
        console.log(request.nextUrl.pathname);
        console.log(request.nextauth.token);

        // const userPermission = ['SUPERVISAO'];
        // const adminPermission = ['ADMIN', 'SUPERADMIN'];

        // if (request.nextUrl.pathname.startsWith('/lobby') && userPermission.find(permission=> request.nextauth.token?.role !== permission)) {
        //     return NextResponse.rewrite(new URL('/', request.url))
        // };

        // if (request.nextUrl.pathname.startsWith('/solicitacoes') && userPermission.find(permission=> request.nextauth.token?.role !== permission)) {
        //     return NextResponse.rewrite(new URL('/', request.url))
        // };

        // if (request.nextUrl.pathname.startsWith('/estoque') && adminPermission.filter(permission=> request.nextauth.token?.role !== permission)) {
        //     return NextResponse.rewrite(new URL('/', request.url))
        // };
    }, {
    callbacks: {
        authorized: ({ token }) => !!token
    },
}
)

// export async function middleware(request:NextRequest) {

//     // const token = request.cookies.get('next-auth.session-token')?.value


//     const session = await getToken({
//         req: request,
//         secret: process.env.NEXT_SECRET
//     });
//     // const { data:session } = useSession();
//     const url = request.nextUrl.clone();
//     url.pathname = "/";

//     if(session?.sub) {
//         return NextResponse.next();

//     }


//         return NextResponse.redirect(url);



// };

export const config = {
    matcher: ['/lobby/:path*', '/solicitacoes/:path*', '/cadastro/:path*', '/estoque/:path*', '/compras/:path*', '/diretoria/:path*']
}