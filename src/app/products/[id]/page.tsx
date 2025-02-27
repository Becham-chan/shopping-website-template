'use client'
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation';

export default function ProductInfo(){
    const [amount, setAmount] = useState(1);
    const {data: session} = useSession()
    const router = useRouter()
    const params = useParams()

    const [product, setProduct] = useState([]);
    const toCarts = async () => {
        const email = session?.user?.email
        if (email === undefined){
            alert ("Please log in first")
            return
        }
        const res = await fetch('http://localhost:3000/api/carts', {
            method: "POST",
            headers: {
                "Content-Type": "application.json"
            },
            body: JSON.stringify ({
                email: email, product_id: product._id, amount: amount
            }),
          })
        if (res.status === 200){
            alert("Item add to cart successfully")
            router.replace("/")
        }
    }

    useEffect(() => {
        async function fetchAPI(){
            const res = await fetch(`http://localhost:3000/api/products/${params.id}`)
            const result = await res.json()
            setProduct(result)
        }
        fetchAPI()
      }, []);

    const incrementAmount = () => {
      setAmount(prevAmount => prevAmount + 1);
    };
  
    const decrementAmount = () => {
      setAmount(prevAmount => (prevAmount > 1 ? prevAmount - 1 : 1));
    };
    return(
        <main className="m-0 p-0">
             <div className="bg-gray-100 min-h-screen flex items-center justify-center">
                <div className="max-w-2xl mx-auto p-8">
                    <div className="bg-white rounded-lg shadow-md p-6">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
                    
                    <div className="mb-6">
                        <img src="https://via.placeholder.com/400x300" alt="Product" className="w-full h-64 object-cover rounded-lg" />
                    </div>

                    <div className="flex justify-between items-center mb-4">
                        <span className="text-2xl font-bold text-gray-900">${product.price} (${Math.round(product.price * amount*100)/100} for {amount})</span>
                        <div className="flex items-center">
                        <button onClick={decrementAmount} className="bg-gray-200 text-gray-700 px-3 py-1 rounded-l hover:bg-gray-300">-</button>
                        <input 
                            type="number" 
                            value={amount} 
                            onChange={(e) => setAmount(Math.max(1, parseInt(e.target.value) || 1))}
                            className="w-16 text-center border-t border-b border-gray-300 py-1"
                        />
                        <button onClick={incrementAmount} className="bg-gray-200 text-gray-700 px-3 py-1 rounded-r hover:bg-gray-300">+</button>
                        </div>
                    </div>

                    <p className="text-gray-700 mb-6 whitespace-pre-wrap">
                        {product.description}
                    </p>
                    <p className="text-gray-700 mb-6 whitespace-pre-wrap">
                        Brand : {product.brand}
                    </p>
                    <p className="text-gray-700 mb-6 whitespace-pre-wrap">
                        Producer : {product.producer}
                    </p>
                    <p className="text-gray-700 mb-6 whitespace-pre-wrap">
                        In stock : {product.quantity}
                    </p>
                    <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300" onClick={toCarts}>
                        Put into basket
                    </button>
                    </div>
                </div>
            </div>
        </main>
    )
}