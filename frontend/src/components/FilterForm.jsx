import { useState } from 'react'

function FilterForm({ onSearch }) {
  const [form, setForm] = useState({
    interest: '',
    type: 'any',
    tuition: '',
    location: ''
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // 🟢 Fix 422: Send only valid values to backend
    const payload = {
      interest: form.interest.trim(),
      type: form.type === 'any' ? null : form.type,
      tuition: form.tuition ? parseInt(form.tuition) : null,
      location: form.location || null
    }

    onSearch(payload)
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded border shadow space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Interest</label>
        <textarea
          name="interest"
          value={form.interest}
          onChange={handleChange}
          placeholder="e.g. medicine, engineering, education"
          className="w-full border border-gray-300 rounded px-3 py-2 text-gray-800 focus:outline-none focus:ring focus:ring-blue-300"
          rows={3}
          required
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">School Type</label>
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 text-gray-800 focus:outline-none focus:ring focus:ring-blue-300"
          >
            <option value="any">Any</option>
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>
        </div>

        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Max Tuition Fee</label>
          <input
            type="number"
            name="tuition"
            value={form.tuition}
            onChange={handleChange}
            placeholder="e.g. 70000"
            className="w-full border border-gray-300 rounded px-3 py-2 text-gray-800 focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Location</label>
        <input
          type="text"
          name="location"
          value={form.location}
          onChange={handleChange}
          placeholder="e.g. Manila"
          className="w-full border border-gray-300 rounded px-3 py-2 text-gray-800 focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition"
      >
        🔍 Find Schools
      </button>
    </form>
  )
}

export default FilterForm

 