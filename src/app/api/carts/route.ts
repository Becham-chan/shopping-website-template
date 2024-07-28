'use server'
import { connectMongoDB } from "../../../../lib/mongodb"
import Cart from "../../../../models/carts"
import User from "../../../../models/users"
import Product from "../../../../models/products"
import { NextResponse } from "next/server"


export async function POST(req: Request){
    try{
        const {email, product_id, amount} = await req.json();
        await connectMongoDB()
        const user = await User.findOne({email: email})
        const product = await Product.findById(product_id)
        if (user.length === 0){
            throw Error ("User not found")
        }
        if (product.length === 0){
            throw Error ("Product not found")
        }

        const retCart = await Cart.findOne({customer: user._id, product: product_id})
        if (retCart !== null){
            await Cart.findOneAndUpdate({customer: user._id, product: product_id}, {list: [{name: product.name, price: product.price, amount: retCart.list[0].amount + amount}]})
            return NextResponse.json({status: 200, message: "Update cart successfully"});
        }

        const update = new Cart({customer: user._id, product: product._id, list: [{ name: product.name, price: product.price, amount: amount}]})
        await update.save();

        return NextResponse.json({status: 200,message: "Add to cart successfully"})
    }
    catch(error){
        return NextResponse.json({message: "An Error Occured"}, {status: 500})
    }
}

export async function PUT(req: Request){
    try{
        const {email, product_id, method, amount = 0} = await req.json();
        await connectMongoDB()
        const user = await User.findOne({email: email})
        const product = await Product.findById(product_id)
        const retCart = await Cart.findOne({customer: user._id, product: product_id})

        if (method === "inc"){
            await Cart.findOneAndUpdate({customer: user._id, product: product_id}, {list: [{name: product.name, price: product.price, amount: retCart.list[0].amount + 1}]})
        }
        else if (method === "dec"){
            if (retCart.list[0].amount > 1){
                await Cart.findOneAndUpdate({customer: user._id, product: product_id}, {list: [{name: product.name, price: product.price, amount: retCart.list[0].amount - 1}]})
            }
            else if (retCart.list[0].amount === 1){
                await Cart.findOneAndDelete({customer: user._id, product: product_id})
                return NextResponse.json({status: 200, message: "Cart removed successfully"});
            }
        }
        else if (method === "enter"){
            await Cart.findOneAndUpdate({customer: user._id, product: product_id}, {list: [{name: product.name, price: product.price, amount: amount}]})
        }
        else{
            throw Error ("Method not found")
        }
        return NextResponse.json({status: 200, message: "Update cart successfully"});
    }
    catch(error){
        return NextResponse.json({message: "An Error Occured", error: error.message}, {status: 500})
    }
}