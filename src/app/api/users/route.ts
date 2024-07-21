'use server'
import { connectMongoDB } from "../../../../lib/mongodb"
import User from "../../../../models/users"
import { NextResponse } from "next/server"


export async function POST(req: Request){
    const {email} = await req.json()
    try{
        await connectMongoDB()
        console.log(email)
        const user = await User.findOne({email: email})
        if (!user){
            throw Error ("User not found")
        }
        return NextResponse.json({user})
    }
    catch(error){
        return NextResponse.json({error: error.message})
    }
}