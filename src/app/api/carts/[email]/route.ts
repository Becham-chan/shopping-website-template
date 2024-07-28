'use server'

import { NextResponse } from "next/server"
import { connectMongoDB } from "../../../../../lib/mongodb"
import Cart from "../../../../../models/carts"
import User from "../../../../../models/users"

export async function GET(req: Request, { params }: { params: { email: string } }){
    try{
        await connectMongoDB()
        const user = await User.findOne({email: params.email})

        if (user.length === 0){
            return NextResponse.json({message: "User not found"}, {status: 404})
        }

        const response = await Cart.find({customer: user._id});

        return NextResponse.json(response)
    }
    catch(err){
        return NextResponse.json({error: "Unknown error occured"}, {status: 500})
    }
}
