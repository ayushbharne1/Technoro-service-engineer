import React, { useState, useEffect } from "react";
import { FiX, FiChevronDown } from "react-icons/fi";
import { getAvailableItems, getAvailableVendors } from "../../../services/api";

const priorities = ["low", "medium", "high"];

const NewRequestModal = ({ isOpen, onClose, onSubmit }) => {
  const [vendor, setVendor] = useState("");
  const [item, setItem] = useState("");
  const [quantityRequested, setQuantityRequested] = useState(1);
  const [reason, setReason] = useState("");
  const [priority, setPriority] = useState("medium");

  const [vendors, setVendors] = useState([]);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch vendors and items when modal opens
  useEffect(() => {
    if (isOpen) {
      const fetchData = async () => {
        setLoading(true);
        try {
          const [vendorsData, itemsData] = await Promise.all([
            getAvailableVendors(),
            getAvailableItems(),
          ]);
          setVendors(Array.isArray(vendorsData) ? vendorsData : []);
          setItems(Array.isArray(itemsData) ? itemsData : []);
        } catch (error) {
          console.error("Error fetching dropdown data:", error);

          // Check if it's vendors endpoint (404) - backend doesn't have this yet
          if (error.message.includes("vendors")) {
            alert(
              "Vendor list endpoint is not available.\n\n" +
                "Missing: GET /api/engineer/vendor or similar\n\n" +
                "Please contact backend team to add vendor list endpoint."
            );
          } else {
            alert("Failed to load vendors and items. Please try again.");
          }
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !vendor ||
      !item ||
      !quantityRequested ||
      quantityRequested <= 0 ||
      !reason
    ) {
      alert("Please fill all required fields");
      return;
    }

    // Payload structure matching the Postman screenshot
    // Note: Don't send engineer ID - backend will extract it from bearer token
    const payload = {
      vendor,
      item,
      quantityRequested: String(quantityRequested),
      reason,
      priority,
    };

    if (onSubmit) onSubmit(payload);

    // Reset form
    setVendor("");
    setItem("");
    setQuantityRequested(1);
    setReason("");
    setPriority("medium");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div className="relative bg-white rounded-2xl shadow-xl w-[747px] max-w-[95%] p-6">
        <button
          className="absolute top-4 right-4 text-gray-500"
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
            <div className="text-gray-500">Loading...</div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {/* Vendor */}
            <div className="flex flex-col gap-2">
              <label className="text-[24px] font-normal text-[#263138]">
                Vendor *
              </label>
              <div className="relative flex items-center bg-white border border-gray-400 rounded-[20px] px-4 py-3">
                <select
                  value={vendor}
                  onChange={(e) => setVendor(e.target.value)}
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

            {/* Item name + Quantity + Priority row */}
            <div className="flex gap-6">
              <div className="flex-1 flex flex-col gap-2">
                <label className="text-[24px] font-normal text-[#263138]">
                  Item *
                </label>
                <div className="relative flex items-center bg-white border border-gray-400 rounded-[20px] px-4 py-3">
                  <select
                    value={item}
                    onChange={(e) => setItem(e.target.value)}
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

              <div className="w-[150px] flex flex-col gap-2">
                <label className="text-[24px] font-normal text-[#263138]">
                  Quantity *
                </label>
                <div className="bg-white border border-gray-400 rounded-[20px] px-4 py-3">
                  <input
                    type="number"
                    min={1}
                    value={quantityRequested}
                    onChange={(e) =>
                      setQuantityRequested(Number(e.target.value))
                    }
                    className="w-full outline-none text-[18px] text-[#606060]"
                  />
                </div>
              </div>

              <div className="w-[150px] flex flex-col gap-2">
                <label className="text-[24px] font-normal text-[#263138]">
                  Priority *
                </label>
                <div className="relative flex items-center bg-white border border-gray-400 rounded-[20px] px-4 py-3">
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
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

            {/* Reason */}
            <div className="flex flex-col gap-2">
              <label className="text-[24px] font-normal text-[#263138]">
                Reason for Request *
              </label>
              <div className="bg-white border border-gray-400 rounded-[20px] p-4 h-[141px]">
                <textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Explain why you need this item..."
                  className="w-full h-full resize-none outline-none text-[18px] text-[#606060]"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-md bg-[#7EC1B1] text-white hover:bg-[#6fb3a3]"
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
