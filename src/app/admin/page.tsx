'use client'

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function AdminProductManagement() {
    const [products, setProducts] = useState([]);
      const router = useRouter()
      const { data: session } = useSession();
      const email = session?.user?.email
      const role = session?.user?.role
  
      const [newProduct, setNewProduct] = useState({ name: '', price: '', quantity: '' });
      const [editingProduct, setEditingProduct] = useState(null);
    
      const handleInputChange = (e, isNewProduct = false) => {
        const { name, value } = e.target;
        if (isNewProduct) {
          setNewProduct(prev => ({ ...prev, [name]: value }));
        } else {
          setEditingProduct(prev => ({ ...prev, [name]: value }));
        }
      };
      useEffect(() => {
        async function fetchAPI(){
          if (email === undefined || role !== "Admin"){
            router.replace("/")
            return
          }
          const res = await fetch("http://localhost:3000/api/products")
          const data = await res.json()
          setProducts(data)
        }
        fetchAPI()
      }, [session]);
    
      const addProduct = (e) => {
        e.preventDefault();
        const productToAdd = {
          id: products.length + 1,
          name: newProduct.name,
          price: parseFloat(newProduct.price),
          quantity: parseInt(newProduct.quantity),
        };
        setProducts([...products, productToAdd]);
        setNewProduct({ name: '', price: '', quantity: '' });
      };
    
      const startEditing = (product) => {
        setEditingProduct(product);
      };
    
      const saveEdit = () => {
        setProducts(products.map(p => p._id === editingProduct._id ? editingProduct : p));
        setEditingProduct(null);
      };
    
      const cancelEdit = () => {
        setEditingProduct(null);
      };
    
      const deleteProduct = (id) => {
        setProducts(products.filter(p => p._id !== id));
      };
    
      return (
        <>
          {email !== undefined && role === "Admin" ? 
          <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Product Management</h1>
      
            {/* Add New Product Form */}
            <form onSubmit={addProduct} className="mb-8 p-4 bg-gray-100 rounded">
              <h2 className="text-xl font-semibold mb-2">Add New Product</h2>
              <div className="flex flex-wrap -mx-2 mb-4">
                <div className="px-2 w-full sm:w-1/3 mb-4">
                  <input
                    type="text"
                    name="name"
                    value={newProduct.name}
                    onChange={(e) => handleInputChange(e, true)}
                    placeholder="Product Name"
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div className="px-2 w-full sm:w-1/3 mb-4">
                  <input
                    type="number"
                    name="price"
                    value={newProduct.price}
                    onChange={(e) => handleInputChange(e, true)}
                    placeholder="Price"
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div className="px-2 w-full sm:w-1/3 mb-4">
                  <input
                    type="number"
                    name="quantity"
                    value={newProduct.quantity}
                    onChange={(e) => handleInputChange(e, true)}
                    placeholder="Quantity"
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
              </div>
              <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                Add Product
              </button>
            </form>
      
            {/* Product List */}
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="px-4 py-2">Name</th>
                    <th className="px-4 py-2">Price</th>
                    <th className="px-4 py-2">Stock</th>
                    <th className="px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(product => (
                    <tr key={product._id} className="border-b">
                      <td className="px-4 py-2">
                        {editingProduct && editingProduct._id === product._id ? (
                          <input
                            type="text"
                            name="name"
                            value={editingProduct.name}
                            onChange={handleInputChange}
                            className="w-full p-1 border rounded"
                          />
                        ) : (
                          product.name
                        )}
                      </td>
                      <td className="px-4 py-2">
                        {editingProduct && editingProduct._id === product._id ? (
                          <input
                            type="number"
                            name="price"
                            value={editingProduct.price}
                            onChange={handleInputChange}
                            className="w-full p-1 border rounded"
                          />
                        ) : (
                          `$${product.price.toFixed(2)}`
                        )}
                      </td>
                      <td className="px-4 py-2">
                        {editingProduct && editingProduct._id === product._id ? (
                          <input
                            type="number"
                            name="quantity"
                            value={editingProduct.quantity}
                            onChange={handleInputChange}
                            className="w-full p-1 border rounded"
                          />
                        ) : (
                          product.quantity
                        )}
                      </td>
                      <td className="px-4 py-2">
                        {editingProduct && editingProduct._id === product._id ? (
                          <>
                            <button onClick={saveEdit} className="bg-blue-500 text-white px-2 py-1 rounded mr-2 hover:bg-blue-600">
                              Save
                            </button>
                            <button onClick={cancelEdit} className="bg-gray-500 text-white px-2 py-1 rounded hover:bg-gray-600">
                              Cancel
                            </button>
                          </>
                        ) : (
                          <>
                            <button onClick={() => startEditing(product)} className="bg-yellow-500 text-white px-2 py-1 rounded mr-2 hover:bg-yellow-600">
                              Edit
                            </button>
                            <button onClick={() => deleteProduct(product._id)} className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">
                              Delete
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          :
            <div><h1>Authenticating</h1></div>}
        </>
      );
};
 