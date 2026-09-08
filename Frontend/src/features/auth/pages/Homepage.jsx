import { Link, useSearchParams } from "react-router-dom";
import { useState } from "react";
import {
  FileText,
  Sparkles,
  CheckCircle,
  Briefcase,
  ArrowRight,
  Lock,
} from "lucide-react";

import Login from "../components/Authpages/Login";
import Register from "../components/Authpages/Register";
import VerifyEmail from "../components/Authpages/VerifyEmail";
import ForgotPassword from "../components/Authpages/ForgotPass";
import VerifyResetOtp from "../components/Authpages/VerifyResetOtp";
import ResetPassword from "../components/Authpages/ResetPassword";

const FEATURES = [
  {
    icon: Sparkles,
    title: "AI Powered Resume",
    body: "Generate a professional ATS-friendly resume tailored to your target job role.",
  },
  {
    icon: Briefcase,
    title: "Job Domain Suggestions",
    body: "Get relevant skills and project ideas based on the career domain you choose.",
  },
  {
    icon: CheckCircle,
    title: "ATS Optimized",
    body: "Built to improve readability and increase compatibility with modern hiring systems.",
  },
];

function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2">
      <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center">
        <FileText className="w-5 h-5 text-indigo-400" />
      </div>
      <span className="text-xl font-bold text-white">ResumeAI</span>
    </Link>
  );
}

