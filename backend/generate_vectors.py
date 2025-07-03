from sentence_transformers import SentenceTransformer
import json

programs = [
   
  {
    "school": "Colegio De Sebastian",
    "school_logo": "/logos/colegio.png",
    "name": "Bachelor of Science in Business Administration - Major in Financial Management",
    "description": "Focuses on financial analysis, investment strategies, and capital management for roles in banking and corporate finance.",
    "tuition_per_semester": None,
    "tuition_annual": None,
    "admission_requirements": "High school diploma, entrance exam, and interview.",
    "grade_requirements": "GWA of 85% or higher in Grade 12.",
    "school_requirements": "Form 138, PSA birth certificate, certificate of good moral character.",
    "school_website": "https://www.dhvsu.edu.ph",
    "location": "San Fernando, Pampanga",
    "school_type": "Public"
  },
  {
    "school": "Don Honorio Ventura State University",
    "school_logo": "/logos/dhvsu.png",
    "name": "Bachelor of Science in Business Administration - Major in Marketing Management",
    "description": "Covers branding, advertising, consumer behavior, and digital marketing strategies for business growth.",
    "tuition_per_semester": None,
    "tuition_annual": None,
    "admission_requirements": "High school diploma, entrance exam, and interview.",
    "grade_requirements": "At least 85% in English and Math.",
    "school_requirements": "Form 138, PSA birth certificate, certificate of good moral character.",
    "school_website": "https://www.dhvsu.edu.ph",
    "location": "Guagua, Pampanga",
    "school_type": "Public"
  },
  {
    "school": "Don Honorio Ventura State University",
    "school_logo": "/logos/dhvsu.png",
    "name": "Bachelor of Science in Business Administration - Major in Human Resource Management",
    "description": "Teaches recruitment, training, labor relations, and strategic human capital development in organizations.",
    "tuition_per_semester": None,
    "tuition_annual": None,
    "admission_requirements": "High school diploma, entrance exam, and interview.",
    "grade_requirements": "GWA of 85%, especially in English-related subjects.",
    "school_requirements": "Form 138, PSA birth certificate, certificate of good moral character.",
    "school_website": "https://www.dhvsu.edu.ph",
    "location": "Mabalacat, Pampanga",
    "school_type": "Public"
  },
  {
    "school": "Don Honorio Ventura State University",
    "school_logo": "/logos/dhvsu.png",
    "name": "Bachelor of Science in Business Administration - Major in Operations Management",
    "description": "Covers logistics, supply chain, and process improvement to optimize business operations and efficiency.",
    "tuition_per_semester": None,
    "tuition_annual": None,
    "admission_requirements": "High school diploma, entrance exam, and interview.",
    "grade_requirements": "At least 85% in Math and Science.",
    "school_requirements": "Form 138, PSA birth certificate, certificate of good moral character.",
    "school_website": "https://www.dhvsu.edu.ph",
    "location": "Mexico, Pampanga",
    "school_type": "Public"
  },
  {
    "school": "Don Honorio Ventura State University",
    "school_logo": "/logos/dhvsu.png",
    "name": "Bachelor of Science in Accountancy",
    "description": "Provides training in auditing, taxation, financial reporting, and regulatory compliance for careers in public accounting.",
    "tuition_per_semester": None,
    "tuition_annual": None,
    "admission_requirements": "High school diploma, entrance exam, and math proficiency test.",
    "grade_requirements": "GWA of 87% or higher with at least 85% in Math.",
    "school_requirements": "Form 138, PSA birth certificate, certificate of good moral character.",
    "school_website": "https://www.dhvsu.edu.ph",
    "location": "Lubao, Pampanga",
    "school_type": "Public"
  },
  {
    "school": "Don Honorio Ventura State University",
    "school_logo": "/logos/dhvsu.png",
    "name": "Bachelor of Science in Accounting Information System",
    "description": "Combines accounting principles with information systems to manage financial data using business technologies.",
    "tuition_per_semester": None,
    "tuition_annual": None,
    "admission_requirements": "High school diploma, entrance exam, and IT proficiency check.",
    "grade_requirements": "Minimum GWA of 85%, strong performance in Math and ICT.",
    "school_requirements": "Form 138, PSA birth certificate, certificate of good moral character.",
    "school_website": "https://www.dhvsu.edu.ph",
    "location": "Arayat, Pampanga",
    "school_type": "Public"
  },
  {
    "school": "Don Honorio Ventura State University",
    "school_logo": "/logos/dhvsu.png",
    "name": "Bachelor of Science in Management Accounting",
    "description": "Focuses on cost accounting, budgeting, and internal financial planning to support business decisions.",
    "tuition_per_semester": None,
    "tuition_annual": None,
    "admission_requirements": "High school diploma, entrance exam, and interview.",
    "grade_requirements": "GWA of 85% or above in Grade 12.",
    "school_requirements": "Form 138, PSA birth certificate, certificate of good moral character.",
    "school_website": "https://www.dhvsu.edu.ph",
    "location": "Magalang, Pampanga",
    "school_type": "Public"
  },
  {
    "school": "Don Honorio Ventura State University",
    "school_logo": "/logos/dhvsu.png",
    "name": "Bachelor of Science in Entrepreneurship",
    "description": "Equips students with skills in startup development, innovation, and small business management.",
    "tuition_per_semester": None,
    "tuition_annual": None,
    "admission_requirements": "High school diploma, entrance exam, and business idea proposal.",
    "grade_requirements": "At least 85% overall GWA.",
    "school_requirements": "Form 138, PSA birth certificate, certificate of good moral character.",
    "school_website": "https://www.dhvsu.edu.ph",
    "location": "Bacolor, Pampanga",
    "school_type": "Public"
  },
  {
    "school": "Don Honorio Ventura State University",
    "school_logo": "/logos/dhvsu.png",
    "name": "Bachelor of Science in Office Administration",
    "description": "Prepares students for administrative support roles through training in office systems, records management, and business communication.",
    "tuition_per_semester": 20000,
    "tuition_annual": 50000,
    "admission_requirements": "High school diploma and interview.",
    "grade_requirements": "GWA of at least 84%, with good communication skills.",
    "school_requirements": "Form 138, PSA birth certificate, certificate of good moral character.",
    "school_website": "https://www.dhvsu.edu.ph",
    "location": "Sta. Ana, Pampanga",
    "school_type": "Private"
  },
  {
    "school": "Don Honorio Ventura State University",
    "school_logo": "/logos/dhvsu.png",
    "name": "Bachelor of Science in Real Estate Management",
    "description": "Covers property development, brokerage, appraisal, and real estate law for careers in the property sector.",
    "tuition_per_semester": 5000,
    "tuition_annual": 20000,
    "admission_requirements": "High school diploma and entrance exam.",
    "grade_requirements": "At least 85% in Math and English.",
    "school_requirements": "Form 138, PSA birth certificate, certificate of good moral character.",
    "school_website": "https://www.dhvsu.edu.ph",
    "location": "Floridablanca, Pampanga",
    "school_type": "Private"
  }
    
]


model = SentenceTransformer("all-mpnet-base-v2")
for p in programs:
    p["vector"] = model.encode(p["description"]).tolist()

with open("data/program_vectors.json", "w", encoding="utf-8") as f:
    json.dump(programs, f, indent=2)
