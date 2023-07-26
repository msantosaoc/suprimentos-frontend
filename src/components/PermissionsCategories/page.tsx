import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import Categorias from "../Categorias/page";

export default async function PermissionCategories() {

    const data = await getServerSession(authOptions);
    
    return (
        <>
            
        </>
    )
}