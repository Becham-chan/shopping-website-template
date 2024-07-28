'use server'

import { NextResponse } from "next/server"
import { connectMongoDB } from "../../../../lib/mongodb"
import Product from "../../../../models/products"

export async function GET(req: Request){
    try{
        await connectMongoDB()

        const response = await Product.find();
        return NextResponse.json(response)
    }
    catch(err){
        return NextResponse.json({message: "An Error Occured", err}, {status: 500})
    }
}
