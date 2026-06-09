import {
  Bell,
  User,
  LogOut,
  ChevronDown,
  LayoutDashboard,
} from "lucide-react";

import {
  useNavigate,
  useLocation,
} from "react-router-dom";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  useAuthStore,
} from "../../lib/store/authStore";

export default function Header() {
  const navigate =
    useNavigate();
 const LogoUrl = "https://res.cloudinary.com/dck7rspdt/image/upload/v1781008293/GhConnectLogo_n8yk7q.png";
  const location =
    useLocation();

  const {
    user,
    roles,
    logout,
    hasRole,
  } = useAuthStore();

  const [open, setOpen] =
    useState(false);

  const menuRef =
    useRef<HTMLDivElement>(
      null
    );

  useEffect(() => {
    const handleClick =
      (e: MouseEvent) => {
        if (
          menuRef.current &&
          !menuRef.current.contains(
            e.target as Node
          )
        ) {
          setOpen(false);
        }
      };

    document.addEventListener(
      "mousedown",
      handleClick
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClick
      );
  }, []);

  const handleLogout =
    () => {
      logout();

      navigate("/login");
    };

  const fullName =
    user?.fullName ||
    user?.name ||
    "User";

  const initials =
    fullName
      .split(" ")
      .map(
        (x: string) =>
          x[0]
      )
      .join("")
      .substring(0, 2)
      .toUpperCase();

  const isPortal =
    location.pathname.startsWith(
      "/portal"
    );

  return (
    <header
      className="
        h-16
        bg-white
        border-b
        px-6
        flex
        items-center
        justify-between
      "
    >
      {/* Logo */}

      <div
        className="
          flex
          items-center
          gap-3
          cursor-pointer
        "
        onClick={() =>
          navigate("/")
        }
      >
        <img
          src={LogoUrl}
          alt="GHConnect"
          className="h-10"
        />

        <div>
          <h2
            className="
              font-semibold
              text-lg
            "
          >
            GHConnect
          </h2>
        </div>
      </div>

      {/* Right */}

      <div
        className="
          flex
          items-center
          gap-5
        "
      >
        {/* Notification Bell */}

        <button
          className="
            relative
            hover:text-blue-600
          "
        >
          <Bell size={20} />

          <span
            className="
              absolute
              -top-2
              -right-2
              bg-red-500
              text-white
              text-[10px]
              rounded-full
              h-4
              w-4
              flex
              items-center
              justify-center
            "
          >
            0
          </span>
        </button>

        {/* User Menu */}

        <div
          ref={menuRef}
          className="relative"
        >
          <button
            onClick={() =>
              setOpen(
                !open
              )
            }
            className="
              flex
              items-center
              gap-3
            "
          >
            <div
              className="
                h-10
                w-10
                rounded-full
                bg-blue-600
                text-white
                flex
                items-center
                justify-center
                font-semibold
              "
            >
              {initials}
            </div>

            <div
              className="
                text-left
              "
            >
              <p
                className="
                  text-sm
                  font-medium
                "
              >
                {fullName}
              </p>

              <p
                className="
                  text-xs
                  text-gray-500
                "
              >
                {roles.join(
                  ", "
                )}
              </p>
            </div>

            <ChevronDown
              size={16}
            />
          </button>

          {open && (
            <div
              className="
                absolute
                right-0
                mt-3
                w-60
                bg-white
                border
                rounded-xl
                shadow-lg
                z-50
              "
            >
              {/* Profile */}

              <button
                className="
                  w-full
                  px-4
                  py-3
                  flex
                  items-center
                  gap-3
                  hover:bg-gray-50
                "
                onClick={() => {
                  setOpen(
                    false
                  );

                  if (
                    isPortal
                  ) {
                    navigate(
                      "/portal/profile"
                    );
                  } else {
                    navigate(
                      "/profile"
                    );
                  }
                }}
              >
                <User size={18} />

                My Profile
              </button>

              {/* Switch Dashboard */}

              {hasRole(
                "Member"
              ) && (
                <button
                  className="
                    w-full
                    px-4
                    py-3
                    flex
                    items-center
                    gap-3
                    hover:bg-gray-50
                  "
                  onClick={() => {
                    setOpen(
                      false
                    );

                    navigate(
                      "/portal"
                    );
                  }}
                >
                  <LayoutDashboard
                    size={18}
                  />

                  Member Portal
                </button>
              )}

              {roles.some(
                (r) =>
                  r !==
                  "Member"
              ) && (
                <button
                  className="
                    w-full
                    px-4
                    py-3
                    flex
                    items-center
                    gap-3
                    hover:bg-gray-50
                  "
                  onClick={() => {
                    setOpen(
                      false
                    );

                    navigate(
                      "/"
                    );
                  }}
                >
                  <LayoutDashboard
                    size={18}
                  />

                  Admin Dashboard
                </button>
              )}

              <hr />

              {/* Logout */}

              <button
                className="
                  w-full
                  px-4
                  py-3
                  flex
                  items-center
                  gap-3
                  text-red-600
                  hover:bg-red-50
                "
                onClick={
                  handleLogout
                }
              >
                <LogOut
                  size={18}
                />

                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}