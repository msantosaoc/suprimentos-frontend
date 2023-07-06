declare global {

    interface FormProdutosCreate {
        name: string;
        categoriaId: string;
        marcaId: string;
        dioptriaId: string;
        cilindroId: string;
        qtdeMin: string;
        qtdeMax: string;
        unidMedida: string;
    };

    interface FormProdutos {
        id: string;
        name: string;
        categoriaId: string;
        marcaId: string;
        dioptriaId: string;
        cilindroId: string;
        qtdeMin: string;
        qtdeMax: string;
        unidMedida: string;
    };

    type FormSolicitacaoProduto =  {
        name: string;
        userId: string;
        unidade: string;
        categoria: string;
        resposta: string;
        produto: [
            {
                name: string;
                qtde: number;
            }
        ],
    };

    type User = {
        expires?: string;
        user?: {
            id: string;
            name: string;
            email: string;
            accessToken: string;
        }
    };
};

export {FormSolicitacaoProduto}