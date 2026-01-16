'use client'
import {
  FiBarChart2,
  FiSettings,
  FiPlus,
  FiSearch,
} from "react-icons/fi";
import { FiBox, FiDollarSign, FiShoppingCart, FiTrendingUp } from "react-icons/fi";

import { AiOutlineRobot } from "react-icons/ai";
import { useEffect, useState } from "react";
import AddProduct from "./components/AddProducts";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "./lib/productSlice";
import {ChartGraph } from "./components/Chart";
import Link from "next/link";

export default function DashboardPage() {
  const [open,setOpen]= useState();
  const dispatch = useDispatch();
  const data = useSelector(state=>state.products.data)
  console.log(data);
  const TotalStock = data.reduce((total, item) => total + item.quantity, 0);
  const TotalStockValue = data.reduce((total, item) => total + (item.quantity * item.price), 0).toFixed(2);
  const SoldProducts = data.reduce((total, item) => total + item.quantityVendus, 0);
  const SoldProductsValue = data.reduce((total, item) => total + (item.quantityVendus * item.price), 0).toFixed(2);
  
  
  useEffect(()=>{
    dispatch(fetchProducts())
  },[])

  return (
    <div className="min-h-screen bg-slate-100">
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

      {/* MAIN */}
      <main className="max-w-7xl mx-auto px-8 py-8 space-y-8">
        {/* STATS */}
        {/* const stats =  */}

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
          { label: "Total Stock", value: `${TotalStock} Units`, icon: <FiBox size={24} className="text-blue-500" /> },
          { label: "Stock Value", value: `${TotalStockValue.toLocaleString("en-US", {minimumFractionDigits:2})} $`, icon: <FiDollarSign size={24} className="text-green-500" /> },
          { label: "Sold (30d)", value: `${SoldProducts} Units`, icon: <FiShoppingCart size={24} className="text-purple-500" /> },
          { label: "Revenue (30d)", value: `${SoldProductsValue.toLocaleString("en-US", {minimumFractionDigits:2})} $`, icon: <FiTrendingUp size={24} className="text-orange-500" /> },
          ].map(({ label, value, icon }) => (
            <div
              key={label}
              className="bg-white border border-slate-200 rounded-lg p-5
                        hover:-translate-y-1 hover:shadow-md transition flex items-center gap-12"
            >
              <div>{icon}</div>
              <div>
                <p className="text-sm text-slate-500">{label}</p>
                <p className="mt-2 text-2xl font-semibold text-slate-800">{value}</p>
              </div>
            </div>
          ))}
        </section>

        {/* SALES + AI */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* SALES */}
          <div className="lg:col-span-2 bg-white border border-slate-200 rounded-lg p-6 hover:shadow-md transition">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold text-slate-800 flex items-center gap-2">
                <FiBarChart2 className="text-blue-600" />
                Sales Performance
              </h2>

              <span className="flex items-center gap-1 text-green-600 text-sm font-medium">
                <FiTrendingUp />
                +5.2%
              </span>
            </div>

            <p className="text-3xl font-bold text-slate-800 mb-6">$45,600</p>

            BAR CHART
            <div className="grid grid-cols-7 gap-6  items-end">
                      <ChartGraph/>

              {/* {[
                ["Electronics", 30],
                ["Apparel", 90],
                ["Home", 80],
                ["Groceries", 60],
                ["Books", 45],
                ["Toys", 70],
                ["Sports", 25],
              ].map(([label, h]) => (
                <div key={label} className="flex flex-col items-center gap-2">
                  <div
                    style={{ height: `${h}%` }}
                    className="w-full bg-blue-200 rounded-t-md
                               hover:bg-blue-400 transition-all duration-300"
                  />
                  <span className="text-xs text-slate-500">{label}</span>
                </div>
              ))} */}
            </div>
          </div>

          {/* AI */}
          <div className="bg-white border border-slate-200 rounded-lg p-6 hover:shadow-md transition">
            <h3 className="font-semibold text-slate-800 flex items-center gap-2 mb-4">
              <AiOutlineRobot className="text-blue-600 text-lg" />
              AI Analysis
            </h3>

            <div className="bg-blue-50 text-sm text-slate-700 p-4 rounded-md mb-4 leading-relaxed">
              Apparel sales dominate revenue (40%). Increase stock for top items.
              Electronics need promotional campaigns.
            </div>

            <button className="w-full border border-slate-300 rounded-lg py-2
                               text-sm font-semibold text-slate-700
                               hover:bg-slate-100 transition">
              Generate Full Report →
            </button>
          </div>
        </section>

        {/* MODERN TABLE */}
        <section className="bg-white border border-slate-200 rounded-lg p-6 hover:shadow-md transition">
          <div className="flex flex-col sm:flex-row justify-between gap-4 mb-4">
            <h2 className="font-semibold text-slate-800">
              Latest Sales
            </h2>

            <div className="relative w-full sm:w-64">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                placeholder="Search product..."
                className="w-full pl-10 pr-4 h-10 border border-slate-300 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm border-separate border-spacing-y-2">
              <thead className="text-slate-500 text-md">
                <tr>
                  <th className="text-left py-2">Product</th>
                  <th className="text-left">Category</th>
                  <th className="text-left">Qty</th>
                  <th className="text-left">Price</th>
                  <th className="text-left">Date</th>
                </tr>
              </thead>

              <tbody>
                {data.map((row, i) => (
                  <tr
                    key={row.id || i}
                    className="bg-slate-50 hover:bg-blue-50 transition"
                  >
                    <td className="py-3 px-2 font-medium text-slate-800">
                      {row.name}
                    </td>
                    <td className="py-3 px-2">{row.category}</td>
                    <td className="py-3 px-2">${row.price}</td>
                    <td className="py-3 px-2">{row.quantity}</td>
                    <td className="py-3 px-2">{row.date}</td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        </section>
          {
            open &&(
              <AddProduct onClose={()=>setOpen(false)}/>
            )
          }
      </main>
    </div>
  );
}
