// import { api } from "@/services/api";
// import { ReactNode, useEffect, useState } from "react";

// interface PermissionComponentProps {
//     role: string;
//     children: ReactNode;
// }

// interface Permission {
//     id: number;
//     name: string;
//     perfil: string;
// }

// export default function PermissionComponent({children, role}: PermissionComponentProps) {

//     const [permissions, setPermissions] = useState<Permission[]>([{id: 0, name: '', perfil: ''}])
//     const toggleEstoque = () => 

//     useEffect(()=> {
//         async function buscarPermissoes() {
//             const response = await api.post('/api/permissoes', {perfil: role}).then(response=> setPermissions(response.data))
//         };

//         buscarPermissoes();
//     }, [role]);

//     const hasPermission = permissions.some(item => !item.perfil.includes(role))

   
//     return (
//         <>
//         {hasPermission && children}
//         </>
//     )
// }