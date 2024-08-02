'use client'

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import TransactionBox from '@/components/TransactionBox';

export default function AdminProductManagement() {
    const [products, setProducts] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [filters, setFilters] = useState("All")
    const router = useRouter()
    const { data: session } = useSession();
    const email = session?.user?.email
    const role = session?.user?.role

    const [newProduct, setNewProduct] = useState({ name: '', brand: "", producer: "", quantity: '', price: '',   description: "" });
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
        const productRes = await fetch("http://localhost:3000/api/products")
        const transactionRes = await fetch(`http://localhost:3000/api/transactions/${email}`)
        const productsData = await productRes.json()
        const transactionData = await transactionRes.json()
        setProducts(productsData)
        setTransactions(transactionData)
      }
      fetchAPI()
    }, [session]);
  
    const addProduct = async (e) => {
      e.preventDefault();
      const res = await fetch(`http://localhost:3000/api/products/`, {
        method: "POST",
        headers: {
            "Content-Type": "application.json"
        },
        body: JSON.stringify ({
          name: newProduct.name,
          brand: newProduct.brand,
          producer: newProduct.producer,
          description: newProduct.description,
          quantity: newProduct.quantity,
          price: newProduct.price,
          email: email,
        }),
      })
      if (res.status === 200){
        alert("Successfully added new product")
        setNewProduct({ name: '', brand: "", producer: "", quantity: '', price: '',   description: "" })
      }
      else{
        alert("Failed to add new product")
      }
      // setProducts([...products, productToAdd]);
      // setNewProduct({ name: '', price: '', quantity: '' });
    };
  
    const startEditing = (product) => {
      setEditingProduct(product);
    };

    const changeFilters = (evt) => {
      if (filters === evt.target.name) {
        setFilters("All");
        return
      }
      setFilters(evt.target.name);
    }
  
    const saveEdit = async () => {
      const res = await fetch(`http://localhost:3000/api/products/`, {
        method: "PUT",
        headers: {
            "Content-Type": "application.json"
        },
        body: JSON.stringify ({
          id: editingProduct._id,
          name: editingProduct.name,
          brand: editingProduct.brand,
          producer: editingProduct.producer,
          description: editingProduct.description,
          quantity: editingProduct.quantity,
          price: editingProduct.price,
          email: email,
        }),
      })
      if (res.status === 200){
        alert ("Product updated successfully")
        setEditingProduct(null);
        return
      }
      alert ("Failed to updated product")
    };
  
    const cancelEdit = () => {
      setEditingProduct(null);
    };
  
    const deleteProduct = async (id) => {
      if (confirm("Are you sure you want to delete this product?")){
        const res = await fetch(`http://localhost:3000/api/products/`, {
          method: "DELETE",
          headers: {
              "Content-Type": "application.json"
          },
          body: JSON.stringify ({
            id: id,
            email: email,
          }),
        })
        if (res.status === 200){
          alert ("Product deleted successfully.")
          setProducts(products.filter(p => p._id !== id));
          return
        }
        alert ("Failed to delete the product.")
      }
    };
  
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
    
    return (
      <div className='my-20'>
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
                    name="brand"
                    value={newProduct.brand}
                    onChange={(e) => handleInputChange(e, true)}
                    placeholder="Brand"
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div className="px-2 w-full sm:w-1/3 mb-4">
                  <input
                    name="producer"
                    value={newProduct.producer}
                    onChange={(e) => handleInputChange(e, true)}
                    placeholder="Producer"
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
                <div className="px-2 w-full mb-4">
                  <textarea
                    name="description"
                    value={newProduct.description}
                    onChange={(e) => handleInputChange(e, true)}
                    placeholder="Description"
                    className="w-full p-2 border rounded"
                    rows="3"
                    required
                  >
                  </textarea>
                </div>
              </div>
              <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                Add Product
              </button>
            </form>
      
            {/* Product List */}
            <div className="overflow-x-auto mb-10">
              <h1 className="text-2xl font-bold mb-4">Products List</h1>
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-gray-200">
                    { editingProduct ? 
                      <>
                        <th className="px-4 py-2">Name / Brand</th>
                      </> 
                      : 
                      <>
                        <th className='px-4 py-2'>Name</th>
                      </>}
                    { editingProduct ? 
                      <>
                        <th className="px-4 py-2">Price / Producer</th>
                      </> 
                      : 
                      <>
                        <th className='px-4 py-2'>Price</th>
                      </>}
                    { editingProduct ? 
                      <>
                        <th className="px-4 py-2">Stock / Description</th>
                      </> 
                      : 
                      <>
                        <th className='px-4 py-2'>Stock</th>
                      </>}
                    <th className="px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(product => (
                    <>
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
                    <tr key={product._id} className="border-b">
                      <td className="px-4 py-2">
                        {editingProduct && editingProduct._id === product._id && 
                          <input
                            type="text"
                            name="brand"
                            value={editingProduct.brand}
                            onChange={handleInputChange}
                            className="w-full p-1 border rounded"
                          />
                          }
                      </td>
                      <td className="px-4 py-2">
                        {editingProduct && editingProduct._id === product._id &&
                          <input
                            type="text"
                            name="producer"
                            value={editingProduct.producer}
                            onChange={handleInputChange}
                            className="w-full p-1 border rounded"
                          />}
                      </td>
                      <td className="px-4 py-2">
                        {editingProduct && editingProduct._id === product._id &&
                          <textarea
                            name="description"
                            value={editingProduct.description}
                            onChange={handleInputChange}
                            className="w-full p-1 border rounded"
                            rows={3}
                          />
                        }
                      </td>
                    </tr>
                  </>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="container mx-auto p-4">
              <h1 className="text-2xl font-bold mb-4">Transactions List</h1>
              <div className='mb-10 flex'>
                <button
                  className={(filters === "Non-approved" ? "bg-purple-500 hover:bg-purple-700 " : "bg-gray-500 hover:bg-gray-700 ") + "text-white font-bold py-2 px-4 rounded mr-4"}
                  name='Non-approved'
                  onClick={changeFilters}
                >
                  Non-Approved
                </button>
                <button
                  className={(filters === "Approved" ? "bg-green-500 hover:bg-green-700 " : "bg-gray-500 hover:bg-gray-700 ") + "text-white font-bold py-2 px-4 rounded"}
                  name='Approved'
                  onClick={changeFilters}
                >
                  Approved
                </button>
              </div>
              <TransactionBox transactions={transactions} filter={filters} role={role}/>
            </div>
          </div>
          :
            <div><h1>Authenticating</h1></div>}
          </div>
      );
};
 