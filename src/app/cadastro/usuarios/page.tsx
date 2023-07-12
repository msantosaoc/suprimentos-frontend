import ButtonCadastrar from "@/components/Button/ButtonCadastrar";
import SelectComponentProdutos from "@/components/Select/Produtos/SelectComponentProdutos";
import Sidebar from "@/components/Sidebar/Sidebar";

export default function Usuarios() {
    return (
        <div className="h-screen w-screen flex flex-col bg-background pl-[4.3rem]">
            <div className="absolute top-0 left-0 w-screen h-sreen overflow-hidden">
                <Sidebar />

            </div>
            <div className="grid grid-rows-[1fr_5fr] w-2/3 max-w-[1200px] h-screen mx-auto">
                <div className="flex flex-col justify-end  ">

                    <h1 className="font-semibold text-3xl">Usuários</h1>
                    <div className="w-full sm:h-2/6 sm:px-2 max-sm:py-1 grid grid-cols-[1fr_4fr_1fr] max-md:gap-2 max-sm:grid-cols-1  rounded-xl shadow-xl bg-white">
                        <div className="flex items-center justify-center ">
                            <ButtonCadastrar>Cadastrar</ButtonCadastrar>
                        </div>
                        <div className="flex items-center justify-center ">
                            {/* <ButtonCadastrar>Cadastrar</ButtonCadastrar> */}
                            
                            {/* <SelectComponentProdutos /> */}
                        </div>
                        <div></div>
                    </div>
                </div>
                <div className="flex flex-col">
                    <div className="w-full h-full rounded-xl shadow-xl my-4 bg-white"></div>
                </div>
            </div>
            
        </div>

    )
}