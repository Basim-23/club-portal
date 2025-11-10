'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'

interface ExoticPaper {
  id: number
  title: string
  author: string
  topic?: string
  file_path: string
}

export default function ExoticPapersPage() {
  const [papers, setPapers] = useState<ExoticPaper[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedPdf, setSelectedPdf] = useState<string | null>(null)

  // Fetch papers from Supabase table
  useEffect(() => {
    async function fetchPapers() {
      const { data, error } = await supabase
        .from<ExoticPaper>('exotic_papers')
        .select('*')
        .order('title', { ascending: true })

      if (error) {
        console.error('Error fetching papers:', error)
      } else {
        setPapers(data)
      }
      setLoading(false)
    }
    fetchPapers()
  }, [])

  // ✅ Use the correct bucket name: "papers"
  const getPdfUrl = (filePath: string) => {
    const { data } = supabase.storage.from('papers').getPublicUrl(filePath)
    return data.publicUrl
  }

  if (loading)
    return <p className="text-gray-300 p-12">Loading papers...</p>

  return (
    <main className="p-12 min-h-screen bg-gray-950 text-gray-100 font-serif">
      <h1
        className="text-4xl md:text-5xl font-extrabold mb-10 text-pink-300 tracking-wide"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        🧪 Exotic Papers
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {papers.map((paper) => {
          const pdfUrl = getPdfUrl(paper.file_path)
          return (
            <div
              key={paper.id}
              className="p-6 bg-gray-900 bg-opacity-80 text-pink-300 rounded-2xl shadow-xl hover:shadow-2xl transition transform hover:-translate-y-1 hover:scale-105 border border-pink-400"
            >
              <h3
                className="font-semibold text-lg md:text-xl mb-1"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {paper.title}
              </h3>

              <p className="text-lg md:text-xl font-bold text-gray-300">
                Author: {paper.author}
              </p>

              {paper.topic && (
                <p className="text-lg md:text-xl font-bold text-gray-400 mt-1">
                  Topic: {paper.topic}
                </p>
              )}

              <div className="mt-4 flex space-x-4">
                {/* View PDF in modal */}
                <button
                  onClick={() => setSelectedPdf(pdfUrl)}
                  className="bg-pink-400 text-gray-950 font-bold px-4 py-2 rounded hover:bg-pink-500 transition"
                >
                  View PDF
                </button>

                {/* Download PDF */}
                <a
                  href={pdfUrl}
                  download
                  className="bg-yellow-400 text-gray-950 font-bold px-4 py-2 rounded hover:bg-yellow-500 transition"
                >
                  Download
                </a>
              </div>
            </div>
          )
        })}
      </div>

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
