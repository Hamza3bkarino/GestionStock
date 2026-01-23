'use client'
import {
  FiBarChart2,
  FiSearch,
} from "react-icons/fi";
import { FiBox, FiDollarSign, FiShoppingCart, FiTrendingUp } from "react-icons/fi";
import React from 'react';
import { AiOutlineRobot } from "react-icons/ai";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "./lib/productSlice";
import {ChartGraph } from "./components/Chart";
import axios from "axios";
import toast from "react-hot-toast";

export default function DashboardPage() {
  const dispatch = useDispatch();
  const data = useSelector(state=>state.products.data);
  const [search , setSearch]=useState('');
  const [aiText, setAiText] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const TotalStock = data.reduce((total, item) => total + item.quantity, 0);
  const TotalStockValue = data.reduce((total, item) => total + (item.quantity * item.price), 0).toFixed(2);
  const SoldProducts = data.reduce((total, item) => total + item.quantityVendus, 0);
  const SoldProductsValue = data.reduce((total, item) => total + (item.quantityVendus * item.price), 0).toFixed(2);
  const soldeProducts = data.filter((p)=>p.quantityVendus > 0);
  const filtred = soldeProducts.filter((p)=>p.name.toLowerCase().includes(search.toLowerCase()));
  
  

  const handleChange = (e) => {
    setSearch(e.target.value)
  }

  useEffect(()=>{
    dispatch(fetchProducts())
  },[])

  const generateAIReport = async () => {
    try {
      setAiLoading(true);
      toast.loading("Analyzing sales data...",{
        id: "ai" ,
        style: {
        background: "#2563eb", 
        color: "#fff",
  },});

      const prompt = `
      Analyze my sales data:
      - Total stock: ${TotalStock}
      - Stock value: ${TotalStockValue} $
      - Sold units: ${SoldProducts}
      - Revenue: ${SoldProductsValue} $
      Give short business insights and suggestions.
      Just 4 lines, no numbering.
      `;

      const res = await axios.post("/api/gemini", { prompt });

      setAiText(res.data.result);

      toast.success("AI report generated successfully!", { id: "ai" });
    } catch (error) {
      toast.error("Failed to generate AI report", { id: "ai" });
      setAiText("Failed to generate AI report.");
    } finally {
      setAiLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-slate-100">

      {/* MAIN */}
      <main className="max-w-7xl mx-auto px-8 py-8 space-y-8">
        {/* STATS */}

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

            </div>
          </div>

          {/* AI */}
          <div className="bg-white border border-slate-200 rounded-lg p-6 hover:shadow-md transition">
            <h3 className="font-semibold text-slate-800 flex items-center gap-2 mb-4">
              <AiOutlineRobot className="text-blue-600 text-lg" />
              AI Analysis
            </h3>

            <div className="bg-blue-50 text-sm text-slate-700 p-4 rounded-md mb-4 leading-relaxed whitespace-pre-wrap min-h-[120px]">
              {aiLoading
                ? "Analyzing your data..."
                : aiText || "Click the button to generate AI insights."}
            </div>


            <button
              onClick={generateAIReport}
              disabled={aiLoading}
              className={`w-full border border-slate-300 rounded-lg py-2
                text-sm font-semibold transition
                ${aiLoading 
                  ? "cursor-not-allowed opacity-60" 
                  : "cursor-pointer hover:bg-slate-100"}
              `}
            >
              {aiLoading ? "Generating..." : "Generate Full Report →"}
            </button>


          </div>
        </section>

        {/* MODERN TABLE */}
        <section className="bg-white border border-slate-200 rounded-lg p-6 hover:shadow-md transition">
          <div className="flex flex-col sm:flex-row justify-between gap-4 mb-4">
            <h2 className="font-semibold text-slate-800">
              My Sales
            </h2>

            <div className="relative w-full sm:w-64">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                placeholder="Search product..."
                onChange={(e)=>handleChange(e)}
                value={search}
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
                {filtred.map((row, i) => (
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
         
      </main>
    </div>
  );
}
