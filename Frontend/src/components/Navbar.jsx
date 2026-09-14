import { Link, useNavigate } from "react-router-dom";
import { LogOut, Sparkles } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate("/");
  }

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
      <div className="mx-auto flex h-18 max-w-6xl items-center justify-between px-6">
        {/* Logo */}
        <Link to="/" className="group flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-indigo-500 to-cyan-500 shadow-lg shadow-indigo-500/30 transition group-hover:scale-105">
            <Sparkles size={18} className="text-white" />
          </div>

          <div>
            <h1 className="text-lg font-bold tracking-wide text-white">
              ResumeAI
            </h1>
            <p className="text-xs text-slate-400 -mt-1">
              AI Resume Builder
            </p>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-4">
          {user ? (
            <>
              <div className="hidden items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3 py-1.5 sm:flex">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-linear-to-r from-indigo-500 to-cyan-500 font-semibold text-white">
                  {user.username.charAt(0).toUpperCase()}
                </div>
                <div className="leading-tight">
                  <p className="text-sm font-medium text-white">
                    {user.username}
                  </p>
                  <p className="text-xs text-slate-400">Authenticated</p>
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 rounded-lg border border-slate-700 px-4 py-2 text-sm text-slate-300 transition hover:border-red-500/40 hover:bg-red-500/10 hover:text-red-300"
              >
                <LogOut size={16} />
                Log out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="hidden text-sm font-medium text-slate-300 transition hover:text-white sm:block"
              >
                Sign in
              </Link>

              <Link
                to="/register"
                className="rounded-xl bg-linear-to-r from-indigo-500 to-cyan-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition hover:scale-105 hover:shadow-indigo-500/40"
              >
                Get Started
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}