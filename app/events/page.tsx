interface SeminarSeries {
  title: string
  description: string
  zoom_link: string
  passcode?: string
  dates: string
}

const seminarSeriesList: SeminarSeries[] = [
  {
    title: "Caltech High Energy Physics Seminars",
    description:
      "Join Caltech's High Energy Physics seminars to stay updated on cutting-edge research in particle physics.",
    zoom_link: "https://caltech.zoom.us/j/83658360159",
    passcode: "322116",
    dates: "Every Tuesday at 2:00 AM (Cairo Time)",
  },
  {
    title: "Caltech Physics Colloquium",
    description:
      "Attend the Caltech Physics Colloquium series to hear talks from leading physicists across multiple fields.",
    zoom_link: "https://caltech.zoom.us/j/84497014003",
    dates: "Every Friday at 2:00 AM (Cairo Time)",
  },
]

export default function SeminarSeriesPage() {
  return (
    <main className="min-h-screen bg-gray-950 flex flex-col items-center justify-center p-12 font-serif text-gray-100 text-center space-y-16">
      <h1
        className="text-6xl md:text-7xl font-extrabold mb-12 text-yellow-200 tracking-wide"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        Seminar Series
      </h1>

      {seminarSeriesList.map((series) => (
        <div
          key={series.title}
          className="p-8 bg-gray-900 bg-opacity-80 rounded-2xl shadow-xl border border-yellow-400 space-y-4 max-w-2xl w-full"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-yellow-200">
            {series.title}
          </h2>
          <p className="text-xl md:text-2xl text-gray-300">{series.description}</p>

          <a
            href={series.zoom_link}
            target="_blank"
            rel="noopener noreferrer"
            className="block px-6 py-3 bg-yellow-500 text-gray-950 font-semibold rounded-lg shadow hover:bg-yellow-400 transition text-xl md:text-2xl"
          >
            Join Seminar
          </a>

          {series.passcode && (
            <p className="text-gray-200 text-lg md:text-xl">
              <strong>Passcode:</strong> {series.passcode}
            </p>
          )}

          <p className="text-gray-200 text-lg md:text-xl">
            <strong>Dates:</strong> {series.dates}
          </p>
        </div>
      ))}
    </main>
  )
}
