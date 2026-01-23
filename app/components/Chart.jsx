'use client'
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../lib/productSlice";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import React from 'react';

import { Chart } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const ChartGraph = () => {
  const dispatch = useDispatch();
  const data = useSelector(state => state.products.data);

  // Fetch products on mount
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const Categories = [...new Set(data.map(item => item.category))];

  const SoldCategories = Categories.map(cat =>
    data
      .filter(item => item.category === cat)
      .reduce((total, item) => total + (item.quantityVendus || 0), 0)
  );



  return (
    <Chart
      type="bar"
      data={{
        labels: Categories,
        datasets: [
          {
            type: "bar",
            label: "Units Sold",
            data: SoldCategories,
            backgroundColor: "rgba(54, 162, 235, 0.6)",
            borderRadius: 4,
          },

        ],
      }}
      options={{
        responsive: true,
        plugins: {
          legend: { position: "top" },
          title: { display: true, text: "Products Sold by Category" },
        },
        scales: { y: { beginAtZero: true } },
      }}
    />
  );
};
