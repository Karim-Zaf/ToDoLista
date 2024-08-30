import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: Request, context: any) {
    const {params} = context;
    const taskowet = await prisma.taches.findMany({
        where: {
            id_liste: parseInt(params.id, 10)
        }
    });
    return NextResponse.json(taskowet);
}