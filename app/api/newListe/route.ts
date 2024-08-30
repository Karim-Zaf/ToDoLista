import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: Request,{params}: any) {
    
    const ret = await prisma.listes.create({
        data: {
            nom_liste : 'New List'
        }
    });
    
    return NextResponse.json(ret);
}