import React, { useState, useEffect } from "react";
import axios from "axios";

export default function ProductAPI() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [result, setResult] = useState(0);
  const [callback, setCallback] = useState(false);
  const [loading, setLoading] = useState(false);

  // get products
  useEffect(() => {
    const getProducts = () => {
      setLoading(true)
      axios.get(
        `/api/products?limit=${
          page * 8
        }&${category}&${sort}&title[regex]=${search}`
      ).then((res) => {
        setLoading(false);
        setProducts(res.data.products);
        setResult(res.data.length);
      })
    };
    getProducts();
  }, [callback, category, sort, search, page]);

  // get categories
  useEffect(() => {
    const getCategories = async () => {
      const res = await axios.get("/api/category");
      setCategories(res.data);
    };
    getCategories();
  }, [callback]);

  return {
    products: [products, setProducts],
    categories: [categories, setCategories],
    callback: [callback, setCallback],
    category: [category, setCategory],
    sort: [sort, setSort],
    search: [search, setSearch],
    page: [page, setPage],
    result: [result, setResult],
    loading: [loading, setLoading],
  };
}
