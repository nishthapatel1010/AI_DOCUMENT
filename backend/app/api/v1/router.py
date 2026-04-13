from fastapi import APIRouter
from app.api.v1.endpoints import health, documents

# THIS IS FILE 2: The Main Router file. 
# We call/include all the individual route files (health.py, documents.py) right here.
api_router = APIRouter()

# Include the health endpoints under the /health path
api_router.include_router(health.router, prefix="/health", tags=["health"])

# Include the documents endpoints under the /documents path
api_router.include_router(documents.router, prefix="/documents", tags=["documents"])
