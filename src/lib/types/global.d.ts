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
    createdAt: string;
    ProdutosSolicitados: [
        {
            id: string;
            produtoId: string;
            produto: string;
            solicitacaoId: string;
            qtde: number;
        }
    ]

};

interface BuscaSolicitacaoInicial {
    id: string;
    User: {
        name: string;
    },
    Categoria: {
        id: string;
        name: string;
    },
    solicitacaoId?: string;
    solicitacaoLioId?: string;
    status: string;
    Unidade: {
        name: string;
    },
    createdAt: string;
    Solicitacao?: {
        id: string;
        name: string;
        resposta?: string;
        status: string;
        createdAt: string;
        updatedAt: string;
        categoriaId: string;
        unidadeId: string;
        userId: string;
        ProdutosSolicitados: [{
            id: string;
            produtoId: string;
            produto: string;
            SolicitacaoId: string;
            qtde: number;
        }]
    },
    SolicitacaoLio?: {
        id: string;
        paciente: string;
        dtCirurgia: string;
        lentePrincipal: string;
        dioptria: string;
        cilindro: string;
        lenteReserva?: string;
        dioptriaReserva: string;
        cilindroReserva: string;
        medico: string;
        unidade: string;
        solicitante: string;
        injetorCartucho?: string;
        dtPagamento: string;
        comprovante: string;
        formCirurgico: string;
        resposta?: string;
        status: string;
        categoria: string;
        createdAt: string;
        updatedAt: string; 
    }
};

type Marcas = {
    id: number;
    name: string;
    createdAt: string;
    updatedAt?: string;
};

type Produtos = {
    id: number;
    name: string;
    categoriaId: string;
    Categoria: {
        name: string;
    },
    marcaId: string;
    Marca: {
        name: string;
    },
    dioptriaId?: string;
    cilindroId?: string;
    qtdeMin?: string;
	qtdeMax?: string;
	unidMedida?: string;
    qtdeMin?: string;
    qtdeMax?: string;
    createdAt: string;
    updatedAt?: string;
};

type CreateProduto = {
    name: string;
    categoriaId: string;
    marcaId: number;
    dioptriaId?: string;
    cilindroId?: string;
    qtdeMin?: number;
	qtdeMax?: number;
	unidMedida?: string;
    qtdeMin?: string;
    qtdeMax?: string;
    qtde: number;
}

export { FormSolicitacaoProduto, ListarProdutosSolicitados, BuscaSolicitacaoInicial, Marcas, Produtos, CreateProduto }