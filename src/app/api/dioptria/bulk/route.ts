import prisma from "@/lib/prisma";

interface RequestBody {
  name: string;  
};

interface Dioptria {
    data: RequestBody[];
}

export async function POST (request:Request) {
    const { data }: Dioptria = await request.json();
    
    const itemNames = data.map((item) => item.name);
    
    const foundItems = await prisma.dioptria.findMany({
        where: {
          name: {
            in: itemNames,
          },
        },
        select: {
            id: true,
          name: true
        },
      });
    
      const foundItemNames = foundItems.map((item) => item.name);

      const notFoundItems = data.filter((item) => !foundItemNames.includes(item.name));
    
      const createDioptrias = notFoundItems.map(async item => await prisma.dioptria.createMany({
        data: {
            name: item.name
        },
        skipDuplicates: true
      }))

    

    return new Response(JSON.stringify(createDioptrias));
};