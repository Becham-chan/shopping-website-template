'use client'

import { useState, useEffect } from "react";
import Products from "@/components/Products";

export default function ProductsPage() {

  const [products, setProducts] = useState<Object>([])

    useEffect(() => {
      async function fetchAPI(){
          const res = await fetch('http://localhost:3000/api/products')
          const result = await res.json()
          setProducts(result)
      }
      fetchAPI()
    }, []);


    return (
      <main className="m-0 p-0 my-20">
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {/* Filter Tab */}
          <div className="flex justify-center mb-4">
            <ul className="flex flex-wrap -mb-px">
              <li className="mr-2">
                <a
                  className="inline-block bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-gray-200 focus:border-gray-200 rounded py-2 px-4"
                  href="#"
                >
                  Price
                </a>
              </li>
              <li className="mr-2">
                <a
                  className="inline-block bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-gray-200 focus:border-gray-200 rounded py-2 px-4"
                  href="#"
                >
                  Category
                </a>
              </li>
              {/* Add more filter options here */}
            </ul>
          </div>
  
          {/* Products List */}
          <div className="grid grid-cols-3 gap-4">
            <Products products={products}/> {/* Might need to limit the output */}
          </div>
  
          {/* Next/Prev Results */}
          <div className="flex justify-center mt-4">
            <button
              className="bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-gray-200 focus:border-gray-200 rounded py-2 px-4"
              disabled
            >
              Prev
            </button>
            <button
              className="bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-gray-200 focus:border-gray-200 rounded py-2 px-4"
            >
              Next
            </button>
          </div>
        </main>
      </main>
    );
  }
