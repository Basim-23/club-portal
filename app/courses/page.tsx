"use client"

import { supabase } from '../../lib/supabaseClient'
import { useEffect, useState } from 'react'

interface Course {
  id: number
  name: string
  code: string
  description: string
  link: string
}

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCourses = async () => {
      const { data, error } = await supabase
        .from<Course>('courses')
        .select('*')
        .order('name', { ascending: true })

      if (error) {
        console.error(error)
        setError(error.message)
      } else {
        setCourses(data || [])
      }
      setLoading(false)
    }

    fetchCourses()
  }, [])

  if (loading) return <p className="p-12 text-gray-300">Loading courses...</p>
  if (error) return <p className="p-12 text-red-500">Failed to load courses: {error}</p>

  return (
    <main className="p-12 min-h-screen bg-gray-950 text-gray-100 font-serif">
      <h1
        className="text-4xl md:text-5xl font-extrabold mb-10 text-yellow-200 tracking-wide"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        Courses
      </h1>

      {courses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <div
              key={course.id}
              className="p-6 bg-gray-900 bg-opacity-80 text-yellow-200 rounded-2xl shadow-xl hover:shadow-2xl transition transform hover:-translate-y-1 hover:scale-105 border border-yellow-400 flex flex-col justify-between"
            >
              <div>
                <h2
                  className="text-2xl md:text-3xl font-bold mb-2"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {course.name}
                </h2>
                <p className="text-gray-300 text-base md:text-lg">{course.code}</p>
                {course.description && (
                  <p className="text-gray-400 mt-2 text-sm md:text-base line-clamp-4">
                    {course.description}
                  </p>
                )}
              </div>

              <div className="mt-4">
                <a
                  href={course.link}                 // External course link
                  target="_blank"                     // Open in a new tab
                  rel="noopener noreferrer"           // Security best practice
                  className="inline-block px-4 py-2 bg-yellow-500 text-gray-950 font-semibold rounded-lg shadow hover:bg-yellow-400 transition"
                >
                  View Course
                </a>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-300">No courses available.</p>
      )}
    </main>
  )
}
