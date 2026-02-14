import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, setProductFilters } from "../../../redux/slices/productSlice";
import Header2 from "../../../components/ServiceEngineer/header/Header2";
import Loader from "../../../components/Loader";

const Product = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { productList, categories, loading, pagination, currentFilters } = useSelector((state) => state.products);
  const [localSearch, setLocalSearch] = useState(currentFilters.search);
  const searchDebounceRef = useRef(null);

  useEffect(() => {
    dispatch(fetchProducts(currentFilters));
  }, [currentFilters, dispatch]);

  useEffect(() => {
    if (searchDebounceRef.current) clearTimeout(searchDebounceRef.current);
    searchDebounceRef.current = setTimeout(() => {
      dispatch(setProductFilters({ search: localSearch, page: 1 }));
    }, 500);
    return () => clearTimeout(searchDebounceRef.current);
  }, [localSearch, dispatch]);

  const handleCategoryClick = (cat) => {
    dispatch(setProductFilters({ category: cat === "All Products" ? "" : cat, page: 1 }));
  };

  const goToPage = (p) => {
    dispatch(setProductFilters({ page: p }));
    window.scrollTo({ top: 200, behavior: "smooth" });
  };

  return (
    <div className="bg-white p-6 rounded-lg sm:p-8 font-sans min-h-screen">
      <div className="max-w-full mx-auto">
        <Header2 />

        {/* Categories Tab Bar */}
        <div className="mb-6">
          <div className="flex w-1/2 bg-[#FFFF] items-center space-x-1 p-2 rounded-[20px] overflow-x-auto mb-4">
            {categories.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => handleCategoryClick(cat)}
                className={`px-6 py-3 text-sm font-medium flex items-center space-x-1.5 transition-colors whitespace-nowrap rounded-[10px] min-w-max ${
                  (currentFilters.category === cat || (cat === "All Products" && !currentFilters.category))
                    ? "bg-white text-black shadow-sm border border-gray-200"
                    : "bg-transparent text-[#606060] hover:bg-gray-200"
                }`}
              >
                <span>{cat}</span>
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="flex justify-center">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search Product by name or Model..."
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                className="w-full p-3 pl-10 border border-gray-300 rounded-[100px] focus:outline-none focus:ring-2 focus:ring-[#7EC1B1] text-sm"
              />
              <svg className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="flex items-center justify-center ml-80 min-h-[400px] w-full">
            <Loader message="Browsing catalog..." />
          </div>
        ) : (
            productList.map((product) => (
              <div key={product.id} className="bg-white p-4 rounded-lg shadow-md transition-transform h-full flex flex-col hover:shadow-lg border border-gray-100">
                <div className="bg-white rounded-md p-4 flex items-center justify-center w-full h-40 mb-4">
                  <img src={product.image} alt={product.name} className="max-h-[120px] max-w-full object-contain" />
                </div>

                <div className="flex-1 flex flex-col justify-between w-full">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{product.name}</h2>
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">{product.category}</p>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-3">{product.description}</p>
                  </div>

                  <div className="mt-4">
                    {/* Price and Rating Row - Corrected Rating Style */}
                    <div className="flex items-center justify-between w-full mb-3">
                      <div className="text-lg font-bold text-gray-900">{product.price}</div>
                      {product.rating !== null ? (
                        <div className="text-sm bg-[#DFFFBF] text-black px-2 py-1 rounded-md font-semibold">
                          {product.rating} ★
                        </div>
                      ) : (
                        <div className="text-xs text-gray-400">No Rating</div>
                      )}
                    </div>

                    {/* Best Offer and Button Section - Corrected Best Offer Style */}
                    <div className="space-y-1">
                      <div className="text-sm text-[#2F9A73] font-semibold">
                        Best offer
                      </div>
                      <button
                        className="w-full bg-[#7EC1B1] text-white px-3 py-1.5 rounded-md transition hover:bg-[#6bb0a0]"
                        onClick={() => navigate(`/product/product-details/${product.id}`, { state: { product: product.fullData } })}
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

        {/* Pagination Section */}
        {!loading && pagination.total > 0 && (
          <div className="flex flex-col md:flex-row justify-between items-center mt-8 gap-4 flex-wrap text-gray-700 text-sm font-semibold">
            <span>
              Showing {Math.min((pagination.page - 1) * pagination.limit + 1, pagination.total)} to {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} entries
            </span>
            <div className="flex flex-wrap gap-2 justify-center">
              <button onClick={() => goToPage(pagination.page - 1)} disabled={pagination.page === 1} className="px-4 py-2 border border-[#7EC1B1] text-[#7EC1B1] rounded-lg disabled:opacity-50">Previous</button>
              {Array.from({ length: pagination.pages }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => goToPage(idx + 1)}
                  className={`p-2 border rounded-lg border-[#7EC1B1] w-10 h-10 flex items-center justify-center transition-colors ${
                    pagination.page === idx + 1 ? "bg-[#7EC1B1] text-white" : "text-[#7EC1B1] hover:bg-teal-50"
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
              <button onClick={() => goToPage(pagination.page + 1)} disabled={pagination.page === pagination.pages} className="px-4 py-2 border border-[#7EC1B1] text-[#7EC1B1] rounded-lg disabled:opacity-50">Next</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Product;