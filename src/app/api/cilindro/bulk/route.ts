import prisma from "@/lib/prisma";

interface RequestBody {
  name: string;  
};

interface Cilindros {
    data: RequestBody[];
}

export async function POST (request:Request) {
    const { data }: Cilindros = await request.json();

    
    
    const itemNames = data.map((item) => item.name);
    
    const foundItems = await prisma.cilindro.findMany({
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
    
      const createCilindros = notFoundItems.map(async item => await prisma.cilindro.createMany({
        data: {
            name: item.name
        },
        skipDuplicates: true
      }))

    

    return new Response(JSON.stringify(createCilindros));
};