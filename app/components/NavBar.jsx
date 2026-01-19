'use client'
import { useState } from "react";
import AddProduct from "./AddProducts";
import {
  FiPlus,
} from "react-icons/fi";
import { FiBox} from "react-icons/fi";
import Link from "next/link";


export default function NavBar(){
      const [open,setOpen]= useState();

    return(
        <>
            {/* HEADER */}
            <header className="bg-white border-b border-slate-200 sticky top-0 z-20">
                <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <FiBox className="text-blue-600 text-xl" />
                    <h1 className="font-semibold text-slate-800">
                    Stock Management Dashboard
                    </h1>
                </div>

                <nav className="hidden md:flex gap-6 text-sm font-medium">
                    <Link href={'/'} className="text-blue-600 cursor-pointer">Dashboard</Link>
                    <Link href={'/products'} className="text-slate-600 cursor-pointer hover:text-blue-600 transition">
                    Products
                    </Link>
                    <Link href={''} className="text-slate-600 cursor-pointer hover:text-blue-600 transition">
                    Reports
                    </Link>
                    <Link href={''} className="text-slate-600 cursor-pointer hover:text-blue-600 transition">
                    Settings
                    </Link>
                </nav>

                <button className="flex cursor-pointer items-center gap-2 bg-blue-600 hover:bg-blue-700 transition text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-sm hover:shadow-md"
                    onClick={()=>setOpen(true)}
                >
                    <FiPlus />
                    Add Product
                </button>
                </div>
            </header>
             {
            open &&(
              <AddProduct onClose={()=>setOpen(false)}/>
            )
          }
        </>
    )
}