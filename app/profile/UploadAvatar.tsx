"use client";
import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function UploadAvatar({ userId }: { userId: string }) {
  const [file, setFile] = useState<File | null>(null);

  const handleUpload = async () => {
    if (!file) return;
    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}.${fileExt}`;
    const { error } = await supabase.storage.from('avatars').upload(fileName, file, { upsert: true });
    if (error) return alert(error.message);

    const { publicURL } = supabase.storage.from('avatars').getPublicUrl(fileName);
    await supabase.from('profiles').update({ avatar_url: publicURL }).eq('id', userId);
    alert("✅ Avatar uploaded!");
  };

  return (
    <div className="flex flex-col items-start mt-4 bg-gray-900 p-4 rounded-2xl shadow border border-yellow-400 w-full max-w-xs">
      <input
        type="file"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="mb-3 w-full text-gray-100"
      />
      <button
        onClick={handleUpload}
        className="w-full px-4 py-2 bg-yellow-300 text-gray-950 font-bold rounded hover:bg-yellow-400 transition"
      >
        Upload Avatar
      </button>
    </div>
  );
}
