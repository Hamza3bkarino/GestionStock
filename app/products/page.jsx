'use client'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, fetchProducts } from "../lib/productSlice";
import { FiEdit, FiTrash2, FiPackage } from "react-icons/fi";
import DeleteModal from "../components/DeleteModal";
import EditProductModal from "../components/EditProducts";
import { FaRegEye } from "react-icons/fa6";
import { useRouter } from "next/navigation";

export default function Product() {
  const dispatch = useDispatch();
  const { data, loading } = useSelector(state => state.products);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [editOpen, setEditOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);


  const handleDeleteClick = (product) => {
    setSelectedProduct(product);
    setDeleteOpen(true);
  };

  const handleConfirmDelete = (id) => {
    console.log("Deleted:", selectedProduct);
    dispatch(deleteProduct(id))
    setDeleteOpen(false);
  };

  const handleEditClick = (product) => {
  setSelectedProduct(product);
  setEditOpen(true);
};

  const handleDetailClick = (id) => {
    router.push(`/details/${id}`);
  }




  return ( 
    <section className="max-w-7xl mx-auto my-30 bg-linear-to-br from-slate-50 to-slate-100
                        rounded-3xl border border-slate-200 shadow-xl p-8">

      {/* HEADER */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white
                        flex items-center justify-center shadow-md">
          <FiPackage size={22} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Products</h2>
          <p className="text-sm text-slate-500">
            Inventory overview & stock control
          </p>
        </div>
      </div>

      {/* COLUMN TITLES */}
      <div className="grid grid-cols-12 px-6 mb-3 text-xs font-semibold
                      text-slate-500 uppercase tracking-wide">
        <span className="col-span-4">Product</span>
        <span className="col-span-2">Category</span>
        <span className="col-span-2">Price</span>
        <span className="col-span-2">Stock</span>
        <span className="col-span-2 text-center">Actions</span>
      </div>

      {/* LIST */}
      <div className="space-y-4">
        {loading ? (
          <p className="text-center py-10 text-slate-400">
            Loading products...
          </p>
        ) : data.length === 0 ? (
          <p className="text-center py-10 text-slate-400">
            No products found
          </p>
        ) : (
          data.map(item => {
            const stockPercent = Math.min((item.quantity / 100) * 100, 100);

            return (
              <div
                key={item.id}
                className="grid grid-cols-12 items-center bg-white
                           rounded-2xl px-6 py-5 shadow-sm
                           hover:shadow-lg hover:-translate-y-1
                           transition-all duration-300"
              >
                {/* PRODUCT */}
                <div className="col-span-4 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-100
                                  flex items-center justify-center
                                  font-bold text-blue-700">
                    {item.name.charAt(0)}
                  </div>
                  <span className="font-semibold text-slate-800">
                    {item.name}
                  </span>
                </div>

                {/* CATEGORY */}
                <div className="col-span-2">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold
                                   bg-indigo-100 text-indigo-700">
                    {item.category}
                  </span>
                </div>

                {/* PRICE */}
                <div className="col-span-2 font-bold text-slate-700">
                  ${item.price.toLocaleString()}
                </div>

                {/* STOCK */}
                <div className="col-span-2">
                  <div className="space-y-1">
                    <span className="text-sm font-semibold text-slate-700">
                      {item.quantity} units
                    </span>
                    <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        style={{ width: `${stockPercent}%` }}
                        className={`h-full rounded-full transition-all
                          ${
                            item.quantity > 20
                              ? "bg-linear-to-r from-green-400 to-green-600"
                              : "bg-linear-to-r from-red-400 to-red-600"
                          }`}
                      />
                    </div>
                  </div>
                </div>

                {/* ACTIONS */}
                <div className="col-span-2 flex justify-center gap-2">
                  <button className="p-2 cursor-pointer rounded-xl bg-blue-100 text-blue-600
                                     hover:bg-blue-600 hover:text-white transition"
                                       onClick={() => handleEditClick(item)}
                                     >
                    <FiEdit />
                  </button>
                  <button className="p-2 cursor-pointer rounded-xl bg-red-100 text-red-600
                                     hover:bg-red-600 hover:text-white transition"
                                     onClick={() => handleDeleteClick(item)}
                                     >
                    <FiTrash2 />
                  </button>
                  <button className="p-2 cursor-pointer rounded-xl bg-red-100 text-green-600
                                     hover:bg-green-600 hover:text-white transition"
                                     onClick={() => handleDetailClick(item.id)}
                                     >
                    <FaRegEye />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
        <EditProductModal
            open={editOpen}
            onClose={() => setEditOpen(false)}
            product={selectedProduct}
        />

       <DeleteModal
          open={deleteOpen}
          onClose={() => setDeleteOpen(false)}
          onConfirm={()=>handleConfirmDelete(selectedProduct?.id)}
          productName={selectedProduct?.name}
        />
    </section>
  );
}
