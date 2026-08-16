import { NavLink, Link } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  UserRound,
  Plus,
  LogOut,
  X,
  Code2,
  Users,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";

const items = [
  {
    name: "Dashboard",
    path: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Courses",
    path: "/admin/courses",
    icon: BookOpen,
  },
  {
    name: "Add Course",
    path: "/admin/courses/new",
    icon: Plus,
  },
  {
    name: "Enrollments",
    path: "/admin/enrollments",
    icon: UserRound,
  },
  {
    name: "Enrollments",
    path: "/admin/enrollments",
    icon: Users,
  }
];

function AdminSidebar({ open, onClose }) {
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    onClose();
  };

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-slate-200 bg-white transition-transform duration-300 dark:border-slate-800 dark:bg-slate-950 lg:static lg:translate-x-0 ${
          open
            ? "translate-x-0"
            : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b border-slate-200 px-5 dark:border-slate-800">
          <Link
            to="/admin/dashboard"
            className="flex items-center gap-3"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 text-white">
              <Code2 size={20} />
            </div>

            <div>
              <div className="font-bold text-slate-900 dark:text-white">
                Codexa
              </div>

              <div className="text-xs text-slate-500">
                Admin Panel
              </div>
            </div>
          </Link>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-500 lg:hidden"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 space-y-1 p-4">
          {items.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                    isActive
                      ? "bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400"
                      : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                  }`
                }
              >
                <Icon size={19} />
                {item.name}
              </NavLink>
            );
          })}
        </nav>

        <div className="border-t border-slate-200 p-4 dark:border-slate-800">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-600 transition hover:bg-red-50 hover:text-red-600 dark:text-slate-300 dark:hover:bg-red-950/20"
          >
            <LogOut size={19} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}

export default AdminSidebar;