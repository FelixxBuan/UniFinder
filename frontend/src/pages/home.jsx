import { useState } from 'react'
import FilterForm from '../components/FilterForm'
import CompareModal from '../components/CompareModal'

function Home() {
  const [results, setResults] = useState([])
  const [showCompare, setShowCompare] = useState(false)

  const handleSearch = async (formData) => {
  try {
    const res = await fetch('http://localhost:8000/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })

    const data = await res.json()
    console.log("🎯 Result:", data)  // ⬅ ADD THIS LINE
    setResults(data)
  } catch (err) {
    alert("Server error. Please check the backend.")
  }
}


  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-blue-800 mb-8">
          🎓 UniFinder
        </h1>

        <FilterForm onSearch={handleSearch} />

        {results.length > 0 && (
          <div className="mt-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Top 5 Matching Schools</h2>
            <div className="space-y-4">
              {results.map((school, i) => (
                <div key={i} className="bg-white p-5 rounded-lg shadow-md border-l-4 border-blue-500">
                  <h3 className="text-xl font-bold text-blue-700">{school.name}</h3>
                  <p className="text-gray-700 mt-1">{school.description}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    {school.type} | ₱{school.tuition} | {school.location} | Score: {school.score}
                  </p>
                </div>
              ))}
            </div>

            <div className="text-right mt-6">
              <button
                onClick={() => setShowCompare(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded shadow"
              >
                Compare Schools
              </button>
            </div>
          </div>
        )}

        {showCompare && (
          <CompareModal schools={results} onClose={() => setShowCompare(false)} />
        )}
      </div>
    </div>
  )
}

export default Home
