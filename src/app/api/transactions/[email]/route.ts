'use server'

import { NextResponse } from "next/server"
import { connectMongoDB } from "../../../../../lib/mongodb"
import Transaction from "../../../../../models/transactions"
import User from "../../../../../models/users"

export async function GET(req: Request, { params }: { params: { email: string } }){
    try{
        await connectMongoDB()
        const user = await User.findOne({email: params.email})

        if (user.length === 0){
            return NextResponse.json({message: "User not found"}, {status: 404})
        }
        let response;
        if (user.role === "Member"){
            response = await Transaction.find({customer: user._id});
        }

        if (user.role === "Admin"){
            response = await Transaction.find();
        }


        return NextResponse.json(response)
    }
    catch(err){
        return NextResponse.json({error: "Unknown error occured"}, {status: 500})
    }
}
