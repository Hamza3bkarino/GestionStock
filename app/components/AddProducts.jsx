"use client";
import React from 'react';
import { useState } from "react";
import toast from "react-hot-toast";
import { FiBox, FiDollarSign, FiLayers, FiPlus, FiX } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { addProduct } from "../lib/productSlice";

export default function AddProduct({ onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    quantity: "",
    quantityVendus: 0,
  });
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await dispatch(addProduct({
          ...formData,
          price: parseFloat(formData.price),
          quantity: parseInt(formData.quantity),
          date: new Date().toISOString().split("T")[0],
      })
    ).unwrap()

      setFormData({ name: "", category: "", price: "", quantity: "" });
      toast.success('Product added successfully')
      onClose?.();
    } catch (error) {
      console.error("Failed to add product", error);
      toast.error('Product field to add')
      alert("Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose} // click outside to close
      ></div>

      {/* Form */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-lg z-10 w-full max-w-2xl relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-slate-400 hover:text-slate-600 transition"
        >
          <FiX size={20} />
        </button>

        <h2 className="text-lg font-semibold text-slate-800 mb-6 flex items-center gap-2">
          <FiPlus className="text-blue-600" />
          Add New Product
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* PRODUCT NAME */}
          <div>
            <label className="text-sm text-slate-600">Product Name</label>
            <div className="relative">
              <FiBox className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Men's T-Shirt"
                className="w-full h-10 pl-10 pr-4 border border-slate-300 rounded-lg text-sm
                           focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>
          </div>

          {/* CATEGORY */}
          <div>
            <label className="text-sm text-slate-600">Category</label>
            <div className="relative">
              <FiLayers className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full h-10 pl-10 pr-4 border border-slate-300 rounded-lg text-sm
                           focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              >
                <option value="">Select category</option>
                <option>Apparel</option>
                <option>Electronics</option>
                <option>Home Goods</option>
                <option>Groceries</option>
                <option>Books</option>
              </select>
            </div>
          </div>

          {/* PRICE */}
          <div>
            <label className="text-sm text-slate-600">Price</label>
            <div className="relative">
              <FiDollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                name="price"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={handleChange}
                required
                placeholder="25.00"
                className="w-full h-10 pl-10 pr-4 border border-slate-300 rounded-lg text-sm
                           focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>
          </div>

          {/* QUANTITY */}
          <div>
            <label className="text-sm text-slate-600">Quantity</label>
            <input
              name="quantity"
              type="number"
              value={formData.quantity}
              onChange={handleChange}
              required
              placeholder="100"
              className="w-full h-10 px-4 border border-slate-300 rounded-lg text-sm
                         focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>

          {/* BUTTON */}
          <button
            disabled={loading}
            className="w-full cursor-pointer h-10 bg-blue-600 hover:bg-blue-700
                       text-white rounded-lg text-sm font-semibold
                       transition disabled:opacity-60"
          >
            {loading ? "Adding..." : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
}
