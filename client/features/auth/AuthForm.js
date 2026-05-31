"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "../../lib/api";
import { useAuthStore } from "../../store/authStore";

export function AuthForm({ mode }) {
  const router = useRouter();
  const setSession = useAuthStore((state) => state.setSession);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError("");
    const form = new FormData(event.currentTarget);
    const payload = Object.fromEntries(form.entries());

    try {
      const data = await api(`/auth/${mode}`, {
        method: "POST",
        body: JSON.stringify(payload)
      });
      setSession(data);
      router.push("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="panel mx-auto mt-16 grid max-w-md gap-4 p-6">
      <div>
        <h1 className="text-2xl font-black">{mode === "login" ? "Login" : "Create account"}</h1>
        <p className="text-sm text-slate-600">Recruiter access for managing AI hiring workflows.</p>
      </div>
      {mode === "signup" && <input className="input" name="name" placeholder="Name" required />}
      <input className="input" name="email" type="email" placeholder="Email" required />
      <input className="input" name="password" type="password" placeholder="Password" minLength="8" required />
      {error && <p className="text-sm text-berry">{error}</p>}
      <button className="button" disabled={loading}>{loading ? "Working..." : "Continue"}</button>
    </form>
  );
}
