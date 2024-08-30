import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: Request, {params}: any) {
    
    const lista = await prisma.listes.findFirst({
        where: {
            id_liste: parseInt(params.id, 10)
        }
    });
    return NextResponse.json(lista);
}