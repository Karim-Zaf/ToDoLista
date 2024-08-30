import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function DELETE(request: Request, {params}: any) {
    
    const taskowet = await prisma.taches.deleteMany({
        where: {
            id_liste: parseInt(params.id_liste, 10),
            id_tache: parseInt(params.id_task, 10)
        }
    });
    return NextResponse.json(taskowet);
}
