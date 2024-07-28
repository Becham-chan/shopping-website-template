'use client'

import React, {useState, useEffect} from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation'
import TransactionBox from '@/components/TransactionBox';

export default function History(){
  const {data: session} = useSession()
  const router = useRouter()
  const email = session?.user?.email
  const [transactionsData, setTransationsData] = useState<Object>([])
    // Mock data for transaction history with multiple items per transaction

  useEffect(() => {
    async function fetchAPI(){
      if (email === undefined){
        router.replace("/")
        return
      }
      const res = await fetch(`http://localhost:3000/api/transactions/${email}`)
      const result = await res.json()
      setTransationsData(result)
    }
    fetchAPI()
  }, [session]);

  transactionsData.map((transaction) => {console.log("Input in:", transaction); transaction.list.map((h) => console.log("Input in in :", h))})
  console.log(transactionsData)

  return (
    <div className="container mx-auto my-20 p-6 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Your Purchase History</h1>
      
      {transactionsData.length === 0 ? (
        <p className="text-gray-500">You haven't made any purchases yet.</p>
      ) : (
        <div className="space-y-8">
          <table className="min-w-full">
              
              
                {transactionsData.map((transaction) => (
                  <>
                  <thead>
                    <tr className="border-b">
                      <th className="text-left pb-2">Date</th>
                      <th className="text-left pb-2">Product</th>
                      <th className="text-left pb-2">Quantity</th>
                      <th className="text-left pb-2">Price</th>
                      <th className="text-left pb-2">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <div key={transaction._id}>
                      { transaction.list.map((item, index) =>
                        <>
                          <tr key={index} className="border-b last:border-b-0">
                            <td className="py-2">{transaction.createdAt}</td>
                            <td className="py-2">{item.name}</td>
                            <td className="py-2">{item.amount}</td>
                            <td className="py-2">${item.price.toFixed(2)}</td>
                            <td className="py-2">${(item.total_price).toFixed(2)}</td>
                          </tr>
                        </>
                      )}
                      <div className="mt-4 text-right">
                        <p className="text-lg font-semibold">
                          Transaction Total: ${transaction.total.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </tbody>
                  </>
                ))}
          </table>
        </div>
      )}
    </div>
  );
}