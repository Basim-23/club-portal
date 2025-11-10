export default function HomePage() {
  return (
    <main className="p-12 min-h-screen bg-gray-950 text-gray-100 font-serif">
      {/* Page Title */}
      <h1
        className="text-5xl md:text-6xl font-extrabold text-center mb-12 text-yellow-200 tracking-wider"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        Welcome to the Quantum & Relativity Club
      </h1>

      {/* Subtitle */}
      <p
        className="text-center text-lg md:text-xl mb-16 text-gray-300 italic"
        style={{ fontFamily: "'Merriweather', serif" }}
      >
        Explore our curated library, university courses, international physics seminars, and more.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Library Card */}
        <a
          href="/library"
          className="bg-gray-900 bg-opacity-80 text-yellow-200 rounded-3xl p-8 shadow-2xl hover:shadow-[0_0_30px_rgba(255,215,0,0.5)] transition transform hover:-translate-y-1 hover:scale-105 border border-yellow-300"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            📚 Library
          </h2>
          <p className="text-gray-300 text-base md:text-lg">
            Browse books related to each university course and learn more.
          </p>
        </a>

        {/* Courses Card */}
        <a
          href="/courses"
          className="bg-gray-900 bg-opacity-80 text-green-200 rounded-3xl p-8 shadow-2xl hover:shadow-[0_0_30px_rgba(144,238,144,0.5)] transition transform hover:-translate-y-1 hover:scale-105 border border-green-300"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            🎓 Courses
          </h2>
          <p className="text-gray-300 text-base md:text-lg">
            Explore university courses and access online lectures and resources.
          </p>
        </a>

        {/* Events Card */}
        <a
          href="/events"
          className="bg-gray-900 bg-opacity-80 text-purple-200 rounded-3xl p-8 shadow-2xl hover:shadow-[0_0_30px_rgba(216,191,216,0.5)] transition transform hover:-translate-y-1 hover:scale-105 border border-purple-300"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            📆 Events
          </h2>
          <p className="text-gray-300 text-base md:text-lg">
            Check upcoming physics seminars and international colloquiums.
          </p>
        </a>

        {/* Exotic Papers Card */}
        <a
          href="/exotic-papers"
          className="bg-gray-900 bg-opacity-80 text-pink-300 rounded-3xl p-8 shadow-2xl hover:shadow-[0_0_30px_rgba(255,105,180,0.5)] transition transform hover:-translate-y-1 hover:scale-105 border border-pink-300"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            🧪 Exotic Papers
          </h2>
          <p className="text-gray-300 text-base md:text-lg">
            Dive into cutting-edge research and unconventional physics papers.
          </p>
        </a>
      </div>
    </main>
  );
}
