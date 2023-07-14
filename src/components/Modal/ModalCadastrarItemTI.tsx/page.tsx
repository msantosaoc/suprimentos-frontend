import { Modal } from "reactstrap";

export default function ModalCadastrarItemTI() {
    return (
        <div className="flex flex-col my-2 relative z-10">

                        <div className="md:flex mb-2 ">
                            <div className="md:w-3/4 w-full px-3 ">
                                <label className="block tracking-wide text-subTitle text-xs font-semibold mb-2 " htmlFor="grid-name-produto" >
                                    Produto
                                </label>
                                <input className="appearance-none block  w-full bg-grey-lighter text-grey-darker text-sm border border-grey-lighter rounded-lg py-2 px-2 mb-1 " id="grid-name-produto" placeholder="Nome do produto" />

                            </div>
                        </div>
                    </div>
    )
}