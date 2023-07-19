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
        unidadeId: number;
        categoriaId: number;
        resposta?: string;
        produto: [
            {
                id: number;
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
            role: string;
            accessToken: string;
        }
    };
};

interface ListarProdutosSolicitados {
    id: string;
    name: string;
    categoria: {
        id: number;
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
    id: number;
    User: {
        name: string;
    },
    Categoria: {
        id: number;
        name: string;
    },
    solicitacaoId: number;
    solicitacaoLioId?: string;
    status: string;
    Unidade: {
        name: string;
    },
    createdAt: string;
    Solicitacao?: {
        id: number;
        name: string;
        resposta?: string;
        status: string;
        createdAt: string;
        updatedAt: string;
        categoriaId: number;
        unidadeId: number;
        userId: string;
        ProdutosSolicitados: [{
            id: string;
            produtoId: number;
            produto?: string;
            solicitacaoId: number;
            qtde: number;
        }]
    },
    SolicitacaoLio?: {
        id: string;
        paciente: string;
        dtCirurgia: string;
        lentePrincipal: string;
        dioptria: string;
        cilindro?: string;
        lenteReserva?: string;
        dioptriaReserva?: string;
        cilindroReserva?: string;
        medico: string;
        unidade: string;
        solicitante: string;
        injetorCartucho?: string;
        dtPagamento: string;
        comprovante: string;
        formCirurgico: string;
        resposta?: string;
        status: string;
        categoriaId: number;
        createdAt: string;
        updatedAt: string;
        unidadeId: number;
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
    categoriaId: number;
    Categoria: {
        id: number;
        name: string;
    },
    marcaId: number;
    Marca: {
        id: number;
        name: string;
    },
    SubCategoria?: {
        id: number;
        name: string;
    },
    dioptriaId?: string;
    cilindroId?: string;
    qtdeMin?: number;
    qtdeMax?: number;
    unidMedida?: string;
    createdAt: string;
    updatedAt?: string;
};

type EditarProduto = {
    id: number;
    name: string;
    categoriaId: number;
    marcaId: number;
    subCategoriaId?: number;
    dioptriaId?: string;
    cilindroId?: string;
    qtdeMin?: number;
    qtdeMax?: number;
    unidMedida?: string;
    qtde: number;
};

type CreateProduto = {
    name: string;
    categoriaId: number;
    marcaId: number;
    subCategoriaId?: number;
    dioptriaId?: string;
    cilindroId?: string;
    qtdeMin?: number;
    qtdeMax?: number;
    unidMedida?: string;
    qtde: number;
};

type CreateMarca = {
    name: string;
};

type CreateSubCategoria = {
    name: string;
    categoriaId: string;
};

type SubCategoria = {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
};

type Categoria = {
    id: number;
    name: string;
    categoriaOnSubCategoria: [
        {
            SubCategoria: {
                id: number,
                name: string;
                createdAt: string;
                updatedAt: string;
            }
        }]
};

type CreateCategoria = {
    name: string;
    subCategorias?: [{
        id?: number;
    }]
};

type Medico = {
    id: string;
    name: string;
    email: string;
    crm: string;
    rqe: string;
    image: string;
    created_at: string;
    updated_at: string;
    especialidadeonmedico?: [
        {
            id: string;
            medicoId: string;
            especialidadeId: string;
            created_at: string;
            updated_at: string;
            especialidades?: {
                especialidade: string;
            }
        },
    ],
    formacoes?: [
        {
            id: string;
            curso: string;
            unidade_ensino: string;
            medicoId: string;
        }
    ],
    trabalhos: string;
}

type FormData = {
    paciente: string;
    dtCirurgia: string;
    lentePrincipal: string;
    dioptria: string;
    cilindro?: string;
    lenteReserva?: string;
    dioptriaReserva?: string;
    cilindroReserva?: string;
    medico: string;
    unidade: number,
    categoria: {
        id: number;
        name: string;
    };
    solicitante: string;
    injetorCartucho?: string;
    dtPagamento: string;
    comprovante: string;
    formCirurgico: string;
    status?: string;
    resposta?: string;
}

interface Unidades {
    id: number;
    name: string;
};

export { FormSolicitacaoProduto, ListarProdutosSolicitados, BuscaSolicitacaoInicial, Marcas, Produtos, CreateProduto, CreateMarca, CreateSubCategoria, SubCategoria, CreateCategoria, Categoria, EditarProduto, Medico, FormData, Unidades}