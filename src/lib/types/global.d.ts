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

    type FormSolicitacaoProduto = {
        name: string;
        userId: string;
        unidade: string;
        categoria: string;
        resposta: string;
        produto: [
            {
                id: string;
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

interface ListarProdutosSolicitados {
    id: string;
    name: string;
    categoria: {
        id: string;
        name: string;
    };
    status: string;
    resposta: string;
    unidade: {
        id: string;
        name: string;
    };
    usuario: {
        id: string;
        name: string;
    };
    ProdutosSolicitados: [
        {
            id: string;
            produtoId: string;
            produto: string;
            solicitacaoId: string;
            qtde: number;
        }
    ]

}

export { FormSolicitacaoProduto, ListarProdutosSolicitados }