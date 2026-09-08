import { useRef, useState } from "react";
import { ShieldCheck, ArrowRight } from "lucide-react";
import { verifyEmail } from "../../../../api/auth.api";

export default function VerifyEmail({ email, onDone, onBack }) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const inputRefs = useRef([]);

  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const code = otp.join("");

    if (code.length !== 6) {
      return setError("Please enter all 6 digits");
    }

    setLoading(true);
    setError("");

    try {
      await verifyEmail(code, email);

      sessionStorage.removeItem("verifyEmail");
      setSuccess(true);

      setTimeout(() => {
        onDone();
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0F172A] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md bg-[#1E293B] border border-slate-700 rounded-2xl shadow-2xl p-6 sm:p-8">
        {/* Heading */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto rounded-full bg-indigo-600/20 flex items-center justify-center mb-4">
            <ShieldCheck className="w-8 h-8 text-indigo-400" />
          </div>

          <h1 className="text-3xl font-bold text-white">Verify OTP</h1>

          <p className="text-slate-400 mt-2 text-sm">
            Enter the 6-digit code sent to
          </p>
          <p className="text-indigo-400 text-sm font-medium">
            {email || "your email"}
          </p>
        </div>

        {/* Success Message */}
        {success && (
          <div className="mb-4 rounded-lg bg-green-500/10 border border-green-500/30 p-3 text-sm text-green-400">
            Email verified successfully! Redirecting...
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-4 rounded-lg bg-red-500/10 border border-red-500/30 p-3 text-sm text-red-400">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* OTP Inputs */}
          <div className="flex justify-between gap-2">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-12 h-14 sm:w-14 sm:h-16 text-center text-xl font-bold rounded-lg bg-[#0F172A] border border-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            ))}
          </div>

          {/* Verify Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 transition flex items-center justify-center gap-2 text-white font-semibold py-3 rounded-lg"
          >
            {loading ? "Verifying..." : "Verify OTP"}
            {!loading && <ArrowRight className="w-4 h-4" />}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center space-y-2">
          <button
            type="button"
            className="text-indigo-400 hover:text-indigo-300 text-sm"
          >
            Resend OTP
          </button>

          <button
            type="button"
            onClick={onBack}
            className="text-slate-400 hover:text-white text-sm"
          >
            ← Back to Register
          </button>
        </div>
      </div>
    </div>
  );
}