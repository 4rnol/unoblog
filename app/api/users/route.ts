import { db } from "@/lib/server/db";

export const GET = async () => {
  try {
    const users = await db.user.findMany();
    
      const usersOrdered = await db.user.findMany({
        include: {
            _count: {
              select: { posts: true },
            },
          },
        orderBy: {
          posts: { 
            _count: 'desc'
          }
        },       
        take:3
      })
      console.log(usersOrdered);
    return new Response(JSON.stringify(usersOrdered));
  } catch (err) {    
    return new Response(JSON.stringify({ message: "Something went wrong!" }), {
      status: 500,
    });
  }
};
