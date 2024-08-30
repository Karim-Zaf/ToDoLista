import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function PATCH(request: Request, {params}: any) {
    
    const lista = await prisma.listes.updateMany({
        where: {
            id_liste: parseInt(params.id, 10)
        },data:{
            nom_liste : params.title
        }
    });
    return NextResponse.json(lista);
}