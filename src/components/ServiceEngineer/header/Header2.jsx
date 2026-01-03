
import { Link, useLocation } from "react-router-dom";
import { MdDashboard } from "react-icons/md";

const Header2 = () => {
  const location = useLocation();

  // Define your route labels

const routeLabels = {
  "/dashboard": "Dashboard",

  "/profile": "Profile",
  "/profile/edit-profile": "Edit Profile",

  // PRODUCT
  "/product": "Products Information",
  "/product/product-details": "Product Details",

  // LEAD MANAGEMENT
  "/lead-management": "My Leads",
  "/lead-management/:leadId": "Lead Details",

  // HELP & SUPPORT
  "/help-support": "Help & Support",
  "/help-support/newchat": "Start New Chat",
  "/help-support/newchat/chat": "Chat",

  "/notifications": "Notifications",

   // Ongoing leads
  "/ongoing-leads": "Ongoing Leads",
  "/ongoing-leads/view/:leadId": "Ongoing Lead Details",
};

  

  // Helper to match dynamic routes
  const getLabel = (path) => {
    if (routeLabels[path]) return routeLabels[path];

    for (const route in routeLabels) {
      if (route.includes(":")) {
        const regex = new RegExp("^" + route.replace(/:\w+/g, "[^/]+") + "$");
        if (regex.test(path)) {
          return routeLabels[route];
        }
      }
    }

    // Fallback: capitalize first letter of last path part
    const lastPart = path.split("/").pop();
    return lastPart.charAt(0).toUpperCase() + lastPart.slice(1);
  };

  const pathParts = location.pathname.split("/").filter(Boolean);

  const rawBreadcrumbs = pathParts.map((part, index) => {
    const path = "/" + pathParts.slice(0, index + 1).join("/");
    let label = getLabel(path);
    return { path, label };
  });

  const seen = new Set();
  const breadcrumbs = [];

  for (const crumb of rawBreadcrumbs) {
    if (!crumb.label) continue;
    const label = crumb.label.trim();
    if (/^\d+$/.test(label)) continue;
    if (seen.has(label.toLowerCase())) continue;
    seen.add(label.toLowerCase());
    breadcrumbs.push({ ...crumb, label });
  }

  // Default heading is last breadcrumb label
  let heading =
    breadcrumbs.length > 0 ? breadcrumbs[breadcrumbs.length - 1].label : "Page";

  // Manufacturer special case
  let displayBreadcrumbs = breadcrumbs;
  if (location.pathname === "/manufacturer" || location.pathname === "/manufacturer/") {
    displayBreadcrumbs = [{ path: "/manufacturer", label: "Manufacturer" }];
    heading = "Manufacturer List";
  }

  return (
    <div className="w-full flex flex-col pt-2 pb-3 border-b border-gray-200">
      {/* Breadcrumb row */}
      <div className="flex items-center space-x-2">
        <MdDashboard className="w-6 h-6 text-gray-600 flex-shrink-0" />
        <span className="flex items-center">
          <Link to="/dashboard" className="sr-only">
            Dashboard
          </Link>
          <span className="mx-2 text-gray-400">&gt;</span>
        </span>

        {displayBreadcrumbs.map(
          (crumb, idx) =>
            crumb.label &&
            crumb.label.toLowerCase() !== "dashboard" &&
            (idx < displayBreadcrumbs.length - 1 ? (
              <span key={crumb.path} className="flex items-center">
                <Link to={crumb.path} className="font-medium hover:underline">
                  {crumb.label}
                </Link>
                <span className="mx-2 text-gray-400">&gt;</span>
              </span>
            ) : (
              <span key={crumb.path} className="text-[#0088FF] font-medium font-[16px]">
                {crumb.label}
              </span>
            ))
        )}
      </div>

      {/* Heading */}
      <h2 className="mt-2 text-[20px] font-semibold text-black">{heading}</h2>
    </div>
  );
};

export default Header2;

