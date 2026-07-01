import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export default function Register() {
  const { register, formatApiErrorDetail } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await register(name, email, password);
      navigate("/practice");
    } catch (err) {
      setError(formatApiErrorDetail(err.response?.data?.detail) || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-xl p-8 shadow-2xl shadow-black/40">
        <h1 className="font-heading text-2xl font-black tracking-tight text-zinc-50">Create account</h1>
        <p className="mt-1 text-sm text-zinc-400">Register a user to test the auth flow.</p>

        {error && (
          <div data-testid="register-error" className="mt-4 rounded-md border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-400">
            {error}
          </div>
        )}

        <form onSubmit={submit} className="mt-6 space-y-4" data-testid="register-form">
          <div>
            <label className="text-xs font-mono uppercase tracking-widest text-zinc-400">Name</label>
            <input
              data-testid="register-name-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-1.5 w-full rounded-md border border-zinc-800 bg-zinc-950 px-3 py-2 text-zinc-100 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40"
            />
          </div>
          <div>
            <label className="text-xs font-mono uppercase tracking-widest text-zinc-400">Email</label>
            <input
              data-testid="register-email-input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1.5 w-full rounded-md border border-zinc-800 bg-zinc-950 px-3 py-2 text-zinc-100 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40"
            />
          </div>
          <div>
            <label className="text-xs font-mono uppercase tracking-widest text-zinc-400">Password (min 6)</label>
            <input
              data-testid="register-password-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="mt-1.5 w-full rounded-md border border-zinc-800 bg-zinc-950 px-3 py-2 text-zinc-100 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40"
            />
          </div>
          <button
            data-testid="register-submit-button"
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-blue-600 hover:bg-blue-500 disabled:opacity-60 px-4 py-2.5 text-sm font-semibold text-white transition-colors"
          >
            {loading ? "Creating…" : "Create Account"}
          </button>
        </form>

        <p className="mt-5 text-sm text-zinc-400">
          Have an account?{" "}
          <Link to="/login" data-testid="go-to-login" className="text-blue-400 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
