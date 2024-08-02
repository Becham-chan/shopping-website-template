'use server'
import { connectMongoDB } from "../../../../lib/mongodb"
import User from "../../../../models/users"
import Cart from "../../../../models/carts"
import Transaction from "../../../../models/transactions"
import Product from "../../../../models/products"
import { NextResponse } from "next/server"


export async function POST(req: Request){
    try{
        const {email} = await req.json();
        await connectMongoDB()
        const user = await User.findOne({email: email})
        if (user.length === 0){
            throw Error ("User not found")
        }
        const carts = await Cart.find({customer: user._id})
        // let isInsufficientAmount = false

        // carts.map(async (cart) =>{
        //     const product = await Product.findById(cart.product)
        //     if (product.quantity - cart.list[0].amount < 0){
        //         console.log("HUHHHHHHHHH")
        //         isInsufficientAmount = true
        //     }
        // })
        // console.log(isInsufficientAmount)
        // if (isInsufficientAmount){
        //     throw Error ("One of products in your cart has insufficient amount in stocks")
        // }

        let totalPrice = 0
        const purchase_list = []
        carts.map ((cart)=>{
            purchase_list.push({name: cart.list[0].name, price: cart.list[0].price, amount: cart.list[0].amount, total_price: cart.list[0].price * cart.list[0].amount})
            totalPrice += cart.list[0].price * cart.list[0].amount
        })

        carts.map(async (cart) => {
            const product = await Product.findById(cart.product)
            await Product.findByIdAndUpdate(cart.product, {quantity: product.quantity - cart.list[0].amount})
        })

        const transaction = new Transaction({customer: user._id, list: purchase_list, total: totalPrice.toFixed(2)})
        await transaction.save()

        await Cart.deleteMany({customer: user._id})

        return NextResponse.json({status: 200,message: "Transaction completed"})
    }
    catch(error){
        return NextResponse.json({message: "An Error Occured", error, status: 500})
    }
}


export async function PUT (req: Request){
    try{
        const {role, id} = await req.json();
        await connectMongoDB()
        const transaction = await Transaction.findById(id)
        if (transaction === null){
            throw Error ("Transaction not found")
        }
        if (role === "Member"){
            await Transaction.findByIdAndUpdate(id, {user_approve: true})
            return NextResponse.json({status: 200,message: "Transaction approved by user"})
        }
        else if (role === "Admin"){
            await Transaction.findByIdAndUpdate(id, {store_approve: true})
            return NextResponse.json({status: 200,message: "Transaction approved by store"})
        }


    }
    catch(error){
        return NextResponse.json({message: "An Error Occured", error: error.message}, {status: 500})
    }
}