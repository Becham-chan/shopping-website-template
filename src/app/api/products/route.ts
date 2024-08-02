'use server'

import { NextResponse } from "next/server"
import { connectMongoDB } from "../../../../lib/mongodb"
import Product from "../../../../models/products"
import User from "../../../../models/users"

export async function GET(req: Request){
    try{
        await connectMongoDB()

        const response = await Product.find();
        return NextResponse.json(response)
    }
    catch(err){
        return NextResponse.json({message: "An Error Occured", err: err}, {status: 500})
    }
}

export async function POST(req: Request){
    try{
        await connectMongoDB()

        const {name, brand, producer, description, quantity, price, email} = await req.json()

        const user = await User.findOne({email: email})

        if (user.role !== "Admin"){
            return NextResponse.json({message: "Access Denied"}, {status:404})
        }

        const newProduct = new Product({
            name: name, 
            brand: brand, 
            producer: producer,
            description: description,
            quantity: quantity,
            price: price,
            editor: user._id,
        })

        await newProduct.save()

        return NextResponse.json({message: "Product add successfully"}, {status:200})
    }
    catch(err){
        return NextResponse.json({message: "An Error Occured:", err: err}, {status: 500})
    }
}

export async function PUT(req: Request){
    try{
        await connectMongoDB()

        const {id, name, brand, producer, description, quantity, price, email} = await req.json()

        const user = await User.findOne({email: email})

        if (user.role !== "Admin"){
            return NextResponse.json({message: "Access Denied"}, {status:404})
        }

        await Product.findByIdAndUpdate(id, {
            name: name, 
            brand: brand, 
            producer: producer,
            description: description,
            quantity: quantity,
            price: price,
        })

        return NextResponse.json({message: "Product updated successfully"}, {status:200})
    }
    catch(err){
        return NextResponse.json({message: "An Error Occured:", err: err}, {status: 500})
    }
}

export async function DELETE(req: Request){
    try{
        await connectMongoDB()

        const {id, email} = await req.json()

        const user = await User.findOne({email: email})

        if (user.role !== "Admin"){
            return NextResponse.json({message: "Access Denied"}, {status:404})
        }

        await Product.findByIdAndDelete(id)

        return NextResponse.json({message: "Product deleted successfully"}, {status:200})
    }
    catch(err){
        return NextResponse.json({message: "An Error Occured:", err: err}, {status: 500})
    }
}
