"use client";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

interface Profile {
  id: string;
  username: string;
  avatar_url: string;
  about: string;
  university: string;
  interests: string[];
}

export default function UserProfilePage({ params }: { params: { userId: string } }) {
  const { userId } = params;
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const { data } = await supabase.from("profiles").select("*").eq("id", userId).single();
      if (!data) return alert("User not found");
      setProfile(data);
      setLoading(false);
    };
    fetchProfile();
  }, [userId]);

  if (loading) return <p>Loading...</p>;
  if (!profile) return <p>User not found</p>;

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 p-8 flex flex-col items-center">
      <h1 className="text-3xl text-yellow-200 font-bold mb-4">{profile.username}</h1>
      {profile.avatar_url ? (
        <img src={profile.avatar_url} alt="avatar" className="w-32 h-32 rounded-full mb-4" />
      ) : (
        <div className="w-32 h-32 rounded-full bg-gray-700 flex items-center justify-center mb-4 text-gray-300">
          No Avatar
        </div>
      )}
      <p className="mb-2"><strong>About:</strong> {profile.about}</p>
      <p className="mb-2"><strong>University:</strong> {profile.university}</p>
      {profile.interests?.length > 0 && (
        <div className="mt-4">
          <h2 className="text-xl font-bold text-yellow-200">Interests:</h2>
          <ul className="list-disc list-inside text-gray-300">
            {profile.interests.map((i, idx) => (
              <li key={idx}>{i}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
