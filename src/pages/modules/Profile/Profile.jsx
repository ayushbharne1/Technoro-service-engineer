import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile, changePassword, resetUpdateStatus } from "../../../redux/slices/profileSlice";
import { logout } from "../../../redux/slices/authSlice";
import logoImage from "../../../assets/user.png";
import Icon from "../../../assets/logo.png";
import Header2 from "../../../components/ServiceEngineer/header/Header2";
import { FiMapPin, FiPhone, FiLock } from "react-icons/fi";
import { toast } from "react-toastify";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data, loading, updateSuccess } = useSelector((state) => state.profile);

  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const [passForm, setPassForm] = useState({ old: "", new: "", confirm: "" });

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  // Handle successful password change
  useEffect(() => {
    if (updateSuccess) {
      setIsPasswordModalOpen(false);
      setIsSuccessModalOpen(true);
      dispatch(resetUpdateStatus());
    }
  }, [updateSuccess, dispatch]);

  const handleEditProfile = () => {
    navigate("/profile/edit-profile", { state: data });
  };

  const handleChangePasswordSubmit = () => {
    if (!passForm.old || !passForm.new || !passForm.confirm) {
      return toast.error("Please fill all fields");
    }
    if (passForm.new !== passForm.confirm) {
      return toast.error("New passwords do not match");
    }

    dispatch(changePassword({
      phone: data.phone,
      oldPassword: passForm.old,
      newPassword: passForm.new,
    }));
  };

  const handleLoginAgain = () => {
    dispatch(logout()); // Use Redux logout to clear everything
    navigate("/");
  };

  if (!data && loading) return <div className="p-10 text-center font-bold">Loading Profile...</div>;
  if (!data) return null;

  return (
    <div className="bg-gray-100 shadow-md rounded-lg p-6 sm:p-10 w-full mx-auto relative font-poppins">
       <div className="mb-8">
        <Header2 />
      </div>
      
      <div className="flex flex-col md:flex-row justify-between items-center gap-5 mt-6">
        <div className="flex items-center gap-5">
          <img src={logoImage} className="w-24 h-24 rounded-full border-4 border-gray-300 object-cover" alt="Profile" />
          <h2 className="text-2xl font-bold text-gray-900">{data.name}</h2>
        </div>
        <button onClick={handleEditProfile} className="border border-[#7EC1B1] text-[#7EC1B1] px-6 py-2 rounded-md hover:bg-[#7EC1B1] hover:text-white transition">
          Edit Profile
        </button>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Area Section */}
        <div>
          <div className="flex items-center gap-2 mb-1">
            <FiMapPin className="text-[#7EC1B1]" />
            <p className="text-gray-700 font-semibold">Assigned Area</p>
          </div>
          <p className="text-[#7EC1B1] mb-3 text-sm">{data.assignedArea}</p>
          <div className="w-full h-64 rounded-lg overflow-hidden border shadow-sm">
            <iframe title="map" width="100%" height="100%" frameBorder="0"
              src={`https://www.google.com/maps?q=${encodeURIComponent(data.assignedArea)}&output=embed`}
            />
          </div>
        </div>

        {/* Skills & Contact */}
        <div className="flex flex-col gap-6">
          <div>
            <p className="text-gray-700 font-semibold flex items-center gap-2">Skills</p>
            <p className="text-[#7EC1B1] text-sm mt-1">{data.skills?.join(", ") || "No skills listed"}</p>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1"><FiPhone className="text-[#7EC1B1]" /><p className="text-gray-700 font-semibold">Phone Number</p></div>
            <p className="text-[#7EC1B1] text-sm">{data.phone}</p>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1"><FiLock className="text-[#7EC1B1]" /><p className="text-gray-700 font-semibold">Password</p></div>
            <p className="text-[#7EC1B1] text-sm">********</p>
          </div>
        </div>
      </div>

      <div className="mt-10 flex justify-center">
        <button onClick={() => setIsPasswordModalOpen(true)} className="bg-[#7EC1B1] text-white px-8 py-3 rounded-md hover:bg-[#66b0a0]">
          Change Password
        </button>
      </div>

      {/* Change Password Modal */}
      {isPasswordModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-10 w-11/12 sm:w-[40rem] border">
            <h2 className="text-3xl font-bold mb-3 text-center">Change Password</h2>
            <div className="flex flex-col gap-4 mt-6">
              <input type="password" placeholder="Old Password" title="Old Password"
                className="bg-[#F5F5F5] border rounded-md px-4 py-3"
                value={passForm.old} onChange={(e) => setPassForm({...passForm, old: e.target.value})} 
              />
              <input type="password" placeholder="New Password" 
                className="bg-[#F5F5F5] border rounded-md px-4 py-3"
                value={passForm.new} onChange={(e) => setPassForm({...passForm, new: e.target.value})} 
              />
              <input type="password" placeholder="Confirm Password" 
                className="bg-[#F5F5F5] border rounded-md px-4 py-3"
                value={passForm.confirm} onChange={(e) => setPassForm({...passForm, confirm: e.target.value})} 
              />
            </div>
            <div className="flex justify-center mt-8">
              <button disabled={loading} onClick={handleChangePasswordSubmit} className="bg-[#7EC1B1] text-white px-8 py-3 rounded-md hover:bg-[#66b0a0]">
                {loading ? "Updating..." : "Change"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {isSuccessModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg w-11/12 sm:w-[450px] flex flex-col items-center justify-center p-10">
            <img src={Icon} alt="Success" className="w-32 mb-6" />
            <h2 className="text-3xl font-bold mb-3">CONGRATS!</h2>
            <p className="text-gray-600 mb-8">Password change successful</p>
            <button onClick={handleLoginAgain} className="bg-[#7EC1B1] text-white w-full py-3 rounded-md">
              Login Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;