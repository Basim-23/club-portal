"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabaseClient";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setMessage(error.message);
    else {
      setMessage("✅ Login successful!");
      // Redirect to homepage after 1 second
      setTimeout(() => router.push("/"), 1000);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-950 text-gray-100 font-serif p-6">
      <form onSubmit={handleLogin} className="bg-gray-900 bg-opacity-90 p-10 rounded-2xl shadow-xl w-full max-w-md border border-yellow-400">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-yellow-200 text-center" style={{ fontFamily: "'Playfair Display', serif" }}>
          Login
        </h1>

        {message && (
          <p className={`mb-6 text-center ${message.includes("successful") ? "text-green-400" : "text-red-400"}`}>
            {message}
          </p>
        )}

        <label className="block mb-4">
          Email:
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-2 w-full p-3 rounded text-gray-900 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            required
          />
        </label>

        <label className="block mb-6">
          Password:
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-2 w-full p-3 rounded text-gray-900 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            required
          />
        </label>

        <button
          type="submit"
          className="w-full p-3 bg-yellow-300 text-gray-950 font-bold rounded hover:bg-yellow-400 transition"
        >
          Login
        </button>

        <p className="mt-6 text-center text-gray-300">
          Don't have an account? <a href="/register" className="text-yellow-300 hover:text-yellow-400">Register</a>
        </p>
      </form>
    </main>
  );
}
