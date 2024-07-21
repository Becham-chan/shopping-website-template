'use server'

import { NextResponse } from "next/server"
import { connectMongoDB } from "../../../../../lib/mongodb"
import Product from "../../../../../models/products"

export async function GET(req: Request, { params }: { params: { id: string } }){
    try{
        await connectMongoDB()

        const response = await Product.findById(params.id);
        return NextResponse.json(response)
    }
    catch(err){

    }
}
