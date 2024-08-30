import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function PATCH(request: Request, {params}: any) {

    const url = new URL(request.url);
    const searchParams = new URLSearchParams(url.searchParams)

    const description = searchParams.get('description');

    if (description == null) {
        return NextResponse.error();
    }

    const lista = await prisma.taches.updateMany({
        where: {
            id_liste: parseInt(params.id_liste, 10),
            id_tache : parseInt(params.id_tache, 10)
        },data:{
            description : description
        }
    });
    return NextResponse.json(lista);
}