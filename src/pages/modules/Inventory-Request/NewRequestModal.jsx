import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiX, FiChevronDown } from "react-icons/fi";
import { fetchDropdownData } from "../../../redux/slices/inventorySlice";

const priorities = ["low", "medium", "high"];

const NewRequestModal = ({ isOpen, onClose, onSubmit }) => {
  const dispatch = useDispatch();
  
  // 1. Pull dropdown data and loading status from Redux Store
  const { vendors, availableProducts: items, modalLoading: loading } = useSelector(
    (state) => state.inventory
  );

  const [formData, setFormData] = useState({
    vendor: "",
    item: "",
    quantityRequested: 1,
    reason: "",
    priority: "medium",
  });

  // 2. Fetch dropdown data when modal opens
  useEffect(() => {
    if (isOpen) {
      dispatch(fetchDropdownData());
    }
  }, [isOpen, dispatch]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "quantityRequested" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { vendor, item, quantityRequested, reason, priority } = formData;

    if (!vendor || !item || !quantityRequested || quantityRequested <= 0 || !reason) {
      alert("Please fill all required fields");
      return;
    }

    const payload = {
      vendor,
      item,
      quantityRequested: String(quantityRequested),
      reason,
      priority,
    };

    if (onSubmit) onSubmit(payload);

    // Reset local state
    setFormData({
      vendor: "",
      item: "",
      quantityRequested: 1,
      reason: "",
      priority: "medium",
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center font-poppins">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* Container matching your exact 747px width */}
      <div className="relative bg-white rounded-2xl shadow-xl w-[747px] max-w-[95%] p-6">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition"
          onClick={onClose}
          aria-label="Close"
        >
          <FiX size={20} />
        </button>

        <div className="flex flex-col gap-2 mb-4">
          <h3 className="text-[32px] leading-[48px] font-normal text-[#263138]">
            Create Inventory Request
          </h3>
          <p className="text-[18px] leading-[28px] text-[#606060]">
            Submit a request for spare parts, tools, or consumables.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-10">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#7EC1B1]"></div>
            <div className="ml-3 text-gray-500">Loading details...</div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {/* Vendor Selection */}
            <div className="flex flex-col gap-2">
              <label className="text-[24px] font-normal text-[#263138]">Vendor *</label>
              <div className="relative flex items-center bg-white border border-gray-400 rounded-[20px] px-4 py-3">
                <select
                  name="vendor"
                  value={formData.vendor}
                  onChange={handleChange}
                  className="w-full appearance-none bg-transparent outline-none text-[18px] text-[#606060]"
                >
                  <option value="">Select Vendor</option>
                  {vendors.map((v) => (
                    <option key={v._id || v.id} value={v._id || v.id}>
                      {v.name} - {v.phone}
                    </option>
                  ))}
                </select>
                <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-[#606060] pointer-events-none" />
              </div>
            </div>

            {/* Item + Quantity + Priority Row */}
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1 flex flex-col gap-2">
                <label className="text-[24px] font-normal text-[#263138]">Item *</label>
                <div className="relative flex items-center bg-white border border-gray-400 rounded-[20px] px-4 py-3">
                  <select
                    name="item"
                    value={formData.item}
                    onChange={handleChange}
                    className="w-full appearance-none bg-transparent outline-none text-[18px] text-[#606060]"
                  >
                    <option value="">Select Item</option>
                    {items.map((itm) => (
                      <option key={itm._id || itm.id} value={itm._id || itm.id}>
                        {itm.name} - {itm.brand} ({itm.category})
                      </option>
                    ))}
                  </select>
                  <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-[#606060] pointer-events-none" />
                </div>
              </div>

              <div className="w-full md:w-[150px] flex flex-col gap-2">
                <label className="text-[24px] font-normal text-[#263138]">Quantity *</label>
                <div className="bg-white border border-gray-400 rounded-[20px] px-4 py-3">
                  <input
                    type="number"
                    name="quantityRequested"
                    min={1}
                    value={formData.quantityRequested}
                    onChange={handleChange}
                    className="w-full outline-none text-[18px] text-[#606060]"
                  />
                </div>
              </div>

              <div className="w-full md:w-[150px] flex flex-col gap-2">
                <label className="text-[24px] font-normal text-[#263138]">Priority *</label>
                <div className="relative flex items-center bg-white border border-gray-400 rounded-[20px] px-4 py-3">
                  <select
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                    className="w-full appearance-none bg-transparent outline-none text-[18px] text-[#606060] capitalize"
                  >
                    {priorities.map((p) => (
                      <option key={p} value={p} className="capitalize">
                        {p}
                      </option>
                    ))}
                  </select>
                  <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-[#606060] pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Reason Textarea */}
            <div className="flex flex-col gap-2">
              <label className="text-[24px] font-normal text-[#263138]">Reason for Request *</label>
              <div className="bg-white border border-gray-400 rounded-[20px] p-4 h-[141px]">
                <textarea
                  name="reason"
                  value={formData.reason}
                  onChange={handleChange}
                  placeholder="Explain why you need this item..."
                  className="w-full h-full resize-none outline-none text-[18px] text-[#606060]"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 mt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-8 py-2 rounded-xl bg-[#7EC1B1] text-white font-semibold hover:bg-[#6fb3a3] transition shadow-md"
              >
                Submit Request
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default NewRequestModal;