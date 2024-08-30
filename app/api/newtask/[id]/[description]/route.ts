import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: Request,{params}: any) {
    
    const ret = await prisma.taches.create({
        data: {
            id_liste: parseInt(params.id, 10),
            description: params.description
        }
    });
    
    return NextResponse.json(ret);
}