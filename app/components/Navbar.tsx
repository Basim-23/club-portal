'use client'

import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="bg-gray-950 text-gray-100 px-8 py-5 shadow-lg border-b border-yellow-700 font-serif">
      {/* Logo / Title */}
      <div className="text-center mb-2">
        <div
          className="text-2xl md:text-3xl font-bold text-yellow-200 tracking-wide"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Quantum & Relativity Club
        </div>
      </div>

      {/* Navigation Links */}
      <ul className="flex justify-center space-x-12 text-lg md:text-xl">
        <li>
          <Link
            href="/"
            className="font-bold flex items-center space-x-2 hover:text-yellow-400 transition-colors"
          >
            <span>🏠</span>
            <span>Home</span>
          </Link>
        </li>
        <li>
          <Link
            href="/library"
            className="font-bold flex items-center space-x-2 hover:text-yellow-400 transition-colors"
          >
            <span>📚</span>
            <span>Library</span>
          </Link>
        </li>
        <li>
          <Link
            href="/courses"
            className="font-bold flex items-center space-x-2 hover:text-yellow-400 transition-colors"
          >
            <span>🎓</span>
            <span>Courses</span>
          </Link>
        </li>
        <li>
          <Link
            href="/events"
            className="font-bold flex items-center space-x-2 hover:text-yellow-400 transition-colors"
          >
            <span>📆</span>
            <span>Events</span>
          </Link>
        </li>
        <li>
          <Link
            href="/exotic-papers"
            className="font-bold flex items-center space-x-2 hover:text-pink-400 transition-colors"
          >
            <span>🧪</span>
            <span>Exotic Papers</span>
          </Link>
        </li>
      </ul>
    </nav>
  )
}
