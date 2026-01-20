"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  FiBox,
  FiDollarSign,
  FiLayers,
  FiEdit2,
  FiX,
} from "react-icons/fi";
import { useDispatch } from "react-redux";
import { updateProduct } from "../lib/productSlice";

export default function EditProductModal({
  open,
  onClose,
  product,
}) {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    quantity: "",
  });

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  // Fill form when product changes
  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        category: product.category,
        price: product.price,
        quantity: product.quantity,
      });
    }
  }, [product]);

  if (!open || !product) return null;

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
       await dispatch(
        updateProduct({
          id: product.id,
          updatedData: {
            ...product,
            ...formData,
            price: Number(formData.price),
            quantity: Number(formData.quantity),
          },
        })
      ).unwrap();

      toast.success("Product updated successfully");
      onClose();
    } catch {
      toast.error("Failed to update product");
    } finally {
      setLoading(false);
    }
  };

  return (
   <div className="fixed inset-0 z-50 flex items-center justify-center">
         {/* Overlay */}
         <div
           className="absolute inset-0 bg-black/50"
           onClick={onClose} 
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
             <FiEdit2 className="text-blue-600" />
             Edit Product
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
               {loading ? "save..." : "Save Product"}
             </button>
           </form>
         </div>
       </div>
  );
}
