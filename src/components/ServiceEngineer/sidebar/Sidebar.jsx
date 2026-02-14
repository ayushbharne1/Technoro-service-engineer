import logo from "../../../assets/Technoro.png";
import { sidebarItems } from "../../../utils/constant";
import { NavLink, useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import Swal from "sweetalert2"; 

const Sidebar = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to Logout?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#7EC1B1",
      cancelButtonColor: "#6B7280",
      confirmButtonText: "Yes, Logout!",
      cancelButtonText: "No, stay here"
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/");
      }
    });
  };

  return (
    <div className="flex flex-col h-screen bg-white shadow-lg border-r-2 border-gray-400 w-[270px] flex-shrink-0 overflow-y-auto hide-scrollbar">
      <div className="ml-2 border-b-2 border-gray-400 flex justify-between items-center pr-4">
        <img className="w-[136px] h-[72px] object-cover" src={logo} alt="logo" />
        
        {/* Fixed: Icon is now INSIDE the button */}
        <button 
          onClick={toggleSidebar} 
          className="md:hidden p-2 text-gray-500 hover:text-red-500 cursor-pointer"
        >
          <IoClose size={28} />
        </button>
      </div>

      {/* <div className="flex flex-col md:mx-4 px-2 mt-4">
        {sidebarItems.map((group) => (
          <div key={group.groupName} className="mb-2">
            <h1 className="text-[16px] font-semibold mb-2">{group.groupName}</h1>
            {group.groupItems.map(({ id, name, icon, path }) => {
              const isLogout = name.toLowerCase() === "logout";
              return (
                <NavLink
                  key={id}
                  to={isLogout ? "/" : path}
                  onClick={isLogout ? () => handleLogout("/") : undefined}
                  className={({ isActive }) =>
                    `flex items-center text-[16px] font-semibold space-x-2 p-2 rounded-[8px] mb-2 transition-colors ${
                      isActive ? "bg-[#7EC1B1] text-white" : "text-[#7EC1B1] hover:bg-[#7EC1B1] hover:text-white"
                    }`
                  }
                >
                  <span>{icon}</span>
                  <span>{name}</span>
                </NavLink>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar; */}
 <div className="flex flex-col md:mx-4 px-2 mt-4">
        {sidebarItems.map((group) => (
          <div key={group.groupName} className="mb-2">
            <h1 className="text-[16px] font-semibold mb-2">{group.groupName}</h1>
            {group.groupItems.map(({ id, name, icon, path }) => {
              const isLogout = name.toLowerCase() === "logout";
              return (
                <div key={id} className="mb-2">
                  {isLogout ? (
                    // Logout button with custom click handler
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center text-[16px] font-semibold space-x-2 p-2 rounded-[8px] text-[#7EC1B1] hover:bg-[#c05252] hover:text-white transition-colors text-left"
                    >
                      <span>{icon}</span>
                      <span>{name}</span>
                    </button>
                  ) : (
                    // Regular NavLink for other items
                    <NavLink
                      to={path}
                      className={({ isActive }) =>
                        `flex items-center text-[16px] font-semibold space-x-2 p-2 rounded-[8px] transition-colors ${
                          isActive ? "bg-[#7EC1B1] text-white" : "text-[#7EC1B1] hover:bg-[#7EC1B1] hover:text-white"
                        }`
                      }
                    >
                      <span>{icon}</span>
                      <span>{name}</span>
                    </NavLink>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;