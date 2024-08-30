import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function PATCH(request: Request, {params}: any) {
    
    const lista = await prisma.taches.updateMany({
        where: {
            id_liste: parseInt(params.id_liste, 10),
            id_tache : parseInt(params.id_tache, 10)
        },data:{
            etat : params.etat=="true"?true:false
        }
    });
    return NextResponse.json(lista);
}