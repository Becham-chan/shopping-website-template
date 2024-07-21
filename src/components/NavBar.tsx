'use client'

import { Dropdown } from "flowbite-react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

function Navbar(){

    const router = useRouter()

    const {data: session} = useSession();


    return (
        <nav className="bg-gray-800 top-0 fixed w-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <img className="h-8 w-8" src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg" alt="Logo"/>
                        </div>
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-4">
                                <a href="/" className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium">Home</a>
                                <a href="/products" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Products</a>
                                {session && <a href="/cart" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Cart</a>}
                                {!session ? 
                                    <>
                                        <Link className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium" href="/auth/login">Sign in</Link>
                                        <Link className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium" href="/auth/register">Sign up</Link> 
                                    </> 
                                : 
                                    <>
                                        <Dropdown className="text-lg font-bold text-black" label="Settings" dismissOnClick={false}>
                                            <Dropdown.Item onClick={() => signOut()}>Log Out</Dropdown.Item>
                                            <Dropdown.Item>
                                                <Link href="/history">History</Link>
                                            </Dropdown.Item>
                                            <Dropdown.Item onClick={(()=>router.push("/profile"))}>
                                                Profile
                                            </Dropdown.Item>
                                        </Dropdown>
                                    </>
                                }
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
        
    //     <nav className="bg-gray-800 text-white p-4">
    //         <h1 className="text-2xl font-bold mb-4">GameStore</h1>
    //         <div className="container flex justify-between flex-row mx-20 mt-5 text-xl">
    //             <ul className="flex">
    //                 <li className="px-5"><Link href="/">Home</Link></li>
    //                 <li className="px-5"><Link href="/shop">Shop</Link></li>
    //                 <li className="px-5"><Link href="/about">Earn</Link></li>
    //             </ul>
                
    //             <Dropdown className="text-lg font-bold text-black" label="Settings" dismissOnClick={false}>
    //                 <Dropdown.Item>Settings</Dropdown.Item>
    //                 <Dropdown.Item>History</Dropdown.Item>
    //                 {!session ? 
    //                     <>
    //                         <Dropdown.Item>
    //                             <Link href="/auth/signin">Sign in</Link>
    //                         </Dropdown.Item>
    //                         <Dropdown.Item>
    //                             <Link href={"/auth/signup"}>Sign up</Link> 
    //                         </Dropdown.Item>
    //                     </> 
    //                 : 
    //                     <>
    //                         <Dropdown.Item onClick={() => signOut()}>Log Out</Dropdown.Item>
    //                     </>
    //                 }
                    
    //             </Dropdown>
    //         </div>
    //     </nav>    
    )
}

export default Navbar