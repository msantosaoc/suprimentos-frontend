import prisma from "@/lib/prisma";
import { CreateProduto } from "@/lib/types/global";



interface Dioptria {
  data: CreateProduto[];
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