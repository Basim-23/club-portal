"use client";
import { supabase } from "../lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    // Call Supabase to sign out
    const { error } = await supabase.auth.signOut();
    if (error) return alert("Logout failed: " + error.message);

    // Redirect to login page after logout
    router.push("/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
    >
      Logout
    </button>
  );
}
