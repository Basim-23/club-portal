"use client";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useRouter } from "next/navigation";

interface Profile {
  id: string;
  username: string;
  avatar_url: string;
  about: string;
  university: string;
  interests: string[];
}

function UploadAvatar({ userId, onUpload }: { userId: string; onUpload: (url: string) => void }) {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async () => {
    if (!file) return alert("Please select a file first.");
    setUploading(true);

    const fileExt = file.name.split(".").pop();
    const fileName = `${userId}.${fileExt}`;

    // Upload file to Supabase storage
    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(fileName, file, { upsert: true });
    if (uploadError) return alert(uploadError.message);

    // Get public URL
    const { data: { publicUrl }, error: urlError } = supabase.storage
      .from("avatars")
      .getPublicUrl(fileName);
    if (urlError) return alert(urlError.message);

    // Update profile in database
    const { error: updateError } = await supabase
      .from("profiles")
      .update({ avatar_url: publicUrl })
      .eq("id", userId);
    if (updateError) return alert(updateError.message);

    alert("✅ Avatar uploaded!");
    onUpload(publicUrl);
    setUploading(false);
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
        disabled={uploading}
        className="w-full px-4 py-2 bg-yellow-300 text-gray-950 font-bold rounded hover:bg-yellow-400 transition disabled:opacity-50"
      >
        {uploading ? "Uploading..." : "Upload Avatar"}
      </button>
    </div>
  );
}

function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) return alert("Logout failed: " + error.message);
    router.push("/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition mb-6"
    >
      Logout
    </button>
  );
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [about, setAbout] = useState("");
  const [university, setUniversity] = useState("");
  const [interests, setInterests] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
        return;
      }

      const { data } = await supabase.from("profiles").select("*").eq("id", user.id).single();
      if (!data) return;

      setProfile(data);
      setAbout(data.about || "");
      setUniversity(data.university || "");
      setInterests(data.interests?.join(", ") || "");
      setLoading(false);
    };
    fetchProfile();
  }, [router]);

  const handleUpdateProfile = async () => {
    if (!profile) return;

    const updatedInterests = interests.split(",").map((i) => i.trim());

    const { error } = await supabase
      .from("profiles")
      .update({ about, university, interests: updatedInterests })
      .eq("id", profile.id);
    if (error) return alert(error.message);

    alert("✅ Profile updated!");
    setProfile({ ...profile, about, university, interests: updatedInterests });
  };

  if (loading) return <p className="text-gray-300 p-6">Loading...</p>;

  return (
    <main className="min-h-screen bg-gray-950 text-gray-100 font-serif p-8">
      <div className="max-w-3xl mx-auto bg-gray-900 bg-opacity-90 p-8 rounded-2xl shadow-xl border border-yellow-400">
        {/* Logout */}
        <div className="flex justify-end">
          <LogoutButton />
        </div>

        {/* Profile Header */}
        <div className="flex flex-col items-center mb-6">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-yellow-200" style={{ fontFamily: "'Playfair Display', serif" }}>
            {profile.username}
          </h1>
          {profile.avatar_url ? (
            <img src={profile.avatar_url} alt="avatar" className="w-32 h-32 rounded-full mb-4" />
          ) : (
            <div className="w-32 h-32 rounded-full bg-gray-700 flex items-center justify-center mb-4 text-gray-300">
              No Avatar
            </div>
          )}
          <UploadAvatar userId={profile.id} onUpload={(url) => setProfile({ ...profile, avatar_url: url })} />
        </div>

        {/* Profile Form */}
        <div className="space-y-4">
          <label>
            About:
            <textarea
              className="mt-1 w-full p-3 rounded text-gray-900 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              placeholder="About you..."
            />
          </label>

          <label>
            University:
            <input
              type="text"
              className="mt-1 w-full p-3 rounded text-gray-900 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              value={university}
              onChange={(e) => setUniversity(e.target.value)}
              placeholder="University"
            />
          </label>

          <label>
            Interests (comma separated):
            <input
              type="text"
              className="mt-1 w-full p-3 rounded text-gray-900 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              value={interests}
              onChange={(e) => setInterests(e.target.value)}
              placeholder="e.g., Quantum Physics, Astrophysics"
            />
          </label>

          <button
            onClick={handleUpdateProfile}
            className="w-full p-3 bg-yellow-300 text-gray-950 font-bold rounded hover:bg-yellow-400 transition"
          >
            Save Profile
          </button>
        </div>

        {/* Interests Display */}
        {profile.interests?.length > 0 && (
          <div className="mt-6">
            <h2 className="text-2xl font-bold mb-2 text-yellow-200" style={{ fontFamily: "'Playfair Display', serif" }}>Interests:</h2>
            <ul className="list-disc list-inside text-gray-300">
              {profile.interests.map((i, idx) => (
                <li key={idx}>{i}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </main>
  );
}
