import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../../../api/auth.api.js";

const Login = ({ onRegister }) => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("")
    setLoading(true);


    try {
      const data = await loginUser(form.email, form.password);
      localStorage.setItem("token", data.token);
      navigate("/dashboard", {
        state: {
          email: form.email,
        },
      })

    } catch (error) {
      setError(
        error.response?.data?.message || "Login Failed! Please try again"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#0F172A] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md bg-[#1E293B] border border-slate-700 rounded-2xl shadow-2xl p-6 sm:p-8">

        {/* Logo / Heading */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">Welcome Back</h1>
          <p className="text-slate-400 mt-2 text-sm">
            Sign in to your account
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 rounded-lg bg-red-500/10 border border-red-500/30 p-3 text-sm text-red-400">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="block text-sm text-slate-300 mb-2">
              Email
            </label>
            <input
              name="email"
              required
              value={form.email}
              onChange={handleChange}
              type="email"
              placeholder="you@example.com"
              className="w-full bg-[#0F172A] border border-slate-600 text-white placeholder-slate-500 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm text-slate-300 mb-2">
              Password
            </label>
            <input
              required
              name="password"
              value={form.password}
              onChange={handleChange}
              type="password"
              placeholder="••••••••"
              className="w-full bg-[#0F172A] border border-slate-600 text-white placeholder-slate-500 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 transition-colors text-white font-semibold py-3 rounded-lg"
          >
            Login
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-slate-400 mt-6">
          Don't have an account?{" "}
          <button
            type="button"
            onClick={onRegister}
            className="text-indigo-400 hover:underline cursor-pointer">
            Register
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;