from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from recommendation import recommend

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class SearchRequest(BaseModel):
    interest: str
    school_type: str = "any"
    location: str = None
    max_budget: float = None

@app.post("/search")
def search(data: SearchRequest):
    print(f"🟢 Interest received: '{data.interest}' | Type: {data.school_type} | Location: {data.location} | Max Budget: {data.max_budget}")
    
    result = recommend(
        interest_input=data.interest,
        school_type=data.school_type,
        location=data.location,
        max_budget=data.max_budget,
    )

    return result
