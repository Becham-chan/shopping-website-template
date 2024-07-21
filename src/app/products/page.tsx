export default function Products() {
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
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <img src="https://via.placeholder.com/300x200" alt="Product 1" className="w-full h-48 object-cover"/>
                  <div className="p-4">
                      <h2 className="text-xl font-semibold text-gray-800">Elegant Watch</h2>
                      <p className="text-gray-600 mt-2">A stylish timepiece for any occasion.</p>
                      <div className="mt-4 flex items-center justify-between">
                          <span className="text-gray-800 font-bold">$199.99</span>
                          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Add to Cart</button>
                      </div>
                  </div>
              </div>
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <img src="https://via.placeholder.com/300x200" alt="Product 2" className="w-full h-48 object-cover"/>
                  <div className="p-4">
                      <h2 className="text-xl font-semibold text-gray-800">Wireless Earbuds</h2>
                      <p className="text-gray-600 mt-2">High-quality sound with long battery life.</p>
                      <div className="mt-4 flex items-center justify-between">
                          <span className="text-gray-800 font-bold">$129.99</span>
                          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Add to Cart</button>
                      </div>
                  </div>
              </div>
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <img src="https://via.placeholder.com/300x200" alt="Product 3" className="w-full h-48 object-cover"/>
                  <div className="p-4">
                      <h2 className="text-xl font-semibold text-gray-800">Smart Home Hub</h2>
                      <p className="text-gray-600 mt-2">Control your home with voice commands.</p>
                      <div className="mt-4 flex items-center justify-between">
                          <span className="text-gray-800 font-bold">$149.99</span>
                          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Add to Cart</button>
                      </div>
                  </div>
              </div>
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <img src="https://via.placeholder.com/300x200" alt="Product 1" className="w-full h-48 object-cover"/>
                  <div className="p-4">
                      <h2 className="text-xl font-semibold text-gray-800">Elegant Watch</h2>
                      <p className="text-gray-600 mt-2">A stylish timepiece for any occasion.</p>
                      <div className="mt-4 flex items-center justify-between">
                          <span className="text-gray-800 font-bold">$199.99</span>
                          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Add to Cart</button>
                      </div>
                  </div>
              </div>
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <img src="https://via.placeholder.com/300x200" alt="Product 2" className="w-full h-48 object-cover"/>
                  <div className="p-4">
                      <h2 className="text-xl font-semibold text-gray-800">Wireless Earbuds</h2>
                      <p className="text-gray-600 mt-2">High-quality sound with long battery life.</p>
                      <div className="mt-4 flex items-center justify-between">
                          <span className="text-gray-800 font-bold">$129.99</span>
                          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Add to Cart</button>
                      </div>
                  </div>
              </div>
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <img src="https://via.placeholder.com/300x200" alt="Product 3" className="w-full h-48 object-cover"/>
                  <div className="p-4">
                      <h2 className="text-xl font-semibold text-gray-800">Smart Home Hub</h2>
                      <p className="text-gray-600 mt-2">Control your home with voice commands.</p>
                      <div className="mt-4 flex items-center justify-between">
                          <span className="text-gray-800 font-bold">$149.99</span>
                          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Add to Cart</button>
                      </div>
                  </div>
              </div>
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <img src="https://via.placeholder.com/300x200" alt="Product 1" className="w-full h-48 object-cover"/>
                  <div className="p-4">
                      <h2 className="text-xl font-semibold text-gray-800">Elegant Watch</h2>
                      <p className="text-gray-600 mt-2">A stylish timepiece for any occasion.</p>
                      <div className="mt-4 flex items-center justify-between">
                          <span className="text-gray-800 font-bold">$199.99</span>
                          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Add to Cart</button>
                      </div>
                  </div>
              </div>
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <img src="https://via.placeholder.com/300x200" alt="Product 2" className="w-full h-48 object-cover"/>
                  <div className="p-4">
                      <h2 className="text-xl font-semibold text-gray-800">Wireless Earbuds</h2>
                      <p className="text-gray-600 mt-2">High-quality sound with long battery life.</p>
                      <div className="mt-4 flex items-center justify-between">
                          <span className="text-gray-800 font-bold">$129.99</span>
                          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Add to Cart</button>
                      </div>
                  </div>
              </div>
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <img src="https://via.placeholder.com/300x200" alt="Product 3" className="w-full h-48 object-cover"/>
                  <div className="p-4">
                      <h2 className="text-xl font-semibold text-gray-800">Smart Home Hub</h2>
                      <p className="text-gray-600 mt-2">Control your home with voice commands.</p>
                      <div className="mt-4 flex items-center justify-between">
                          <span className="text-gray-800 font-bold">$149.99</span>
                          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Add to Cart</button>
                      </div>
                  </div>
              </div>
              
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
