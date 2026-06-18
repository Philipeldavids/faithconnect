import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

import { navigation } from "../../lib/constants/navigation";

export default function Sidebar() {
  const LogoUrl = "https://res.cloudinary.com/dck7rspdt/image/upload/v1781781089/faithconnect1_hr1d9r.png";
  const location = useLocation();

  const [expanded, setExpanded] =
    useState<string[]>([]);

 const user = JSON.parse(
  localStorage.getItem("user") || "null"
);

    const roles: string[] =
  user?.roles ?? [];

  const toggleMenu = (title: string) => {
    if (expanded.includes(title)) {
      setExpanded(
        expanded.filter((x) => x !== title)
      );
      return;
    }

    setExpanded([...expanded, title]);
  };

  return (
    <aside className="w-72 bg-white border-r h-screen overflow-auto">
      <div className="h-16 flex items-center px-6 border-b">
        <h2 className="text-xl font-bold">
         <img src={LogoUrl} alt="GHConnect"></img>
        </h2>
      </div>

      <nav className="p-4">
        {navigation.filter((item) =>
  item.roles.some((r) =>
    roles.includes(r)
  )
)
          .map((item) => (
            <div key={item.title}>
              {!item.children ? (
                <Link
                  to={item.path!}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-1
                  ${
                    location.pathname === item.path
                      ? "bg-blue-50 text-blue-600"
                      : ""
                  }`}
                >
                  <item.icon size={18} />
                  {item.title}
                </Link>
              ) : (
                <>
                  <button
                    onClick={() =>
                      toggleMenu(item.title)
                    }
                    className="w-full flex justify-between items-center px-4 py-3"
                  >
                    <div className="flex items-center gap-3">
                      <item.icon size={18} />
                      {item.title}
                    </div>

                    <ChevronDown />
                  </button>

                  {expanded.includes(
                    item.title
                  ) && (
                    <div className="pl-10">
                      {item.children.map(
                        (child) => (
                          <Link
                            key={child.title}
                            to={child.path!}
                            className={`block py-2
                            ${
                              location.pathname ===
                              child.path
                                ? "text-blue-600"
                                : ""
                            }`}
                          >
                            {child.title}
                          </Link>
                        )
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
      </nav>
    </aside>
  );
}