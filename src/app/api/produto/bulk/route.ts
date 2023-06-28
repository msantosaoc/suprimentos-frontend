import prisma from "@/lib/prisma";

interface RequestBody {
  name: string;
  categoriaId?: string;
  marcaId?: string;
  dioptriaId?: string;
  cilindroId?: string;
  unidMedida?: string;
  qtdeMin?: number;
  qtdeMax?: number;
};

interface Dioptria {
  data: RequestBody[];
}

export async function POST(request: Request) {
  const { data }: Dioptria = await request.json();

  const itemNames = data.map((item) => item.name);

  const foundItems = await prisma.produto.findMany({
    where: {
      name: {
        in: itemNames,
      },
    },
    select: {
      id: true,
      name: true,
      categoriaId: true,
      marcaId: true,
      dioptriaId: true,
      cilindroId: true,
      unidMedida: true,
      qtdeMin: true,
      qtdeMax: true
    },
  });

  const foundItemNames = foundItems.map((item) => item.name);

  const notFoundItems = data.filter((item) => !foundItemNames.includes(item.name));

  const createDioptrias = notFoundItems.map(async item => await prisma.produto.createMany({
    data: item,
    skipDuplicates: true
  }))



  return new Response(JSON.stringify(createDioptrias));
};