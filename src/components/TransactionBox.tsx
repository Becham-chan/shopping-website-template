export default function TransactionBox ({transactions}){
    // const formatDate = (dateString: string) => {
    //     const options = { year: 'numeric', month: 'long', day: 'numeric' };
    //     return new Date(dateString).toLocaleDateString(undefined, options);
    //   };
    return(
        <div>
            {transactions.map((transactions) => {
                {transactions.list.map((item, index) => (
                  <tr key={index} className="border-b last:border-b-0">
                    <td className="py-2">{item.name}</td>
                    <td className="py-2">{item.amount}</td>
                    <td className="py-2">${item.price.toFixed(2)}</td>
                    <td className="py-2">${(item.total_price).toFixed(2)}</td>
                  </tr>
                ))}
            })}
        </div>
    )
}

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