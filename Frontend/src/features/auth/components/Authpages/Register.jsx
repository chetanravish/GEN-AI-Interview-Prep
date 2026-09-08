import { useState } from "react";
import { registerUser } from "../../../../api/auth.api";
import {
  Eye,
  EyeOff,
  ArrowRight,
  User,
  Mail,
  Lock,
} from "lucide-react";

export default function Register({ onLogin,onVerify }) {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await registerUser(form.username, form.email, form.password);

      // Save email for OTP page
      sessionStorage.setItem("verifyEmail", form.email);

      // Redirect to Verify OTP screen
      onVerify(form.email);
    } catch (err) {
      setLoading(false);
      setError(
        err.response?.data?.message || "Registration failed! Please try again."
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#0F172A] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md bg-[#1E293B] border border-slate-700 rounded-2xl shadow-2xl p-6 sm:p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">Create Account</h1>
          <p className="text-slate-400 mt-2 text-sm">
            Join us and get started today.
          </p>
        </div>

        {error && (
          <div className="mb-4 rounded-lg bg-red-500/10 border border-red-500/30 p-3 text-sm text-red-400">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Username */}
          <div>
            <label className="block text-sm text-slate-300 mb-2">
              Username
            </label>

            <div className="relative">
              <User className="absolute left-3 top-3.5 w-5 h-5 text-slate-500" />
              <input
                name="username"
                type="text"
                required
                value={form.username}
                onChange={handleChange}
                placeholder="Enter your name"
                className="w-full bg-[#0F172A] border border-slate-600 text-white placeholder-slate-500 rounded-lg pl-11 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm text-slate-300 mb-2">Email</label>

            <div className="relative">
              <Mail className="absolute left-3 top-3.5 w-5 h-5 text-slate-500" />
              <input
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full bg-[#0F172A] border border-slate-600 text-white placeholder-slate-500 rounded-lg pl-11 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm text-slate-300 mb-2">
              Password
            </label>

            <div className="relative">
              <Lock className="absolute left-3 top-3.5 w-5 h-5 text-slate-500" />

              <input
                name="password"
                type={showPassword ? "text" : "password"}
                required
                minLength={6}
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full bg-[#0F172A] border border-slate-600 text-white placeholder-slate-500 rounded-lg pl-11 pr-11 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />

              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 transition flex items-center justify-center gap-2 text-white font-semibold py-3 rounded-lg"
          >
            {loading ? "Creating..." : "Register"}
            {!loading && <ArrowRight className="w-4 h-4" />}
          </button>
        </form>

        <p className="text-center text-sm text-slate-400 mt-6">
          Already have an account?{" "}
          <button
            type="button"
            onClick={onLogin}
            className="text-indigo-400 hover:text-indigo-300"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
}