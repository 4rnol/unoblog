import { db } from "@/lib/server/db";

export const GET = async () => {
  try {
    const accounts = await db.account.findMany();

    return new Response(JSON.stringify(accounts));
  } catch (err) {    
    return new Response(JSON.stringify({ message: "Something went wrong!" }), {
      status: 500,
    });
  }
};
