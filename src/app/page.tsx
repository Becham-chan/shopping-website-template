'use client'

import { useState, useEffect } from "react";
import Products from "@/components/Products";


const mockData = [
    {
        "_id": "669a539d28f07e84cd27e27d",
        "name": "Drinking Water",
        "brand": "Shopytime",
        "producer": "Shopytime Co. Ltd.",
        "description": "Official Drinking Water by Shopytime",
        "quantity": 999999,
        "price": 0.46,
        "editor": "669a51402b76fc579aba357a"
    }
]

export default function Home() {

    const [products, setProducts] = useState<Object>([])

    useEffect(() => {
        async function fetchAPI(){
            const res = await fetch('http://localhost:3000/api/products')
            const result = await res.json()
            setProducts(result)
            result.map((result) => {console.log(result)})
            mockData.map((result) => {console.log("Test", result)})
        }
        fetchAPI()
      }, []);


    console.log(products)
    return (
        <main className="m-0 p-0 my-20">
            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <h1 className="text-2xl font-bold text-gray-900">Welcome to our website!</h1>
                <h1 className="text-3xl font-bold text-gray-900 mb-6">Our Products</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Products products={products}/>
                </div>
            </main>
        </main>
    );
}
