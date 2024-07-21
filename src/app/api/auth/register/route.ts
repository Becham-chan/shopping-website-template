'use server'
import { NextResponse } from "next/server"
import { connectMongoDB } from "../../../../../lib/mongodb"
import User from "../../../../../models/users";
import bcrypt from "bcryptjs"

export async function POST(req: Request){
    try{
        const {firstName, lastName, username, email, id, address, password} = await req.json();
        await connectMongoDB();

        const cryptedPassword = await bcrypt.hash(password as string, 10)

        if (await User.findOne({email: email})){
            throw Error ("Email already exists")
        }

        if (await User.findOne({username: username})){
            throw Error ("Username already exists")
        }

        if (await User.findOne({id: id})){
            throw Error ("id already exists")
        }

        await User.create({firstname: firstName, lastname: lastName, username, email, id, address, password: cryptedPassword});
        return NextResponse.json({message: "Successfully Added"},{status: 201})
    }
    catch(error){
        console.error(error)
        if (error.message === "Email already exists"){ // Typescript
            return NextResponse.json({message: "Email already exists"},{status: 400})
        }
        if (error.message === "Username already exists"){ // Typescript
            return NextResponse.json({message: "Username already exists"},{status: 401})
        }
        if (error.message === "Id already exists"){ // Typescript
            return NextResponse.json({message: "Id already exists"},{status: 402})
        }
        return NextResponse.json({message: "An Error Occured", error}, {status: 500})
    }
}