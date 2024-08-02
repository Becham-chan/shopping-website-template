'use client'

import React, {useState, useEffect} from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation'

export default function History(){
  const {data: session} = useSession()
  const router = useRouter()
  const email = session?.user?.email
  const role = session?.user?.role
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

  const approve = async(id) => {
    const res = await fetch(`http://localhost:3000/api/transactions`,
      {method: "PUT",
        headers: {
            "Content-Type": "application.json"
        },
        body: JSON.stringify ({
            role: role, id: id,
        }),
      }
    )
    if (res.status === 200){
      alert ("You have approved an order!")
      return
    }
    alert ("Approval failed")
  }

  return (
    <div className="container mx-auto my-20 p-6 max-w-7xl">
      <h1 className="text-3xl font-bold mb-6">Your Purchase History</h1>
      
      {transactionsData.length === 0 ? (
        <p className="text-gray-500">You haven't made any purchases yet.</p>
      ) : (
        <div className="space-y-8">
          <table className="min-w-full">
              
              
                {transactionsData.map((transaction) => (
                  <>
                    <div key={transaction._id} className='mb-8'>
                      <thead>
                        <tr className="border-b">
                          <th className="text-left text-xl pb-2 w-[30%]">Date</th>
                          <th className="text-left text-xl pb-2 w-[30%]">Product</th>
                          <th className="text-left text-xl pb-2 w-[20%]">Quantity</th>
                          <th className="text-left text-xl pb-2 w-[20%]">Price</th>
                          <th className="text-left text-xl pb-2 w-[20%]">Total</th>
                        </tr>
                      </thead>
                      <tbody>
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
                          <tr className="mt-4">
                            <td className="py-2 text-xl font-bold">Transaction Total: </td>
                            <td className="py-2"></td>
                            <td className="py-2"></td>
                            {transaction.user_approve ?
                              <>
                                <td className="py-2 text-xl font-bold">${transaction.total.toFixed(2)}</td>
                                <td className="py-2 font-semibold">(Order approved by you)</td>
                              </>
                              :
                              <>
                                <td className="py-2 text-xl font-bold">${transaction.total.toFixed(2)}</td>
                                <td className="py-2">
                                  <button type='button' className='bg-green-400 shadow-lg' onClick={(()=> approve(transaction._id))}>
                                    Approve order
                                  </button>
                                </td>
                              </>
                            }
                          </tr>
                        
                      </tbody>
                    </div>
                  </>
                ))}
          </table>
        </div>
      )}
    </div>
  );
}