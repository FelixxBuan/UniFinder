function CompareModal({ schools, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-11/12 max-w-6xl overflow-y-auto max-h-[90vh]">
        <div className="flex justify-between mb-4">
          <h2 className="text-xl font-bold text-blue-700">Compare Schools</h2>
          <button onClick={onClose} className="text-red-600 text-lg font-bold">×</button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
          {schools.map((school, i) => (
            <div key={i} className="border p-4 rounded shadow-sm">
              <h3 className="font-semibold text-blue-700">{school.name}</h3>
              <p className="text-gray-600">{school.description}</p>
              <p><strong>Type:</strong> {school.type}</p>
              <p><strong>Tuition:</strong> ₱{school.tuition}</p>
              <p><strong>Location:</strong> {school.location}</p>
              <p><strong>Score:</strong> {school.score}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CompareModal
