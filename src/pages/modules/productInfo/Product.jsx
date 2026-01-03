


import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Header2 from "../../../components/ServiceEngineer/header/Header2";

const Product = () => {
  const navigate = useNavigate();
  const API_BASE = import.meta.env.VITE_API_URL;

  // UI / Pagination state
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(6);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("All Products");

  // Data
  const [productList, setProductList] = useState([]);
  const [categories, setCategories] = useState(["All Products"]);
  const [brands, setBrands] = useState(["All Brands"]);
  const [loading, setLoading] = useState(false);

  // server pagination meta
  const [totalEntries, setTotalEntries] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  // Filters that are sent to server (applied)
  const [filters, setFilters] = useState({
    category: "",
    brand: "",
    minPrice: "",
    maxPrice: "",
    isActive: "",
    isFeatured: "",
    search: "",
    page: 1,
    limit: rowsPerPage,
    sortBy: "",
    sortOrder: "",
  });

  // debounce refs
  const searchDebounceRef = useRef(null);

  // build query string for server call
  const buildQuery = (f) => {
    const params = new URLSearchParams();

    if (f.category) params.append("category", f.category);
    if (f.brand) params.append("brand", f.brand);
    if (f.minPrice) params.append("minPrice", f.minPrice);
    if (f.maxPrice) params.append("maxPrice", f.maxPrice);
    if (f.isActive) params.append("isActive", f.isActive);
    if (f.isFeatured) params.append("isFeatured", f.isFeatured);
    if (f.search) params.append("name", f.search);
    if (f.page) params.append("page", f.page);
    if (f.limit) params.append("limit", f.limit);
    if (f.sortBy) params.append("sortBy", f.sortBy);
    if (f.sortOrder) params.append("sortOrder", f.sortOrder);

    return params.toString();
  };

  // Parse search input to detect brand keywords
  const parseSearchInput = (searchText) => {
    const searchTerms = { name: "", brand: "" };

    if (!searchText.trim()) return searchTerms;

    const lowerSearch = searchText.toLowerCase().trim();

    const brandKeywords = {
      aquaguard: "Aquaguard",
      kent: "Kent",
      samsung: "Samsung",
      crompton: "Crompton",
      universal: "Universal",
      bluemount: "BlueMount",
      kangen: "Kangen",
    };

    let remainingSearch = lowerSearch;
    for (const [keyword, brand] of Object.entries(brandKeywords)) {
      if (lowerSearch.includes(keyword)) {
        searchTerms.brand = brand;
        remainingSearch = remainingSearch.replace(keyword, "").trim();
        break;
      }
    }

    searchTerms.name = remainingSearch;
    return searchTerms;
  };

  // Fetch products (also extracts categories + brands)
  const fetchProducts = async (useFilters = filters) => {
    try {
      setLoading(true);

      const effectiveFilters = {
        ...useFilters,
        page: Number(useFilters.page) || 1,
        limit: Number(useFilters.limit) || rowsPerPage,
      };

      const qs = buildQuery(effectiveFilters);
      const url = `${API_BASE}/api/engineer/product?${qs}`;
      console.log("Fetching products from:", url);

        const token = localStorage.getItem("engineerToken");


const res = await fetch(url, {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});

      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

      const json = await res.json();
      const list = Array.isArray(json?.data) ? json.data : [];

      const mapped = list.map((item) => ({
        id: item._id,
        name: item.name || "Unknown Product",
        description: item.description || "No description available",
        price:
          item.discountedPrice != null
            ? `₹${item.discountedPrice}`
            : item.price != null
            ? `₹${item.price}`
            : "₹0",
        priceValue: item.discountedPrice ?? item.price ?? 0,
        rating: item.rating ?? null,
        image:
          item.images && item.images.length
            ? item.images[0]
            : "/Image1.png",
        category: item.category || "Other",
        brand: item.brand || "",
        status: item.status || "",
        fullData: item,
      }));

      setProductList(mapped);

      // derive categories & brands dynamically
      const derivedCategories = [
        "All Products",
        ...Array.from(
          new Set(mapped.map((p) => (p.category ? p.category.trim() : "")).filter(Boolean))
        ),
      ];
      setCategories(derivedCategories);

      const derivedBrands = [
        "All Brands",
        ...Array.from(
          new Set(mapped.map((p) => (p.brand ? p.brand.trim() : "")).filter(Boolean))
        ),
      ];
      setBrands(derivedBrands);

      // pagination
      const pagination = json?.pagination;
      if (pagination) {
        setTotalEntries(Number(pagination.total ?? mapped.length));
        setTotalPages(
          Number(
            pagination.pages ??
              Math.max(
                1,
                Math.ceil(
                  (pagination.total ?? mapped.length) /
                    (pagination.limit ?? rowsPerPage)
                )
              )
          )
        );
        setPage(Number(pagination.page ?? effectiveFilters.page));
        setRowsPerPage(Number(pagination.limit ?? effectiveFilters.limit));
      } else {
        setTotalEntries(mapped.length);
        setTotalPages(
          Math.max(1, Math.ceil(mapped.length / effectiveFilters.limit))
        );
        setPage(effectiveFilters.page);
      }
    } catch (err) {
      console.error("Error fetching products:", err);
      setProductList([]);
      setTotalEntries(0);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  // On mount - initial fetch
  useEffect(() => {
    fetchProducts({ ...filters, page: 1, limit: rowsPerPage });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Fetch again when filters change
  useEffect(() => {
    fetchProducts(filters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  // Debounced search (500ms)
  useEffect(() => {
    if (searchDebounceRef.current) clearTimeout(searchDebounceRef.current);
    searchDebounceRef.current = setTimeout(() => {
      const parsedSearch = parseSearchInput(search);
      setFilters((prev) => ({
        ...prev,
        search: parsedSearch.name || "",
        brand: parsedSearch.brand || "",
        page: 1,
      }));
    }, 500);

    return () => {
      if (searchDebounceRef.current) clearTimeout(searchDebounceRef.current);
    };
  }, [search]);

  // category click
  const handleCategoryClick = (cat) => {
    setActiveTab(cat);
    const v = cat === "All Products" ? "" : cat;
    setFilters((prev) => ({ ...prev, category: v, page: 1 }));
  };

  // pagination
  const goToPage = (p) => {
    const pageNum = Math.max(1, Math.min(p, totalPages));
    setFilters((prev) => ({ ...prev, page: pageNum }));
    setPage(pageNum);
    window.scrollTo({ top: 200, behavior: "smooth" });
  };

  return (
    <div className="bg-white p-3 sm:p-8 font-sans min-h-screen">
      <div className="max-w-full mx-auto">
        <Header2 />

        {/* Categories */}
        <div className="mb-6">
          <div className="flex w-1/2 bg-[#F5F5F5] items-center space-x-1 p-2 rounded-[20px] overflow-x-auto mb-4">
            {categories.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => handleCategoryClick(cat)}
                className={`px-6 py-3 text-sm font-medium flex items-center space-x-1.5 transition-colors whitespace-nowrap rounded-[10px] min-w-max ${
                  activeTab === cat
                    ? "bg-white text-black shadow-sm border border-gray-200"
                    : "bg-transparent text-[#606060] hover:bg-gray-200"
                }`}
              >
                <span>{cat}</span>
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="flex justify-center">
            <div className="relative w-full ">
              <input
                type="text"
                placeholder="Search Product by name or Model..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full p-3 pl-10 border border-gray-300 rounded-[100px] focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
              <svg
                className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              Array.from({ length: rowsPerPage }).map((_, i) => (
                <div
                  key={i}
                  className="bg-white p-4 rounded-lg shadow-md h-64 animate-pulse"
                />
              ))
            ) : (
              productList.map((product) => (
                <div
                  key={product.id}
                  className="bg-white p-4 rounded-lg shadow-md transition-transform h-full flex flex-col hover:shadow-lg"
                >
                  <div className="bg-white rounded-md p-4 flex items-center justify-center w-full h-40 mb-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="max-h-[120px] max-w-full object-contain"
                      onError={(e) => {
                        e.target.src = "/Image1.png";
                      }}
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between w-full">
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                        {product.name}
                      </h2>
                      <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                        {product.category}
                      </p>
                      <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                        {product.description}
                      </p>
                    </div>

                    <div className="mt-4">
                      <div className="flex items-center justify-between w-full mb-3">
                        <div className="text-lg font-bold text-gray-900">
                          {product.price}
                        </div>

                        {product.rating !== null ? (
                          <div className="text-sm bg-[#DFFFBF] text-black px-2 py-1 rounded-md font-semibold">
                            {product.rating} ★
                          </div>
                        ) : (
                          <div className="text-xs text-gray-400">
                            No Rating
                          </div>
                        )}
                      </div>

                      <div className="space-y-1">
                        <div className="text-sm text-[#2F9A73] font-semibold">
                          Best offer
                        </div>
                        <button
                          className="bg-[#7EC1B1] text-white px-3 py-1.5 rounded-md transition hover:bg-[#6bb0a0]"
                          onClick={() =>
                            navigate(
                              `/product/product-details/${product.id}`,
                              {
                                state: { product: product.fullData },
                              }
                            )
                          }
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* No products */}
          {!loading && productList.length === 0 && (
            <div className="text-center text-gray-500 my-10">
              <h2 className="text-2xl font-semibold">No Products Found</h2>
              <p>Try adjusting your search or select a different category.</p>
            </div>
          )}

          {/* Pagination */}
          {totalEntries > 0 && (
            <div className="flex flex-col md:flex-row justify-between items-center mt-8 gap-4 flex-wrap text-gray-700 text-sm font-semibold">
              <span>
                Showing{" "}
                {Math.min((filters.page - 1) * filters.limit + 1, totalEntries)}{" "}
                to {Math.min(filters.page * filters.limit, totalEntries)} of{" "}
                {totalEntries} entries
              </span>

              <div className="flex flex-wrap gap-2 text-teal-600 justify-center">
                <button
                  onClick={() => goToPage(filters.page - 1)}
                  disabled={filters.page === 1}
                  className="px-4 py-2 border border-teal-500 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-teal-50"
                >
                  Previous
                </button>

                {Array.from({ length: totalPages }).map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => goToPage(idx + 1)}
                    className={`p-2 border rounded-lg border-teal-500 w-10 h-10 flex items-center justify-center transition-colors ${
                      filters.page === idx + 1
                        ? "bg-teal-500 text-white"
                        : "hover:bg-teal-50"
                    }`}
                  >
                    {idx + 1}
                  </button>
                ))}

                <button
                  onClick={() => goToPage(filters.page + 1)}
                  disabled={filters.page === totalPages}
                  className="px-4 py-2 border border-teal-500 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-teal-50"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Product;
