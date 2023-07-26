import Sidebar from "@/components/Sidebar/Sidebar";
import Modulos from "@/components/Modulos/page";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";

export default async function Lobby() {
    

    const data = await getServerSession(authOptions);


    return (
        <div>

            <div className="h-screen w-screen flex flex-col bg-background pl-8">
                <div className="absolute top-0 left-0 w-screen h-sreen overflow-hidden">
                    <Sidebar />

                </div>
                <div className="w-full h-1/3 flex ">

                    <div className="h-20 w-10/12 bg-white m-auto rounded-xl shadow-xl flex items-center justify-center">
                        <h1 className="text-padrao text-3xl font-bold ">Selecione o Módulo que Deseja Acessar</h1>
                    </div>

                </div>

                <Modulos userRole={data}/>
                
            </div>
        </div>
    )
}
