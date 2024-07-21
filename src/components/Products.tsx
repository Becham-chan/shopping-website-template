import Link from "next/link"


export default function Products({products}){

    const addToCart = async () => {
        // try{
        //     const res = await fetch('http://localhost:3000/api/carts', {
        //         method: "POST",
        //         headers: {
        //             "Content-Type": "application.json"
        //         },
        //         body: JSON.stringify ({
        //             products
        //         }),
        //       })
        // }
        // catch(err){
        //     console.log(err)
        // }
    }
    return(
        <>
            {products.map((products, ind) =>
                <Link href={`/products/${products._id}`} key={ind}>
                    <div className="bg-white rounded-lg shadow-md overflow-hidden">
                        <img src="https://via.placeholder.com/300x200" alt="Product 3" className="w-full h-48 object-cover"/>
                        <div className="p-4">
                            <h2 className="text-xl font-semibold text-gray-800">{products.name}</h2>
                            <p className="text-gray-600 mt-2">{products.description}</p>
                            <div className="mt-4 flex items-center justify-between">
                                <span className="text-gray-800 font-bold">${products.price}</span>
                                <button onClick={addToCart} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Add to Cart</button>
                            </div>
                        </div>
                    </div>
                </Link>)
            }
        </>
    )
}