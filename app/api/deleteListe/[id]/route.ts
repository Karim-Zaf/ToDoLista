import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function DELETE(request: Request, {params}: any) {
    
    await prisma.taches.deleteMany({
        where: {
            id_liste: parseInt(params.id, 10),
        }
    });
    await prisma.listes.deleteMany({
        where: {
            id_liste: parseInt(params.id, 10),
        }
    });
    
}
