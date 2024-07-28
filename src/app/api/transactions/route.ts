'use server'
import { connectMongoDB } from "../../../../lib/mongodb"
import User from "../../../../models/users"
import Cart from "../../../../models/carts"
import Transaction from "../../../../models/transactions"
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
        let totalPrice = 0
        const purchase_list = []
        carts.map ((cart)=>{
            purchase_list.push({product: cart.list[0].product, name: cart.list[0].name, price: cart.list[0].price, amount: cart.list[0].amount, total_price: cart.list[0].price * cart.list[0].amount})
            totalPrice += cart.list[0].price * cart.list[0].amount
        })

        const transaction = new Transaction({customer: user._id, list: purchase_list, total: totalPrice.toFixed(2)})
        await transaction.save()

        await Cart.deleteMany({customer: user._id})

        return NextResponse.json({status: 200,message: "Transaction completed"})
    }
    catch(error){
        return NextResponse.json({message: "An Error Occured", error}, {status: 500})
    }
}
