import { Link } from "react-router-dom";
import {
  ArrowRight,
  Sparkles,
  FileText,
  ShieldCheck,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";

const features = [
  {
    icon: Sparkles,
    title: "Career ideas, generated",
    description:
      "AI suggests roles, skills and project ideas tailored to your target domain.",
    status: "In Progress",
  },
  {
    icon: FileText,
    title: "ATS-ready resumes",
    description:
      "Generate beautifully formatted resumes optimized for applicant tracking systems.",
    status: "Planned",
  },
  {
    icon: ShieldCheck,
    title: "Secure authentication",
    description:
      "Protected with hashed passwords, JWT cookies and persistent login sessions.",
    status: "Live",
  },
];

export default function Home() {
  const { user, loading } = useAuth();

  return (
    <>
    <Navbar/>
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-10 top-10 h-72 w-72 rounded-full bg-indigo-600/25 blur-3xl" />
        <div className="absolute right-0 top-40 h-96 w-96 rounded-full bg-cyan-500/15 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-fuchsia-600/15 blur-3xl" />
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 py-24 lg:py-32">
        <div className="max-w-3xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-400/30 bg-indigo-500/10 px-4 py-2 text-sm text-indigo-300">
            <Sparkles size={16} />
            AI Resume Builder
          </div>

          {!loading && user ? (
            <>
              <p className="text-indigo-300 text-sm">
                Welcome back, {user.username}
              </p>

              <h1 className="mt-4 font-serif text-5xl leading-tight md:text-6xl">
                Continue building your{" "}
                <span className="bg-linear-to-r from-indigo-400 via-cyan-300 to-fuchsia-400 bg-clip-text text-transparent">
                  dream career
                </span>
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300">
                Your authentication system is fully working. Next we'll generate
                AI-powered resumes, career suggestions and ATS optimized content.
              </p>

              <Link
                to="/dashboard"
                className="mt-8 inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-indigo-500 to-cyan-500 px-6 py-3 font-medium shadow-lg shadow-indigo-500/30 transition hover:scale-105"
              >
                Open Dashboard
                <ArrowRight size={18} />
              </Link>
            </>
          ) : (
            <>
              <h1 className="font-serif text-5xl leading-tight md:text-6xl">
                Find the right role.
                <br />
                Build the resume that{" "}
                <span className="bg-linear-to-r from-indigo-400 via-cyan-300 to-fuchsia-400 bg-clip-text text-transparent">
                  gets you there.
                </span>
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300">
                An AI-powered platform that helps you discover career paths,
                generate ATS-friendly resumes, and prepare for interviews with
                confidence.
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Link
                  to="/register"
                  className="group inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-indigo-500 to-cyan-500 px-6 py-3 font-medium shadow-xl shadow-indigo-500/30 transition hover:scale-105"
                >
                  Get Started
                  <ArrowRight
                    size={18}
                    className="transition group-hover:translate-x-1"
                  />
                </Link>

                <Link
                  to="/login"
                  className="rounded-xl border border-slate-700 px-6 py-3 text-slate-300 transition hover:border-indigo-400 hover:text-white"
                >
                  Sign In
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Stats */}
      <section className="mx-auto max-w-6xl px-6 pb-14">
        <div className="grid grid-cols-3 gap-4">
          {[
            ["50+", "Templates"],
            ["92%", "ATS Score"],
            ["AI", "Powered"],
          ].map(([value, label]) => (
            <div
              key={label}
              className="rounded-2xl border border-slate-800 bg-white/5 p-5 text-center backdrop-blur"
            >
              <h3 className="text-3xl font-bold text-cyan-300">{value}</h3>
              <p className="mt-1 text-sm text-slate-400">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Feature Cards */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="mb-10 text-center">
          <h2 className="font-serif text-3xl">Everything you need</h2>
          <p className="mt-3 text-slate-400">
            Beautiful tools built for students and developers.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {features.map(({ icon: Icon, title, description, status }) => (
            <div
              key={title}
              className="group rounded-3xl border border-slate-800 bg-white/5 p-6 backdrop-blur-xl transition hover:-translate-y-2 hover:border-indigo-500/40 hover:bg-white/10"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-indigo-500/20 to-cyan-500/20">
                <Icon size={24} className="text-cyan-300" />
              </div>

              <h3 className="mt-5 text-lg font-semibold">{title}</h3>

              <p className="mt-3 text-sm leading-relaxed text-slate-400">
                {description}
              </p>

              <span className="mt-5 inline-block rounded-full bg-indigo-500/10 px-3 py-1 text-xs text-indigo-300">
                {status}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      {!user && (
        <section className="mx-auto max-w-5xl px-6 pb-24">
          <div className="rounded-3xl border border-indigo-500/20 bg-linear-to-r from-indigo-600/20 to-cyan-500/10 p-10 text-center backdrop-blur">
            <h2 className="font-serif text-4xl">
              Ready to build your future?
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-slate-300">
              Join ResumeAI and create professional resumes with AI assistance in
              minutes.
            </p>

            <Link
              to="/register"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-slate-900 transition hover:scale-105"
            >
              Create Free Account
              <ArrowRight size={18} />
            </Link>
          </div>
        </section>
      )}
    </div>
    </>
  );
}