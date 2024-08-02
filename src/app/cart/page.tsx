'use client'
import React, { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Home() {

        const {data: session} = useSession()
        const router = useRouter()
        // Mock data for cart items
        const [cartItems, setCartItems] = React.useState([
        ]);
      
        const email = session?.user?.email
        const updateAmount = async (_id: String, method: String, index: Number) => {
          await fetch(`http://localhost:3000/api/carts/`, {
            method: "PUT",
            headers: {
                "Content-Type": "application.json"
            },
            body: JSON.stringify ({
              email: email, product_id: _id, method: method
            }),
          })
          const res = await fetch(`http://localhost:3000/api/carts/${email}`)
          const result = await res.json()
          setCartItems(result)
        };
        
      
        const getTotalPrice = () => {
          return cartItems.reduce((total, item) => total + item.list[0].price * item.list[0].amount, 0).toFixed(2);
        };
      
        const getTotalItems = () => {
          return cartItems.reduce((total, item) => total + item.list[0].amount, 0);
        };

        const confirmedPurchase = async () => {
          const res = await fetch(`http://localhost:3000/api/transactions/`, {
            method: "POST",
            headers: {
                "Content-Type": "application.json"
            },
            body: JSON.stringify ({
              email: email
            }),
          })
          if (res.status === 200){
            alert("Successfully purchased")
            router.push('/')
          }
          else if (res.status === 404){
            alert("One of products in your cart has insufficient amount in stocks")
          }
          else{
            alert("Failed to confirm purchase")
          }
        }

        useEffect(() => {
          async function fetchAPI(){
            if (email === undefined){
              router.replace("/")
              return
            }
            console.log(email)
            const res = await fetch(`http://localhost:3000/api/carts/${email}`)
            const result = await res.json()
            setCartItems(result)
          }
          fetchAPI()
        }, [session]);



  return (
    <main className="m-0 p-0 my-20">
        <div className="container mx-auto p-6 max-w-3xl">
            <h1 className="text-3xl font-bold mb-6">Your Shopping Cart</h1>
            
            {cartItems.length === 0 ? (
                <p className="text-gray-500">Your cart is empty.</p>
            ) : (
                <>
                <div className="space-y-4">
                    {cartItems.map((item, index) => (
                      
                    <div key={index} className="flex items-center justify-between border-b pb-4">
                        <div>
                        <h2 className="text-xl font-semibold">{item.list[0].name}</h2>
                        <p className="text-gray-600">${(item.list[0].price).toFixed(2)} each</p>
                        </div>
                        <div className="flex items-center">
                        <button 
                            onClick={() => updateAmount(item.product, "dec", index)}
                            className="bg-gray-200 px-3 py-1 rounded-l hover:bg-gray-300"
                        >
                            -
                        </button>
                        <span className="px-3 py-1 bg-gray-100">{item.list[0].amount}</span>
                        <button 
                            onClick={() => updateAmount(item.product, "inc", index)}
                            className="bg-gray-200 px-3 py-1 rounded-r hover:bg-gray-300"
                        >
                            +
                        </button>
                        </div>
                        <p className="font-semibold">${(item.list[0].price * item.list[0].amount).toFixed(2)}</p>
                    </div>
                    ))}
                </div>
                
                <div className="mt-8 text-right">
                    <p className="text-xl">Total Items: {getTotalItems()}</p>
                    <p className="text-2xl font-bold">Total Price: ${getTotalPrice()}</p>
                </div>
                
                <button className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300" onClick={confirmedPurchase}>
                    Proceed to Checkout
                </button>
                </>
            )}
        </div>
    </main>
  );
}
