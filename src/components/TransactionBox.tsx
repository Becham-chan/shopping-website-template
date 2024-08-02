export default function TransactionBox ({transactions, filter, role}){
    const handleApprove = async (id) => {
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
    };
    if (transactions.length !== 0 && filter === "All"){
      return (
        <>
          {transactions.map((transaction) => ((
            <div key={transaction._id} className="mb-8 bg-white shadow-md rounded-lg overflow-hidden">
              <div className="bg-gray-100 px-4 py-2 flex justify-between items-center">
                <div>
                  <span className="font-semibold">Date: </span>
                  {transaction.createdAt}
                </div>
              </div>
              <div>
                <span className="font-semibold">User ID: </span>
                {transaction.customer}
              </div>
              <div className="p-4">
                <h3 className="font-semibold mb-2">Items:</h3>
                <ul className="list-disc list-inside mb-4">
                  {transaction.list.map((item, index) => (
                    <li key={index}>
                      {item.name} - ${item.price.toFixed(2)} x {item.amount} = 
                      ${(item.price * item.amount).toFixed(2)}
                    </li>
                  ))}
                </ul>
                <div className="text-right mb-4">
                  <span className="font-semibold">Total Price: </span>
                  ${transaction.total.toFixed(2)}
                </div>
                <div className="text-right">
                  {transaction.store_approve ? (
                    <span className="inline-block bg-green-500 text-white px-4 py-2 rounded">
                      Approved
                    </span>
                  ) : (
                    <button 
                      onClick={() => handleApprove(transaction._id)}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Approve Transaction
                    </button>
                  )}
                </div>
              </div>
            </div>
          )))}
      </>
    )}
    else if (transactions.length !== 0 && filter === "Non-approved"){
      return (
        <>
            {transactions.map((transaction) => ((
              transaction.store_approve &&
                <div key={transaction._id} className="mb-8 bg-white shadow-md rounded-lg overflow-hidden">
                  <div className="bg-gray-100 px-4 py-2 flex justify-between items-center">
                    <div>
                      <span className="font-semibold">Date: </span>
                      {transaction.createdAt}
                    </div>
                  </div>
                  <div>
                    <span className="font-semibold">User ID: </span>
                    {transaction.customer}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold mb-2">Items:</h3>
                    <ul className="list-disc list-inside mb-4">
                      {transaction.list.map((item, index) => (
                        <li key={index}>
                          {item.name} - ${item.price.toFixed(2)} x {item.amount} = 
                          ${(item.price * item.amount).toFixed(2)}
                        </li>
                      ))}
                    </ul>
                    <div className="text-right mb-4">
                      <span className="font-semibold">Total Price: </span>
                      ${transaction.total.toFixed(2)}
                    </div>
                    <div className="text-right">
                      <button 
                        onClick={() => handleApprove(transaction._id)}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      >
                        Approve Transaction
                      </button>
                    </div>
                  </div>
                </div>
          )))}
      </>
    )}
    else if (transactions.length !== 0 && filter === "Approved"){
      return (
        <>
          {transactions.map((transaction) => ((
            <div key={transaction._id} className="mb-8 bg-white shadow-md rounded-lg overflow-hidden">
              <div className="bg-gray-100 px-4 py-2 flex justify-between items-center">
                <div>
                  <span className="font-semibold">Date: </span>
                  {transaction.createdAt}
                </div>
              </div>
              <div>
                <span className="font-semibold">User ID: </span>
                {transaction.customer}
              </div>
              <div className="p-4">
                <h3 className="font-semibold mb-2">Items:</h3>
                <ul className="list-disc list-inside mb-4">
                  {transaction.list.map((item, index) => (
                    <li key={index}>
                      {item.name} - ${item.price.toFixed(2)} x {item.amount} = 
                      ${(item.price * item.amount).toFixed(2)}
                    </li>
                  ))}
                </ul>
                <div className="text-right mb-4">
                  <span className="font-semibold">Total Price: </span>
                  ${transaction.total.toFixed(2)}
                </div>
                <div className="text-right">
                  <span className="inline-block bg-green-500 text-white px-4 py-2 rounded">
                    Approved
                  </span>
                </div>
              </div>
            </div>
          )))}
      </>
    )}
}
// :
// <div><h1>Authenticating</h1></div>}
// }

/*


            {transactions.map((transactions) => {
                <div key={transactions._id} className="bg-white shadow-md rounded-lg overflow-hidden">
                  <div className="bg-gray-100 px-6 py-4">
                    <h2 className="text-xl font-semibold">Transaction on ?</h2>
                    {formatDate(transaction.createdAt)}
                    </div>
                    <div className="p-6">
                      <table className="min-w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left pb-2">Product</th>
                            <th className="text-left pb-2">Quantity</th>
                            <th className="text-left pb-2">Price</th>
                            <th className="text-left pb-2">Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          {transactions.list.map((item, index) => (
                            <tr key={index} className="border-b last:border-b-0">
                              <td className="py-2">{item.name}</td>
                              <td className="py-2">{item.amount}</td>
                              <td className="py-2">${item.price.toFixed(2)}</td>
                              <td className="py-2">${(item.total_price).toFixed(2)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <div className="mt-4 text-right">
                        <p className="text-lg font-semibold">
                          Transaction Total: ${transactions.total.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
              })}

*/