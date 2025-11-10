'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'

interface Course {
  id: number
  name: string
  code: string
}

interface Book {
  id: number
  title?: string
  author?: string
  description?: string
  course_id?: number
  link?: string // path in bucket
  created_at: string
}

export default function LibraryPage() {
  const [courses, setCourses] = useState<Course[]>([])
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedPdf, setSelectedPdf] = useState<string | null>(null)

  // Fetch courses and books
  useEffect(() => {
    async function fetchData() {
      const { data: coursesData, error: coursesError } = await supabase
        .from<Course>('courses')
        .select('*')
        .order('name', { ascending: true })

      const { data: booksData, error: booksError } = await supabase
        .from<Book>('books')
        .select('*')
        .order('title', { ascending: true })

      if (coursesError || booksError) {
        console.error(coursesError, booksError)
      } else {
        setCourses(coursesData || [])
        setBooks(booksData || [])
      }
      setLoading(false)
    }
    fetchData()
  }, [])

  // Generate public URL from bucket
  const getPdfUrl = (filePath: string) => {
    if (!filePath) return null
    return supabase.storage.from('books').getPublicUrl(filePath).data.publicUrl
  }

  if (loading) return <p className="text-gray-300 p-12">Loading library...</p>

  return (
    <main className="p-12 min-h-screen bg-gray-950 text-gray-100 font-serif">
      <h1
        className="text-4xl md:text-5xl font-extrabold mb-10 text-yellow-200 tracking-wide"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        📚 Library
      </h1>

      {courses.map((course) => {
        const courseBooks = books.filter((b) => b.course_id === course.id)
        if (courseBooks.length === 0) return null

        return (
          <section key={course.id} className="mb-12">
            <h2
              className="text-2xl md:text-3xl font-bold mb-6 text-yellow-300"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {course.name} ({course.code})
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {courseBooks.map((book) => {
                const pdfUrl = book.link ? getPdfUrl(book.link) : null
                return (
                  <div
                    key={book.id}
                    className="p-6 bg-gray-900 bg-opacity-80 text-yellow-200 rounded-2xl shadow-xl hover:shadow-2xl transition transform hover:-translate-y-1 hover:scale-105 border border-yellow-400"
                  >
                    <h3
                      className="font-semibold text-lg md:text-xl mb-1"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {book.title || 'Untitled'}
                    </h3>
                    {book.author && <p className="text-gray-300 text-lg md:text-xl font-bold">Author: {book.author}</p>}
                    {book.description && <p className="text-gray-400 text-lg md:text-xl mt-1">{book.description}</p>}
                    <p className="text-gray-400 text-sm mt-1">Created: {new Date(book.created_at).toLocaleDateString()}</p>

                    {pdfUrl && (
                      <div className="mt-4 flex space-x-4">
                        <button
                          onClick={() => setSelectedPdf(pdfUrl)}
                          className="bg-yellow-400 text-gray-950 font-bold px-4 py-2 rounded hover:bg-yellow-500 transition"
                        >
                          View PDF
                        </button>

                        <a
                          href={pdfUrl}
                          download
                          className="bg-pink-400 text-gray-950 font-bold px-4 py-2 rounded hover:bg-pink-500 transition"
                        >
                          Download
                        </a>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </section>
        )
      })}

      {/* PDF Modal */}
      {selectedPdf && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex flex-col items-center justify-center p-4 z-50">
          <button
            className="self-end mb-2 text-gray-100 font-bold px-4 py-2 hover:text-yellow-400"
            onClick={() => setSelectedPdf(null)}
          >
            Close
          </button>

          <iframe
            src={selectedPdf}
            width="70%"
            height="100%"
            className="bg-gray-800 rounded shadow-lg border border-gray-600"
          />
        </div>
      )}
    </main>
  )
}