function ResumePreview() {
  return (
    <div className="relative w-full max-w-sm mx-auto">
      <div className="absolute -top-5 -left-5 w-28 h-28 bg-indigo-600/20 rounded-full blur-3xl" />
      <div className="absolute -bottom-5 -right-5 w-28 h-28 bg-cyan-500/20 rounded-full blur-3xl" />

      <div className="relative bg-[#1E293B] border border-slate-700 rounded-2xl p-5 shadow-2xl">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold">
            CR
          </div>
          <div>
            <h3 className="text-white font-semibold">Chetan Ravish</h3>
            <p className="text-slate-400 text-sm">MERN Developer</p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="h-2 bg-slate-700 rounded w-3/4" />
          <div className="h-2 bg-slate-700 rounded w-full" />
          <div className="h-2 bg-slate-700 rounded w-5/6" />

          <div className="pt-3">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
              <span>ATS Score</span>
              <span className="text-emerald-400 font-semibold">92%</span>
            </div>

            <div className="w-full h-2 bg-slate-800 rounded-full">
              <div className="w-[92%] h-2 bg-emerald-500 rounded-full" />
            </div>
          </div>

          <div className="pt-4 space-y-2">
            {["React", "Node.js", "MongoDB"].map((skill) => (
              <div
                key={skill}
                className="flex items-center gap-2 text-sm text-slate-300"
              >
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                {skill}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [email, setEmail] = useState(
    sessionStorage.getItem("verifyEmail") || ""
  );

  const [resetEmail, setResetEmail] = useState(
    sessionStorage.getItem("resetEmail") || ""
  );

  const screen = searchParams.get("auth") || "home";

  const setScreen = (value) => {
    if (value === "home") setSearchParams({});
    else setSearchParams({ auth: value });
  };

  if (screen === "login")
    return (
      <Login
        onRegister={() => setScreen("register")}
        onForgotPassword={() => setScreen("forgot-password")}
      />
    );

  if (screen === "register")
    return (
      <Register
        onLogin={() => setScreen("login")}
        onVerify={(registeredEmail) => {
          setEmail(registeredEmail);
          sessionStorage.setItem("verifyEmail", registeredEmail);
          setScreen("verify");
        }}
      />
    );

  if (screen === "verify")
    return (
      <VerifyEmail
        email={email}
        onDone={() => setScreen("login")}
      />
    );

  if (screen === "forgot-password")
    return (
      <ForgotPassword
        onBack={() => setScreen("login")}
        onVerify={(mail) => {
          setResetEmail(mail);
          sessionStorage.setItem("resetEmail", mail);
          setScreen("verify-reset");
        }}
      />
    );

  if (screen === "verify-reset")
    return (
      <VerifyResetOtp
        email={resetEmail}
        onBack={() => setScreen("forgot-password")}
        onNext={() => setScreen("reset-password")}
      />
    );

  if (screen === "reset-password")
    return (
      <ResetPassword
        onDone={() => setScreen("login")}
      />
    );

  return (
    <div className="min-h-screen bg-[#0F172A] text-white">
      {/* Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/3 w-72 h-72 bg-indigo-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl" />
      </div>

      {/* Navbar */}
      <header className="max-w-6xl mx-auto px-5 py-5 flex items-center justify-between">
        <Logo />

        <div className="flex items-center gap-3">
          <button
            onClick={() => setScreen("login")}
            className="hidden sm:block text-slate-300 hover:text-white"
          >
            Login
          </button>

          <button
            onClick={() => setScreen("register")}
            className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg font-medium transition"
          >
            Get Started
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-5 py-16 lg:py-24 grid lg:grid-cols-2 gap-14 items-center">
        <div>
          <div className="inline-flex items-center gap-2 bg-indigo-600/10 border border-indigo-500/20 px-3 py-1 rounded-full text-sm text-indigo-300 mb-5">
            <Sparkles className="w-4 h-4" />
            AI Resume Generator
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
            Build an ATS Friendly Resume in Minutes
          </h1>

          <p className="mt-6 text-slate-400 text-lg leading-relaxed max-w-xl">
            Select your job domain, let AI generate optimized content, and
            create a resume that stands out to recruiters and ATS systems.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => setScreen("register")}
              className="bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition"
            >
              Create Resume
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setScreen("login")}
              className="border border-slate-700 hover:border-slate-500 px-6 py-3 rounded-xl text-slate-300 hover:text-white transition"
            >
              I already have an account
            </button>
          </div>
        </div>

        <ResumePreview />
      </section>

      {/* Stats */}
      <section className="max-w-5xl mx-auto px-5 pb-16">
        <div className="grid grid-cols-3 gap-4">
          {[
            ["50+", "Resume Templates"],
            ["ATS", "Optimized Format"],
            ["AI", "Content Generation"],
          ].map(([value, label]) => (
            <div
              key={label}
              className="bg-[#1E293B] border border-slate-700 rounded-xl p-4 text-center"
            >
              <h3 className="text-2xl font-bold text-indigo-400">{value}</h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="max-w-5xl mx-auto px-5 py-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">Everything you need</h2>
          <p className="text-slate-400 mt-3">
            Designed for students and developers preparing for placements.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {FEATURES.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="bg-[#1E293B] border border-slate-700 rounded-2xl p-6 hover:border-indigo-500/40 transition"
            >
              <div className="w-12 h-12 rounded-xl bg-indigo-600/10 flex items-center justify-center mb-4">
                <Icon className="w-6 h-6 text-indigo-400" />
              </div>

              <h3 className="text-lg font-semibold mb-2">{title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-5 py-20">
        <div className="bg-linear-to-r from-indigo-600/20 to-cyan-500/10 border border-indigo-500/20 rounded-3xl p-8 text-center">
          <h2 className="text-3xl font-bold">
            Ready to land your next interview?
          </h2>

          <p className="text-slate-300 mt-3 max-w-2xl mx-auto">
            Create your account and generate a personalized ATS-friendly resume
            with AI assistance.
          </p>

          <button
            onClick={() => setScreen("register")}
            className="mt-8 bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-xl font-semibold inline-flex items-center gap-2 transition"
          >
            Get Started Free
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800">
        <div className="max-w-6xl mx-auto px-5 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <Logo />
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} ResumeAI. Built with MERN & Gemini API.
          </p>
        </div>
      </footer>
    </div>
  );
}