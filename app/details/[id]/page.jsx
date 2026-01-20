'use client';

import { fetchProducts, deleteProduct } from "@/app/lib/productSlice";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FiEdit,
  FiTrash2,
  FiBox,
  FiLayers,
  FiDollarSign,
  FiPackage
} from "react-icons/fi";
import EditProductModal from "@/app/components/EditProducts";
import DeleteModal from "@/app/components/DeleteModal";

export default function Details() {
  const { id } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();

  const { data, loading } = useSelector((state) => state.products);

  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const product = data.find((p) => p.id === (id));
  console.log(product);
  

  if (loading) {
    return <p className="text-center mt-20">Loading...</p>;
  }

  if (!product) {
    return <p className="text-center mt-20">Product not found</p>;
  }

  return (
    <section className="max-w-4xl mx-auto mt-20 bg-white rounded-3xl shadow-xl p-8 border border-slate-200">
      
      {/* HEADER */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center">
            <FiPackage size={26} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">
              {product.name}
            </h1>
            <p className="text-sm text-slate-500">
              Product details & management
            </p>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex gap-3">
          <button
            onClick={() => setEditOpen(true)}
            className="flex cursor-pointer items-center gap-2 px-4 py-2 rounded-xl bg-blue-100 text-blue-600
                       hover:bg-blue-600 hover:text-white transition"
          >
            <FiEdit />
            Edit
          </button>

          <button
            onClick={() => setDeleteOpen(true)}
            className="flex cursor-pointer items-center gap-2 px-4 py-2 rounded-xl bg-red-100 text-red-600
                       hover:bg-red-600 hover:text-white transition"
          >
            <FiTrash2 />
            Delete
          </button>
        </div>
      </div>

      {/* DETAILS */}
      <div className="grid grid-cols-2 gap-6">
        <DetailItem icon={<FiBox />} label="Product Name" value={product.name} />
        <DetailItem icon={<FiLayers />} label="Category" value={product.category} />
        <DetailItem icon={<FiDollarSign />} label="Price" value={`$${product.price}`} />
        <DetailItem icon={<FiPackage />} label="Stock" value={`${product.quantity} units`} />
      </div>

      {/* MODALS */}
      <EditProductModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        product={product}
      />

      <DeleteModal
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        productName={product.name}
        onConfirm={() => {
          dispatch(deleteProduct(product.id));
          router.push("/products");
        }}
      />
    </section>
  );
}

/* ===============================
   DETAIL ITEM COMPONENT
================================ */
function DetailItem({ icon, label, value }) {
  return (
    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 flex items-center gap-4">
      <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
        {icon}
      </div>
      <div>
        <p className="text-xs text-slate-500">{label}</p>
        <p className="font-semibold text-slate-800">{value}</p>
      </div>
    </div>
  );
}
