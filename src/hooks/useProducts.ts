// import { useEffect, useState } from "react";

// export const BASE_URL = "http://localhost:3001/api";
// export type TProduct = {
//   id: number;
//   img: string;
//   name: string;
//   price: number;
//   rating: number;
//   typeId: null | number;
//   brandId: number | null;
//   updatedAt: string;
//   createdAt: string;
// };
// export const useProducts = () => {
//   const [loading, setLoading] = useState(false);
//   const [products, setProducts] = useState<TProduct[]>([]);
//   const [count, setCount] = useState(0);
//   const [filter, setFilter] = useState({ brandId: "", typeId: "" });

//   const [pagination, setPagination] = useState({ page: 1, limit: 10 });

//   const fetchProducts = async () => {
//     setLoading(true);
//     try {
//       const response = await fetch(
//         `${BASE_URL}/device?limit=${pagination.limit}&page=${pagination.page}&brandId=${filter.brandId}&typeId=${filter.typeId}`
//       );
//       const { count, rows } = (await response.json()) as {
//         count: number;
//         rows: TProduct[];
//       };
//       setCount(count);
//       setProducts(rows);
//     } catch (e) {
//       console.log("there is error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);
//   return {
//     products,
//     count,
//     loading,
//   };
// };
