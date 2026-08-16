import {
  Bell,
  Menu,
  ShieldCheck,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";

function AdminHeader({ onMenuClick }) {
  const { admin } = useAuth();

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6">
        <button
          type="button"
          onClick={onMenuClick}
          className="rounded-xl p-2 text-slate-500 hover:bg-slate-100 lg:hidden dark:hover:bg-slate-800"
          aria-label="Open navigation"
        >
          <Menu size={22} />
        </button>

        <div className="hidden lg:block">
          <p className="text-sm font-semibold text-slate-900 dark:text-white">
            Admin Dashboard
          </p>

          <p className="text-xs text-slate-500 dark:text-slate-400">
            Manage your academy
          </p>
        </div>

        <div className="ml-auto flex items-center gap-3">
          <button
            type="button"
            className="relative rounded-xl p-2.5 text-slate-500 transition hover:bg-slate-100 dark:hover:bg-slate-800"
            title="Notifications"
          >
            <Bell size={19} />
          </button>

          <div className="hidden h-7 w-px bg-slate-200 sm:block dark:bg-slate-800" />

          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-semibold text-slate-900 dark:text-white">
                Administrator
              </p>

              <p className="text-xs text-slate-500 dark:text-slate-400">
                {admin?.email}
              </p>
            </div>

            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 text-white">
              <ShieldCheck size={18} />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default AdminHeader;