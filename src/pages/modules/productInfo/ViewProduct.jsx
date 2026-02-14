import React, { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductById, clearSelectedProduct } from "../../../redux/slices/productSlice";
import Header2 from "../../../components/ServiceEngineer/header/Header2";
import Loader from "../../../components/Loader";
const ViewProduct = () => {
  const { productId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Pull data and status from Redux
  const { selectedProduct: product, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    // If we don't have product in location state (e.g. refresh), fetch from API
    if (!location.state?.product && productId) {
      dispatch(fetchProductById(productId));
    } else if (location.state?.product) {
      // Optional: If data exists in state, you can sync it to Redux if needed
      // or just use the local state. For consistency, we'll fetch details.
      dispatch(fetchProductById(productId));
    }

    return () => {
      dispatch(clearSelectedProduct()); // Cleanup on unmount
    };
  }, [productId, dispatch, location.state]);

  return (
    <div className="bg-gray-100 min-h-screen font-poppins">
      {/* Header Section */}
      <div className="px-6 pt-4 bg-white">
        <Header2 />
      </div>

      {/* Main Content */}
      <div className="mt-4">
        {loading ? (
          /* 2. Replace the old pulse text with your custom Loader */
          <div className="mt-20">
            <Loader 
              message="Fetching product details..." 
              size={250} 
            />
          </div>
        ) : error ? (
          <div className="bg-white rounded-xl shadow-md p-8 text-center max-w-2xl mx-auto">
            <h2 className="text-xl font-semibold text-red-500 mb-3">Error</h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <button
              onClick={() => navigate(-1)}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              Go Back
            </button>
          </div>
        ) : !product ? (
          <div className="bg-white rounded-xl shadow-md p-8 text-center max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold mb-3">Product Not Found</h2>
            <p className="text-gray-600 mb-4">Please go back and select a valid product.</p>
            <button
              onClick={() => navigate(-1)}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Go Back
            </button>
          </div>
        ) : (
          /* ✅ Main UI with your exact styling */
          <div className="bg-white p-6">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Product Image Section */}
              <div className="lg:w-1/3">
                <div className="border border-gray-200 shadow-md rounded-lg p-6 bg-white">
                  <img
                    src={product.images?.[0] || product.image || "/Image1.png"}
                    alt={product.name || "Product"}
                    className="w-full h-auto object-contain max-h-[400px]"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/300x300?text=No+Image";
                    }}
                  />
                </div>
              </div>

              {/* Product Details Section */}
              <div className="lg:w-2/3">
                <h3 className="text-xl font-medium text-gray-900 mb-3 leading-relaxed">
                  {product.name || "Unknown Product"}
                </h3>

                <div className="flex items-center gap-3 mb-6">
                  <span className="text-[#7EC1B1] text-xl font-medium">
                    ₹{product.discountedPrice || product.price || "0.00"}
                  </span>

                  {/* Rating Style Restored */}
                  {product.rating != null ? (
                    <div className="text-sm bg-[#DFFFBF] text-black px-2 py-1 rounded-md font-semibold">
                      {product.rating} ★
                    </div>
                  ) : (
                    <div className="text-xs text-gray-400">No Rating</div>
                  )}

                  <span className="text-[#263138] text-base flex items-center">
                    • Warranty:
                    <span className="text-[#3A953A] ml-1">
                      {product.warrantyPeriod || product.warranty || "NA"}
                    </span>
                  </span>
                </div>

                <div className="mb-4">
                  <h4 className="text-base font-semibold text-gray-900 mb-3">
                    Description
                  </h4>
                  <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
                    {product.description || "No description available for this product."}
                  </p>
                </div>

                <button
                  onClick={() => navigate(-1)}
                  className="mt-6 px-8 py-3 bg-[#7EC1B1] text-white rounded-xl font-medium hover:bg-[#6ab1a0] transition shadow-md"
                >
                  Back to Catalog
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewProduct;