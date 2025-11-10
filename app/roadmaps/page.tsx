import Link from 'next/link'

interface Step {
  title: string
  description?: string
  estimated_time?: string
}

interface Roadmap {
  id: string
  title: string
  career: string
  summary?: string
  steps: Step[]
}

// Static roadmaps data
const ROADMAPS: Roadmap[] = [
  {
    id: 'physics',
    title: 'Physics Career Roadmap',
    career: 'Physics',
    summary: 'A roadmap for aspiring physicists.',
    steps: [
      { title: 'Learn Classical Mechanics', description: 'Start with Newtonian mechanics.', estimated_time: '3 months' },
      { title: 'Study Electromagnetism', description: 'Learn Maxwell’s equations.', estimated_time: '3 months' },
      { title: 'Quantum Mechanics', description: 'Fundamentals of quantum theory.', estimated_time: '6 months' },
      { title: 'Special & General Relativity', description: 'Understand space-time and gravity.', estimated_time: '3 months' },
      { title: 'Research Experience', description: 'Join a lab, publish posters.', estimated_time: '1-2 years' },
    ]
  },
  {
    id: 'cs',
    title: 'Computer Science Career Roadmap',
    career: 'Computer Science',
    summary: 'A roadmap for aspiring software engineers.',
    steps: [
      { title: 'Learn Programming Basics', description: 'Start with Python or JavaScript.', estimated_time: '3 months' },
      { title: 'Data Structures & Algorithms', description: 'Essential for coding interviews.', estimated_time: '3-6 months' },
      { title: 'Projects & GitHub', description: 'Build real projects to showcase skills.', estimated_time: 'ongoing' },
    ]
  }
]

export default function RoadmapsPage() {
  return (
    <main className="p-12 min-h-screen bg-gray-950 text-gray-100 font-serif">
      <h1 className="text-5xl font-extrabold mb-8 text-yellow-200">Career Roadmaps</h1>

      {ROADMAPS.map((roadmap) => (
        <section key={roadmap.id} className="mb-12 bg-gray-900 bg-opacity-80 p-6 rounded-2xl border border-yellow-400 shadow-md">
          <h2 className="text-3xl font-bold text-yellow-200 mb-2">{roadmap.title}</h2>
          <p className="text-gray-300 italic mb-4">Career Track: {roadmap.career}</p>

          {roadmap.summary && (
            <p className="text-gray-200 mb-4">{roadmap.summary}</p>
          )}

          <ol className="space-y-4 list-decimal list-inside">
            {roadmap.steps.map((step, idx) => (
              <li key={idx} className="bg-gray-800 p-4 rounded-xl border border-yellow-400">
                <div className="flex justify-between items-baseline">
                  <span className="text-yellow-200 font-bold">{step.title}</span>
                  {step.estimated_time && <span className="text-gray-300 italic text-sm">{step.estimated_time}</span>}
                </div>
                {step.description && <p className="text-gray-200 mt-2">{step.description}</p>}
              </li>
            ))}
          </ol>
        </section>
      ))}
    </main>
  )
}
