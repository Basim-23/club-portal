"use client";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import UploadAvatar from "../profile/UploadAvatar";

interface Profile {
  id: string;
  username: string;
  avatar_url: string;
  about: string;
  university: string;
  interests: string[];
}

interface Course {
  id: number;
  name: string;
  code: string;
  description: string;
}

interface Event {
  id: number;
  title: string;
  date: string;
  zoom_link: string;
  zoom_password: string;
  description: string;
}

export default function DashboardPage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Profile
      const { data: profileData } = await supabase.from('profiles').select('*').eq('id', user.id).single();
      setProfile(profileData);

      // Courses
      const { data: coursesData } = await supabase.from('courses').select('*').order('name');
      setCourses(coursesData || []);

      // Events
      const { data: eventsData } = await supabase.from('events').select('*').order('date');
      setEvents(eventsData || []);
    };
    fetchData();
  }, []);

  if (!profile) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-8 space-y-8">
      {/* Profile Section */}
      <section className="space-y-4">
        <h1 className="text-3xl font-serif">Hello, {profile.username}</h1>
        {profile.avatar_url && <img src={profile.avatar_url} alt="avatar" className="w-32 h-32 rounded-full" />}
        <UploadAvatar userId={profile.id} />
        <p className="mt-2"><strong>About:</strong> {profile.about}</p>
        <p><strong>University:</strong> {profile.university}</p>
        <p><strong>Interests:</strong> {profile.interests.join(", ")}</p>
      </section>

      {/* Courses Section */}
      <section>
        <h2 className="text-2xl font-serif mb-4">📚 Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {courses.map(course => (
            <div key={course.id} className="card bg-[var(--color-card)] p-4 rounded shadow hover:shadow-lg">
              <h3 className="text-xl font-serif">{course.name} ({course.code})</h3>
              <p className="text-[var(--color-muted)]">{course.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Events Section */}
      <section>
        <h2 className="text-2xl font-serif mb-4">🎤 Upcoming Seminars</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {events.map(event => (
            <div key={event.id} className="card bg-[var(--color-card)] p-4 rounded shadow hover:shadow-lg">
              <h3 className="text-xl font-serif">{event.title}</h3>
              <p className="text-[var(--color-muted)]">{new Date(event.date).toLocaleString()}</p>
              <p><a href={event.zoom_link} className="text-[var(--color-primary)] underline">Zoom Link</a></p>
              <p>Password: {event.zoom_password}</p>
              <p className="text-[var(--color-muted)]">{event.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
