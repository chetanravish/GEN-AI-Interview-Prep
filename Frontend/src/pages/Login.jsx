import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Eye, EyeOff, ArrowRight, Sparkles } from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const notice = location.state?.notice;

  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      await login(form.email, form.password);
      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.message || "Something went wrong. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="relative min-h-[calc(100vh-72px)] flex items-center justify-center bg-slate-950 px-6 py-16 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-10 top-10 h-72 w-72 rounded-full bg-indigo-600/20 blur-3xl" />
        <div className="absolute right-0 bottom-0 h-80 w-80 rounded-full bg-cyan-500/15 blur-3xl" />
      </div>

      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl shadow-2xl">
        {/* Badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-400/30 bg-indigo-500/10 px-3 py-1 text-xs text-indigo-300">
          <Sparkles size={14} />
          ResumeAI
        </div>

        <h1 className="font-serif text-4xl text-white">Welcome back</h1>
        <p className="mt-3 text-slate-400 leading-relaxed">
          Sign in to continue building your ATS-friendly resume and explore AI
          powered career tools.
        </p>

        {notice && (
          <div className="mt-6 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">
            {notice}
          </div>
        )}

        {error && (
          <div className="mt-6 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <Field label="Email address">
            <input
              type="email"
              required
              value={form.email}
              onChange={handleChange("email")}
              placeholder="you@example.com"
              className="w-full rounded-xl border border-slate-700 bg-slate-900/70 px-4 py-3 text-white placeholder:text-slate-500 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
            />
          </Field>

          <Field label="Password">
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                value={form.password}
                onChange={handleChange("password")}
                placeholder="••••••••"
                className="w-full rounded-xl border border-slate-700 bg-slate-900/70 px-4 py-3 pr-11 text-white placeholder:text-slate-500 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </Field>

          <div className="flex justify-end">
            <Link
              to="/forgot-password"
              className="text-sm text-indigo-300 hover:text-indigo-200"
            >
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="group w-full rounded-xl bg-linear-to-r from-indigo-500 to-cyan-500 py-3 font-semibold text-white shadow-lg shadow-indigo-500/25 transition hover:scale-[1.02] disabled:opacity-60 disabled:hover:scale-100 flex items-center justify-center gap-2"
          >
            {submitting ? "Signing in..." : "Sign in"}
            {!submitting && (
              <ArrowRight
                size={18}
                className="transition group-hover:translate-x-1"
              />
            )}
          </button>
        </form>

        <div className="my-8 flex items-center gap-3">
          <div className="h-px flex-1 bg-slate-800" />
          <span className="text-xs text-slate-500">OR</span>
          <div className="h-px flex-1 bg-slate-800" />
        </div>

        <p className="text-center text-sm text-slate-400">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-medium text-cyan-300 hover:text-cyan-200"
          >
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-slate-300">
        {label}
      </span>
      {children}
    </label>
  );
}