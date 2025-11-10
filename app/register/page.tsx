"use client";
import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) {
      setMessage(error.message);
      return;
    }

    // إنشاء ملف شخصي جديد في جدول profiles
    if (data.user) {
      await supabase.from('profiles').insert({
        id: data.user.id,
        username,
        about: "",
        university: "",
        interests: [],
      });
    }

    setMessage("✅ Registration successful! Check your email to confirm.");
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-950 text-gray-100 font-serif p-6">
      <form onSubmit={handleRegister} className="bg-gray-900 bg-opacity-90 p-10 rounded-2xl shadow-xl w-full max-w-md border border-yellow-400">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-yellow-200 text-center" style={{ fontFamily: "'Playfair Display', serif" }}>
          Register
        </h1>

        {message && (
          <p className={`mb-6 text-center ${message.includes("✅") ? "text-green-400" : "text-red-400"}`}>
            {message}
          </p>
        )}

        <label className="block mb-4">
          Username:
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-2 w-full p-3 rounded text-gray-900 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            required
          />
        </label>

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
          Register
        </button>

        <p className="mt-6 text-center text-gray-300">
          Already have an account? <a href="/login" className="text-yellow-300 hover:text-yellow-400">Login</a>
        </p>
      </form>
    </main>
  );
}
