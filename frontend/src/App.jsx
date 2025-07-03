import { useState } from "react";

function App() {
  const [interest, setInterest] = useState("");
  const [schoolType, setSchoolType] = useState("any");
  const [location, setLocation] = useState("");
  const [maxBudget, setMaxBudget] = useState(50000);
  const [results, setResults] = useState([]);
  const [message, setMessage] = useState("");
  const [expandedIndex, setExpandedIndex] = useState(null);

  const search = async () => {
    const payload = {
      interest,
      school_type: schoolType,
      location,
    };

    if (schoolType === "private") {
      payload.max_budget = maxBudget;
    }

    const response = await fetch("http://127.0.0.1:8000/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    setResults(data.results || []);
    setMessage(data.message || "");
    setExpandedIndex(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-50 via-white to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-white shadow-xl rounded-2xl p-8 space-y-6">

        {/* Header */}
        <div className="text-center">
          <div className="text-3xl font-bold text-blue-700 flex items-center justify-center gap-2">
            <span>🎓</span> UniFinder
          </div>
          <p className="text-sm text-gray-600 mt-1">
            Find programs based on your passion
          </p>
        </div>

        {/* Interest Input */}
        <input
          type="text"
          placeholder="What are you interested in?"
          className="w-full px-4 py-3 border rounded-xl text-gray-800 shadow-sm focus:outline-none focus:ring focus:border-blue-400"
          value={interest}
          onChange={(e) => setInterest(e.target.value)}
        />

        {/* School Type Selection */}
        <select
          value={schoolType}
          onChange={(e) => setSchoolType(e.target.value)}
          className="w-full px-4 py-3 border rounded-xl text-gray-800 shadow-sm focus:outline-none focus:ring focus:border-blue-400"
        >
          <option value="any">Any School Type</option>
          <option value="public">Public</option>
          <option value="private">Private</option>
        </select>

        {/* Budget Slider for Private Schools */}
        {schoolType === "private" && (
          <div className="space-y-1">
            <label className="text-sm text-gray-700">
              Maximum Tuition Per Semester: ₱{maxBudget}
            </label>
            <input
              type="range"
              min={5000}
              max={100000}
              step={1000}
              value={maxBudget}
              onChange={(e) => setMaxBudget(Number(e.target.value))}
              className="w-full"
            />
          </div>
        )}

        {/* Location Dropdown */}
        <select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full px-4 py-3 border rounded-xl text-gray-800 shadow-sm focus:outline-none focus:ring focus:border-blue-400"
        >
          <option value="">Any Location</option>
          <option value="Angeles">Angeles</option>
          <option value="Apalit">Apalit</option>
          <option value="Arayat">Arayat</option>
          <option value="Bacolor">Bacolor</option>
          <option value="Candaba">Candaba</option>
          <option value="Floridablanca">Floridablanca</option>
          <option value="Guagua">Guagua</option>
          <option value="Lubao">Lubao</option>
          <option value="Mabalacat">Mabalacat</option>
          <option value="Macabebe">Macabebe</option>
          <option value="Magalang">Magalang</option>
          <option value="Masantol">Masantol</option>
          <option value="Mexico">Mexico</option>
          <option value="Minalin">Minalin</option>
          <option value="Porac">Porac</option>
          <option value="San Fernando">San Fernando</option>
          <option value="San Luis">San Luis</option>
          <option value="San Simon">San Simon</option>
          <option value="Santa Ana">Santa Ana</option>
          <option value="Santa Rita">Santa Rita</option>
          <option value="Santo Tomas">Santo Tomas</option>
          <option value="Sasmuan">Sasmuan</option>
        </select>

        {/* Search Button */}
        <button
          onClick={search}
          className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
        >
          Find Programs
        </button>

        {/* Optional Message */}
        {message && (
          <p className="text-center text-sm text-yellow-600 font-medium">
            {message}
          </p>
        )}

        {/* Results Section */}
        <div className="space-y-4">
          {results.length > 0 ? (
            results.map((item, index) => {
              const isExpanded = expandedIndex === index;

              return (
                <div
                  key={index}
                  className="border rounded-xl p-4 bg-blue-50 shadow-sm cursor-pointer transition-all duration-300"
                  onClick={() => setExpandedIndex(isExpanded ? null : index)}
                >
                  <div className="flex items-center gap-3 mb-2">
                    {item.school_logo && (
                      <img
                        src={item.school_logo}
                        alt={`${item.school} logo`}
                        className="w-12 h-12 object-contain"
                      />
                    )}
                    <div>
                      <h2 className="font-semibold text-blue-800">{item.program}</h2>
                      <p className="text-sm text-gray-700">{item.school}</p>
                    </div>
                  </div>

                  <p className="text-sm mt-2 text-gray-800">{item.description}</p>
                  <p className="text-xs text-right mt-1 text-gray-500">
                    Score: {item.score}
                  </p>

                  {isExpanded && (
                    <div className="mt-4 space-y-2 text-sm text-gray-700">
                      <p><strong>Type:</strong> {item.school_type || "N/A"}</p>
                      <p><strong>Location:</strong> {item.location || "N/A"}</p>
                      <p><strong>Tuition/Sem:</strong> {item.tuition_per_semester ? `₱${item.tuition_per_semester}` : "N/A"}</p>
                      <p><strong>Tuition/Year:</strong> {item.tuition_annual ? `₱${item.tuition_annual}` : "N/A"}</p>
                      <p><strong>Admission Requirements:</strong> {item.admission_requirements || "N/A"}</p>
                      <p><strong>Grade Requirements:</strong> {item.grade_requirements || "N/A"}</p>
                      <p><strong>School Requirements:</strong> {item.school_requirements || "N/A"}</p>
                      {item.school_website && (
                        <p>
                          <strong>Website:</strong>{" "}
                          <a
                            href={item.school_website}
                            className="text-blue-600 underline"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Visit Site
                          </a>
                        </p>
                      )}
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <p className="text-center text-gray-500">No results yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
